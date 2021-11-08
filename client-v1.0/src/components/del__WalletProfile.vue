<template>
    <div class="login-wrapper2">
       <div class="login-bg  flex w-1/3 p-8  md:p-10 md:pb-32 lg:p-14 md:items-center">
            <div class="form px-10 pb-10 space-y-12">
            <div class="login-navi">
                <a class="underline  mr-3 font-semibold text-lg">PROFILE</a>
            </div>
                <div class="input-main mt-10 space-y-6">
                    <input type="text" placeholder="Name" v-model="inputName"  ><br>
                    <input type="text" placeholder="E-mail" v-model="inputEmail"  ><br>
                    <input type="text" placeholder="URL" v-model="inputUrl"  ><br>
                    <input type="text" placeholder="SNS" v-model="inputSns"  ><br>
                    <!-- <input id="checkbox" type="checkbox" name="checktext" value="1" v-model="checkedNewsMail">
                    <label for="checktext">Please sign me up for the newsletter.</label> -->
                </div>
                <button v-on:click="confirm">Confirm</button><br>
                <a href="./" class="Home text-sm font-semibold">&#60; Back to Home</a>
            </div>
    </div>
         <WalletSignup v-if="isWalletSignUP===true"  v-bind:isLogins="isLogin"/>

    </div>
</template>
<script>
import WalletSignup from "./WalletSignup.vue";
import CompleteSignUp from "./CompleteSignUp.vue";
import UserService  from "../services/user.service.js";
import WalletService  from "../services/wallet.service.js";
import Web3 from 'web3';

export default  {
     data: function() {
        return {
            inputName:'',
            inputEmail:'',
            inputUrl:'',
            inputSns:'',
            checkedNewsMail: [],
            isWalletSignUP:false
        }
    },
     computed: {
    web3() {
      // return this.$store.state.web3
      //
      let web3 = new Web3(window.web3.currentProvider);
      return web3;
    }
  },
    components: {
        WalletSignup
    },
    props: {
        isLogins:Boolean
    },
    methods: {
    confirm :  function (event) {
      var vm = this;
      
      return new Promise(function(resolve, reject){
          if (typeof window.ethereum !== 'undefined') {
          ethereum.eth_requestAccounts
          const connetWallet = window.ethereum.request({
              method: 'eth_requestAccounts'
            })
            console.log('연결완료')
            
            resolve(connetWallet)
        }
        }).then(async function (connetWallet) {
        // event.preventDefault()
        console.log("연결지갑주소"+connetWallet)
        
      
      let web3 = new Web3(window.web3.currentProvider)
      let strMethod = 'personal_sign'
      let from = await web3.eth.getAccounts();
      if (!from[0]) return this.onConnect()
      
      //methods value timestamp
      const msgParams =`regist ${userEmail}/${addr} ${Date.parse(new Date())}`
      let paramVals = [msgParams, from[0]]
      console.log('params:', strMethod, paramVals, from[0])
      
      // this.web3.currentProvider.sendAsync(method, params, from, function (err, result) {
      //   console.log('result:', result)
      // })
    
      let res = await web3.currentProvider.send(strMethod, paramVals);
      
      // let res = await ethereum.request({ method: strMethod , params: paramVals})

      console.log('서명결과:', res)
      res.address = connetWallet
      return res
    }).then(function(res) {
      
        console.log("연결지갑주소2"+res)  
        let a = JSON.stringify(res)
        console.log(res.address.toString())
        let addr= res.address.toString();
        let result = res.result.toString() //sig
    
        console.log('addr'+addr)
        console.log('res.result.toString()'+res.result.toString())
        // console.log(msgParams[0].name)
    //    console.log('this.checkedNewsMail.length '+this.checkedNewsMail.length
    
        console.log('data.inputName  '+ vm.inputName)
        console.log('data.inputEmail  '+ vm.inputEmail)
        const userName =  vm.inputName;
        const userEmail = vm.inputEmail;
        const userUrl = vm.inputUrl;
        const userSns = vm.inputSns;
        // const chainId = web3.currentProvider.chainId;
        // const networkVersion = web3.currentProvider.networkVersion;
        console.log('web3.currentProvider.selectedAddress::'+web3.currentProvider.selectedAddress)
        console.log('web3.currentProvider.chainId::'+web3.currentProvider.chainId)
        console.log('result::'+result)
        
        WalletService.walletUser(userName, "nickname", userEmail, 'eth' , addr,  msgParams, result).then(res=>{
        console.log('walletUser결과:',res)
        location.href="/signup.html";
          }).catch(e=>{
            alert('error')
          })


      })
    
    

        // if(this.checkedNewsMail.length){
        
        // }
    },
    }
}
</script>
<style scoped>
.form {
    width: 100%;
    height: auto;
    margin: 0 auto;
    float: right;
    text-align: left;
    position:relative;
    color:#262626;
}
.login-wrapper2 {
    width: 100%;
    height:100vh;
    /* background-color: rgba(1,1,1,0); */
    position: fixed;
    right:0;
    top:0;
    z-index: 99;
    color: #8a8a8a;
}
.login-wrapper2 input {
    width: 80%;
    margin:0 auto;
    border-bottom: 1px solid #bababa;
}

button{
    width:85px;
    height:25px;
    font-size: 12px;
    border: 1px solid #262626;
    position:absolute;
    right:25%;
    bottom:0;
}

.fogotten {
    color:#bababa;
    position:absolute;
    bottom:0;
    left:0;
}

.login-bg{
    height:100vh;
    background:#fff;
    margin-left: auto;
}
</style>