const {
    EventEmitter
} = require("fbemitter")
const Web3 = require("web3")

const {
    makeContractInstance,
    confirmTransaction,
    createTypedDataAndSignature,
    recoverTypedSignature,
    enc,
    decAsset,
    encDataV1,
} = require("./utils/utils.js")

const {
    ParulaAPI
} = require('./api')
const {
    NULL_BLOCK_HASH,
    ZERO_ADDRESS,
    ORDER_DATA_V1,
    ERC20,
    ERC721,
    ERC1155,
    ETH
} = require("./constants")
const {
    Network,
    EventType,
    Order,
    Asset
} = require("./types")

const {
    NFTContract,
    NFT1155Contract,
    Exchange,
    RoyaltiesRegistry,
    IERC20,
    IERC165,
    IERC1155
} = require("./contracts")


const {
    config
} = require("../configs/rinkeby") // defaultConfig


class Parula {
    constructor(provider, apiConfig = {}, logger) {
        // apiConfig.gasPrice = apiConfig.gasPrice || makeBigNumber(300000)

        if (Object.keys(apiConfig) == 0) {
            apiConfig = config
        }
        if (Number(provider.chainId) != apiConfig.chainId) {
            throw "parula-js.constructor:: provider.chain_id != config.chain_id"
        }
        this.networkName = apiConfig.networkName

        this.netId = apiConfig.netId

        this.nftAddress = apiConfig.nftAddress
        this.nft1155Address = apiConfig.nft1155Address
        this.exchangeAddress = apiConfig.exchangeAddress
        this.royaltiesAddress = apiConfig.royaltiesRegistryAddress
        this.transferProxyAddress = apiConfig.transferProxyAddress
        this.erc20TransferProxyAddress = apiConfig.erc20TransferProxyAddress

        var neededProperties = [
            'nftAddress', 'nft1155Address', 'netId', 'networkName', 'readonlyProviderUrl',
            'exchangeAddress', 'royaltiesRegistryAddress', 'transferProxyAddress', 'erc20TransferProxyAddress',
        ]
        neededProperties.forEach(propName => {
            if (apiConfig[propName] == undefined) {
                throw `Configuration needed '${propName}' is not defined`
            }
        })

        // Web3 Config
        this.web3 = new Web3(provider)
        this.web3ReadOnly = new Web3(apiConfig.readonlyProviderUrl)
        this.gasPriceAddition = new Web3.utils.BN(1)

        apiConfig.web3 = this.web3ReadOnly
        this.api = new ParulaAPI(apiConfig, logger)

        this.logger = logger || (function (arg) {
            return arg;
        })
        this._emitter = new EventEmitter()
    }

    async createArtwork(signer, owner = '', erc721metadataURL = '', royalties = []) {

        this._verifyParamAddress([signer])
        if (owner) {
            this._verifyParamAddress([owner])
        } else {
            owner = signer
        }

        var to = this.nftAddress
        var nft_contract = this._makeContractInstance(NFTContract, this.nftAddress)
        let _callobj

        // check royalties valid
        royalties.forEach((royalty) => {
            // check royalty account
            var is_valid_address = this.web3.utils.isAddress(royalty[0])
            if (!is_valid_address) {
                throw `fail to mint with royalty, invalid address: ${royalty[0]}`
            }
            // check royalty value
            var _val = Number(royalty[1])
            if (isNaN(_val) || _val < 1 || _val > 500) { // 1~500
                throw `fail to mint with royalty, invalid value: ${royalty[1]}`
            }
        })

        if (royalties.length > 0) {
            this._verifyParamTypePart([royalties])
            _callobj = nft_contract.methods.mintItemWithRoyalty(owner, erc721metadataURL, owner, royalties) // royaltyOwner, royalties
        } else {
            _callobj = nft_contract.methods.mintItem(owner, erc721metadataURL)
        }

        const from = signer
        const _param = {}
        const ret = await this.sendTransactionAndConfirm(
            from, to, _callobj, _param, EventType.TransactionCreated, "Create NFT")

        if (ret.status) {
            return await this._extractTransferInfo(ret.tx.transactionHash)
        }
    }

    async createArtwork1155(signer, owner = '', erc721metadataURL = '', id = 0, quantity = 1, royalties = []) {
        this._verifyParamAddress([signer])
        if (owner) {
            this._verifyParamAddress([owner])
        } else {
            owner = signer
        }
        this._verifyParamUintNumber([id, quantity])

        var to = this.nft1155Address
        var nft_contract = this._makeContractInstance(NFT1155Contract, this.nft1155Address)
        let _callobj
        if (royalties.length > 0) {
            this._verifyParamTypePart([royalties])
            _callobj = nft_contract.methods.mintItemWithRoyalty(owner, id, quantity, [], owner, royalties) //, royaltyOwner, royalties
        } else {
            _callobj = nft_contract.methods.mintItem(owner, id, quantity, [])
        }

        const from = signer
        const _param = {}

        const ret = await this.sendTransactionAndConfirm(
            from, to, _callobj, _param, EventType.TransactionCreated, "Create NFT")

        if (ret.status) {
            return await this._extractTransferInfo(ret.tx.transactionHash)
        }
    }

