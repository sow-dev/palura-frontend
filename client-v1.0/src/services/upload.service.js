import axios from 'axios'

export default {

    media(file, account, info, reader){
        const self = this;
        return new Promise((resolve, reject)=>{
            self.api().post('/upload/media', JSON.stringify({
            "name": file.name,
            "type": file.type,
            "account": account,
            "mediainfo": info,
            "path": file.path,
        }))
        .then(function (res) {
            // console.log(res);
            // console.log('url ===>', res.data.uploadURL)

            // console.log("file.name 1:::",file.name)
            // file.name = res.data.name;
            // console.log("file.name 2:::",file.name)
            var options = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'HEAD,GET,PUT,POST,DELETE',
                    'x-amz-acl': 'public-read',
                }
            };
            console.log('res:', res)
            console.log('url:', res.data.uploadUrl)
            console.log(res.data.path)
            //var myFile = reader.result;
            //const myNewFile = new File([myFile], .v4(), { type: myFile.type });
            self.api().put(res.data.uploadUrl, reader.result, options)
                .then(function (uploaded) {
                    console.log(uploaded);

                    if (uploaded.status == 200) {
                        console.log('exec media upload  step 003')
                        // alert('upload complete !!')
                        // $('#loading_circle').hide()
                        console.log("글 글글"+JSON.stringify(res.data))
                        resolve(res.data);
                    }
                })
                .catch(function (err) {
                    console.log('error >>>>>>>>>>>>>')
                    console.log(err);
                    reject(err)
                });
        })
        .catch(function (err) {
            console.log(err);
            reject(err)
        });

        });
        
  },

//api()
  api() {
    return axios.create({
      baseURL: process.env.VUE_APP_UPLOAD_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}

