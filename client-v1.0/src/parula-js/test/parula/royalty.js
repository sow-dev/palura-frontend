var fs = require('fs'); 

const { assert } = require("chai")

const { Parula } = require("../../src/parula")
const { ETH, ERC20, ERC721, ERC1155, ZERO_ADDRESS } = require("../../src/constants")
const { NFTContract, IERC20, IERC721, RoyaltiesRegistry } = require("../../src/contracts")

const { TESTERC20_ADDRESS } = require("../constants")
const { makeContractInstance } = require('../../src/utils/utils');

const { 
    provider, config, ALICE_ADDRESS, BOB_ADDRESS, CHALIE_ADDRESS 
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


describe("# parula:royalty", async function(){   
    // it("", async () =>{
    //     var r = await parula.api.getSellOrder({id:34})
    //     console.log(r)
    // })
    it("should royalty works - ERC1155", async function(){
        var tokenId = Date.now()
        var quantity = 10
        var retProduct = await parula.createArtwork1155(ALICE_ADDRESS, ALICE_ADDRESS, "http://metadata1155.io/asset/1", tokenId, quantity)

        var royaltiesTo = [[CHALIE_ADDRESS, 100]]
        var res = await parula.updateRoyalties(parula.nft1155Address, tokenId, royaltiesTo, ALICE_ADDRESS)
        assert.isTrue(res.status, res.err)

        // console.log( await parula.getRoyalties(parula.nftAddress, tokenId) )
        var price_wei = 1000      

        var ret = await parula.createSellOrder({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC1155, // 
            maContractAddress:parula.nft1155Address,
            maValue:tokenId,
            // quantity: quantity,
            
            taTypeMV:ETH,
            taContractAddress:ZERO_ADDRESS,
            taValue:price_wei,
        })
        var _sellOrderId = 30
        await _writeTempFile(_sellOrderId, ret)

        var alice_eth_amount_before = await parula.getBalanceOf(ALICE_ADDRESS)
        // var bob_eth_amount_before = await parula.getBalanceOf(BOB_ADDRESS)
        var chalie_eth_amount_before = await parula.getBalanceOf(CHALIE_ADDRESS)

        // var aliceEthBalanceBefore = new Web3.utils.BN(await parula.web3.eth.getBalance(ALICE_ADDRESS))
        var ret = await parula.createBuyOrderAndMatch({
            maker:BOB_ADDRESS,
            maTypeMV:ETH, // 
            maContractAddress:ZERO_ADDRESS,
            maValue:price_wei,

            sellOrderId:_sellOrderId
        })
        await _removeTempFile(_sellOrderId)
        var alice_eth_amount_after = await parula.getBalanceOf(ALICE_ADDRESS)
        // var bob_eth_amount_after = await parula.getBalanceOf(BOB_ADDRESS)
        var chalie_eth_amount_after = await parula.getBalanceOf(CHALIE_ADDRESS)
        
        assert.equal(
            parula.toBN(chalie_eth_amount_after).sub(parula.toBN(chalie_eth_amount_before)), 
            10
        ) // price(1000wei) * 0.01(royalty 1%)

        assert.equal(
            parula.toBN(alice_eth_amount_after).sub(parula.toBN(alice_eth_amount_before)),
            price_wei-(price_wei*0.01+price_wei*0.02)
        )        
    }).timeout(100*1000);

    it("should royalty works", async function(){
        var retProduct = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")
        var tokenId = retProduct.tokenId

        var royaltiesTo = [[CHALIE_ADDRESS, 100]]
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesTo, ALICE_ADDRESS)
        assert.isTrue(res.status)

        // console.log( await parula.getRoyalties(parula.nftAddress, tokenId) )

        var price_wei = 1000
        var chalie_eth_amount_before = await parula.getBalanceOf(CHALIE_ADDRESS)

        var ret = await parula.createSellOrder({
            maker:ALICE_ADDRESS,
            maTypeMV:ERC721, // 
            maContractAddress:parula.nftAddress,
            maValue:tokenId,
            // quantity: quantity,
            
            taTypeMV:ETH,
            taContractAddress:ZERO_ADDRESS,
            taValue:price_wei,
        })
        var _sellOrderId = 11
        await _writeTempFile(_sellOrderId, ret)

        // var aliceEthBalanceBefore = new Web3.utils.BN(await parula.web3.eth.getBalance(ALICE_ADDRESS))
        var ret = await parula.createBuyOrderAndMatch({
            maker:BOB_ADDRESS,
            maTypeMV:ETH, // 
            maContractAddress:ZERO_ADDRESS,
            maValue:price_wei,

            sellOrderId:_sellOrderId
        })

        await _removeTempFile(_sellOrderId)
        var chalie_eth_amount_after = await parula.getBalanceOf(CHALIE_ADDRESS)

        assert.equal(
            parula.toBN(chalie_eth_amount_after).sub(parula.toBN(chalie_eth_amount_before)),
            price_wei*0.01
        ) // price(1000wei) * 0.01(royalty 1%)
        
    }).timeout(100*1000);

    it("can set royalties (low-level)", async function(){
        var retProduct = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1")
        var tokenId = retProduct.tokenId

        const rr = makeContractInstance(parula.web3, parula.netId, RoyaltiesRegistry, parula.royaltiesAddress)

        var call = rr.methods.setRoyaltiesByTokenAndTokenId(parula.nftAddress, tokenId, [ [BOB_ADDRESS, 1100] ])
        var gas = await call.estimateGas({from:ALICE_ADDRESS})
        var tx = await call.send({from:ALICE_ADDRESS, gas}); //set royalties by token and tokenId
        
        var royalties = await rr.methods.getRoyalties(parula.nftAddress, tokenId).call()
        assert.equal(royalties[0].account, BOB_ADDRESS)
        assert.equal(royalties[0].value, 1100)
    }).timeout(50*1000)

    it("can get royaltiesOwnership", async function(){
        var retProduct = await parula.createArtwork(BOB_ADDRESS, BOB_ADDRESS, "http://721metadata.io/asset/1")
        var tokenId = retProduct.tokenId
        
        var royaltiesNew = [[BOB_ADDRESS, 1000]] // bob에게 10%
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesNew, BOB_ADDRESS)

        assert.isTrue(res.status)

        var royaltiesOwner = await parula.getRoyaltiesOwner(parula.nftAddress, tokenId)
        assert.equal(royaltiesOwner.toLowerCase(), BOB_ADDRESS.toLowerCase())
    }).timeout(80*1000)

    it("can set royalties2", async function(){
        var retProduct = await parula.createArtwork(BOB_ADDRESS, BOB_ADDRESS, "http://721metadata.io/asset/1")
        var tokenId = retProduct.tokenId

        var royaltiesNew = [[ALICE_ADDRESS, 100]]
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesNew, BOB_ADDRESS)
        
        // console.log('res::', res)
        assert.isTrue(res.status)
    }).timeout(80*1000);

    it("assert fail if not owner", async function(){
        var retProduct = await parula.createArtwork(BOB_ADDRESS, BOB_ADDRESS, "http://721metadata.io/asset/1")
        var tokenId = retProduct.tokenId
        var royaltiesNew = [[ALICE_ADDRESS, 100]]

        // from wrong token owner
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesNew, ALICE_ADDRESS) 
        assert.isFalse(res.status)
    }).timeout(80*1000)

    it("can transfer royaltiesOwnership", async function(){
        var retProduct = await parula.createArtwork(BOB_ADDRESS, BOB_ADDRESS, "http://721metadata.io/asset/1")
        var tokenId = retProduct.tokenId
        
        // transferRoyaltiesOwnership을 했는데 before가 0x0000 이면? ...무관할듯 -> 상관 있음..
        // var res = await parula.transferRoyaltiesOwnership(parula.nftAddress, tokenId, ALICE_ADDRESS, BOB_ADDRESS)
        // assert.isTrue(res.status)

        var royaltiesNew = [[BOB_ADDRESS, 100]]
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesNew, BOB_ADDRESS) 
        assert.isTrue(res.status)

        var res = await parula.transferRoyaltiesOwnership(parula.nftAddress, tokenId, ALICE_ADDRESS, BOB_ADDRESS)
        assert.isTrue(res.status)

        var owner = await parula.getRoyaltiesOwner(parula.nftAddress, tokenId)
        assert.equal(owner, ALICE_ADDRESS)

        // alice 의 본성이 드러남
        var royaltiesNew = [[ALICE_ADDRESS, 1000]] // alice가 10% 수익
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesNew, ALICE_ADDRESS) 
        assert.isTrue(res.status)
    }).timeout(80*1000)
})