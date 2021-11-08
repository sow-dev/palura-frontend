<template>
  <div class="collector-main" >
      <!-- <transition name="bounce" >
      <ProfliePopup v-bind:isHiddens="isHidden" v-on:nonViewPop="nonShow" v-bind:userInfos="UserDatas" />
      </transition> -->
      <transition name="bounce2">
      <WalletSetting v-bind:isHiddens1="isHidden1" v-on:nonViewPop1="nonShow1" />
      </transition>

      <div class="w-full flex flex-col md:flex-row mx-auto justify-center items-center relative">
        <button class="absolute bottom-0 mx-auto py-1 w-2/5 border-2 border-parula-dark text-sm font-medium text-parula-dark bg-white hover:text-white hover:bg-gray-900"  v-on:click="onWalllet()">
            Wallet Setting
        </button>
        <avataUpload   v-model="UserDatas.avatar" :userInfo="UserDatas" v-on:uploaded="imageUploaded" >
            <!-- <img :src='UserDatas.avatar' class="w-full h-full" /> -->
        </avataUpload>

        <div class="w-full md:w-96 flex flex-col items-center justify-center mt-10 ">
            <div class="w-full md:max-w-xl	 flex flex-col justify-center pl-10 pr-20">
                <div class="ml-4 mr-auto ">
                    <p class="text-lg font-bold">{{UserDatas.nickname}}</p>
                    <p class="text-sm mt-4 mb-5 text-parula-gray-1">@{{UserDatas.name}}</p>
                </div>
                <hr class="border-parula-dark" />
                <div class="flex flex-row ml-4 mr-6 mt-6 justify-between">
                    <div class=" text-center text-lg font-semibold text-parula-gray-1" >
                        Collection
                        <p class="text-2xl text-black my-3 text-left">{{collectionCnt}}</p>
                    </div>
                    <div class=" text-center text-lg font-semibold text-parula-gray-1" >liked
                        <p class="text-2xl text-black my-3 text-left">{{likedCnt}}</p>
                    </div>
                </div>

                <div class="flex flex-col items-center space-y-1 m-3 ">
                    <!-- <div class="w-8 h-8 border-edit rounded-full" v-on:click="onWalllet()">
                            <svg class="mx-auto mt-2" width="16" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.4583 5.41667H11.9167V3.25C11.9167 3.10635 11.8596 2.96857 11.758 2.86699C11.6564 2.76541 11.5187 2.70834 11.375 2.70834H9.20833V1.08334C9.20833 0.939679 9.15127 0.801904 9.04968 0.700322C8.9481 0.59874 8.81033 0.541672 8.66667 0.541672H1.625C1.19417 0.542145 0.781118 0.713502 0.476474 1.01815C0.17183 1.32279 0.000473135 1.73584 0 2.16667V10.8333C0.000473135 11.2642 0.17183 11.6772 0.476474 11.9819C0.781118 12.2865 1.19417 12.4579 1.625 12.4583H11.375C11.5187 12.4583 11.6564 12.4013 11.758 12.2997C11.8596 12.1981 11.9167 12.0603 11.9167 11.9167V9.75H12.4583C12.602 9.75 12.7398 9.69293 12.8414 9.59135C12.9429 9.48977 13 9.35199 13 9.20833V5.95834C13 5.81468 12.9429 5.6769 12.8414 5.57532C12.7398 5.47374 12.602 5.41667 12.4583 5.41667ZM1.625 1.625H8.125V2.70834H1.625C1.48134 2.70834 1.34357 2.65127 1.24198 2.54969C1.1404 2.4481 1.08333 2.31033 1.08333 2.16667C1.08333 2.02301 1.1404 1.88524 1.24198 1.78366C1.34357 1.68207 1.48134 1.625 1.625 1.625ZM10.8333 11.375H1.625C1.4814 11.3748 1.34373 11.3177 1.24219 11.2161C1.14065 11.1146 1.08352 10.9769 1.08333 10.8333V3.69883C1.2583 3.7564 1.44085 3.78769 1.625 3.79167H10.8333V5.41667H10.2917C9.71703 5.41667 9.16593 5.64494 8.7596 6.05127C8.35327 6.4576 8.125 7.0087 8.125 7.58334C8.125 8.15797 8.35327 8.70907 8.7596 9.1154C9.16593 9.52173 9.71703 9.75 10.2917 9.75H10.8333V11.375ZM11.9167 8.66667H10.2917C10.0043 8.66667 9.7288 8.55253 9.52563 8.34937C9.32247 8.1462 9.20833 7.87065 9.20833 7.58334C9.20833 7.29602 9.32247 7.02047 9.52563 6.8173C9.7288 6.61414 10.0043 6.5 10.2917 6.5H11.9167V8.66667Z" fill="#262626"/>
                            </svg>
                    </div>
                    <div class="w-8 h-8 border-edit rounded-full"  @click="onProflie()">
                        <svg class="mx-auto mt-2" width="15" height="15" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.95801 0.0833282H2.24967C1.05313 0.0833282 0.0830078 1.05345 0.0830078 2.24999V8.75C0.0830078 9.94654 1.05313 10.9167 2.24967 10.9167H8.74967C9.94622 10.9167 10.9163 9.94654 10.9163 8.75C10.9163 7.51987 10.9163 6.04166 10.9163 6.04166C10.9163 5.74266 10.6737 5.5 10.3747 5.5C10.0757 5.5 9.83301 5.74266 9.83301 6.04166V8.75C9.83301 9.34799 9.34767 9.83333 8.74967 9.83333C6.94592 9.83333 4.05288 9.83333 2.24967 9.83333C1.65113 9.83333 1.16634 9.34799 1.16634 8.75C1.16634 6.94625 1.16634 4.0532 1.16634 2.24999C1.16634 1.65145 1.65113 1.16666 2.24967 1.16666H4.95801C5.25701 1.16666 5.49967 0.923995 5.49967 0.624995C5.49967 0.325995 5.25701 0.0833282 4.95801 0.0833282ZM9.06709 1.16666H7.12467C6.82567 1.16666 6.58301 0.923995 6.58301 0.624995C6.58301 0.325995 6.82567 0.0833282 7.12467 0.0833282H10.3747C10.6737 0.0833282 10.9163 0.325995 10.9163 0.624995V3.87499C10.9163 4.174 10.6737 4.41666 10.3747 4.41666C10.0757 4.41666 9.83301 4.174 9.83301 3.87499V1.93258L5.88263 5.88295C5.67138 6.0942 5.32797 6.0942 5.11672 5.88295C4.90492 5.6717 4.90492 5.32829 5.11672 5.11704L9.06709 1.16666Z" fill="#262626"/>
                        </svg>
                    </div> --> 
                    
                    <!-- <button class="py-1 w-60 border-2 border-parula-dark text-sm font-medium text-parula-dark bg-white hover:text-white hover:bg-gray-900"  v-on:click="onProflie()">
                        Edit Profile
                    </button> -->

                </div>
                

            </div>
            <div class="my-5">
                
                <!-- <button class="py-3 px-10 border-2 border-black text-lg" v-on:click="onProflie()">
                    Edit Profile
                </button> -->
            </div>

        </div>

         
          
      </div>
      
  </div>
