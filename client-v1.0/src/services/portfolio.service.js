import axios from 'axios'

export default {
  artworks(user_id) {
    return this.api().get(`/portfolio/list/${user_id}`)
  },

//api()
  api() {
    return axios.create({
      baseURL: process.env.VUE_APP_PORTFOLIO_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
 
}