    async createSellOrder({
        maker, // order maker address               web3.eth.abi.encodeParameters(["address", "uint256"], [token, tokenId]);
        maTypeMV, // makerAsset,  // ma, Asset(ERC721, enc(erc721.address, erc721TokenId1), 1),
        maContractAddress, // contract
        maValue, // tokenId when erc721, 1155
        quantity = 1,

        taker = ZERO_ADDRESS, // order taker address, can be ZERO
        taTypeMV, // takerAsset,  // ta, Asset(ETH, "0x", 200), ERC20
        taContractAddress,
        taValue, // or Value?

        salt = Date.now(), // when regist order to orderbook salt is some-uint-value, else salt is 0
        //   in ExchangeV2Core, same hashed order occur error
        startDatetime = 0, // Date()
        endDatetime = 0, // Date()
    }) {
        if (taTypeMV == ETH) {
            this._verifyParamAddress([maker, maContractAddress, taker]) // eth는 contractAddress 없음
        } else {
            this._verifyParamAddress([maker, maContractAddress, taker, taContractAddress])
        }
        this._verifyParamTypeMV([maTypeMV, taTypeMV])
        this._verifyParamUintNumber([maValue, taValue])

        if (maTypeMV == ERC721) {
            var realOwner = await this.getTokenOwnerOf(maContractAddress, maValue)
            if (realOwner.toUpperCase() != maker.toUpperCase()) {
                return {
                    status: false,
                    err: `Orderer(${maker}) is not the token owner(${realOwner})`
                }
            }
        } else if (maTypeMV == ERC1155) {
            var balanceOf = await this.getBalanceOf(maker, maContractAddress, maValue) // maValue is tokenId
            if (balanceOf < quantity) {
                return {
                    status: false,
                    err: `Orderer(${maker})'s balance is not enough. `
                }
            }
        } else {
            return {
                status: false,
                err: `Unsupported asset type: ${maTypeMV}`
            }
        }


        const originFees = [] // originFees 가 원천징수 느낌인가보다
        const payouts = [
            [maker, 10000]
        ] // 100% of takeAsset to orderMaker
        const encData = encDataV1(this.web3, [payouts, originFees])
        // TODO: check start and end date 
        //   var date = new Date()
        //   date.valueOf() // 1622683295328
        //   new Date(1622683295328) // 2021-06-03T01:21:35.328Z

        var maEncData = this._encAssetData(maTypeMV, maContractAddress, maValue)
        var taEncData = this._encAssetData(taTypeMV, taContractAddress, taValue)
        // order struct
        const ret = await this._makeOrderAndApprove(
            maker,
            Asset(maTypeMV, maEncData, quantity), // 721이면 value 1, 1155면 1 이상
            taker,
            Asset(taTypeMV, taEncData, taValue), // takerAsset,
            salt,
            startDatetime,
            endDatetime,
            ORDER_DATA_V1,
            encData
        );

        // TODO: api.putSellOrder
        return ret // ,orderId,
    }

    // 누가 판다고 내놓은 거 산다는 오더&매치
    async createBuyOrderAndMatch({
        maker, // order maker address   
        maTypeMV, // takerAsset,  // ta, Asset(ETH, "0x", 200), ERC20
        maContractAddress, // contract
        maValue,

        sellOrderId, // off-chain registered, 아니면 order_id만 받고, getOrder로 가져와? 그게 성능상 좋겠구만

        salt = 0, // when regist order to orderbook salt is 1, else salt is 0
        start = 0, // Date()
        end = 0, // Date()
    }) {
        if (maTypeMV == ETH) {
            this._verifyParamAddress([maker])
        } else {
            this._verifyParamAddress([maker, maContractAddress])
        }
        this._verifyParamTypeMV([maTypeMV])
        this._verifyParamUintNumber([maValue, sellOrderId])

        let err = ''
        const originFees = []
        const payouts = [
            [maker, 10000]
        ] // 100% of takeAsset to orderMaker
        const encData = encDataV1(this.web3, [payouts, originFees])

        // api.get sell order
        const sellOrder = await this.api.getSellOrder({
            id: sellOrderId
        }) // 구현 필요, 디테일한 사용법도 필요

        var assetData = this._encAssetData(maTypeMV, maContractAddress, maValue)
        var makeAsset = Asset(maTypeMV, assetData, maValue)
        this._checkDiffAssets(makeAsset, sellOrder.order.takeAsset)

        // order struct
        var retBuyOrder = await this._makeOrderAndApprove(
            maker,
            makeAsset,
            sellOrder.order.maker,
            sellOrder.order.makeAsset, // 보자보자 
            salt,
            start,
            end,
            ORDER_DATA_V1,
            encData
        );

        let value = maTypeMV == ETH ? maValue : 0 // if eth value need, in wei

        // need put buy-order?
        var retMatch = await this._matchOrders(
            sellOrder.order, sellOrder.signature, retBuyOrder.order, retBuyOrder.signature,
            maker, value
        )

        return {
            status: retMatch.status,
            err: ''
        }
    }

