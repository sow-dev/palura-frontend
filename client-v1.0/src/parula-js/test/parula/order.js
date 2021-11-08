var fs = require('fs'); 

const Web3 = require("web3")
const { assert } = require("chai")

const { Parula } = require("../../src/parula")
const { 
    ETH, ERC20, ERC721, ERC1155, ZERO_ADDRESS, // 8 length of hex Magic Value (exclue '0x')
} = require("../../src/constants")
const { Network } = require("../../src/types")
const { NFTContract, IERC20, IERC721 } = require("../../src/contracts")

// const {
//     TESTERC20_ADDRESS 
// } = require("../constants")

const { makeContractInstance } = require('../../src/utils/utils');


const { 
    provider, config,
    ALICE_ADDRESS, BOB_ADDRESS, CHALIE_ADDRESS, TESTERC20_ADDRESS
} = require("../../configs/develop")

const parula = new Parula(
    provider, config,
    line => console.info(`${config.networkName}:: ${line}`)
)

async function _writeTempFile(id, data){
    var fn = `./test/parula/sample_sell_order_${id}.json`
    await fs.writeFileSync(fn, JSON.stringify(data), 'utf8');
}
async function _removeTempFile(id){
    var fn = `./test/parula/sample_sell_order_${id}.json`
    await fs.unlink(fn, ()=>{})
}

