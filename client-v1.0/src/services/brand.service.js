import axios from 'axios'

export default {
//post
  insert(brand_name, description, images) {
    return this.api().post(`/insert`,{
        "brand_name":brand_name,
        "description":description,
        "images": images
        })
  },
//get
  list() {
    return this.api().get(`/list/`)
  },


//api()
  api() {
    return axios.create({
      baseURL: `https://hyhgsx0svh.execute-api.ap-northeast-2.amazonaws.com/dev/v1/brand`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}