    ////////////////////////
    //// bid에 매칭은 어떻게?
    ////////////////////////
    // auction 등록 -> 입찰(buyOrder) -> 낙찰(sellOrder -> matchOrders)
    //
    // 1. auction 등록하기
    //   - 상품
    //   - asset
    //     - 시작가
    //   - 시작일시
    //   - 종료일시
    //   - 
    // 2. listing auction
    //   auction item은 [bid] 버튼 표시
    //   실시간 종료까지 남은 시간 표시
    //   정렬 (ebay참고: https://www.ebay.com/b/Toys-Hobbies/220/bn_1865497?LH_Auction=1&rt=nc&_sop=5)
    //     best match
    //     time: endding soonest
    //     time: newly listed
    //     price + shipping: lowest first
    //     price + shipping: highest first
    //     number of bids: fewest first
    //     number of bids: most first
    // 3. bidding
    // 4. 낙찰(matchingOrder)

    // 경매 내 놓는 오더
    async createAuction({
        startDatetime,
        endDatetime,
        maker,
        maTypeMV,
        maContractAddress,
        maValue,
        quantity = 1,

        taker = ZERO_ADDRESS,
        taTypeMV,
        taContractAddress,
        taPriceBegin,

        taPriceEnd = 0, // 즉시구매가
        isTimeLimited = true,
        priceMinHidden = -1,
    }) {
        this._verifyParamAddress([maker, maContractAddress, taker])
        this._verifyParamTypeMV([maTypeMV, taTypeMV])
        this._verifyParamUintNumber([maValue, quantity, startDatetime, endDatetime, taPriceBegin, taPriceBegin])

        if (maTypeMV == ERC721) {
            var realOwner = await this.getTokenOwnerOf(maContractAddress, maValue)
            if (realOwner.toUpperCase() != maker.toUpperCase()) {
                return {
                    status: false,
                    err: `Orderer(${maker}) is not the token owner(${realOwner})`
                }
            }
        } else if (maTypeMV == ERC1155) {
            var balanceOf = await this.getBalanceOf(maker, maContractAddress, maValue) // maValue is tokenId
            if (balanceOf < quantity) {
                return {
                    status: false,
                    err: `Orderer(${maker})'s balance is not enough. `
                }
            }
        } else {
            return {
                status: false,
                err: `Unsupported asset type: ${maTypeMV}`
            }
        }

        let retOrderData = null
        let err = ''

        if (taPriceEnd != 0) { // 즉시구매 시 사용될 sellOrder
            retOrderData = await this.createSellOrder({
                maker,
                maTypeMV,
                maContractAddress,
                maValue,
                taker,
                taTypeMV,
                taContractAddress,
                taValue: taPriceEnd,
                quantity,
                start: startDatetime,
                end: endDatetime
            })

            if (!retOrderData.status) {
                console.error(retOrderData.err)
                err = `err: ${retOrderData.err}`
            }
            // console.log(retOrderData.data, retOrderData.signature)
        }
        // 즉구 order, signature 만들었고,
        //   즉구 order DB 테이블: market_order

        // 테이블 따로 필요 없지?

        // 경매 취소 가능한가? || 입찰 없으면 가능, 입찰 있으면 불가능
        return {
            ...retOrderData,
            err
        }
    }

    async createBidOrder({
        maker, // bidder
        maTypeMV,
        maContractAddress,
        maValue,

        // taker, // auction owner
        // taTypeMV, taContractAddress, taValue,

        auctionId
    }) {
        if (maTypeMV == ETH) {
            return {
                status: false,
                err: "Can't use ETH for bid-order"
            }
        }
        this._verifyParamAddress([maker, maContractAddress])
        this._verifyParamTypeMV([maTypeMV])
        this._verifyParamUintNumber([maValue, auctionId])

        const originFees = []
        const payouts = [
            [maker, 10000]
        ] // 100% of takeAsset to orderMaker
        const encData = encDataV1(this.web3, [payouts, originFees])

        var auctionOrder = await this.api.getAuctionOrder({
            id: auctionId
        })

        var assetData = this._encAssetData(maTypeMV, maContractAddress, maValue)
        var makeAsset = Asset(maTypeMV, assetData, maValue)

        let order_maker;
        let order_maker_asset;
        if (!auctionOrder.immediate_buyable) {
            order_maker_asset = auctionOrder.order.makeAsset
            order_maker = auctionOrder.order.maker
        } else {
            order_maker = auctionOrder.order.maker
            order_maker_asset = auctionOrder.order.makeAsset
        }

        // this._checkDiffAssets(makeAsset, auctionOrder.order.takeAsset)
        // order struct
        const ret = await this._makeOrderAndApprove(
            maker,
            makeAsset,
            order_maker,
            order_maker_asset,
            1, 0, 0,
            ORDER_DATA_V1,
            encData
        );

        return ret
    }

    async createBidMatch({
        maker,
        maTypeMV,
        maContractAddress,
        maValue,
        quantity = 1,

        bidId, // off-chain registered id in DB
    }) {
        this._verifyParamAddress([maker, maContractAddress])
        this._verifyParamTypeMV([maTypeMV])
        this._verifyParamUintNumber([maValue, bidId, quantity])

        const originFees = []
        const payouts = [
            [maker, 10000]
        ]
        const encData = encDataV1(this.web3, [payouts, originFees])

        var bidOrder = await this.api.getBidOrder({
            id: bidId
        })

        var assetData = this._encAssetData(maTypeMV, maContractAddress, maValue)
        var makeAsset = Asset(maTypeMV, assetData, quantity)
        this._checkDiffAssets(makeAsset, bidOrder.order.takeAsset)

        const retBidMatchOrder = await this._makeOrderAndApprove(
            maker,
            makeAsset,
            bidOrder.order.maker,
            bidOrder.order.makeAsset,
            0, 0, 0,
            ORDER_DATA_V1, encData
        )
        // TODO: match
        var ret = await this._matchOrders(
            retBidMatchOrder.order, retBidMatchOrder.signature, bidOrder.order, bidOrder.signature,
            maker
        )
        return ret
    }

