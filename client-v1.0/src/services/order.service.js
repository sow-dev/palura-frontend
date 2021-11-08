import axios from 'axios'

export default {
//post 
  insert(content_type,
         content_id, 
         title, 
         description, 
         image, 
         thumbnail, 
         tag, 
         chain_id,
         asset_id, 
         order_rawdata,
         order_signature,
         order_wallet, 
         contract_id, 
         order_type, 
         price_fixed, 
         price_begin, 
         immediate_buyable, 
         immediate_price, 
         is_reserve,
         reserve_price, 
         has_tax, 
         tax_ratio, 
         has_donate, 
         donate_ratio, 
         fee_exchange, 
         fee_creator, 
         order_state, 
         seller,
         ) 
        {
    return this.api().post(`/order/insert`,{
               "content_type":content_type,
                "content_id":content_id,
                "title":title,
                "description":description,
                // "image":image,
                "image":image,
                "thumbnail":thumbnail,
                "tag":tag,
                "chain_id":chain_id,
                "asset_id":asset_id,
                "order_rawdata":order_rawdata,
                "order_signature":order_signature,
                "order_wallet":order_wallet,
                "contract_id":contract_id,
                "order_type":order_type,
                "price_fixed":price_fixed,
                "price_begin":price_begin,
                "immediate_buyable":immediate_buyable,
                "immediate_price":immediate_price,
                "is_reserve":is_reserve,
                "reserve_price":reserve_price,
                "has_tax":has_tax,
                "tax_ratio":tax_ratio,
                "has_donate":has_donate,
                "donate_ratio":donate_ratio,
                "fee_exchange":fee_exchange,
                "fee_creator":fee_creator,
                "order_state":order_state,
                "seller":seller,
        })
  },
//get
  list() {
    return this.api().get(`/order/list`)
  },
  dsplist() {
    return this.api().get('/order/display/list?page=1&pageSize=1000&sortBy=newest&ignoreEndDate=true')
  },

  dsplistOldest() {
    return this.api().get('/order/display/list?page=1&pageSize=1000&sortBy=oldest')
  },
  dsplistLowestPrice() {
    return this.api().get('/order/display/list?page=1&pageSize=1000&sortBy=lowestPrice')
  },
  dsplistHighestPrice() {
    return this.api().get('/order/display/list?page=1&pageSize=1000&sortBy=highestPrice')
  },
  dsplistRecentlyPrice() {
    return this.api().get('/order/display/list?page=1&pageSize=1000&sortBy=recentlyActive')
  },
  dsplistAuctionOnly() {
    return this.api().get('/order/display/list?page=1&pageSize=1000&filterBy=auctionOnly')
  },
  dsplistFixedPriceOnly () {
    return this.api().get('/order/display/list?page=1&pageSize=1000&filterBy=fixedPriceOnly ')
  },
  dsplistCreator(creator_id) {
    return this.api().get(`/order/display/list?creator=${creator_id}`)
  },
  dsplistMostPopular () {
    return this.api().get('/order/display/list?page=1&pageSize=1000&sortBy=mostPopular ')
  },
  dsplistassetTypeBy (res) {
    return this.api().get(`/order/display/list?page=1&pageSize=1000&assetTypeBy=${res}`)
  },
  dsplistassetSymbolBy (res) {
    return this.api().get(`/order/display/list?page=1&pageSize=1000&assetSymbolBy=${res}`)
  },
  dsplistSearch (res) {
    return this.api().get(`/order/display/list?page=1&pageSize=1000&search=${res}`)
  },
  dsplistgenesisPriceOnly () {
    return this.api().get('/order/display/list?page=1&pageSize=1000&filterBy=genesisPriceOnly')
  },
  dsplistmintBefore (res) {
    return this.api().get(`/order/display/list?page=1&pageSize=1000&mintBefore=${res}`)
  },
  dsplistmintAfter (res) {
    return this.api().get(`/order/display/list?page=1&pageSize=1000&mintAfter=${res}`)
  },
  dsplistEndingSoon () {
    return this.api().get('/order/display/list?page=1&pageSize=1000&sortBy=endingSoon ')
  },
  dsplistStateBy(res) {
    return this.api().get(`/order/display/list?page=1&pageSize=1000&sortBy=newest&stateBy=${res}`)
  },
  getbyid(id) {
    return this.api().get(`/order/getbyid/${id}`)
  },
  detailbyid(id){
    return this.api().get(`/order/${id}`)
  },
  orderSold(buyer_id, sold_price, sold_price_usd,sold_price_native, fromWallet, toWallet,id) {
    return this.api().put(`/order/${id}/sold`,{
      "buyer_id":buyer_id,
      "sold_price":sold_price,
      "sold_price_usd":sold_price_usd, 
      "sold_price_native":sold_price_native,
      "fromWallet":fromWallet,
      "toWallet":toWallet
    })
  }, 

//api()
  api() {
    return axios.create({
      // baseURL: 'https://sceexjxuyl.execute-api.ap-northeast-2.amazonaws.com/staging/v1/order',
      baseURL:process.env.VUE_APP_ORDER_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
 
}