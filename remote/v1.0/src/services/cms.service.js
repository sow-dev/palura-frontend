import axios from 'axios'

export default {
//post
  create(type, code, content) {
    console.log("!!!!!")
    return this.api().post(`/cms/create`, {"type":type, "code":code, "content":content} )
  },
  get(id) {
    return this.api().get(`/cms/get/${id}`)
  },
  getTypeNcode(type, code) {
    return this.api().get(`/cms/typeCode/${type}/${code}`)
  },
  update(type, code, content, id) {
    return this.api().put(`/cms/update/${id}`,  {"type":type, "code":code, "content":content} )
  },
  updateTypeCode(type, code) {
    return this.api().put(`/cms/updateByTypeCode/${type}/${code}`, {"type":type, "code":code, "content":content} )
  },
  delete(id) {
     return this.api().delete(`/cms/delete/${id}`)
  },
  api() {
    return axios.create({
      // baseURL: `https://k8wkhj8db9.execute-api.ap-northeast-2.amazonaws.com/dev/v1/cms`,
      baseURL: process.env.VUE_APP_CMS_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
}//k8wkhj8db9.execute-api.ap-northeast-2.amazonaws.com/dev/v1/cms/get/