    // 나한테 팔라고 하는 제안 오더
    async createOfferOrder({
        maker, // offerer
        maTypeMV,
        maContractAddress,
        maValue,

        taker, // offeree
        taTypeMV,
        taContractAddress,
        taValue,
        quantity = 1,
        salt = Date.now() //   in ExchangeV2Core, same hashed order occur error
    }) {
        if (maTypeMV == ETH) {
            return {
                status: false,
                err: "Can't use ETH for offer-order"
            }
        }
        this._verifyParamAddress([maker, maContractAddress, taker, taContractAddress])
        this._verifyParamTypeMV([maTypeMV, taTypeMV])
        this._verifyParamUintNumber([maValue, taValue, quantity, salt])

        const originFees = []
        const payouts = [
            [maker, 10000]
        ] // 100% of takeAsset to orderMaker
        const encData = encDataV1(this.web3, [payouts, originFees])

        var assetData = this._encAssetData(maTypeMV, maContractAddress, maValue)
        var taAssetData = this._encAssetData(taTypeMV, taContractAddress, taValue)
        // order struct
        const ret = await this._makeOrderAndApprove(
            maker,
            Asset(maTypeMV, assetData, maValue),
            taker,
            Asset(taTypeMV, taAssetData, quantity), // target must be NFT?
            salt,
            0,
            0,
            ORDER_DATA_V1,
            encData
        );

        return ret
    }

    // // offer를 수락하는 오더
    async createAcceptOrderAndMatch({
        maker,
        maTypeMV,
        maContractAddress,
        maValue,
        quantity = 1,

        offerId, // off-chain registered, 아니면 order_id만 받고, getOrder로 가져와? 그게 성능상 좋겠구만
    }) {
        this._verifyParamAddress([maker, maContractAddress])
        this._verifyParamTypeMV([maTypeMV])
        this._verifyParamUintNumber([maValue, offerId, quantity])

        const originFees = []
        const payouts = [
            [maker, 10000]
        ]

        const encData = encDataV1(this.web3, [payouts, originFees])
        var offerOrder = await this.api.getOfferOrder({
            id: offerId
        })

        var assetData = this._encAssetData(maTypeMV, maContractAddress, maValue)
        var makeAsset = Asset(maTypeMV, assetData, quantity)
        this._checkDiffAssets(makeAsset, offerOrder.order.takeAsset)

        const retAcceptOrder = await this._makeOrderAndApprove(
            maker,
            makeAsset,
            offerOrder.order.maker,
            offerOrder.order.makeAsset,
            0, 0, 0,
            ORDER_DATA_V1, encData
        )

        // TODO: match
        // console.log(retAcceptOrder.order, retAcceptOrder.signature, offerOrder.order, offerOrder.signature)
        var ret = await this._matchOrders(
            retAcceptOrder.order, retAcceptOrder.signature, offerOrder.order, offerOrder.signature,
            maker
        )
        return ret
    }

    // order를 취소
    async cancelOrder(order, order_maker) {
        // https://github.com/rariblecom/protocol-documentation/blob/master/exchange/updating-cancelling-an-order.md
        // order
        const exchange = this._makeContractInstance(Exchange, this.exchangeAddress)
        var _callobj = exchange.methods.cancel(order)
        var res = await this.sendTransactionAndConfirm(
            order_maker, this.exchangeAddress, _callobj, {},
            EventType.CancelOrder, 'CancelOrder'
        )
        return res
    }

    // order update?

    // swap eth to erc20 how to?

    async getBalanceOf(account, contractAddress = 0, tokenId = 0) { // is 721 or 1155
        this._verifyParamAddress([account])
        this._verifyParamUintNumber([tokenId])

        if (contractAddress == 0) { // ETH
            return await this.web3.eth.getBalance(account)
        }

        // else

        const contractClass = await this.classify(contractAddress)
        if (contractClass == 1155) {
            if (tokenId < 1) {
                throw 'token id must bigger than 0'
            }
            const instance = this._makeContractInstance(IERC1155, contractAddress)
            return await instance.methods.balanceOf(account, tokenId).call()
        } else if (contractClass == 20 || contractClass == 721) { // ERC20 & ERC721 has same interface ( 'balanceOf(address account) returns(uint256 amount)' )
            const instance = this._makeContractInstance(IERC20, contractAddress)
            return await instance.methods.balanceOf(account).call()
        } else {
            throw `${contractAddress} is not token(20,721,1155) contract.`
        }
    }

    async getTokenOwnerOf(contractAddress, tokenId) {
        this._verifyParamAddress([contractAddress])
        this._verifyParamUintNumber([tokenId])
        try {
            var tokenCont = this._makeContractInstance(NFTContract, contractAddress)
            return await tokenCont.methods.ownerOf(tokenId).call()
        } catch (err) {
            throw `error:${err}: contract.ownerOf(${contractAddress, tokenId}) `
        }
    }

