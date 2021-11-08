const ethUtil = require('ethereumjs-util');

const EIP712 = require("./EIP712");
const { NULL_BLOCK_HASH, ETH } = require("../constants")

const txCallbacks = {}

/**
 * Promisify a callback-syntax web3 function
 * @param inner callback function that accepts a Web3 callback function and passes
 * it to the Web3 function
 */
async function promisify(inner) {
  return new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      console.log('promisi::', res)
      resolve(res)
    })
  )
}

exports.makeBigNumber = function(arg) {
    // Zero sometimes returned as 0x from contracts
    if (arg === '0x') {
      arg = 0
    }
    // fix "new BigNumber() number type has more than 15 significant digits"
    // arg = arg.toString()
    return new Web3.utils.BN(arg).toString()
}

exports.confirmTransaction = async (web3, txHash) => {
  return new Promise((resolve, reject) => {
    track(web3, txHash, (didSucceed) => {
      if (didSucceed) {
        resolve("Transaction complete!")
      } else {
        reject(new Error(`Transaction failed :( You might have already completed this action. See more on the mainnet at etherscan.io/tx/${txHash}`))
      }
    })
  })
}

const track = (web3, txHash, onFinalized) => {
  if (txCallbacks[txHash]) {
    txCallbacks[txHash].push(onFinalized)
  } else {
    txCallbacks[txHash] = [onFinalized]
    const poll = async () => {
      const tx = await web3.eth.getTransaction(txHash)

      if (tx && tx.blockHash && tx.blockHash !== NULL_BLOCK_HASH) {
        const receipt = await web3.eth.getTransactionReceipt(txHash)
        if (!receipt) {
          // Hack: assume success if no receipt
          console.warn('No receipt found for ', txHash)
        }

        const status = receipt.status
          // ? parseInt((receipt.status || "0").toString()) == 1
          // : true
        txCallbacks[txHash].map(f => f(status))
        delete txCallbacks[txHash]
      } else {
        console.warn('poll else')
        setTimeout(poll, 1000)
      }
    }
    poll().catch(err => {
      console.error('pollerr', err) // del
    })
  }
}

const Types = {
	AssetType: [
		{name: 'assetClass', type: 'bytes4'},
		{name: 'data', type: 'bytes'}
	],
	Asset: [
		{name: 'assetType', type: 'AssetType'},
		{name: 'value', type: 'uint256'}
	],
	Order: [
		{name: 'maker', type: 'address'},
		{name: 'makeAsset', type: 'Asset'},
		{name: 'taker', type: 'address'},
		{name: 'takeAsset', type: 'Asset'},
		{name: 'salt', type: 'uint256'},
		{name: 'start', type: 'uint256'},
		{name: 'end', type: 'uint256'},
		{name: 'dataType', type: 'bytes4'},
		{name: 'data', type: 'bytes'},
	]
};

const sign = async (web3, order, account, verifyingContract) => {
	const chainId = Number(await web3.eth.getChainId());
	const data = EIP712.createTypeData({
		name: "Exchange",
		version: "2",
		chainId,
		verifyingContract
	}, 'Order', order, Types);
  const ret = await EIP712.signTypedData(web3, account, data)
	return ret;
}

const DataTypeV1 = "tuple(tuple(address,uint96)[],tuple(address,uint96)[])"

exports.encDataV1 = (web3, tuple) => {
    return web3.eth.abi.encodeParameter(
        DataTypeV1, 
        tuple
    );
}

exports.id = (str) => {
	return `0x${ethUtil.keccak256(Buffer.from(str, "utf-8")).toString("hex").substring(0, 8)}`;
}

exports.enc = (web3, token, tokenId) => {
	if (tokenId) {
		return web3.eth.abi.encodeParameters(["address", "uint256"], [token, tokenId]);
	} else {
		return web3.eth.abi.encodeParameter("address", token);
	}
}

const dec = (web3, encoded)=>{
	if (encoded.length >= 67) {
    var _ret = web3.eth.abi.decodeParameters(["address", "uint256"], encoded);
		return {'contractAddress':_ret[0], 'tokenId':_ret[1]}
	} else {
		return {'contractAddress': web3.eth.abi.decodeParameter("address", encoded)};
	}
}

const decAsset = (web3, asset) => {
  const value = asset.value
  const typeMV = asset.assetType.assetClass
  let contractAddress, tokenId
  if (typeMV!=ETH){
    var decoded = dec(web3, asset.assetType.data)
    contractAddress = decoded.contractAddress
    tokenId = decoded.contractAddress
  }else{
    contractAddress = "0x"
    tokenId = 0
  }
  
  return {typeMV, contractAddress, tokenId, value}
}

exports.decAsset = decAsset

exports.decOrder = (web3, encOrder) => {
  const order = encOrder
  const maker = order.maker
  const { typeMV, contractAddress, value } = decAsset(web3, order.makeAsset)

  return {order, maker, maTypeMV:typeMV, maContractAddress:contractAddress, maValue:value}
}

const createTypedDataAndSignature = async (web3, exchange, order, signer) => {
  var netId = await web3.eth.net.getId()
  return await sign(web3, order, signer, exchange);
}

exports.createTypedDataAndSignature = createTypedDataAndSignature;

exports.recoverTypedSignature = async (data, signature) => {
  return EIP712.recoverTypedSignature(data, signature)
};

exports.makeContractInstance = (web3, netId, contractAbi, contractAddress=null)=> {
  const cAddress = contractAddress? contractAddress : contractAbi.networks[netId].address;
  return new web3.eth.Contract(contractAbi.abi, cAddress)
}