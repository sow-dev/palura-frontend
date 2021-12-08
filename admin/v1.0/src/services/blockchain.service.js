import axios from 'axios'

export default {
//post
  create(chain_id, name, short_name, chain, network_id, network, currency_name, currency_symbol, currency_decimals, icon_thumbnail, explorer_url, info_url, enable) {
    return this.api().post(`/chain`,{"chain_id":chain_id, "name":name, "short_name":short_name, "chain":chain, "network_id":network_id, "network":network,
     "currency_name":currency_name, "currency_symbol":currency_symbol, "currency_decimals":currency_decimals, "icon_thumbnail":icon_thumbnail, "explorer_url":explorer_url, 
     "info_url":info_url, "enable":enable} )
  },
  list() {
    return this.api().get(`/chain/list`)
  },
  get(id) {
    return this.api().get(`/chain/${id}`)
  },
  update(chain_id, name, short_name, chain, network_id, network, currency_name, currency_symbol, currency_decimals, icon_thumbnail, explorer_url, info_url, enable, id) {
    return this.api().put(`/chain/update/${id}`, {"chain_id":chain_id, "name":name, "short_name":short_name, "chain":chain, "network_id":network_id, "network":network,
    "currency_name":currency_name, "currency_symbol":currency_symbol, "currency_decimals":currency_decimals, "icon_thumbnail":icon_thumbnail, "explorer_url":explorer_url, 
    "info_url":info_url, "enable":enable} )
  },
  enable(id, enable) {
    return this.api().put(`/chain/enable/${id}/${enable}`)
  },
  delete(order_id) {
     return this.api().delete(`/chain/delbyid/${order_id}`)
  },
  
//api()
  api() {
    return axios.create({
      // baseURL: `https://qnfai5cxwh.execute-api.ap-northeast-2.amazonaws.com/dev/v1/chain`,
      baseURL: process.env.VUE_APP_BLOCKCHAIN_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
 
}