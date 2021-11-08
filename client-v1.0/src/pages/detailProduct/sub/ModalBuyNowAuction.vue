<template>
<div v-if="!ishidden" class="fixed z-40 inset-0 overflow-y-auto ease-out duration-300" 
aria-labelledby="modal-title" role="dialog" aria-modal="true"  :class="[{'opacity-100':ishidden}]" >
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->

    
    <div class="inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all  sm:my-8 sm:align-middle max-w-2xl md:max-w-4xl lg:max-w-5xl  md:max-4xl sm:w-full">
          <div class="w-full">
      
    </div>
      <div v-if="process==1">
      <div class="bg-white px-4 pt-5 pb-8 sm:p-14 sm:pb-4">
        <div class="w-full flex flex-row justify-between">
            <h3 class="text-sm underline leading-6 font-medium text-gray-900" id="modal-title">
              PLACE YOUR BID 
            </h3>
            <div class="flex-shrink-0 flex items-center justify-center  rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <!-- Heroicon name: outline/exclamation -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="ishidden=true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div class="w-full flex flex-col md:flex-row mt-5">
            <div class="w-1/2">
              <img :src="order.thumbnail" class="w-full h-80  object-cover" />
              <div class="text-lg text-bold mt-2">{{order.title}}</div>
              <div class="text-sm text-gray-500">{{order.pen_name}}</div>
            </div>
            <div class="w-1/2 flex items-center justify-center">
              <div class="w-full flex flex-col md:flex-row">
                <div class="w-full py-3 ">
                  <div class="flex flex-col place-items-center">
                      <div class="text-sm text-gray-600 font-normal">BUY NOW PRICE</div>
                        <div class="text-3xl font-medium">
                          <span class="mr-1">
                            <!-- {{order.immediate_price}} -->
                            <DecimalValue v-model="order.immediate_price" />
                            </span>
                          <span class="text-lg mr-3 font-normal">{{order.taSymbol}}</span>
                          <!-- <span class="text-gray-600 text-sm font-light">$2,60201</span> -->
                        </div>
                  </div>
                </div>
              
              </div>
              
            </div>
          </div>
        <div class="w-full flex md:justify-end" >
          <div class="mt-3 w-1/2 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div class="mt-2">
              <p class="text-sm text-gray-500 my-5">
                You cannot withdraw your purchase. By purchasing, you indicate that you have read and agree to the  <span class="underline"> Terms of purchase </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse my-5">
        <button type="button" class="w-full inline-flex justify-center rounded-sm  px-20 border border-gray-700 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-900 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
        @click="clickImmediateBuyBtn">
          Buy It Now
        </button>
        <button type="button" class="mt-10 w-full inline-flex justify-center rounded-sm border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="ishidden = !ishidden">
          Cancel
        </button>
      </div>
      </div>
      <div v-if="process==2" class="w-96 md:w-full h-96 flex items-center justify-center">
        <div class="flex flex-col flex justify-center">
            <!-- <Loader /> -->
            <div class="text-gray-500 text-lgs font-light mt-2 text-center" @click="process=3"> 
            <ring-loader :loading="loading" :color="color1" :size="size" class="mx-auto w-2/5"></ring-loader>
            <p>Please wait...</p> 
            </div>
        </div>
      </div>
      <div v-if="process==4" class="w-96 md:w-full h-96 flex items-center justify-center">
        <div class="flex flex-col flex justify-center">
          <div class="text-gray-800 text-2xl font-light mt-2 text-center mb-10">
            An error has occurred.
          </div>
          <button type="button"
            class="w-full inline-flex justify-center rounded-sm  px-20 border border-gray-700 shadow-sm px-4 py-2 bg-white text-base md:text-md font-normal text-gray-900 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto"
            @click="process =1; ishidden = true">
            close
          </button>
        </div>
      </div>
      <div v-if="process==3" class="w-full flex items-center justify-center">
        <div class="bg-white px-4 pt-5 pb-8 sm:p-14 sm:pb-4 w-full">
        <div class="w-full flex flex-row justify-center">
            <div class="text-sm text-center leading-6 font-medium text-gray-900" id="modal-title">
                <span class="text-lg underline">Completed your Purchase</span>
              <div class="mt-5 text-gray-600">
                Purchase by <span>{{customer.nickname}}</span> for <span>{{order.immediate_price}}</span> <span>{{order.taSymbol}}</span></div>
              </div>
            <div class="absolute top-10 right-10">
            <!-- Heroicon name: outline/exclamation -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="ishidden=true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div class="mx-20">
          <div class="flex flex-row py-16 w-full spce-x-0 md:space-x-10 justify-between">
          <div>
            <img :src="order.avatar" class="w-40 h-40 md:w-60 md:h-60 shadow-md  object-cover" />
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-16 md:w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="ishidden=true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            
            <img v-if="order.avatar_min" :src="customer.avatar" class="w-40 h-40 md:w-60 md:h-60  object-cover shadow-md rounded-full" />
            <!-- <div v-else class="w-40 h-40 md:w-60 md:h-60 flex justify-center items-center text-sm md:text-xl shadow-md rounded-full bg-gray-400">
               {{customer}}
            </div> -->
            <img v-else :src="pic" class="w-40 h-40 md:w-60 md:h-60  object-cover shadow-md rounded-full" />
          </div>
        </div>
        </div>
        <div class="flex justify-center my-10">
        <button type="button" class="w-full inline-flex justify-center rounded-sm  px-20 border border-gray-700 shadow-sm px-4 py-2 bg-white text-base md:text-xl font-normal text-gray-900 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto"
          @click="process =1;ishidden=true"  v-on:click="Refresh">
            Confirm
          </button>
            
        </div>
        
      </div>
      </div>
    </div>

    
  </div>
