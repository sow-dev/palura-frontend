const HDWalletProvider = require('@truffle/hdwallet-provider');

const networkName = "rinkeby"
const chainId = 4
const netId = 4
const providerUrl = 'https://eth-rinkeby.alchemyapi.io/v2/qgSA05UjKWC0SDBdcBGNMVOosOzSxEJ2'

const MNEMONIC = "venue muscle alter voice toddler saddle loyal auto toilet captain job whisper"; //process.env.MNEMONIC;


module.exports = {
    config:{
        networkName: networkName,
        chainId: chainId,
        netId: netId,

        apiOrderUrl: 'https://7e2sp62vm8.execute-api.ap-northeast-2.amazonaws.com/dev/v1',  // dev-product
        apiBidUrl:   'https://o5bzvdy8g9.execute-api.ap-northeast-2.amazonaws.com/dev/v1',  // dev-bid
        
        apiKey: '',

        readonlyProviderUrl: providerUrl,

        nftAddress: '0x9198630D35a12F9A1f4407F577403A4F10FEC65a',
        nft1155Address: '0x1a5e9Ac3bC7F5dC4114df446996243bAcF7DFF48',
        
        exchangeAddress: '0x9c0F348D2b7a08D1C6c7d4C9c02AeCcDf0a4430A',
        royaltiesRegistryAddress: '0x022737a887409A62fc8EbEE65126E72d6909C8d6',
        transferProxyAddress: '0x8c57B2a946127Ad85017fDF616b75A32912bf480',
        erc20TransferProxyAddress: '0xBB3b7636c220B7332C103B0065554A5aa4a0b6d2'
    },
    provider: new HDWalletProvider({
        mnemonic: {phrase: MNEMONIC}, providerOrUrl: providerUrl, chainId: chainId
    }),
    ALICE_ADDRESS: "0xf71f33eD007b62c211dA0C9B79a5A6305BC21863",
    BOB_ADDRESS: "0xB40E5F79F9a2085F9Ad3f4B18d9382Bf9C619260",
    CHALIE_ADDRESS: "0x401C25F04897935E691600Bfb39F6570DC4E95B1"
}
