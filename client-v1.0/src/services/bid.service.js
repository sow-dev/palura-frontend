import axios from 'axios'

export default {
  create(order_id, bidder_id, order_rawdata, order_signature,order_wallet,asset_id,price) {
    const pram = {
      "order_id":order_id,
      "bidder_id":bidder_id,
      "order_rawdata": order_rawdata,
      "order_signature": order_signature,
      "order_wallet": order_wallet,
      "asset_id": asset_id,
      "price": price
    }
    return this.api().post(`/bid`,pram)
  },

  getBidInfoById(bidder_id) {
    return this.api().get(`/bid?bidder_id=${bidder_id}`)
  },

  getUserList(order_id) {
    return this.api().get(`/bid/withuser/${order_id}`)
  },
  

  api() {
    return axios.create({
      baseURL: process.env.VUE_APP_BID_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}