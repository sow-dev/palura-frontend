import axios from 'axios'

export default {
  //post
  bidCreate(chain_id, order_id, product_id, asset_id, price, order_rawdata, order_signature, order_wallet, seller_id, decimal) {
    return this.api().post(`/bid`, {
      "chain_id": chain_id,
      "order_id": order_id,
      "product_id": product_id,
      "asset_id": asset_id,
      "price": price,
      "order_rawdata": order_rawdata,
      "order_signature": order_signature,
      "order_wallet": order_wallet,
      "seller_id": seller_id,
      "decimal": decimal

    })
  },
  listWithAsset(order_id) {
    return this.api().get(`/bid/withasset/${order_id}`)
  },
  beforeMatch(order_id, bid_id) {
    return this.api().put(`/bid/match/before/${order_id}/${bid_id}`)
  },
  afterMatch(order_id, bid_id, buyer_id, sold_price, sold_price_usd, sold_price_native) {
    const params = {
      "buyer_id": buyer_id,
      "sold_price": sold_price,
      "sold_price_usd": sold_price_usd,
      "sold_price_native": sold_price_native
    }
    return this.api().put(`/bid/match/after/${order_id}/${bid_id}`, params)
  },
  //delete
  bidDelete(order_id) {
    return this.api().delete(`/bid/deleteBid/${order_id}`)
  },

  //api()
  api() {
    return axios.create({
      // baseURL: `https://o5bzvdy8g9.execute-api.ap-northeast-2.amazonaws.com/dev/v1/bid`,
      baseURL: process.env.VUE_APP_BID_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },

}