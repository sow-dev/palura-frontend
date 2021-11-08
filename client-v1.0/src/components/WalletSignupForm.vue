<template>
    
    <div class="w-full">
        <div class="p-10">
            <div class="h-1/2 block"></div>
            <div class="text-lg">
                <a href="#" class="underline  mr-3 font-semibold" >SIGN UP</a> 
                <!-- <a href="#" class="no-underline hover:underline ">LOGIN</a> -->
            </div>
            <div class="my-5 flex flex-col gap-2 text-sm">
                <p class="w-full text-center py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-800 hover:text-white" 
                :class="[target=='metamask' ? 'bg-black text-white':'bg-white text-black']" @click="target='metamask'">Metamask</p>
                <p class="w-full text-center py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-800 hover:text-white"
                :class="[target=='walletconnect' ? 'bg-black text-white':'bg-white text-black']" @click="target='walletconnect'">Wallet Connect</p>
                <p class="w-full text-center py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-800 hover:text-white"
                :class="[target=='walletlink' ? 'bg-black text-white':'bg-white text-black']" @click="target='walletlink'">Wallet Link</p>
                <p class="w-full text-center py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-800 hover:text-white"
                :class="[target=='Kaikas' ? 'bg-black text-white':'bg-white text-black']" @click="target='Kaikas'">Kaikas</p>
            </div>
            
            <div>
                <a href="./" class=" home text-sm font-semibold " ><span class="mr-2">&#60;</span> Back to Home</a>
            </div>
            <div class="flex justify-end mt-10 text-sm">
                <button class="w-16 text-center py-1.5 px-3 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-black hover:text-white" v-on:click="next">Next</button>
            </div>

             <div class="mt-16 text-gray-500 text-sm font-extralight">
                Have an accounts?<a href="./login.html?mode=login" class="pl-3 font-semibold hover:underline hover:text-black" >Login</a>
            </div>
        </div>

        <TermsOfService v-if="isTerm===true" />
        </div>
</template>

<script>
import Web3 from 'web3';
import TermsOfService from "./TermsOfService.vue"


export default {
    name: 'signup',
    computed: {
    web3() {
      // return this.$store.state.web3
      //
      let web3 = new Web3(window.web3.currentProvider);
      return web3;
    }
  },
    components: {
        TermsOfService
    },
    data: function(){
        return {
            target:'',
            checkSign: false, //가입여부 확인 데이터(API확인후 반영)
            isTerm : false,
            a : false,
        }
    },
    props: {
        isHiddens: Boolean,
        isNonSigns: Boolean,
        isLogins:Boolean
    },
    
    methods: {
    close:function() {
       this.$emit("changeHidden")
    },
    next : function() {
        if(this.target==='metamask'){
         this.onConnect();
        }
    },
    
    onConnect: function (event) {    
        //1. 지갑주소가 가입되었는지 여부 확인
        //2-1. 가입되어있을때 바로 메타마스크 연결
        //2-2. 가입 안되어있을때
        //3. 프로필 입력컴포넌트 

    if(this.checkSign===false) {//가입안되었을때
       console.log('this.checkSign'+this.checkSign)
       this.isTerm=true;
       console.log('this.isTerm'+this.isTerm)
       
       return;
    }else {
        //method account timestamp
      const msgParams =`signup ${connetWallet} ${Date.now()}`
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
        // const msgParams ='hello'
      
      let web3 = new Web3(window.web3.currentProvider)
      let strMethod = 'personal_sign'
      let from = await web3.eth.getAccounts();
      if (!from[0]) return this.onConnect()

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
        console.log('a'+a)
        // const paramApi = {
        //   "network":"network",
        //   // "account":res.address,
        //   "account": "0x122feb0fc838540a278ad23a8a5b3b232d476087",
        //   "user_id":"user_id",
        //   "chainid":"chainid",
        //   "alias1":"alias1",
        //   "alias2":"alias2",
        //   "avata":"avata.jpg",
        //   "msg":msgParams,
        //   "sig":res.result,
        //   "tag":"tag"
        // }
        console.log('addr'+addr)
        console.log('res.result.toString()'+res.result.toString())
        // console.log(msgParams[0].name)
       
    //    //지갑 주소 존재여부확인 없으면 가입해야함
    //     WalletServices.check(addr).then(res=>{
    //       console.log('결과값111:',res)
    //         }).catch(e=>{
    //           alert('error')
    //         })
    //     //지갑정보 insert 회원정보 입력하는 api 이게 입력 되면 check가 값 addr이 null이 아님    
    //     WalletServices.insert('network', addr, 'user_id', 'chainid', 'alias1', 'alias2', 'avata.jpg', msgParams, res.result.toString(),'tag').then(res=>{
    //     console.log('결과값:',res)
    //       }).catch(e=>{
    //         alert('error')
    //       })
      })
    }   
    },

    }
}
</script>
<style scoped>
.home{
    color:#8a8a8a;
}
</style>