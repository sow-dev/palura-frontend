import axios from 'axios'

export default {
//post
  insert(brand_id, group_id, bundle_name, description, images, symbol, collection_url) {
    return this.api().post(`/insert`,{
        "brand_id":brand_id, 
        "group_id":group_id, 
        "bundle_name":bundle_name, 
        "description":description, 
        "images":images, 
        "symbol":symbol, 
        "collection_url":collection_url
        })
  },
//get
  list() {
    return this.api().get(`/list/`)
  },


//api()
  api() {
    return axios.create({
      baseURL:` https://hyhgsx0svh.execute-api.ap-northeast-2.amazonaws.com/dev/v1/bundle`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}