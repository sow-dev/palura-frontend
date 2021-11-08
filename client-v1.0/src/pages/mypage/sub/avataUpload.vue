<template>
<div class="">
    <div class="w-50 h-50 relative pb-20">
        <label class="mx-auto flex flex-col items-center w-max-64 h-max-64 mt-4 bg-gray text-blue relative rounded-full  shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <label class="w-9 h-9 bg-green-500 rounded-full absolute right-5 bottom-5"> </label>
         <img v-if="userInfo.avatar" class="rounded-full" :src="userInfo.avatar">
         <img v-else class="rounded-full" :src="pic">
         <!-- <div v-else class="w-52 h-52 rounded-full bg-gray-200"> </div> -->

         
        <input type='file' class="hidden" @change="onHandleChange" />
        </label>
         
        
</div>
</div>
<!-- 
<div class="flex w-full bg-grey-lighter">
    <label class="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
        <input type='file' class="hidden" @change="onHandleChange" />
    </label>
</div> -->
<!-- <div>
    <input type="file"  @change="onHandleChange" placeholder="" />
</div>     -->
</template>

<script>

import UploadService from '../../../services/upload.service.js'
import UserService from '../../../services/user.service.js'
import pic from '@/assets/img/mymape_user.png'

export default {
    data: function () {
        return {
            ds:[],
            pic:pic
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
    props: ["modelValue:String", "address", "userInfo"],
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
                                    done:true,
                                }),
                                this.$emit('update')
                            })
         
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                            UserService.update(this.userInfo.name, this.userInfo.nickname, this.userInfo.email, this.userInfo.kyc, this.userInfo.avatar, this.userInfo.user_id).then(res=>{
                                this.userInfo.avatar = this.inputVal
                                console.log("아바타 저장완료",res)
                            }).catch(e=>{

                            })
                }
            })
        },

    }
}
</script>