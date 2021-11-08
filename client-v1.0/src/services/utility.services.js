import axios from 'axios'

export default {
  
  pricing(address) {
    return this.api().get(`/pricing`)
  },

  api() {
    return axios.create({
      //  baseURL: `https://lakjhu8f9j.execute-api.ap-northeast-2.amazonaws.com/dev/v1/wallet`,
      baseURL: process.env.VUE_APP_UTIL_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
 
}