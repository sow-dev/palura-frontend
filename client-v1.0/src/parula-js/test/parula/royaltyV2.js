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


describe("# parula:royaltyV2", async function(){   

    it("should royalty works - ERC1155", async function(){
        var tokenId = Date.now()
        var quantity = 10
        var royaltiesTo = [[CHALIE_ADDRESS, 100]]
        var retProduct = await parula.createArtwork1155(ALICE_ADDRESS, ALICE_ADDRESS, "http://metadata1155.io/asset/1", tokenId, quantity, royaltiesTo)

        var ro = await parula.getRoyaltiesOwner(parula.nft1155Address, tokenId)
        assert.equal(ro, ALICE_ADDRESS, 'royaltiesOwner incorrect')

        // console.log('1234', await parula.getRoyalties(parula.nft1155Address, tokenId) )
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
        var _sellOrderId = 40
        await _writeTempFile(_sellOrderId, ret)

        var alice_eth_amount_before = await parula.getBalanceOf(ALICE_ADDRESS)
        var chalie_eth_amount_before = await parula.getBalanceOf(CHALIE_ADDRESS)

        var ret = await parula.createBuyOrderAndMatch({
            maker:BOB_ADDRESS,
            maTypeMV:ETH, // 
            maContractAddress:ZERO_ADDRESS,
            maValue:price_wei,

            sellOrderId:_sellOrderId
        })
        await _removeTempFile(_sellOrderId)
        var alice_eth_amount_after = await parula.getBalanceOf(ALICE_ADDRESS)
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
        var royaltiesTo = [[CHALIE_ADDRESS, 100]]
        var retProduct = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1", royaltiesTo)
        var tokenId = retProduct.tokenId

        var ro = await parula.getRoyaltiesOwner(parula.nftAddress, tokenId)
        assert.equal(ro, ALICE_ADDRESS, 'royaltiesOwner incorrect')

        // console.log('2345', await parula.getRoyalties(parula.nftAddress, tokenId) )
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
        var _sellOrderId = 41
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

    it("should royalty works - 0 royalty", async function(){
        var royaltiesTo = [[CHALIE_ADDRESS, 0]]
        try{ // expect throw
            await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1", royaltiesTo)
            throw 'fail'
        }catch(e){}
    }).timeout(100*1000);

    it("should royalty works - 501 royalty", async function(){
        var royaltiesTo = [[CHALIE_ADDRESS, 501]]
        try{ // expect throw
            await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1", royaltiesTo)
            throw 'fail'
        }catch(e){}
    }).timeout(100*1000);

    it("can transfer royaltiesOwnership", async function(){
        var royaltiesTo = [[BOB_ADDRESS, 100]]
        var retProduct = await parula.createArtwork(BOB_ADDRESS, BOB_ADDRESS, "http://721metadata.io/asset/1", royaltiesTo)
        var tokenId = retProduct.tokenId

        var royaltiesOwner = await parula.getRoyaltiesOwner(parula.nftAddress, tokenId)
        assert.equal(royaltiesOwner.toLowerCase(), BOB_ADDRESS.toLowerCase())

        var res = await parula.transferRoyaltiesOwnership(parula.nftAddress, tokenId, CHALIE_ADDRESS, BOB_ADDRESS)
        assert.equal(res.status, true)

        var owner = await parula.getRoyaltiesOwner(parula.nftAddress, tokenId)
        assert.equal(owner.toLowerCase(), CHALIE_ADDRESS.toLowerCase())
    }).timeout(80*1000)

    it("can transfer royaltiesOwnership and updateRoyalty", async function(){
        var royaltiesTo = [[BOB_ADDRESS, 100]]
        var retProduct = await parula.createArtwork(ALICE_ADDRESS, BOB_ADDRESS, "http://721metadata.io/asset/1", royaltiesTo)
        var tokenId = retProduct.tokenId

        var res = await parula.transferRoyaltiesOwnership(parula.nftAddress, tokenId, ALICE_ADDRESS, BOB_ADDRESS)
        assert.isTrue(res.status)

        var owner = await parula.getRoyaltiesOwner(parula.nftAddress, tokenId)
        assert.equal(owner, ALICE_ADDRESS)

        var royaltiesNew = [[ALICE_ADDRESS, 500]] // alice가 10% 수익
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesNew, ALICE_ADDRESS) 
        assert.isTrue(res.status)
    }).timeout(80*1000)

    it("assert fail if not owner", async function(){
        var royalties = [[BOB_ADDRESS, 100]]
        var retProduct = await parula.createArtwork(BOB_ADDRESS, BOB_ADDRESS, "http://721metadata.io/asset/1", royalties)
        var tokenId = retProduct.tokenId
        
        // from wrong token owner
        var royaltiesNew = [[ALICE_ADDRESS, 100]]
        var res = await parula.updateRoyalties(parula.nftAddress, tokenId, royaltiesNew, ALICE_ADDRESS) 
        assert.isFalse(res.status)
    }).timeout(80*1000)

})