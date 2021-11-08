import axios from 'axios'

export default {
//post 여기선 사용안함
  create(name, nickname, mail, kyc, avata) {
    return this.api().post(`/user/create`,{
            "name":name,
            "nickname":nickname,
            "mail":mail,
            "kyc":kyc,
            "avata":avata,
        })
  },

  update( nickname, mail, properties, mail_1) {
    const param ={
            "nickname" : nickname,
            "mail" : mail,
            "properties" : properties,
            "mail_1" : mail_1
    }
    console.log('param',param)
    return this.api().put(`/user/${nickname}`, param)
  },

  listPaging(page, pageSize) {
    return this.api().get(`/user/list/${page}?pageSize=${pageSize}`)
  },

  list() {
    return this.api().get(`/user?creatorOnly=true`)
  },

  byAddress(address) {
    return this.api().get(`/user?byAddress=${address}`)
  },

  byId(id) {
    return this.api().get(`/user/byid/${id}`)
  },
  delete(id) {
       return this.api().delete(`/user/delete/${id}`)
  },

  likedProducts(userName) {
     return this.api().get(`/user/${userName}/liked-products`)
  },

  purchaseHistory(userName) {
    return this.api().get(`/user/${userName}/purchased`)
  },

  purchaseHistoryOldest(userName) {
    return this.api().get(`/user/${userName}/purchased?sortBy=oldest`)
  },
   purchaseHistoryNewest(userName) {
    return this.api().get(`/user/${userName}/purchased?sortBy=newest`)
  },

  bidHistoryNewest(userName) {
    return this.api().get(`/user/${userName}/bids?sortBy=newest`)
  },
   bidHistoryOldest(userName) {
    return this.api().get(`/user/${userName}/bids?sortBy=oldest`)
  },
  likedHistoryNewest(userName) {
    return this.api().get(`/user/${userName}/liked-products?sortBy=newest`)
  },
   likedHistoryOldest(userName) {
    return this.api().get(`/user/${userName}/liked-products?sortBy=oldest`)
  },

  

  api() {
    return axios.create({
      baseURL: process.env.VUE_APP_USER_URL,
      // baseURL: `https://umnx77e5m5.execute-api.ap-northeast-2.amazonaws.com/dev/v1/user`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
 
}