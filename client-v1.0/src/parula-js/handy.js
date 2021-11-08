
const Web3 = require('web3')
const { 
    MAINNET_PROVIDER_URL, RINKEBY_PROVIDER_URL 
} = require("./src/constants")
const { Network } = require("./src/types")

const web3 = new Web3(RINKEBY_PROVIDER_URL)
const { IERC165 } = require("./src/contracts")
const { 
    ETH, ERC20, ERC721, ERC1155,
    TYPE_ERC20, TYPE_ERC721, TYPE_ERC1155
} = require("./src/constants")

async function registerAsset(web3, ercType, contractAddress, symbol){
    // 토큰 Contract의 타입을 확인하고 DB에 등록한다.
    async function _checkSupports(contract, arrINTFs){
        var doesSupport = false
        for (var i=0; i<arrINTFs.length; i++){
            doesSupport = await contract.methods.supportsInterface(arrINTFs[i]).call()
            if (!doesSupport) break
        }
        return doesSupport
    }

    async function _registerAsset(type, typeMV, address) {
        const netId = await web3.eth.net.getId()
        // console.log(typeMV, address, netId)
        // 0x73ad2146 0x6F2D99bE15a3D19a31F2C10a5768dAfD8834E21f 4
        // TODO: 이거 어디에 구현할지 정하기
        await api.registerTokenContract(type, typeMV, netId, address, symbol)
    }

    const contract = new web3.eth.Contract(IERC165.abi, contractAddress);
    // check supportsInterface with magic values
    // ERC721
    /*
     *     bytes4(keccak256('balanceOf(address)')) == 0x70a08231
     *     bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
     *     bytes4(keccak256('approve(address,uint256)')) == 0x095ea7b3
     *     bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
     *     bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
     *     bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c5
     *     bytes4(keccak256('transferFrom(address,address,uint256)')) == 0x23b872dd
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256)')) == 0x42842e0e
     *     bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) == 0xb88d4fde
     *
     *     => 0x70a08231 ^ 0x6352211e ^ 0x095ea7b3 ^ 0x081812fc ^
     *        0xa22cb465 ^ 0xe985e9c ^ 0x23b872dd ^ 0x42842e0e ^ 0xb88d4fde == 0x80ac58cd
     */
    // bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    /*
     *     bytes4(keccak256('name()')) == 0x06fdde03
     *     bytes4(keccak256('symbol()')) == 0x95d89b41
     *     bytes4(keccak256('tokenURI(uint256)')) == 0xc87b56dd
     *
     *     => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd == 0x5b5e139f
     */
    // bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;
    /*
     *     bytes4(keccak256('totalSupply()')) == 0x18160ddd
     *     bytes4(keccak256('tokenOfOwnerByIndex(address,uint256)')) == 0x2f745c59
     *     bytes4(keccak256('tokenByIndex(uint256)')) == 0x4f6ccce7
     *
     *     => 0x18160ddd ^ 0x2f745c59 ^ 0x4f6ccce7 == 0x780e9d63
     */
    // bytes4 private constant _INTERFACE_ID_ERC721_ENUMERABLE = 0x780e9d63;
    const erc721ID = '0x80ac58cd'
    const erc721MetadataID = '0x5b5e139f'
    const erc721EnumID = '0x780e9d63'

    // bytes4 private constant ERC1155_ERC165_TOKENRECEIVER = '0x4e2312e0';  // ERC-165 identifier for the `ERC1155TokenReceiver` support (i.e. `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)")) ^ bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`).
    // bytes4 private constant ERC1155_ACCEPTED = '0xf23a6e61';              // Return value from `onERC1155Received` call if a contract accepts receipt (i.e `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`).
    // bytes4 private constant ERC1155_BATCH_ACCEPTED = '0xbc197c81';        // Return value from `onERC1155BatchReceived` call if a contract accepts receipt (i.e `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`).
    // bytes4 private constant ERC1155_ERC165 = '0xd9b67a26'; // ERC-165 identifier for the main token standard. https://gist.github.com/arefaslani/6394681d9bb63c26d8903f259af0803b#file-erc1155-sol-L43
    const erc1155ID = '0xd9b67a26'
    const erc1155TokenReceiverID = '0x4e2312e0'
    const erc1155BatchAcceptedID = '0xbc197c81'

    // check erc20
    const erc20ID = ''

    if (ercType == 721){
        const arrINTFs = [erc721ID, erc721MetadataID, erc721EnumID]
        var doesSupport = _checkSupports(contract, arrINTFs)
        if (doesSupport){
            await _registerAsset(TYPE_ERC721, ERC721, contractAddress)
            return true
        }
    }else if (ercType == 1155){
        const arrINTFs = [erc1155ID, erc1155BatchAcceptedID, erc1155TokenReceiverID]
        var doesSupport = _checkSupports(contract, arrINTFs)
        if (doesSupport){
            await _registerAsset(TYPE_ERC1155, ERC1155, contractAddress)
            return true
        }
    }else if (ercType == 20){ 
        // ERC20을 어떻게 해야 하지?
        // ERC20은 거래소에 올라와 있는거 확인하고 직접 등록하는 게 좋을 듯
        await _registerAsset(TYPE_ERC20, ERC20, contractAddress)
    }

    return false
}

async function main(){
    // txHash = '0x44368c003eb23f106b8e8875e2e5a0fbf0bb8c8f547cffdcfd4bd9ca4c25ff41'
    
    // const ret = await registerAsset(web3, 721, '0x6F2D99bE15a3D19a31F2C10a5768dAfD8834E21f', 'MNT')
    // console.log('ret::', ret)

    
}
main()


// ERC721 - event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    //     event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    //     event ApprovalForAll(address indexed owner, address indexed operator, bool approved);


