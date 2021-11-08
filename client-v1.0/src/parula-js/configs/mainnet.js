const networkName = "mainnet"
const chainId = 1
const netId = 1
const providerUrl = 'https://mainnet.infura.io/v3/b6ae638ae8aa47c996394354e364014e'

module.exports = {
    config: {
        networkName: networkName,
        chainId: chainId,
        netId: netId,

        apiBaseUrl: '',
        apiKey: '',

        // provider:  metamask need
        readonlyProviderUrl: providerUrl,

        nftAddress: '',
        nft1155Address: '',
        
        exchangeAddress: '',
        royaltiesRegistryAddress: '',
        transferProxyAddress: '',
        erc20TransferProxyAddress: ''
    }
}
