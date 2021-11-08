import axios from 'axios'
// import { metadata } from 'core-js/fn/reflect'

export default {
//post
  insert(name, description, amount, royalties, asset_id,token_id,
    image, thumbnail, collection_id, contract_type,
    state, creator, owner, content_media_id,
    metadata_version, metadata, metadata_hist_id, metadata_url) {
    return this.api().post(`/product/insert`,{
        "name":name, 
        "description":description, 
        "amount":amount,
        "royalties":royalties,
        "asset_id":asset_id,
        "token_id":token_id,
        "image":image, 
        "thumbnail":thumbnail,
        "collection_id":collection_id, 
        "contract_type":contract_type, 
        "state":state, 
        "creator":creator,
        "owner":owner,
        "content_media_id":content_media_id,
        "metadata":metadata,
        "metadata_version":metadata_version,
        "metadata_hist_id":metadata_hist_id,
        "metadata_url":metadata_url
        })
  },
  update(name, description, amount, royalties, asset_id,token_id,
    image, thumbnail, collection_id, contract_type,
    state, creator, owner, content_media_id,
    metadata_version, metadata, metadata_hist_id, metadata_url,
    id) {
    return this.api().put(`/product/update/${id}`,{
        "name":name, 
        "description":description, 
        "amount":amount,
        "royalties":royalties,
        "asset_id":asset_id,
        "token_id":token_id,
        "image":image, 
        "thumbnail":thumbnail,
        "collection_id":collection_id, 
        "contract_type":contract_type, 
        "state":state, 
        "creator":creator,
        "owner":owner,
        "metadata":metadata,
        "content_media_id":content_media_id,
        "metadata_version":metadata_version,
        "metadata_hist_id":metadata_hist_id,
        "metadata_url":metadata_url, 
        })
  },
//get
  list() {
    return this.api().get(`/product/list`)
  },
  productGet(id) {
    return this.api().get(`/product/getbyid/${id}`)
  },
  productJoinAsset(id) {
    return this.api().get(`/product/assetById/${id}`)
  },

  delbyid(id) {
    return this.api().delete(`/product/delbyid/${id}`)
  },  
  getHistory(id) {
    return this.api().get(`/product/${id}/history`)
  },

  

//api()
  api() {
    return axios.create({
      baseURL: process.env.VUE_APP_PRODUCT_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:8080'
      }
    })
  },
 
}