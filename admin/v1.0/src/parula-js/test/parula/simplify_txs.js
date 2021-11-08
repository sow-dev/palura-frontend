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


describe("# parula:Simplify TXs", function(){
    it("skip ERC20 approve-tx if already approved", async ()=>{
        // var ret = await this._approveTransferProxy(typeMV, contractAddress, value, maker)
        var ret = await parula._approveTransferProxy(ERC20, TESTERC20_ADDRESS, 1000, BOB_ADDRESS);
        assert.equal(ret.status, true)

        var ret = await parula._approveTransferProxy(ERC20, TESTERC20_ADDRESS, 1000, BOB_ADDRESS);
        assert.equal(ret.status, true)
        assert.isUndefined(ret.tx) // no TX
    })

    it("skip ERC721 approve-tx if already approved", async ()=>{
        // var ret = await this._approveTransferProxy(typeMV, contractAddress, value, maker)
        // mint 721
        var ret = await parula.createArtwork(ALICE_ADDRESS, ALICE_ADDRESS, "http://721metadata.io/asset/1") 
        // approve
        var ret = await parula._approveTransferProxy(ERC721, parula.nftAddress, ret.tokenId, ALICE_ADDRESS);
        assert.equal(ret.status, true)
    })
})