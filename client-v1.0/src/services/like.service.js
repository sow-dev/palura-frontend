import axios from 'axios'

export default {
  like(target_type, target_id, user_id) {
    console.log('like target_type'+target_type+'target_id'+ target_id +'user_id'+user_id)
    return this.api().post(`/like`,{  
        "target_type": target_type,
        "target_id": target_id,
        "user_id": user_id
      })
  },
  
  dislike(target_type, target_id, user_id){
    console.log('dislike target_type'+target_type+'target_id'+ target_id +'user_id'+user_id)
    return this.api().post(`/dislike`,{
            "target_type":target_type,
            "target_id":target_id,
            "user_id":user_id
        })
  },

  doeslike(target_type, target_id, user_id){
    return this.api().get(`/doeslike?target_type=${target_type}&target_id=${target_id}&user_id=${user_id}`)
  },

  getlikeInfo(user_id, page){
    return this.api().get(`/like/product/${user_id}/${page}`)
  },
   getlikeInfoOrder(user_id, page) {
    return this.api().get(`/like/order/${user_id}/${page}`)
  },

  api() {
    return axios.create({
      baseURL: process.env.VUE_APP_LIKE_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}