</div>
</template>

<script>
import tetrisItemsVue from './tetris-items.vue'
import Loader from "../../../components/loader.vue"
import {Parula} from "../../../parula-js/src/parula.js"
import BidService from "../../../services/bid.service"
import OrderService from "../../../services/order.service"
import { notify } from "@kyvg/vue3-notification";
import pic from '@/assets/img/mymape_user.png'
import  DecimalValue from '../../../components/DecimalValue.vue'
import RingLoader from 'vue-spinner/src/RingLoader.vue'

const PROCESS = {
    main: 1,
    pending: 2,
    complete: 3,
    error:4
}


export default {
    components:{
      Loader,
      DecimalValue,
      RingLoader,
    },
    created() {
       console.log('::::::',this.order)
       console.log('::::::',this.customer)
    },
    mounted(){
      
      this.getbalance(this.order.taContAddr)
    },
    props: ['order', 'customer'],
    data: function () {
        return {
            ishidden: tetrisItemsVue,
            process:1,
            customerBalance:0,
            pic:pic,
            color: '#cc181e',
            color1: '#5bc0de',
            size: '70px',
            margin: '2px',
            radius: '2px'
        }
    },
    methods: {
      showModal(_visible){
        this.ishidden = !_visible
      },
      hideModal(){
        this.ishidden = !_visible
      },
      async getbalance(_addr){
        try{
          const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          //  const account  = web3.eth.accounts[0];

          const balanceABI = [{
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function",
          }]
          //erc20
          if(_addr){
            const parula = new Parula(window.ethereum, {}, line=>console.info('[*] ',line));
            const contract =  new parula.web3.eth.Contract(balanceABI, _addr);
            const weiBal = await contract.methods.balanceOf(account).call()
            const ethBal = parula.web3.utils.fromWei(weiBal, 'ether')
            console.log('result::::', ethBal, weiBal)
            this.customerBalance = ethBal;
          } else {

          }

        }catch(e){
          notify({ type: "error", text: e });
        }
      },
     clickImmediateBuyBtn: async function() {

         if(Number(this.order.immediate_price) > Number(this.customerBalance)){
          console.log('this.order.immediate_price:::',this.order.immediate_price)
          console.log('this.customerBalance',this.customerBalance)
          alert('not enough balance to buy')
          return
        }
        try{
        // console.error('111') 
        this.process = PROCESS.pending;
        this.order.order_signature;
        this.order.order_rawdata;
        const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('web3 '+window.ethereum.stringify)
        console.log('window.ethereum.chainId '+window.ethereum.chainId)
        const parula = new Parula(window.ethereum, {}, line=>console.info('[*] ',line));
        console.log('accounts[0]'+accounts[0])

        const Param ={
            maker:accounts[0],  //order 생성자 주소  
            maTypeMV:this.order.taTypeMV,           // takerAsset,  // ta, Asset(ETH, "0x", 200), ERC20 //구매
            maContractAddress:this.order.taContAddr,  // contract
            maValue:Number(this.order.immediate_price), //판매가격
            
            sellOrderId:Number(this.order.id),    // off-chain registered, 아니면 order_id만 받고, getOrder로 가져와? 그게 성능상 좋겠구만
            //이게 어떤값? tokenId?

            // salt:0,       // when regist order to orderbook salt is 1, else salt is 0 //hash 값이 달라지게
            // start:0,      // Date() //비경매
            // end:0,        // Date() //비경매
        }

        const ret = await parula.createBuyOrderAndMatch(Param)    
        console.log('경매즉시구매ret::'+ret)
        console.log('ret::' + JSON.stringify(ret))
        if(ret.status==false) {
          location.href = location.href
          return
          }
        await OrderService.orderSold(this.customer.id, this.order.immediate_price, 11, 21, this.order.order_wallet, this.customer.account , this.order.id).then(
            res=>{
                console.log("즉시구매인서트완료", res)
                this.process =PROCESS.complete; 
                // this.boughtChange()
                // location.href="/buycomplete.html"; //특정값 주고 컴포넌트를 넣는게 좋을듯
            }
        )

        }  catch (err) {
            // alert(err)
            notify({ type: "error", text: err });
            this.process =PROCESS.error; 
            return
        }
        
        // console.log('this.customerId',this.customer.id)
        // console.log('this.detailList.id',this.detailList.id)
        // console.log('this.detailList.immediate_price',this.detailList.immediate_price)
        
    },
    Refresh:function() {
      location.reload()
    }
        
    }
}
</script>

<style scope>

</style>