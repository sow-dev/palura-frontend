const HDWalletProvider = require('@truffle/hdwallet-provider');

const { get_deployed_info } = require("../../../smartcontract/v1.0/deploy_util");
const { assert } = require("chai");


const networkName = "ganacli"
const chainId = 8966
const netId = 8966
const providerUrl = 'http://localhost:8545'

const MNEMONIC = "venue muscle alter voice toddler saddle loyal auto toilet captain job whisper"; //process.env.MNEMONIC;


const ganacli = get_deployed_info().ganacli
const { exchange, royaltiesRegistry, transferProxy, erc20TransferProxy, paru721, paru1155 } = ganacli

for(const a of [exchange, royaltiesRegistry, transferProxy, erc20TransferProxy, paru721, paru1155]){
    if(a == undefined){
        throw 'ganacli config: deployed address not found'
    }
}


module.exports = {
    config:{
        networkName: networkName,
        chainId: chainId,
        netId: netId,

        apiBaseUrl: '',
        apiKey: '',

        readonlyProviderUrl: providerUrl,

        nftAddress: paru721,
        nft1155Address: paru1155,
        
        exchangeAddress: exchange,
        royaltiesRegistryAddress: royaltiesRegistry,
        transferProxyAddress: transferProxy,
        erc20TransferProxyAddress: erc20TransferProxy
    },
    provider: new HDWalletProvider({
        mnemonic: {phrase: MNEMONIC}, providerOrUrl: providerUrl, chainId: chainId
    })
}
