// import axios from 'axios'

// export default {
// //post
//   create(blockchain_id, type, name, symbol, address, fee, version, options, enable) {
//     return this.api().post(`/insert`, {"blockchain_id":blockchain_id, "type":type, "name":name, "symbol":symbol, "address":address, "fee":fee, "version":version, "options":options, "enable":enable} )
//   },
//   list() {
//     return this.api().get(`/list/`)
//   },
//   get(id) {
//     return this.api().get(`/getbyid/${id}`)
//   },
//   update(blockchain_id, type, name, symbol, address, fee, version, options, enable, id) {
//     return this.api().put(`/update/${id}`, {"blockchain_id":blockchain_id, "type":type, "name":name, "symbol":symbol, "address":address, "fee":fee, "version":version, "options":options, "enable":enable})
//   },
//   enable(id, enable) {
//     return this.api().put(`/enable/${id}/${enable}`)
//   },
//   delete(order_id) {
//      return this.api().delete(`/delbyid/${order_id}`)
//   },
  
// //api()
//   api() {
//     return axios.create({
//       baseURL: `https://qnfai5cxwh.execute-api.ap-northeast-2.amazonaws.com/dev/v1/contract`,
//       withCredentials: false,
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//   },
 
// }