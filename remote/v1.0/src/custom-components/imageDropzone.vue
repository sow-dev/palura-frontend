<template>

<vue-dropzone
    :awss3="awss3"
    v-on:vdropzone-s3-upload-error="s3UploadError"
    v-on:vdropzone-s3-upload-success="s3UploadSuccess"
    >
</vue-dropzone>


    <!-- 
<div>
<input type="file"  @change="onHandleChange" placeholder="" />
</div>     -->
</template>

<script>

import UploadService from '../services/upload.service.js'

export default {
    data: function () {
        return {
            awss3: {
                signingURL: 'http://aws-direct-s3.dev/',
                headers: {},
                params: {},
                sendFileToServer: true,
                withCredentials: false
            },
        }
    },
    created: function () {
        
    },
    computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  },
    props: ["modelValue:String", "address"],
    emits:['update:modelValue', 'options'],
    methods: {
        onHandleChange(event) {
            // console.log('event.target.files', event.target.files);
            //   console.log("MediaInfo:::", MediaInfo)
            //   console.log('file received', file);
            const file = event.target.files[0]

            MediaInfo({
                format: 'JSON'
            }, mediaInfo => {
                if (file) {
                    const reader = new FileReader();
                    const getSize = () => file.size;
                    const readChunk = (chunkSize, offset) =>
                        new Promise((resolve, reject) => {

                            reader.onload = (event) => {
                                if (event.target.error) {
                                    reject(event.target.error);
                                }
                                resolve(new Uint8Array(event.target.result));
                            }
                            reader.readAsArrayBuffer(file.slice(offset, offset + file.size));
                        })

                    mediaInfo.analyzeData(getSize, readChunk)
                        .then((info) => {
                            // this.$refs.ta.value = JSON.stringify(result, null, 2);
                            console.log('result:::', info)
                            console.log("address !!!!!!", this.address)
                            UploadService.media(file, this.address, info, reader).then(res => {
                                console.log('uploaded !!! :',res)
                                const imgPath = "https://parular-contents.s3.ap-northeast-2.amazonaws.com/" + res.path;
                                // this.$emit('changed', imgPath)
                                this.inputVal =imgPath
                                this.$emit('uploaded', {
                                    id:res.id,
                                    name:res.name,
                                    path:imgPath,
                                    done:true
                                })
                            })
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        }
    }
}
</script>