</template>

<script>
// import ProfliePopup from './ProfilePopup.vue'
import WalletSetting from './WalletSetting.vue'
// import ImageUploader from './imageUploader.vue'
import ImageUploader from '../../../components/imageUploader.vue'
import avataUpload from './avataUpload.vue'

import UserService from '../../../services/user.service.js'
import UploadService from '../../../services/upload.service.js'
import OrderService from '../../../services/order.service.js'
import sessionService from '../../../services/session.service'

export default {
    components:{
        // ProfliePopup,
        WalletSetting,
        ImageUploader,
        avataUpload,
    },
    created: function() {
        this.userId = sessionService.getUserId();
        this.userName = sessionService.getNickname();

        if(this.userName){
            UserService.purchaseHistoryNewest(this.userName).then(res=>{
                this.collectionCnt = res.data.total
            })
             
            UserService.likedProducts(this.userName).then(res=>{
                this.likedCnt = res.data.total
            })
        }
    },
    data:function() {
        return {
            ds:[],
            isHidden: true,
            isHidden1: true,
            collectionCnt: '',
            likedCnt:'',
            // editObj:{
            //     name:"",
            //     nickname:"",
            //     mail:"",
            //     kyc:"",
            //     avata:"",
            //     source: {
            //         done: false,
            //         img: "",
            //     },
            //     source2: {
            //         done: false,
            //         img: "",
            //     },
            //     selectedCreator: "",
            // },
            editObj:{
                account: "",
                alias1: "",
                alias2: "",
                aml: "",
                avatar: "",
                chainid: "",
                id: "",
                kyc: "",
                mail: "",
                mail_1: "",
                name: "",
                network: "",
                nickname: "",
                properties: "",
                reg_at: "",
                tag: "",
                terms_at: "",
                uid: "",
                updated_at: "",

            },
        }
    },
    props:['isHiddens', 'isHiddens1'],
    props:{
        UserDatas:Object,
        collectionCnts:String

    },
    methods: {
        onProflie: function() {
            this.$emit("onProfileEdit")
            // this.isHidden = !this.isHidden;
            //  console.log(this.isHidden);
            // if(this.isHidden === false){
            //     $('html, body').css({'overflow': 'hidden', 'height': '100%'});
            //     $('window').on('scroll touchmove mousewheel', function(event) {
            //     event.preventDefault();
            //     event.stopPropagation();
            //     return false;
            //     });
            // }
        },
        onWalllet(){
            this.$emit("onWalletEdit")
        },
        nonShow:function(){
            this.isHidden = !this.isHidden;
            console.log(this.isHidden)
            if(this.isHidden === true){
                $('html, body').css({'overflow': 'auto', 'height': '100%'});
                $('window').off('scroll touchmove mousewheel');
            }
        },
        clickWallet: function() {
            this.isHidden1 = !this.isHidden1;
        },
        nonShow1:function(){
            this.isHidden1 = !this.isHidden1;
        },
        imageUploaded(param) {
            console.log("param:::", param)
        },
        // onEdit: async function (){
        //     console.log("onEdit:::", this.editObj)
        //     UserService.update(
        //       this.editObj.nickname="",
        //       this.editObj.mail="",
        //       this.editObj.kyc="",
        //       this.editObj.avata="",
        //     ).then(res=>{
        //         console.log("contract :", res)
        //     }).catch((err) => {
        //     if(err.response) {
        //         console.log(err.response.data.message);
        //         console.log(err.response.status);
        //     } else if (err.request){
        //         console.log(err.request);
        //     } else {
        //         console.log(err.message);
        //     }
        // });
        // }
            
        
    }

}
</script>