describe("# parula:order", function(){
    var price_wei = 1
    var id = 1
    var quantity = 10

    it("can make valid buy-order and match with ETH - ERC1155", async function(){
        var id = Date.now()  // because 1155 id can mine only once
        var ret = await parula.createArtwork1155(ALICE_ADDRESS, ALICE_ADDRESS, "http://nftmetadata.io/asset/", id, quantity); // make erc1155
        var alice_quantity_before = await parula.getBalanceOf(ALICE_ADDRESS, parula.nft1155Address, id)
        var bob_quantity_before = await parula.getBalanceOf(BOB_ADDRESS, parula.nft1155Address, id)

        var ret = await parula.createSellOrder({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC1155, // 
            maContractAddress:parula.nft1155Address,
            maValue:ret.tokenId,
            quantity: quantity,
            
            taTypeMV:ETH,
            taContractAddress:ZERO_ADDRESS,
            taValue:price_wei,
        })
        var tempOrderId = 7
        await _writeTempFile(tempOrderId, ret)

        // var aliceEthBalanceBefore = new Web3.utils.BN(await parula.web3.eth.getBalance(ALICE_ADDRESS))
        var ret = await parula.createBuyOrderAndMatch({
            maker:BOB_ADDRESS,
            maTypeMV:ETH, // 
            maContractAddress:ZERO_ADDRESS,
            maValue:price_wei,
            
            sellOrderId:tempOrderId
        })
        await _removeTempFile(tempOrderId)
        var alice_quantity_after = await parula.getBalanceOf(ALICE_ADDRESS, parula.nft1155Address, id)
        var bob_quantity_after = await parula.getBalanceOf(BOB_ADDRESS, parula.nft1155Address, id)

        // console.log(`tokenId#${id} balance changes for alice: ${alice_quantty_before} -> ${alice_quantty_after}`)
        // console.log(`tokenId#${id} balance changes for bob  : ${bob_quantty_before} -> ${bob_quantty_after}`)
        assert.equal(alice_quantity_before-alice_quantity_after, quantity)
        assert.equal(bob_quantity_after-bob_quantity_before, quantity)
    }).timeout(100000)

    it("can make valid buy-order and match with ERC20 - ERC1155", async function(){
        var id = Date.now()
        var retProduct = await parula.createArtwork1155(ALICE_ADDRESS, ALICE_ADDRESS, "http://1155metadata.io/asset/1", id, quantity)

        var ret = await parula.createSellOrder({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC1155, // 
            maContractAddress:parula.nft1155Address,
            maValue:retProduct.tokenId,
            quantity,
            
            taTypeMV:ERC20,
            taContractAddress:TESTERC20_ADDRESS,
            taValue:price_wei,
        })
        var tempOrderId = 8
        await _writeTempFile(tempOrderId, ret)


        // const ierc20 = makeContractInstance(parula.web3, parula.netId, IERC20, TESTERC20_ADDRESS)
        // var aliceErc20BalanceBefore = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()
        var aliceErc20BalanceBefore = await parula.getBalanceOf(ALICE_ADDRESS, TESTERC20_ADDRESS)
        var bob_quantity_before = await parula.getBalanceOf(BOB_ADDRESS, parula.nft1155Address, id)
        var ret = await parula.createBuyOrderAndMatch({
            maker:BOB_ADDRESS,
            maTypeMV:ERC20, // 
            maContractAddress:TESTERC20_ADDRESS,
            maValue:price_wei,
            
            sellOrderId:tempOrderId
        })
        await _removeTempFile(tempOrderId)
        var aliceErc20BalanceAfter = await parula.getBalanceOf(ALICE_ADDRESS, TESTERC20_ADDRESS)

        assert.equal(aliceErc20BalanceAfter-aliceErc20BalanceBefore, price_wei)
        assert.isTrue(ret.status)
        
        var bob_quantity_after = await parula.getBalanceOf(BOB_ADDRESS, parula.nft1155Address, id)
        assert.equal(bob_quantity_after-bob_quantity_before, quantity)
    }).timeout(100000)

    it("can match auction order - ERC1155", async function(){
        id = Date.now()
        var retProduct = await parula.createArtwork1155(ALICE_ADDRESS, ALICE_ADDRESS, "http://1155metadata.io/asset/1", id, quantity)
        // var price_wei = 1

        // // var startDate = new Date()
        // // var endDate = new Date()
        // // endDate.setMinutes(startDate.getMinutes()+30) // after 30 minutes later from now

        // // // 1. auctionOrder
        var retAuctionOrder = await parula.createAuction({
            startDatetime:0,
            endDatetime:0,

            maker:ALICE_ADDRESS,
            maTypeMV:ERC1155,
            maContractAddress:parula.nft1155Address,
            maValue:retProduct.tokenId,
            quantity,
            
            taTypeMV:ERC20,
            taContractAddress:TESTERC20_ADDRESS,
            taPriceBegin:1,
            taPriceEnd:50,
        })
        var tokenId = retProduct.tokenId
        
        var tempAuctionId = 20
        await _writeTempFile(tempAuctionId, retAuctionOrder)

        // 2. 입찰
        var ret = await parula.createBidOrder({
            maker:BOB_ADDRESS, 
            maTypeMV:ERC20, maContractAddress:TESTERC20_ADDRESS, maValue:price_wei, 
            // taker:ALICE_ADDRESS,
            // taTypeMV:ERC721, taContractAddress:parula.nftAddress, taValue:tokenId,
            auctionId:tempAuctionId // orderId (market_order)
        })
        await _removeTempFile(tempAuctionId)

        var tempBidId = 21
        await _writeTempFile(tempBidId, ret)

        const ierc20 = parula._makeContractInstance(IERC20, TESTERC20_ADDRESS)
        var aliceErc20BalanceBefore = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()

        // 3. 낙찰
        // create bid match order and match
        var ret = await parula.createBidMatch({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC1155, maContractAddress:parula.nft1155Address, maValue:tokenId, quantity,
            bidId:tempBidId
        })
        await _removeTempFile(tempBidId)

        var aliceErc20BalanceAfter = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()
        assert.equal(aliceErc20BalanceAfter-aliceErc20BalanceBefore, price_wei)
    }).timeout(100000)

    it("can match offer order - ERC1155", async function(){
        id = Date.now()
        var retProduct = await parula.createArtwork1155(ALICE_ADDRESS, ALICE_ADDRESS, "http://1155metadata.io/asset/1", id, quantity)

        var price = 10
        // 1. offer
        const offerOrder = await parula.createOfferOrder({
            maker:BOB_ADDRESS, 
            maTypeMV:ERC20, maContractAddress:TESTERC20_ADDRESS, maValue:price,
            
            taker:ALICE_ADDRESS,
            taTypeMV:ERC1155, taContractAddress:parula.nft1155Address, taValue:id, quantity,
        })

        var tempOrderId = 10
        await _writeTempFile(tempOrderId, offerOrder)


        // 2. accept & match
        const ierc20 = parula._makeContractInstance(IERC20, TESTERC20_ADDRESS)
        var aliceErc20BalanceBefore = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()
        var bob_1155_amount_before = await parula.getBalanceOf(BOB_ADDRESS, parula.nft1155Address, id)

        var ret = await parula.createAcceptOrderAndMatch({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC1155, maContractAddress:parula.nft1155Address, maValue:id, quantity,
            offerId:tempOrderId
        })
        await _removeTempFile(tempOrderId)

        assert.isTrue(ret.status)
        var aliceErc20BalanceAfter = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()
        assert.equal(aliceErc20BalanceAfter-aliceErc20BalanceBefore, price)
        
        // const ierc721 = makeContractInstance(parula.web3, parula.netId, IERC721, parula.nftAddress)
        // var ownerOfToken = await ierc721.methods.ownerOf(retProduct.tokenId).call()
        // assert.equal(ownerOfToken, BOB_ADDRESS)
        var bob_1155_amount_after = await parula.getBalanceOf(BOB_ADDRESS, parula.nft1155Address, id)
        assert.equal(bob_1155_amount_after-bob_1155_amount_before, quantity)
    }).timeout(1000000)

    
    it("can make valid buy-order and match with ETH", async function(){
        var ret = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")

        var price_wei = 1
        var ret = await parula.createSellOrder({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC721, // 
            maContractAddress:parula.nftAddress,
            maValue:ret.tokenId,
            
            taTypeMV:ETH,
            taContractAddress:ZERO_ADDRESS,
            taValue:price_wei,
        })
        var tempOrderId = 1
        await _writeTempFile(tempOrderId, ret)

        var aliceEthBalanceBefore = new Web3.utils.BN(await parula.web3.eth.getBalance(ALICE_ADDRESS))
        var ret = await parula.createBuyOrderAndMatch({
            maker:BOB_ADDRESS,
            maTypeMV:ETH, // 
            maContractAddress:ZERO_ADDRESS,
            maValue:price_wei,
            
            sellOrderId:tempOrderId
        })
        await _removeTempFile(tempOrderId)

        var aliceEthBalanceAfter = new Web3.utils.BN(await parula.web3.eth.getBalance(ALICE_ADDRESS))

        assert.equal(
            aliceEthBalanceAfter.sub(aliceEthBalanceBefore).toNumber(), price_wei,
            `balance is not changed, alice: ${aliceEthBalanceBefore} -> ${aliceEthBalanceAfter}`
        )

        assert.isTrue(ret.status)
    }).timeout(100000)

    it("can make valid buy-order and match with ERC20", async function(){
        var retProduct = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")

        var price = 1
        var ret = await parula.createSellOrder({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC721, // 
            maContractAddress:parula.nftAddress,
            maValue:retProduct.tokenId,
            
            taTypeMV:ERC20,
            taContractAddress:TESTERC20_ADDRESS,
            taValue:price,
        })
        
        var tempOrderId = 2
        await _writeTempFile(tempOrderId, ret)

        const ierc20 = makeContractInstance(parula.web3, parula.netId, IERC20, TESTERC20_ADDRESS)
        var aliceErc20BalanceBefore = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()

        var ret = await parula.createBuyOrderAndMatch({
            maker:BOB_ADDRESS,
            maTypeMV:ERC20, // 
            maContractAddress:TESTERC20_ADDRESS,
            maValue:price,
            
            sellOrderId:tempOrderId
        })
        await _removeTempFile(tempOrderId)

        var aliceErc20BalanceAfter = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()

        assert.equal(aliceErc20BalanceAfter-aliceErc20BalanceBefore, price)
        assert.isTrue(ret.status)
        
        const ierc721 = makeContractInstance(parula.web3, parula.netId, IERC721, parula.nftAddress)
        var ownerOfToken = await ierc721.methods.ownerOf(retProduct.tokenId).call()
        assert.equal(ownerOfToken, BOB_ADDRESS)
    }).timeout(100000)

    it("can match auction order", async function(){
        var retProduct = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")
        // var price_wei = 1

        // // var startDate = new Date()
        // // var endDate = new Date()
        // // endDate.setMinutes(startDate.getMinutes()+30) // after 30 minutes later from now

        // // // 1. auctionOrder
        var retAuctionOrder = await parula.createAuction({
            startDatetime:0,
            endDatetime:0,

            maker:ALICE_ADDRESS,
            maTypeMV:ERC721,
            maContractAddress:parula.nftAddress,
            maValue:retProduct.tokenId,
            
            taTypeMV:ERC20,
            taContractAddress:TESTERC20_ADDRESS,
            taPriceBegin:1,
            taPriceEnd:50,
        })
        var price = 1
        var tokenId = retProduct.tokenId
        
        await fs.writeFileSync('./test/parula/sample_sell_order_6.json', JSON.stringify(retAuctionOrder), 'utf8')

        var tempOrderId = 6
        await _writeTempFile(tempOrderId, retAuctionOrder)

        // 2. 입찰
        var ret = await parula.createBidOrder({
            maker:BOB_ADDRESS, 
            maTypeMV:ERC20, maContractAddress:TESTERC20_ADDRESS, maValue:price, 
            // taker:ALICE_ADDRESS,
            // taTypeMV:ERC721, taContractAddress:parula.nftAddress, taValue:tokenId,
            auctionId:tempOrderId // orderId (market_order)
        })
        await _removeTempFile(tempOrderId)

        var tempBidId = 3
        await _writeTempFile(tempBidId, ret)

        const ierc20 = makeContractInstance(parula.web3, parula.netId, IERC20, TESTERC20_ADDRESS)
        var aliceErc20BalanceBefore = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()

        // 3. 낙찰
        // create bid match order and match
        var ret = await parula.createBidMatch({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC721, maContractAddress:parula.nftAddress, maValue:tokenId,
            bidId:tempBidId
        })
        await _removeTempFile(tempBidId)

        var aliceErc20BalanceAfter = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()
        assert.equal(aliceErc20BalanceAfter-aliceErc20BalanceBefore, price)

        const ierc721 = makeContractInstance(parula.web3, parula.netId, IERC721, parula.nftAddress)
        var ownerOfToken = await ierc721.methods.ownerOf(retProduct.tokenId).call()
        assert.equal(ownerOfToken, BOB_ADDRESS)
    }).timeout(100000)
    
    it("can match offer order", async function(){
        var retProduct = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")
        let tokenId = retProduct.tokenId
        let price = 1

        // 1. offer
        const offerOrder = await parula.createOfferOrder({
            maker:BOB_ADDRESS, 
            maTypeMV:ERC20, maContractAddress:TESTERC20_ADDRESS, maValue:price, 
            taker:ALICE_ADDRESS,
            taTypeMV:ERC721, taContractAddress:parula.nftAddress, taValue:tokenId
        })

        var tempOrderId = 4
        await _writeTempFile(tempOrderId, offerOrder)

        // 2. accept & match
        const ierc20 = makeContractInstance(parula.web3, parula.netId, IERC20, TESTERC20_ADDRESS)
        var aliceErc20BalanceBefore = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()
        var ret = await parula.createAcceptOrderAndMatch({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC721, maContractAddress:parula.nftAddress, maValue:tokenId,
            offerId:4
        })
        await _removeTempFile(tempOrderId)

        var aliceErc20BalanceAfter = await ierc20.methods.balanceOf(ALICE_ADDRESS).call()
        assert.equal(aliceErc20BalanceAfter-aliceErc20BalanceBefore, price)
        
        const ierc721 = makeContractInstance(parula.web3, parula.netId, IERC721, parula.nftAddress)
        var ownerOfToken = await ierc721.methods.ownerOf(retProduct.tokenId).call()
        assert.equal(ownerOfToken, BOB_ADDRESS)

    }).timeout(1000000)

    it("can cancel order", async function(){
        var retCreateArtwork = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")

        var price_wei = 1
        var ret = await parula.createSellOrder({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC721, // 
            maContractAddress:parula.nftAddress,
            maValue:retCreateArtwork.tokenId,
            
            taTypeMV:ETH,
            taContractAddress:ZERO_ADDRESS,
            taValue:price_wei,
        })
        var tempOrderId = 101
        await _writeTempFile(tempOrderId, ret)

        // 주문 취소
        var retCancel = await parula.cancelOrder(ret.order, ALICE_ADDRESS)
        assert.equal(retCancel.status, true)

        // matchOrder below must fail
        try{
            var ret = await parula.createBuyOrderAndMatch({
                maker:BOB_ADDRESS,
                maTypeMV:ETH, // 
                maContractAddress:ZERO_ADDRESS,
                maValue:price_wei,
                
                sellOrderId:tempOrderId
            })
            if (ret.status != false){
                throw `fail : ${ret}`
            }
        }catch(e){}

        await _removeTempFile(tempOrderId)
        assert.equal(ret.status, false)
        var owner = await parula.getTokenOwnerOf(parula.nftAddress, retCreateArtwork.tokenId)
        assert.equal(owner, ALICE_ADDRESS) // 그대로 alice 소유
    })

    it("can't make a order if not the tokenOwner", async function(){
        var retCreateArtwork = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")

        var price_wei = 1
        var ret = await parula.createSellOrder({
            maker:BOB_ADDRESS,
            maTypeMV:ERC721, // 
            maContractAddress:parula.nftAddress,
            maValue:retCreateArtwork.tokenId,
            
            taTypeMV:ETH,
            taContractAddress:ZERO_ADDRESS,
            taValue:price_wei,
        })
        
        assert.isFalse(ret.status);
        assert.isTrue(ret.err.startsWith('Orderer('))
    })

    it("can't make a order if it has not enough balance", async function(){
        var id = Math.ceil(Math.random()*10000000)
        var quantity = 5
        var ret = await parula.createArtwork1155(ALICE_ADDRESS, ALICE_ADDRESS, "http://nftmetadata.io/asset/", id, quantity);

        var price_wei = 1
        var ret = await parula.createSellOrder({
            maker: ALICE_ADDRESS,
            maTypeMV: ERC1155, // 
            maContractAddress: parula.nft1155Address,
            maValue: id,
            quantity: 11,
            
            taTypeMV: ETH,
            taContractAddress: ZERO_ADDRESS,
            taValue: price_wei,
        })
        
        assert.isFalse(ret.status);
        assert.isTrue(ret.err.startsWith('Orderer('))
    })

    // check correct states and values
})