    async classify(contractAddress) {
        this._verifyParamAddress([contractAddress])

        const erc721ID = '0x80ac58cd'
        const erc1155ID = '0xd9b67a26'
        const contract = this._makeContractInstance(IERC165, contractAddress)

        try {
            var is721 = await contract.methods.supportsInterface(erc721ID).call()
            if (is721) {
                return 721
            }
        } catch (e) {
            // 20인지 체크 해야 함
            const contract2 = this._makeContractInstance(IERC20, contractAddress)
            try {
                var r = await contract2.methods.totalSupply().call()
                var r = await contract2.methods.balanceOf(ZERO_ADDRESS).call()
                // TODO: 이거 호출될 때 metamask 에러 나는 것 같은데, 확인 필요 { .. -32000, ...}
                return 20
            } catch (e) {
                return 9999 // it's not supports 'supportsInterface' and 'totalSupply'
            }
        }

        var is1155 = await contract.methods.supportsInterface(erc1155ID).call()
        if (is1155) {
            return 1155
        }

        return 9999
    }

    ////////////////////////////
    // Royalty
    ////////////////////////////
    async getRoyaltiesOwner(contractAddress, tokenId) {
        this._verifyParamAddress([contractAddress])
        this._verifyParamUintNumber([tokenId])

        // RoyaltyV2
        const nftContract = this._makeContractInstance(NFTContract, contractAddress)
        var rOwner = await nftContract.methods.getRoyaltyOwner(tokenId).call()
        if (rOwner && rOwner != ZERO_ADDRESS) {
            console.log(`nftContract.getRoyaltyOwner works PARU#${tokenId}'s royaltyOwner -> ${rOwner}`)
            return rOwner
        } // EndOf - RoyaltyV2

        const royaltiesRegistry = this._makeContractInstance(RoyaltiesRegistry, this.royaltiesAddress)
        return await royaltiesRegistry.methods.getRoyaltiesOwner(contractAddress, tokenId).call()
    }

    async getRoyalties(contractAddress, tokenId) {
        this._verifyParamAddress([contractAddress])
        this._verifyParamUintNumber([tokenId])

        // RoyaltyV2
        const nftContract = this._makeContractInstance(NFTContract, contractAddress)
        var royalties = await nftContract.methods.getRoyalties(tokenId).call()
        if (royalties.length > 0) {
            console.log(`nftContract.getRoyalties works. PARU#${tokenId}'s royalties: ${royalties}`)
            return royalties
        } // EO - RoyaltyV2

        const royaltiesRegistry = this._makeContractInstance(RoyaltiesRegistry, this.royaltiesAddress)
        return await royaltiesRegistry.methods.getRoyalties(contractAddress, tokenId).call()
    }

    async transferRoyaltiesOwnership(contractAddress, tokenId, ownerNew, from) {
        this._verifyParamAddress([contractAddress, ownerNew, from])
        this._verifyParamUintNumber([tokenId])

        var ownerNew = ownerNew.toLowerCase()
        var ownerBefore = await this.getRoyaltiesOwner(contractAddress, tokenId)
        if (ownerBefore.toLowerCase() == ownerNew) {
            return {
                status: true,
                ownerBefore
            }
        }

        // RoyaltyV2
        try {
            const nftContract = this._makeContractInstance(NFTContract, contractAddress)
            var _callobj = nftContract.methods.transferRoyaltyOwnership(tokenId, ownerNew)
            var res = await this.sendTransactionAndConfirm(
                from, contractAddress, _callobj, {},
                EventType.TransferRoyaltiesOwnership, 'Transfer royalties ownership'
            )
            if (res.status == true) {
                return {
                    ...res,
                    ownerBefore
                }
            }
        } catch (e) {
            console.error(e)
        }
        // EO - RoyaltyV2

        const royaltiesRegistry = this._makeContractInstance(RoyaltiesRegistry, this.royaltiesAddress)
        var _callobj = royaltiesRegistry.methods.transferRoyaltiesOwnership(contractAddress, tokenId, ownerNew)
        var res = await this.sendTransactionAndConfirm(
            from, this.royaltiesAddress, _callobj, {},
            EventType.TransferRoyaltiesOwnership, 'Transfer royalties ownership'
        )
        return {
            ...res,
            ownerBefore
        }
    }

