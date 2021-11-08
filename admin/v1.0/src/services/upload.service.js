import axios from "axios";

export default {
  media(file, owner_nickname, sub_bucket, info, reader) {
    console.log('reader ::', reader)
    const self = this;
    return new Promise((resolve, reject) => {
      self
        .api(null)
        .post(
          "/upload/media",
          JSON.stringify({
            name: file.name,
            type: file.type,
            owner_nickname: owner_nickname,
            sub_bucket: sub_bucket,
            mediainfo: info,
            path: file.path,
          })
        )
        .then(function (res) {
          console.log("upload service res ==>", res);

          var options = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "HEAD,GET,PUT,POST,DELETE",
              "x-amz-acl": "public-read",
            },
          };

          const uploadUrl1 = res.data.uploadUrl;
          const result1 = reader.result;

          self
            .api(file.type)
            .put(uploadUrl1, result1, options)
            .then(function (uploaded) {
              console.log("self.api.put uploaded ==> ", uploaded);

              if (uploaded.status == 200) {
                console.log("exec media upload  step 003");
                console.log(
                  "JSON.stringify(res.data) ==> " + JSON.stringify(res.data)
                );
                resolve(res.data);
              }
            })
            .catch(function (err) {
              console.log("error >>>>>>>>>>>>>");
              console.log(err);
              reject(err);
            });
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },

  updateSate(id) {
    console.log("updateState id ==> ", id);
    return this.api(null).put(`/upload/${id}`, {
      id: id
    });
  },

  //api()
  api(filetype) {
    if (filetype) {
      console.log("filetype is not null==> ", filetype);
      return axios.create({
        baseURL: process.env.VUE_APP_UPLOAD_URL,
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": filetype,
        },
      });
    } else {
      console.log("filetype is null==> ", filetype);
      return axios.create({
        baseURL: process.env.VUE_APP_UPLOAD_URL,
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  },
};