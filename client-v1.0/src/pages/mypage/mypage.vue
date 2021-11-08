<template>
<div class="flex h-auto flex-wrap">
<notifications position="bottom right"/>
    <div class="flex-1 "></div>
    <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
        <div class="my-wrapper w-full h-auto mx-auto">
            <ParulaHeader v-bind:LoginAddrs="LoginAddr" @saveAddr="savingAddrs" />
            <!-- <Myfilter v-bind:isHiddens="isHidden" v-on:nonViewPop="nonShow" /> -->
            <Collector v-bind:UserDatas="UserData" v-on:onProfileEdit="onProfile" v-on:onWalletEdit="onWallet" />
            <div class="my-main relative w-full h-full">
                <PurchaseHistory v-bind:UserDatas="UserData" v-bind:UserIds="UserId" />
                <Auction v-bind:UserDatas="UserData" v-bind:UserIds="UserId" v-bind:UserNames="UserName" />
                <Like v-bind:UserDatas="UserData" v-bind:UserNames="UserName" />
            </div>
            
        </div>
        <div class="w-full h-96 "></div>

    </div>
    <div class="flex-1 "></div>

<ProfliePopup ref="profilePopup" v-bind:userInfos="UserData" />  
<WalletSetting ref="walletSetting" v-bind:userInfos="UserData" />

</div>
</template>

<script>

import ParulaHeader from "../../components/ParulaHeader.vue";
import Collector from "./sub/Collector.vue"
import PurchaseHistory from "./sub/PurchaseHistory.vue"
import Auction from "./sub/Auction.vue"
import Like  from "./sub/Like.vue"
// import Works  from ".sub/Works.vue"
// import Myfilter  from "./sub/Myfilter.vue"
import UserService from '../../services/user.service.js'

import ProfliePopup from './sub/ProfilePopup.vue'
import WalletSetting from './sub/WalletSetting.vue'
import SessionService from '../../services/session.service.js'
import { notify } from "@kyvg/vue3-notification";



import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

window.onload = function(){
    console.log(SessionService.getNickname())
    if(!SessionService.getNickname()){
        // 로그인 안된 유저면 홈으로 보내버리자.
        document.location.href = "/";
    }

    function onClickSelect(e) {
        console.log("잘 눌림1")
        const isActive = e.currentTarget.className.indexOf("active") !== -1;
    }
    console.log("잘 눌림2")

    document.querySelector("#Theme .select").addEventListener("click", onClickSelect);

    function onClickOption(e) {
        const selectedValue = e.currentTarget.innerHTML;
        document.querySelector("#Theme .text").innerHTML = selectedValue;
    }

    var optionList = document.querySelectorAll("#Theme .option");
    for (var i = 0; i < optionList.length; i++) {
        var option = optionList[i];
        option.addEventListener("click", onClickOption);
    }


    function onClickSelect2(e) {
        console.log("잘 눌림1")
        const isActive2 = e.currentTarget.className.indexOf("active2") !== -1;
    }
    document.querySelector("#Theme2 .select2").addEventListener("click", onClickSelect2);

    function onClickOption2(e) {
        const selectedValue2 = e.currentTarget.innerHTML;
        document.querySelector("#Theme2 .text").innerHTML = selectedValue2;
    }

    var optionList2 = document.querySelectorAll("#Theme2 .option");
    for (var i = 0; i < optionList2.length; i++) {
        var option2 = optionList2[i];
        option2.addEventListener("click", onClickOption2);
    }


    function onClickSelect3(e) {
        console.log("잘 눌림1")
        const isActive3 = e.currentTarget.className.indexOf("active3") !== -1;
    }
    document.querySelector("#Theme3 .select3").addEventListener("click", onClickSelect3);

    function onClickOption3(e) {
        const selectedValue3 = e.currentTarget.innerHTML;
        document.querySelector("#Theme3 .text").innerHTML = selectedValue3;
    }

    var optionList3 = document.querySelectorAll("#Theme3 .option");
    for (var i = 0; i < optionList3.length; i++) {
        var option3 = optionList3[i];
        option3.addEventListener("click", onClickOption3);
    }
}


export default {
    components: {
        ParulaHeader,
        Collector,
        PurchaseHistory,
        Auction,
        Like,
        // Myfilter,
        ProfliePopup,
        WalletSetting,

        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    },
    setup() {
        const open = ref(true)
        return {
            open,
        }
    },
//    created:function(){
//        this.savingAddr()
//    },
   data: function(){
       return{
            LoginAddr:'',
            UserData:{},
            // isHidden: false,
            UserId:'',
            UserName:''
       }
       
   },
//    props:['LoginAddrs'],
   methods:{
      onProfile(){
        this.$refs.profilePopup.show()
      },
      onWallet(){
        this.$refs.walletSetting.show()
      },
       savingAddrs:function(addr) {
            this.LoginAddr=addr
            UserService.byAddress(this.LoginAddr).then(res=>{
                this.UserData=res.data.items[0]
                this.UserId = res.data.items[0].id
                this.UserName = res.data.items[0].nickname

                SessionService.setUserId(this.UserId);
                SessionService.setNickname(this.UserName);
            }).catch(e => {
                let error = e
                if(e.response && e.response.data)
                  error = e.response.data
                let msg = `user 정보 조회 실패, (error: ${error}`
                console.error(msg);
                notify({type:'error', text:msg});
            })
       },
      //  clickfilter: function() {
      //       this.isHidden = !this.isHidden;
      //   },
       nonShow:function(){
            this.isHidden = !this.isHidden;
        },
   },
   props:['isHiddens']
}
</script>
<style>
#logo-other{
    display:inline-block;
}
</style>

<style scoped>
.my-main > div::-webkit-scrollbar {
    display:none;
}

</style> 