<style>
.gray-color {
    color: #8a8a8a;
}
.border-edit {
    border: 0.5px solid #262626;
}
.collector-main {
    width: 100%;
    /* height:60vh; */
    margin:0;
    position:relative;
}


.left-cir {
    margin-top: 18%;
    margin-left: 5%;
    width: 12vw;
    height: 12vw;
    border-radius: 10vw;
    background: #ccc;
}
.count{
    display: inline-flex;
    /* margin-top: 5%; */
    
}
.count > div{
    font-size: 14px;
    font-weight: 800;
    color: #8a8a8a;
}
.count  p {
    font-size: 24px;
    font-weight: 600;
    color:#262626;
}


.collector-navi > div:nth-child(1) img{
    width:35px;
    height:35px;
    /* margin:0 auto; */

}
.collector-navi > div:nth-child(2) img{
    width:35px;
    height:35px;
    margin:0 auto;
}
.collector-navi > div:nth-child(1) > svg{
    margin:0 auto;
    margin-top: 20%;
}
.collector-navi > div:nth-child(2) > svg{
    margin:0 auto;
    margin-top: 20%;
}
.collector-navi > div:nth-child(3) > svg{
    margin-top: 17%;
}


.bounce-enter-active {
  animation: bounce-in 0.5s; 
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    right:-15vw;
  }
  100% {
    right: 18vw;
  }
}

.bounce2-enter-active {
  animation: bounce2-in 0.5s; 
}
.bounce2-leave-active {
  animation: bounce2-in 0.3s reverse;
}
@keyframes bounce2-in {
  0% {
    right:-15vw;
  }
  100% {
    right: 0;
  }
}
/* @keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
} */
</style>