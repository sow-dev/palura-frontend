<template>
 <!-- <h1>EDIT PROFILE</h1> -->
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed inset-0 overflow-hidden z-50" @close="open = false">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="relative w-screen max-w-md">
              <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                  <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                    <span class="sr-only">Close panel</span>
                    <!-- <XIcon class="h-6 w-6" aria-hidden="true" /> -->
                    <div class="h-6 w-6" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd" />
                        </svg>
                    </div>
                  </button>
                </div>
              </TransitionChild>
              <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div class="px-4 sm:px-6">
                  <DialogTitle class="text-lg font-medium text-gray-900">
                    EDIT PROFILE
                  </DialogTitle>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <form onsubmit="return false;">
                        <div class="input mt-10">
                            <p class="profile_title">Name </p>
                            <p class="profile_content">{{userInfos.name}}</p>
                            <hr class="profile_underLine">
                            <p class="profile_title">Email </p>
                            <p class="profile_content">{{userInfos.mail}}</p>
                            <hr class="profile_underLine">
                            <p class="profile_title">URL </p>
                            <input class="profile_content" type="text" placeholder="url" v-model="mail">
                            <hr class="profile_underLine">
                            <p class="profile_title">SNS </p>
                            <input class="profile_content" type="text" placeholder="SNS" v-model="properties">
                            <hr class="profile_underLine">

                            <button style=" width:135px; height:32px; border:1px solid #000; margin-top:7%;" @click="onEdit()">Edit</button>
                        </div>
                    </form> 
                    
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot> 

</template>

<script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

import UserService from '../../../services/user.service'

export default {
    components:{
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    },
    setup() {
        const open = ref(false)
        return {
            open,
        }
    },
    props:{
        userInfos:Object,
    },
    create: function() {
        console.log("asdfkjahsdfkjhasldkfj",userInfos)
    },
    computed () {
        this.pen_name = this.userInfos.pen_name;
        this.avatar = this.userInfos.avatar;
        this.mail = this.userInfos.mail;
        // this.mail_1 = this.userInfos.mail_1;
        this.properties = this.userInfos.properties;
        // this.tag = this.userInfos.tag;
    },
    data:function(){
            return{
               ds:[],
               pen_name : '',
               avatar : '',
               mail : '',
               mail_1 : '',
               properties : '',
               tag : ''
            }
        },
    methods: {
        show(){
            this.open = true;
        },
        closeButton: function(){
            this.$emit("nonViewPop");
        },
        onEdit: function(){
            // console.log("onEdit 실행 !!", this.userInfos.nickname)
           
            // if(this.mail == undefined) {
            //     this.mail = this.userInfos.mail
            // }
            
            if(this.properties == undefined) {
                this.properties = this.userInfos.properties
            }
            if(this.mail_1 == undefined) {
                this.mail_1 = this.userInfos.mail_1
            }
            // if(this.tag == undefined) {
            //     this.tag = this.userInfos.tag
            // }

            console.log('this.mail_1',this.mail_1)
            console.log('this.properties',this.properties)
            UserService.update(this.userInfos.nickname, this.userInfos.mail, this.properties, this.mail_1).then(res=>{
                console.log(res)
                console.log('프로필 수정완료!')
                alert('수정완료')
            }).catch(e=>{
                console.log("user update 오류::::", e)
            })
        },

        
    }
}
</script>

<style scoped> 
    .profile_title {
      font-weight: bold;
      margin-bottom: 2%;
    }
    .profile_ontent {
       margin-bottom: 1%;  
    }
    .profile_underLine {
        border-color: black;
        margin-bottom:4%;
        width: 90%;
    }
    
</style>