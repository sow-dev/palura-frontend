import axios from 'axios'

export default {
//post
  create(user_id, public_id, public_name, name, name_eng, description, avata_1, avata_1_min, avata_1_id, role, profile_id) {
    return this.api().post(`/user/create`,{
            "user_id":user_id,
            "public_id":public_id,
            "public_name":public_name,
            "name":name,
            "name_eng":name_eng,
            "description":description,
            "avata_1":avata_1,
            "avata_1_min":avata_1_min,
            "avata_1_id":avata_1_id,
            "role":role,
            "profile_id":profile_id

        })
  },
//get
  list() {
    return this.api().get(`/user/list/`)
  },

  getById(public_id) {
    return this.api().get(`/user/${public_id}`)
  },

//delete

  deleteCreator(id) {
     return this.api().delete(`/user/deleteCreator/${id}`)
  },
  
//api()
  api() {
    return axios.create({
      baseURL: process.env.VUE_APP_CREATOR_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
 
}