<template>
  <div class="my-wrapper">
    <ParulaHeader v-bind:LoginAddrs="LoginAddr" @savingAddr="savingAddrs"/>
      <div class="main">
          <div class="my-main text-center items-center align-middle">
            <h1 class="mt-72 font-extrabold text-2xl underline" >successfully completed!</h1>
            <button class="mt-10 text-xl border-2 border-black px-10 py-5" v-on:click="goToMyPage">Go to my collection</button>
          </div>
      </div>
  </div>
</template>

<script>
import ParulaHeader from "../../components/ParulaHeader.vue";
import UserService from '../../services/user.service.js'

export default {
    components: {
        ParulaHeader,
        
    },

   data: function(){
       return{
            LoginAddr:'',
            UserData:{}        
       }
       
   },
//    props:['LoginAddrs'],
   methods:{
     goToMyPage:function() {
       location.href="/mypage.html"; 
     }
   }
}
</script>

<style scoped>
.my-wrapper{
    width:100%;
    height:100%;
    margin: 0 auto;
}
.main {
  width: 100vw;
  height:100vh;
}

.my-main {
  width: 100%;
  height: 100%;
}
.my-main >h1 {
  text-underline-position: under;
}

</style> 