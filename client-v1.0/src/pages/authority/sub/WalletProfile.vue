<template>
<div class="w-full items-center">
    <div class="form px-10 pb-10 space-y-12">
        <div class="underline mr-3 font-semibold text-lg">PROFILE</div>
        <div class="mt-5">
            <div class="flex flex-col mb-4">
                <label for="name" class="text-xs sm:text-sm tracking-wide text-gray-600"> Name</label>
                <input id="name" name="name" type="text" class="mt-3 border-b" :class="[{'bg-red-50':!valid.name}, {'border-red-500':!valid.name}, {'animate-pulse':!valid.name}]" placeholder="Name" v-model="inputName">
            </div>
            <div class="flex flex-col mb-4">
                <label for="nickname" class="mb-1 w-24 text-xs sm:text-sm tracking-wide text-gray-600"> Nick name</label>
                <input id="nickname" name="nickname" type="text" class="mt-3 border-b" :class="[{'bg-red-50':!valid.nickname}, {'border-red-500':!valid.nickname}, {'animate-pulse':!valid.nickname}]" placeholder="Nick name" v-model="inputNickname">
            </div>
            <!-- <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
			    Invalid nickname
            </span> -->
            <div class="flex flex-col mb-4">
                <label for="email" class="mb-1 w-24 text-xs sm:text-sm tracking-wide text-gray-600"> email</label>
                <input id="email" name="email" type="text" class="mt-3 border-b " :class="[{'bg-red-50':!valid.email}, {'border-red-500':!valid.email}, {'animate-pulse':!valid.email}]" placeholder="E-mail" v-model="inputEmail">
            </div>
            <!-- <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
			    Invalid nickname
            </span> -->
            <!-- <input type="text" class="border-b" placeholder="URL" v-model="inputUrl"><br>
            <input type="text" class="border-b" placeholder="SNS" v-model="inputSns"><br> -->
            <!-- <input id="checkbox" type="checkbox" name="checktext" value="1" v-model="checkedNewsMail">
            <label for="checktext">Please sign me up for the newsletter.</label> -->
        </div>
        <!-- <button
            class="w-24 text-center py-1 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-black hover:text-white"
            v-on:click="confirm">Confirm</button><br> -->

        <!-- <p class="text-red-600 font-light text-sm my-5 transition duration-150 ease-in-out">{{error_msg}}</p> -->
        <!-- <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            </span> -->
        <div class="w-full flex justify-end my-5">
            <button class="w-24 text-center py-1 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-black hover:text-white"
            @click="checkDuplicate">Confirm</button>
        </div>
        <br>
        <a href="./" class="Home text-sm font-semibold">&#60; Back to Home</a>
    </div>
</div>
         
</template>
<script>
// import WalletSignup from "./WalletSignup.vue";
import CompleteSignUp from "./CompleteSignUp.vue";
import WalletService  from "../../../services/wallet.service.js";
import Web3 from 'web3';

export default  {
     data: function() {
        return {
            inputName:'',
            inputNickname:'',
            inputEmail:'',
            inputUrl:'',
            inputSns:'',
            checkedNewsMail: [],
            error_msg:'',
            valid:{
                name:true,
                nickname:true,
                email:true,
            }
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
        // WalletSignup
    },
    props: {
        isLogins:Boolean
    },
    methods: {
    validation(){
        this.valid.name = true;
        this.valid.nickname = true;
        this.valid.email = true;


       var blank_pattern = /\s/;
        if (blank_pattern.test(this.inputEmail)) {
            this.error_msg = "The email not allow blank"
            this.valid.email = false;
            return false
        }
        if (blank_pattern.test(this.inputNickname)) {
            this.error_msg = "The nickname not allow blank"
            this.valid.nickname = false;
            return false
            
        }

        if (this.inputName.length < 3) {
        this.error_msg = "The nickname must be at least 3 letter."
        this.valid.name = false;
        return false
        }
        if (this.inputNickname.length < 3) {
            this.error_msg = "The nickname must be at least 3 letter."
            this.valid.nickname = false;
            return false
        }
         const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegexp.test(this.inputEmail)) {
            this.error_msg = "invalid mail format"
            this.valid.email = false;
            return false
        }
       
        return true
    },
    checkDuplicate(){
       if(!this.validation()){
           return;
       }
        // this.regist() //임시 허용
        // WalletService.walletCheck(this.inputEmail, this.inputNickname).then(res=>{
        //     console.log(res)
        //     if(res.data == 'ok'){
        //         this.error_msg =''
        //         this.regist()
        //         // this.$emit()
        //     }
        // }).catch((error)=>{
        //     console.log('err msg:', error.response.data)
        //     if(error.response && error.response.data)
        //         this.error_msg = error.response.data
        // })
        this.error_msg =''
        this.regist()
    },
    async regist() {
        if (typeof window.ethereum !== 'undefined') {
            ethereum.eth_requestAccounts
            const connetWallet = window.ethereum.request({
                method: 'eth_requestAccounts'
            })
        }

       const permissions = await ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {}
                }],
        })
        console.log('permissions::', permissions)

        const accountsPermission = await permissions.find((permission) => permission.parentCapability === 'eth_accounts');
        console.log("accountsPermission", accountsPermission)
        if (!accountsPermission) {
            console.log('eth_accounts permission successfully requested!');
        }

          
        //     .catch((error) => {
        //         if (error.code === 4001) {
        //             console.log('Permissions needed to continue.');
        //             this.error_msg = "Permissions needed to continue."
        //         } else {
        //             console.error(error);
        //             this.error_msg = error
        //         }
        // });

        let web3 = new Web3(window.web3.currentProvider)
        let from = await web3.eth.getAccounts();
        const reg_wallet = from[0]
        console.log("reg_wallet::", reg_wallet)

        const msgParams = `regist ${reg_wallet} ${ Date.parse(new Date()) }`
        
        let strMethod = 'personal_sign'

        let paramVals = [msgParams, reg_wallet]
        console.log('params:', strMethod, paramVals, reg_wallet)

        const res= await web3.currentProvider.send(strMethod, paramVals);
        console.log('서명결과:', res)

        console.log("param::", this.inputName, this.inputNickname, this.inputEmail, 'ETH', reg_wallet, msgParams, res.result)
        console.log("현종확인1")
        WalletService.walletRegist(this.inputName, this.inputNickname, this.inputEmail,
            'ETH', reg_wallet, msgParams, res.result).then(res => {
            console.log('walletUser결과:', res)
            // location.href = "/signup.html";
            this.$emit('onNext')

        }).catch(error => {
            this.error_msg = error
            if(error.response && error.response.data)
                this.error_msg = error.response.data
        })
    },
    onConfirm :  function (event) {
        console.log('11111')
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
      const msgParams =`regist ${this.inputEmail}/${connetWallet} ${Date.parse(new Date())}`
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
        // location.href="/signup.html";
        this.$emit('onNext')
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
</style>