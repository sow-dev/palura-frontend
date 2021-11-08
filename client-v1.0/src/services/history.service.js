import axios from 'axios'

export default {
  list(pageSize, target_type, target_id) { //user_id 빼고
    return this.api().get(`/history/list?pageSize=${pageSize}&target_type=${target_type}&target_id=${target_id}`)
  },

  listAll(page) {
    return this.api().get(`/history/list?page=${page}`)
  },

  sold(page) {
    return this.api().get(`/history/list?page=${page}&filterBy=sold`)
  },
  mint(page) {
    return this.api().get(`/history/list?page=${page}&filterBy=mint`)
  },
  // listed(page) {
  //   return this.api().get(`/list?page=${page}&filterBy=listed`)
  // },
  bid(page){
    return this.api().get(`/history/list?page=${page}&filterBy=bid`)
  },

  
  // https://7e2sp62vm8.execute-api.ap-northeast-2.amazonaws.com/dev/v1/history/list/1?&pageSize=100&target_type=product&target_id=61&page=1
  // dislike(target_type, target_id, user_id){
  //   console.log('dislike target_type'+target_type+'target_id'+ target_id +'user_id'+user_id)
  //   return this.api().post(`/dislike`,{
  //           "target_type":target_type,
  //           "target_id":target_id,
  //           "user_id":user_id
  //       })
  // },

  // doeslike(target_type, target_id, user_id){
  //   return this.api().get(`/doeslike?target_type=${target_type}&target_id=${target_id}&user_id=${user_id}`)
  // },

  api() {
    return axios.create({
      // baseURL: 'https://7e2sp62vm8.execute-api.ap-northeast-2.amazonaws.com/dev/v1/history',
      baseURL: process.env.VUE_APP_HISTORY_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}