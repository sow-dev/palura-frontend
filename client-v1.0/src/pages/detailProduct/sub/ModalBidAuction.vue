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
            <div class="w-full md:w-1/3 ">
              <img :src="order.thumbnail" class="w-full h-80  object-cover" />
              <div class="text-lg text-bold mt-2">{{order.title}}</div>
              <div class="text-sm text-gray-500">{{order.pen_name}}</div>
            </div>
            <div class="w-full md:w-2/3 sm:w-full mt-3">
              <div class="w-full flex flex-col md:flex-row">
                <div class="w-full py-3 border-b border-b-2 border-gray-300 ">
                  <div class="flex flex-col place-items-center">
                      <div class="text-sm text-gray-600 font-normal">CURRENT BID</div>
                        <div class="text-3xl font-medium">
                          <span class="mr-1">
                            <!-- {{bidCurrent}} -->
                            <DecimalValue v-model="bidCurrent" />
                            </span>
                          <span class="text-lg mr-3 font-normal">{{order.taSymbol}}</span>
                          <!-- <span class="text-gray-600 text-sm font-light">$2,60201</span> -->
                        </div>
                  </div>
                </div>
                <div class="w-full py-3 border-b border-b-2 border-gray-300 ">
                  <div class="flex flex-col place-items-center">
                      <div class="text-sm text-gray-600 font-normal">YOUR BALANCE</div>
                        <div class="text-3xl font-medium">
                          <span class="mr-1 ">
                            <!-- {{ customerBalance }} -->
                            <DecimalValue v-model="customerBalance" />
                          </span>
                          <span class="text-lg mr-3 font-normal">{{ order.taSymbol }}</span>
                          <!-- <span class="text-gray-600 text-sm font-light">$2,60201</span> -->
                        </div>
                  </div>
                </div>
              </div>
                <div class="w-full flex flex-col md:flex-row-reverse">
                <div class="w-full py-3  my-10 border-b border-b-2 border-gray-300 " >
                  <div class="flex flex-col place-items-center">
                      <div class="text-sm text-gray-600 font-normal">PLACE YOUR BID</div>
                      <div class="relative text-lg bg-transparent text-gray-800">
                        <div class="flex items-center  border-b border-b-2 border-gray-600 py-2">
                          <input class="w-full bg-transparent text-right border-none mr-1 px-2 leading-tight focus:outline-none text-4xl"
                            type="number" min="0" placeholder="input bid price" v-model="bidPrice" @keyup="bidChanged" @change="bidChanged" >
                          <span class="mt-3 mr-4 font-normal">{{order.taSymbol}}</span>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="w-full py-3 md:my-10  border-b border-b-2 border-gray-50">
                  <div class="flex flex-col place-items-center">
                      <div class="text-sm text-gray-600 font-normal">TOTAL BID AMOUNT</div>
                        <div class="text-3xl font-medium">
                          <span class="mr-1">
                            <!-- {{bidTotal}} -->
                            <DecimalValue v-model="bidTotal" />
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
          <div class="mt-3 md:w-2/3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div class="mt-2">
              <p class="text-sm text-gray-500 my-5">
                Bids placed during an auction cannot be withdrawn. By placing a bid you indicate that you have read and agree to the <span class="underline">Auction Terms of Use </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse my-5">
        <button type="button" class="w-full inline-flex justify-center rounded-sm  px-20 border border-gray-700 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-900 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
        @click="clickBidBtn">
          Submit Bid
        </button>
        <button type="button" class="mt-10 w-full inline-flex justify-center rounded-sm border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        @click="ishidden = !ishidden">
          Cancel
        </button>
      </div>
      </div>
      <div v-if="process==2" class="w-96 md:w-full h-96 flex items-center justify-center">
        <div class="flex flex-col flex justify-center">
            <Loader />
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
                <span class="text-lg underline">Completed your bid</span>
              <div class="mt-5 text-gray-600">
                Bid by <span>{{customer.nickname}}</span> for <span>0.0023</span> <span>{{order.taSymbol}}</span></div>
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
            <img :src="order.thumbnail" class="w-40 h-40 md:w-60 md:h-60 shadow-md  object-cover" />
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-16 md:w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="ishidden=true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <img v-if="customer.avatar!=''" :src="customer.avatar" class="w-40 h-40 md:w-60 md:h-60  object-cover shadow-md rounded-full" />
            <!-- <div v-else class="w-40 h-40 md:w-60 md:h-60 flex justify-center items-center text-sm md:text-xl shadow-md rounded-full bg-gray-400">
               {{customer}}
            </div> -->
             <img v-else :src="pic" class="w-40 h-40 md:w-60 md:h-60  object-cover shadow-md rounded-full" />
          </div>
        </div>
        </div>
        <div class="flex justify-center my-10">
        <button type="button" class="w-full inline-flex justify-center rounded-sm  px-20 border border-gray-700 shadow-sm px-4 py-2 bg-white text-base md:text-xl font-normal text-gray-900 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto"
          @click="process =1;ishidden=true" v-on:click="Refresh">
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
import Loader from "../../../components/loader.vue"
import {Parula} from "../../../parula-js/src/parula.js"
import BidService from "../../../services/bid.service"
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
    },
    mounted(){
      this.getCurrentBid()
      this.getbalance(this.order.taContAddr)
    },
    props: ['order', 'customer', 'bidlist'],
    data: function () {
        return {
            ishidden: true,
            process:1,
            bidPrice:0,
            bidTotal:0,
            bidCurrent:0,
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
      getCurrentBid(){
        if(this.bidlist && this.bidlist.length > 0){
            this.bidCurrent = this.bidlist[0].price
        }else{
          this.bidCurrent = this.order.price_begin
        }
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
      bidChanged(){
        // this.bidTotal = Number(this.bidCurrent) + Number(this.bidPrice)
         this.bidTotal = Number(this.bidPrice)
      },
      clickBidBtn: async function() {
        
        if(Number(this.bidTotal) < Number(this.bidPrice) || Number(this.bidPrice) <= 0 ){
          notify({ type: "error", text: 'invalid bid price' });
          return
        }
        if(Number(this.bidTotal) > Number(this.customerBalance)){
          notify({ type: "error", text: 'not enough balance to bid' });
          return
        }

        try {
          this.process = PROCESS.pending;
          
          const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          // console.log('web3 '+window.ethereum.stringify)
          // console.log('window.ethereum.chainId '+window.ethereum.chainId)
          // console.log('this.bidPrice '+this.bidPrice)
          const parula = new Parula(window.ethereum, {}, line=>console.info('[*] ',line));
          console.log('accounts[0]',accounts[0])
          console.log('this.order.taTypeMV',this.order.taTypeMV)
          console.log('this.order.taContAddr',this.order.taContAddr)
          console.log('Number(this.bidTotal)',Number(this.bidTotal))
          // const ret = await parula.createBidOrder(param)
          const ret = await parula.createBidOrder({
              maker:accounts[0],  //order 생성자 주소  
              maTypeMV:this.order.taTypeMV,           // takerAsset,  // ta, Asset(ETH, "0x", 200), ERC20 //구매
              maContractAddress:this.order.taContAddr,
              maValue:Number(this.bidTotal),  //입찰가격 임의로 2
              auctionId:Number(this.order.id)
          })
          console.log('ret이다',ret)
          BidService.create(this.order.id, this.customer.id, JSON.stringify(ret.data), ret.signature, this.customer.account,this.order.asset_id,this.bidTotal)
          .then(res=>{
            console.log("orderSold Res", res)
            this.process =PROCESS.complete;
            notify({ type: "success", text: "Complete your Bid!" });
          }).catch(err => {
            this.process = PROCESS.error;
            if(err.response){
              console.log(err.response.data)
              // alert(err.response.data)
              notify({ type: "error", text: err.response.data });
            }
            return
          })
        }catch (err) {
            alert(err)
            this.process = PROCESS.error;
            return
        }
        // await this.modalHide()

    },
    Refresh:function() {
      location.reload()
    }
        
    }
}
</script>

<style scope>

</style>