const fetch = require('isomorphic-unfetch');
const queryString = require('query-string');

const { decAsset } = require("./utils/utils")
const { ZERO_ADDRESS } = require("./constants")


class ParulaAPI {
    constructor(config, logger){
        this.web3 = config.web3
        this.logger = logger;
        
        this.apiOrderUrl = config.apiOrderUrl
        this.apiBidUrl = config.apiBidUrl
    }

    async getSellOrder(query){
      const apiUrl = `${this.apiOrderUrl}/order/${query.id}`
      const _sellOrder = await this.get(apiUrl)
      
      const order = JSON.parse(_sellOrder.order_rawdata).message
      const signature = _sellOrder.order_signature
      return {order, signature}
    }

    async getAuctionOrder(query,){
      const apiUrl = `${this.apiOrderUrl}/order/${query.id}`
      const _sellOrder = await this.get(apiUrl)
      
      let order;
      let signature;
      if(_sellOrder.order_rawdata){
        order = JSON.parse(_sellOrder.order_rawdata).message
        signature = _sellOrder.order_signature;

      }else{ 
        // 즉시구매 안되는 auction order의 경우 order_rawdata 없음
        //   그래서 필요한 것들 만들어서 반환해준다
        const assetData = this._encAssetData(_sellOrder.maTypeMV, _sellOrder.maContAddr, _sellOrder.maTokenId)
        order = {
          maker: _sellOrder.order_wallet,
          makeAsset: Asset(_sellOrder.maTypeMV, assetData, 1) 
        }
        signature = ''
      }
      return {order, signature, immediate_buyable:_sellOrder.immediate_buyable}
    }

    async getBidOrder(query){
      const apiUrl = `${this.apiBidUrl}/bid/${query.id}`
      const _sellOrder = await this.get(apiUrl)
      
      const order = JSON.parse(_sellOrder.order_rawdata).message
      const signature = _sellOrder.order_signature
      return {order, signature}
    }

    async getOfferOrder(query){
      const apiUrl = `${this.apiOrderUrl}/order/${query.id}` // offerOrder 어떤 테이블에 저장되느냐에 따라 url 바뀔 수 있음
      const _sellOrder = await this.get(apiUrl)
      
      const order = JSON.parse(_sellOrder.order_rawdata).message
      const signature = _sellOrder.order_signature
      return {order, signature}
    }

    /**
     * Get JSON data from API, sending auth token in headers
     * @param apiPath Path to URL endpoint under API
     * @param query Data to send. Will be stringified using QueryString
     */
    async get(apiPath, query = {}){
        if(apiPath.startsWith('undefined')){  // for test only
          var _a = apiPath.split('/')
          var id = _a[_a.length-1]
          const _sellOrder = require(`../test/parula/sample_sell_order_${id}.json`)

          const order_rawdata = JSON.stringify(_sellOrder.data)
          const asset = decAsset(this.web3, _sellOrder.order.makeAsset) // {typeMV, contractAddress, tokenId, value}

          return { // 로컬에서는 파일로 테스트하니까, 파일을 읽어서 API 호출 결과와 비슷하게 만들어서 반환해준다.
            order_rawdata, 
            order_signature:_sellOrder.signature,
            maTypeMV: asset.typeMV, 
            maContAddr: asset.contractAddress, 
            maTokenId: asset.tokenId, 
            maValue: asset.value
          }
        }
        const qs = queryString.stringify(query)
        const url = `${apiPath}?${qs}`

        const response = await this._fetch(url)
        return response.json()
    }

    async _fetch(apiUrl, opts={}){
        const apiKey = this.apiKey
        const finalOpts = {
            ...opts,
            headers: {
                // ...(apiKey ? { 'X-API-KEY': apiKey } : {}),
                ...(opts.headers || {}),
            }
        }

        this.logger(`Sending request: ${apiUrl} ${JSON.stringify(finalOpts).substr(0, 100)}...`)

        return fetch(apiUrl, finalOpts).then(async res => this._handleApiResponse(res))
    }

    async _handleApiResponse(response) {
        if (response.ok) {
          this.logger(`Got success: ${response.status}`)
          return response
        }
    
        let result
        let errorMessage
        try {
          result = await response.text()
          result = JSON.parse(result)
        } catch {
          // Result will be undefined or text
        }
    
        this.logger(`Got error ${response.status}: ${JSON.stringify(result)}`)
    
        switch (response.status) {
          case 400:
            errorMessage = result && result.errors
              ? result.errors.join(', ')
              : `Invalid request: ${JSON.stringify(result)}`
            break
          case 401:
          case 403:
            errorMessage = `Unauthorized. Full message was '${JSON.stringify(result)}'`
            break
          case 404:
            errorMessage = `Not found. Full message was '${JSON.stringify(result)}'`
            break
          case 500:
            errorMessage = `Internal server error. OpenSea has been alerted, but if the problem persists please contact us via Discord: https://discord.gg/ga8EJbv - full message was ${JSON.stringify(result)}`
            break
          case 503:
            errorMessage = `Service unavailable. Please try again in a few minutes. If the problem persists please contact us via Discord: https://discord.gg/ga8EJbv - full message was ${JSON.stringify(result)}`
            break
          default:
            errorMessage = `Message: ${JSON.stringify(result)}`
            break
        }
    
        throw new Error(`API Error ${response.status}: ${errorMessage}`)
      }

      _encAssetData(typeMV, contractAddress, value){
        let assetData
        if (typeMV==ETH){
            // assetData = "0x" //ZERO_ADDRESS
            assetData = enc(this.web3, ZERO_ADDRESS)
        }else if (typeMV==ERC20){
            assetData = enc(this.web3, contractAddress)
        }else if (typeMV==ERC721 || typeMV==ERC1155){
            assetData = enc(this.web3, contractAddress, value)
        }else {
            console.trace()
            throw `unknown type magic-value (${typeMV})`
        }
        return assetData
    }
}
function _throwOrContinue(error, retries) {
    const isUnavailable = !!error.message && (
    error.message.includes('503') ||
    error.message.includes('429')
    )
    if (retries <= 0 || !isUnavailable) {
    throw error
    }
}

module.exports = { ParulaAPI }