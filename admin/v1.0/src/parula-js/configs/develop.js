const HDWalletProvider = require('@truffle/hdwallet-provider');

const { get_deployed_info } = require("../../../smartcontract/v1.0/deploy_util");
const { assert } = require("chai");


const networkName = "develop"
const chainId = 5777
const netId = 5777
const providerUrl = 'http://localhost:9545'

// const MNEMONIC = "venue muscle alter voice toddler saddle loyal auto toilet captain job whisper"; //process.env.MNEMONIC;
const MNEMONIC = "park vague viable discover pitch pig green lady furnace wait laptop egg"


const develop = get_deployed_info().develop
const { exchange, royaltiesRegistry, transferProxy, erc20TransferProxy, paru721, paru1155, testErc20 } = develop

for(const a of [exchange, royaltiesRegistry, transferProxy, erc20TransferProxy, paru721, paru1155, testErc20]){
    if(a == undefined){
        console.log(develop)
        throw 'develop config: deployed address not found'
    }
}


module.exports = {
    config:{
        networkName: networkName,
        chainId: chainId,
        netId: netId,

        apiBaseUrl: 'devurl',
        apiKey: '',

        readonlyProviderUrl: providerUrl,

        nftAddress: paru721,
        nft1155Address: paru1155,
        
        exchangeAddress: exchange,
        royaltiesRegistryAddress: royaltiesRegistry,
        transferProxyAddress: transferProxy,
        erc20TransferProxyAddress: erc20TransferProxy,
    },
    provider: new HDWalletProvider({
        mnemonic: {phrase: MNEMONIC}, providerOrUrl: providerUrl, chainId: chainId
    }),
    ALICE_ADDRESS: "0x7A450816D74FD8E1Ca20E9E015064Af6e9C760b2",
    BOB_ADDRESS: "0xE617464C1AB3Aa4db1B734C6F10e49A8188B2E1d",
    CHALIE_ADDRESS: "0x7dB251cC23BA4D76496ABed872F9846F89E96106",
    TESTERC20_ADDRESS: testErc20
}