    async updateRoyalties(contractAddress, tokenId, royaltiesNew, from) {
        this._verifyParamAddress([contractAddress, from])
        this._verifyParamUintNumber([tokenId])
        this._verifyParamTypePart([royaltiesNew]) // TODO: 100곱해서 입력하게 할지 아니면 안에서 100 곱할지에 따라서 검사 달라진다. 그리고 그에 맞는 최대값 검사도 추가 필요함(총합 100%이하)

        let tokenOwner;
        try {
            tokenOwner = await this.getTokenOwnerOf(contractAddress, tokenId)
        } catch (err) {
            return {
                status: false,
                err: `contract or tokenId problem:: ${JSON.stringify(err)}`
            }
        }
        // var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesTo, ALICE_ADDRESS)

        var from = from.toLowerCase()
        var ownerBefore = await this.getRoyaltiesOwner(contractAddress, tokenId)
        if ((ownerBefore == ZERO_ADDRESS && tokenOwner.toLowerCase() == from) // ownerBefore가 zero고, tokenOwner(erc721.ownerOf(address)가 맞거나
            ||
            (ownerBefore.toLowerCase() == from)) { // royaltiesOwnership이 from면 성공한다
            // update 한다
            var _royaltiesBefore = await this.getRoyalties(contractAddress, tokenId)
            //RoyaltyV2
            try {
                var nftCont = this._makeContractInstance(NFTContract, contractAddress)
                var _callobj = await nftCont.methods.updateRoyalty(tokenId, royaltiesNew)
                var res = await this.sendTransactionAndConfirm(
                    from, contractAddress, _callobj, {},
                    EventType.UpdateRoyalties, 'Update royalties'
                )
                if (res.status == true) {
                    return {
                        ...res,
                        royaltiesBefore: _royaltiesBefore,
                        royaltiesNew
                    }
                }
            } catch (e) {
                console.log(e)
            }
            // EO - RoyaltyV2

            const royaltiesRegistry = this._makeContractInstance(RoyaltiesRegistry, this.royaltiesAddress)
            var _callobj = royaltiesRegistry.methods.setRoyaltiesByTokenAndTokenId(contractAddress, tokenId, royaltiesNew)
            var res = await this.sendTransactionAndConfirm(
                from, this.royaltiesAddress, _callobj, {},
                EventType.UpdateRoyalties, 'Update royalties'
            )
            return {
                ...res,
                royaltiesBefore: _royaltiesBefore,
                royaltiesNew
            }
        } else {
            // 실패시킨다
            return {
                status: false,
                tokenOwner,
                ownerBefore,
                'updateRequestedFrom': from,
                err: 'ownership problem'
            }
        }
    }
    ////////////////////////////
    // end of Royalty
    ////////////////////////////

    // TODO: consider update metadata

    async _matchOrders(leftOrder, leftSignature, rightOrder, rightSignature, from, value = 0) {
        const exchange = this._makeContractInstance(Exchange, this.exchangeAddress)

        var to = this.exchangeAddress
        var _callobj = exchange.methods.matchOrders(leftOrder, leftSignature, rightOrder, rightSignature)

        var _param = {
            value
        }
        var ret = await this.sendTransactionAndConfirm(from, to, _callobj, _param, EventType.MatchOrders, "Match orders")
        return ret
    }

    async _approveTransferProxy(asset_type, contract_address, approve_amount, from) {
        // function isApprovedForAll(address owner, address operator)
        // function setApprovalForAll(address operator, bool approved) public virtual override
        let ret
        var to = contract_address
        var _param = {}
        if (asset_type == ERC20) {
            const transfer_proxy = this.erc20TransferProxyAddress
            const ierc20 = this._makeContractInstance(IERC20, contract_address)

            // check allowance(operator, spender) returns(uint256)
            var allowance = await ierc20.methods.allowance(from, transfer_proxy).call()
            if (allowance >= approve_amount) {
                // skip approve if allowance is enough
                try {
                    var _symbol = await this.web3.eth.call({
                        from,
                        to: contract_address,
                        data: this.web3.eth.abi.encodeFunctionSignature("symbol()")
                    })
                    var symbol = this.web3.eth.abi.decodeParameter("string", _symbol)
                    this.logger(`${from} approve ${symbol}:${allowance} for ${transfer_proxy}`)
                } catch (e) {
                    this.logger(e)
                }
                ret = {
                    status: true
                }
            } else {
                var _callobj = ierc20.methods.approve(transfer_proxy, approve_amount)
                ret = await this.sendTransactionAndConfirm(from, to, _callobj, _param, EventType.ApproveCurrency, "Approve currency")
            }
        } else if (asset_type == ERC721 || asset_type == ERC1155) {
            // 721: function setApprovalForAll(address operator, bool _approved) external;
            // 1155: function setApprovalForAll(address _operator, bool _approved) external;
            const transfer_proxy = this.transferProxyAddress // transfer-proxy! not exchange
            let ierc, _callobj
            if (asset_type == ERC721) {
                ierc = this._makeContractInstance(NFTContract, contract_address)
            } else {
                ierc = this._makeContractInstance(NFT1155Contract, contract_address)
            }
            // check isApprovedForAll(owner, operator) returns(bool)
            var isApproved = await ierc.methods.isApprovedForAll(from, transfer_proxy).call()
            if (isApproved) {
                // skip setApprovalForAll if already approved
                var symbol = await ierc.methods.symbol().call()
                this.logger(`${from} approve ${symbol}# for ${transfer_proxy}`)
                ret = {
                    status: true
                }
            } else {
                _callobj = ierc.methods.setApprovalForAll(transfer_proxy, true)
                ret = await this.sendTransactionAndConfirm(from, to, _callobj, _param, EventType.ApproveOrder, "Set approval for all")
            }
        } else { // ETH
            ret = {
                status: true
            }
        }
        var err = ret.status ? '' : "approve fail"
        return {
            ...ret,
            err
        }
    }

    async _makeOrderAndApprove(maker, makerAsset, taker, takerAsset, salt, start, end, dataType, encData) {
        this._verifyParamAddress([maker, taker])
        this._verifyParamUintNumber([salt, start, end])
        this._verifyParamAsset([makerAsset, takerAsset])

        // need to verify [dataType, encData] 

        // validate maker, taker addresses
        // validate assets
        var order = Order(
            maker,
            makerAsset, // Asset(ETH, "0x", 200), 
            taker, // can be ZERO
            takerAsset, // Asset(ERC721, enc(erc721.address, erc721TokenId1), 1), 
            salt, // 
            start, // 
            end, // 
            dataType, // ORDER_DATA_V1 (DT magic value)
            encData // encDataRight (DT encrypted)
        );

        // sign
        let data, signature
        if (salt != 0) {
            const _signed_data_and_sign = await createTypedDataAndSignature(this.web3, this.exchangeAddress, order, maker)
            signature = _signed_data_and_sign.sig
            data = _signed_data_and_sign.data
        } else {
            signature = '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
            data = ''
        }
        const {
            typeMV,
            contractAddress,
            value
        } = decAsset(this.web3, makerAsset)

        var ret = await this._approveTransferProxy(typeMV, contractAddress, value, maker)
        return {
            ...ret,
            order,
            data,
            signature
        }
    }

    async _extractTransferInfo(txHash) {
        // parse ERC721-Transfer event
        const receipt = await this.web3.eth.getTransactionReceipt(txHash)
        // console.log(receipt.logs)
        // receipt.transactionHash // txHash
        let log = receipt.logs[0] // TODO: log가 여러 개일 때는 어떻게 할겨// arr = logs.map(log => { .. from = decode('address', log.topics[1]) ..})

        // log.data // non-indexed 필드 데이터들이 여기에 저장됨(indexed 필드는 topics에)
        // keccak256('Transfer(address,address,uint256)')
        const sigTransfer721 = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
        const sigTransfer1155 = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
        // console.log(receipt)  // ganacli 에서 테스트하려고 했는데, event 발생이 안되네;
        var sigEvt = log.topics[0]

        let from, to, tokenId, quantity = 0;
        if (sigEvt == sigTransfer721) {
            from = this.web3.eth.abi.decodeParameter('address', log.topics[1]) // from
            to = this.web3.eth.abi.decodeParameter('address', log.topics[2]) // to
            tokenId = this.web3.eth.abi.decodeParameter('uint', log.topics[3]) // tokenId (hex)
        } else if (sigEvt == sigTransfer1155) {
            // in IERC1155
            //   event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
            from = this.web3.eth.abi.decodeParameter('address', log.topics[2]) // from
            to = this.web3.eth.abi.decodeParameter('address', log.topics[3]) // to

            var r = this.web3.eth.abi.decodeParameter('(uint256,uint256)', log.data)
            tokenId = r[0]
            quantity = r[1]
        } else {
            this.logger('event type is not handled.')
            console.log(log)
            return {}
        }

        var blockNumber = log.blockNumber;
        var contractAddress = log.address // contract
        var isMinted = (from == ZERO_ADDRESS) ? true : false

        // parse unindexed parameter  https://medium.com/linum-labs/everything-you-ever-wanted-to-know-about-events-and-logs-on-ethereum-fec84ea7d0a5
        // const decoder = new ethers.utils.AbiCoder();
        // const unindexedEvents = events.inputs.filter(event => event.indexed === false);
        // const decodedLogs = logs.map(log => decoder.decode(unindexedEvents, log.data)

        return {
            blockNumber,
            txHash,
            contractAddress,
            tokenId: Number(tokenId),
            quantity: Number(quantity),
            from,
            to,
            isMinted
        }

        // https://gist.github.com/wschwab/528153cb6f2ea17ef9eee0c180425961
        // https://gist.github.com/wschwab/6e89eeb29a8e24203ee954c042e47a6f

    }

    async sendTransactionAndConfirm(from, to, _callobj, _param, evtType, log) {
        const tx = await this._lowLevelSend(from, to, _callobj, _param)
        if (tx.status) {
            const isConfirmed = await this._confirmTransaction(tx.transactionHash, evtType, log)
            return {
                status: isConfirmed,
                tx
            }
        } else {
            return {
                status: false,
                tx
            }
        }
    }

    async _lowLevelSend(from, to, _callobj, _param) {
        var data = _callobj.encodeABI()
        var gasPrice = await this._computeGasPrice()
        try {
            var gas = await _callobj.estimateGas({
                from,
                to,
                ..._param
            })
            return await this.web3.eth.sendTransaction({
                from,
                to,
                data,
                gas,
                gasPrice,
                ..._param
            })
        } catch (err) {
            return {
                status: false,
                err
            }
        }
    }

    async _lowLevelCall(from, to, _call) {
        var data = _call.encodeABI()
        try {
            var ret = await web3.eth.call({
                from,
                to,
                data
            })
            return this.web3.eth.abi.decodeParameters(_call._method.outputs, ret)[0]
        } catch (err) {
            return {}
        }
    }

    async _computeGasPrice() {
        const meanGas = await this.web3.eth.getGasPrice()
        const weiToAdd = Web3.utils.toBN(this.web3.utils.toWei(this.gasPriceAddition, 'gwei'))
        return Web3.utils.toBN(meanGas).add(weiToAdd).toString()
    }

    async _confirmTransaction(transactionHash, event, description, testForSuccess) {
        const transactionEventData = {
            transactionHash,
            event
        }
        this.logger(`transaction started - ${description}`)

        if (transactionHash == NULL_BLOCK_HASH) {
            // This was a smart contract wallet that doesn't know the transaction
            this._dispatch(EventType.TransactionCreated, {
                event
            })

            if (!testForSuccess) {
                // Wait if test not implemented
                this.logger(`Unknown action, waiting 1 minute: ${description}`)
                await delay(60 * 1000)
                return
            }
            return await this._pollCallbackForConfirmation(event, description, testForSuccess)
        }

        // Normal wallet
        try {
            this._dispatch(EventType.TransactionCreated, transactionEventData)
            await confirmTransaction(this.web3, transactionHash)
            this.logger(`transaction succeed - ${description}`)
            this._dispatch(EventType.TransactionConfirmed, transactionEventData)
            return true
        } catch (error) {
            this.logger(`transaction failed: - ${description}`)
            this._dispatch(EventType.TransactionFailed, {
                ...transactionEventData,
                error
            })
            throw error
        }
    }

    async _pollCallbackForConfirmation(event, description, testForSuccess) {
        return new Promise(async (resolve, reject) => {
            const initialRetries = 60
            // const testResolve: (r: number) => Promise<void> = async retries => {
            const testResolve = async retries => {
                const wasSuccessful = await testForSuccess()
                if (wasSuccessful) {
                    this.logger(`Transaction succeeded: ${description}`)
                    this._dispatch(EventType.TransactionConfirmed, {
                        event
                    })
                    return resolve(true)
                } else if (retries <= 0) {
                    return reject(false)
                }

                if (retries % 10 == 0) {
                    this.logger(`Tested transaction ${initialRetries - retries + 1} times: ${description}`)
                }

                await delay(5000)
                return testResolve(retries - 1)
            }

            return testResolve(initialRetries)
        })
    }

    _dispatch(event, data) {
        this._emitter.emit(event, data)
    }

    _makeContractInstance(contractAbi, contractAddress = null) {
        return makeContractInstance(this.web3, this.netId, contractAbi, contractAddress)
    }

    _encAssetData(typeMV, contractAddress, value) {
        let assetData
        if (typeMV == ETH) {
            // assetData = "0x" //ZERO_ADDRESS
            assetData = enc(this.web3, ZERO_ADDRESS)
        } else if (typeMV == ERC20) {
            assetData = enc(this.web3, contractAddress)
        } else if (typeMV == ERC721 || typeMV == ERC1155) {
            assetData = enc(this.web3, contractAddress, value)
        } else {
            console.trace()
            throw `unknown type magic-value (${typeMV})`
        }
        return assetData
    }

    _verifyParamAddress(addressesToVerify) {
        addressesToVerify.forEach(one => {
            if (one == undefined) {
                console.trace()
                throw `Address 'undefined' passed`
            }
            if (one.length != 42) {
                console.trace()
                throw `Address length incorrect :${one}`
            }
        })
    }
    _verifyParamTypeMV(typesToVrify) {
        typesToVrify.forEach(one => {
            if (one == undefined) {
                console.trace()
                throw `typeMV 'undefined' passed`
            }
            if (one.length != 10) {
                console.trace()
                throw `typeMV length incorrect : ${one}`
            }
        })
    }
    _verifyParamUintNumber(valuesToVerify) {
        valuesToVerify.forEach(one => {
            if (one == undefined) {
                console.trace()
                throw `value 'undefined' passed`
            }
            if (typeof one != 'number') {
                console.trace()
                throw `value is not 'number' type ${typeof one}`
            }
            if (Number(one.toFixed()) != one) {
                console.trace()
                throw `value is not integer`
            }
            if (one < 0) {
                console.trace()
                throw `value incorrect ${one}`
            }
        })
    }

    _verifyParamTypePart(partsToVerify) {
        // typePart is struct defined in Libpart.sol, 'Libpart.Part[]'
        partsToVerify.forEach(partToVerify => {
            partToVerify.forEach(one => {
                if (one == undefined) {
                    console.trace()
                    throw `value 'undefined' passed`
                }
                if (one.length > 0) {
                    var account = one[0]
                    var value = one[1]
                    this._verifyParamAddress([account])
                    this._verifyParamUintNumber([value])
                }
            })
        })
    }

    _verifyParamAsset(assetsToVerify) {
        assetsToVerify.forEach(one => {
            if (one == undefined) {
                console.trace()
                throw `asset 'undefined' passed`
            }
            const {
                assetType,
                value
            } = one
            if (assetType == undefined) {
                console.trace()
                throw `assetType 'undefined' passed`
            }
            this._verifyParamUintNumber([value])
        })
    }

    _checkDiffAssets(asset1, asset2) {
        if (asset1.value != asset2.value ||
            asset1.assetType.assetClass != asset2.assetType.assetClass ||
            asset1.assetType.data != asset2.assetType.data
        ) {
            console.trace()
            throw `asset not matched`
        }
    }

    toBN(number) {
        return new this.web3.utils.BN(number)
    }
}

// export default Parula;
module.exports = {
    Parula
}