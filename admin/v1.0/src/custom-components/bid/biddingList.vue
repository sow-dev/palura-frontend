<template>
<div v-if="isloading ===true" class="w-full h-5/6 flex justify-center items-center">
  <div class="mx-auto my-auto text-center gray-600">
        <LoadingIcon icon="three-dots" class="w-5 h-5 gray-600" />
    <div class="mt-3">
      <!-- <div class="font-medium">
        Load bid data
      </div> -->
      <div class="text-gray-600 mt-10 animate-pulse">
        Loading bid data ...
      </div>
    </div>
  </div>
</div>
<div v-else>
    <!-- <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Bidding List</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mr-2">Add New Product</button>
      <div class="dropdown ml-auto sm:ml-0">
        <button
          class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
          aria-expanded="false"
        >
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </button>
        <div class="dropdown-menu w-40">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <a
              href=""
              class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <FilePlusIcon class="w-4 h-4 mr-2" /> New Category
            </a>
            <a
              href=""
              class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
            >
              <UserPlusIcon class="w-4 h-4 mr-2" /> New Group
            </a>
          </div>
        </div>
      </div>
    </div>
  </div> -->
    <!-- {{orderDetail}} -->
    
    <div v-if="list && list.length > 0">
          <!-- BEGIN: Users Layout -->
    <div v-for="(i, idx) in list" :key="idx" class="intro-y col-span-12 md:col-span-6">
        <div class="box">
            <div class="flex flex-col lg:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">
                <div class="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                    <!-- <img alt="" class="rounded-full" :src="i.avatar" /> -->
                    <img alt="" class="rounded-full" :src="i.avatar" v-if="i.avatar!=''"/>
                    <img alt="" class="rounded-full" :src="pic" v-else/>
                </div>
                <div class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                    <a href="" class="font-medium"> {{i.name}}/{{ i.nickname }}</a>
                    <div class="text-gray-600 text-xs mt-0.5">
                        {{ i.mail }}
                    </div>
                </div>
                <!-- 완료된 옥션에 낙찰자 표시 -->
                    <div class="text-xl font-semibold text-parula-1 leading-8 mr-4" v-if="i.order_state==3 && i.buyer_id==i.bidder_id"> <!-- TODO: 디자인 필요 -->
                      winner:
                    </div>


                <div class="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                    
                    <!-- <span class="px-2">{{i}}</span> -->
                    <div class="flex flex-row"> 
                      <div class="text-xl font-medium leading-8 ">Bid-Price: {{parseFloat(i.price)}} {{i.symbol}} </div>
                      <!-- <div class="text-sm text-gray-600 m-2 ">{{i.symbol}}</div> -->
                    </div>
                    
                    <span></span>
                    <button class="btn btn-outline-secondary py-1 px-2 ml-4 mr-2" v-if="i.order_state==1" @click="balanceCheck(i)" >Check balance</button>
                    <button class="btn btn-primary py-1 px-2" v-if="i.order_state==1 && current <= 0"  @click="winBid(i)">Win a bid</button>
                    <!-- {{new Date(orderDetail.end_at).getTime()}}<br> -->
                    <!-- {{dateEnd}}<br>
                    {{dateNow}}<br>
                    {{current}}<br>
                    {{current2}} -->

                    <!-- {{today.getTime()}}<br>
                    {{new Date(orderDetail.end_at).getTime() < today.getTime()}}투데이가 크다 <br>
                    {{new Date(orderDetail.end_at).getTime() > today.getTime()}}투데이가 작다 -->

                    
      
                    <!-- {{+orderDetail.end_at == +today.toISOString()}}
                    {{orderDetail.end_at > today.toISOString()}}
                    {{orderDetail.end_at < today.toISOString()}}
                    {{orderDetail.end_at >= today.toISOString()}}
                    {{orderDetail.end_at <= today.toISOString()}}<br>
                    {{orderDetail.end_at.getTime()}} -->
                    <!-- {{orderDetail.end_at.valueOF() }}<br> -->

                    
                    <!-- {{date.parse({{orderDetail.end_at}})}} -->
                    <!-- {{orderDetail.end_at < today.toLocaleDateString()}}<br>
                    {{}}<br> -->
                    
           

                    
                    <!-- 리저브 가격 도달 여부 표시 -->
                    <div class="ml-4 text-sm font-bold text-red-400 leading-8" v-if="i.is_reserve && (Number(i.reserve_price) > Number(i.price))"> <!-- TODO: 디자인 필요 -->
                      fail to reach reserved-price({{i.reserve_price}},{{i.reserve_price}})
                    </div>

                    
                    
                </div>
            </div>
            <div class="flex flex-wrap lg:flex-nowrap items-center justify-center p-5">
                <div class="w-full  mb-4 mr-auto">
                    <div class="flex justify-between text-gray-600 text-xs ">
                        <div >{{i.order_wallet}}</div>
                        <div>{{i.balance}}</div>
                        <!-- {{i}} -->
                        
                    </div>
                    <!-- <div class="progress h-1 mt-2">
                        <div class="progress-bar w-1/4 bg-theme-25" role="progressbar" aria-valuenow="immediate_price"
                            aria-valuemin="0" aria-valuemax="4"></div>
                    </div> -->
                </div>
                
            </div>
        </div>
    </div>
    <!-- END: Users Layout -->
    </div>
    <div v-else class="h-4/6 flex justify-center items-center">
      <div class="mx-auto text-center">
        <div class="w-120 h-120 flex-none image-fit rounded-full overflow-hidden mx-auto ">
          <DatabaseIcon class="w-20 h-20" />
        </div>
        <div class="mt-3">
          <div class="font-medium">
            No Data
          </div>
          <div class="text-gray-600 mt-1">
            There is no bid.
          </div>
        </div>
      </div>
    </div>
</div>

  

  
</template>
<script>
import BidService from '../../services/bid.service.js'
import OrderService from '../../services/order.service.js'
import {Parula} from "../../parula-js/src/parula.js"
import Notify from '../../services/notification.service.js'
import pic from '@/assets/images/mymape_user.png'

export default {
    data: function(){
        return {
            isloading:false,
            list:[],
            orderDetail:{},
            current_order_id:0,
            today:'',
            endtime:{},
            dateEnd:{},
            endTimeType:{},
            dateNow:{},
            pic:pic
         
        }
    },
    created: function() {
      
    },
      mounted(){
        // setTimeout(() => {
        
        //     this.dateEnd = this.timeSave(this.dateEnd)
        // }, 1500);
      },
    computed: {
     
    },
    props: ["orderInfo"],
    methods: {
        load(order_id){
            this.isloading = true;
            BidService.listWithAsset(order_id).then(
            res=>{
                console.log("Bid List !!!::", res)
                this.list = res.data.items
                this.isloading = false;
            }).catch(e=>{
              this.isloading = false;
            })
            this.loadDetailOrder(order_id);

        },
        loadDetailOrder(order_id){
            if(order_id){
                OrderService.detail(order_id).then(res=>{
                  this.orderDetail = res.data;
                  console.log("3333",res.data)
                  this.endtime = res.data.end_at;
                  // console.log("오더엔드타임 출력하기",res.data.end_at);
                  this.endTimeType = res.data.end_at.split("-");
                  this.endTimeType2 = res.data.end_at.split(":");
                  this.endTimeYear = this.endTimeType[0];
                  this.endTimeMonth = this.endTimeType[1];
                  this.endTimeDate = this.endTimeType[2].substring(0,2);
                  this.endTimeHours = this.endTimeType2[0].slice(-2);
                  this.endTimeMinutes = this.endTimeType2[1];
                  this.endTimeSeconds = this.endTimeType2[2].substring(0,2);
                  this.dateEnd = new Date(this.endTimeYear, this.endTimeMonth, this.endTimeDate, this.endTimeHours, this.endTimeMinutes, this.endTimeSeconds);
                  const now = new Date();
                  console.log(now);
                  var yearNow = now.getFullYear();
                  var monthNow = now.getMonth()+1;
                  var dayNow = now.getDate();
                  var hoursNow = now.getHours();
                  var minutesNow = now.getMinutes();
                  var secondNow = now.getSeconds();
                  this.dateNow = new Date(yearNow, monthNow, dayNow, hoursNow, minutesNow, secondNow);

                  this.current = Date.parse(this.dateEnd) - Date.parse(this.dateNow)
                  this.current2 = Date.parse(this.dateNow) - Date.parse(this.dateEnd)
                  console.log(current,"과거와 현제 뺀 값")
                  console.log(current2,"현제에서 과거 뺀 값")
                  return current, current2
                })
            }
        },
        timeSave(){
          

        
        },
        


     
        async balanceCheck(i){
            // var erc1155balance = await parula.getBalanceOf(ALICE_ADDRESS, parula.nft1155Address, id)
            // var erc20Balance = await parula.getBalanceOf(ALICE_ADDRESS, TESTERC20_ADDRESS)
            // var ethBalance = await parula.getBalanceOf(ALICE_ADDRESS)
            // console.log('balanceCheck !! :', i)
            // console.log('i.symbol !! :', i.symbol)
            // const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
            // console.log('accounts for balanceCheck',accounts)
            // let provider = window.ethereum;
            // let config={}
            
            // const parula = new Parula(
            //     provider, config,
            //     line => console.info(`${config.networkName}:: ${line}`)
            // )
            // // console.log('parula:::', parula)
            // console.log('wallet:', i.order_wallet);
            // var weiBalance = await parula.web3.eth.getBalance(i.order_wallet)
            // var etherBalance  = parula.web3.utils.fromWei(weiBalance, 'ether');
            // i.balance = etherBalance;


            try{
            const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log('i',i)
            const balanceABI = [{
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function",
          }]
          console.log('i.order_wallet',i.order_wallet)
          if(i.order_wallet){
            // const parula = new Parula(window.ethereum, {}, line=>console.info('[*] ',line));
            let config={}
            let provider = window.ethereum;
            const parula = new Parula(
                provider, config,
                line => console.info(`${config.networkName}:: ${line}`)
            )
            const contract =  new parula.web3.eth.Contract(balanceABI, i.asset_address);
            console.log('contract',contract)
            const weiBal = await contract.methods.balanceOf(i.order_wallet).call()
            console.log('weiBal',weiBal)
            const ethBal = parula.web3.utils.fromWei(weiBal, 'ether')
            console.log('ethBal',ethBal)
            console.log('result::::', ethBal, weiBal)
            i.balance = ethBal;
          } else {

          }
         
            
            
          }catch(e){
                    // notify({ type: "error", text: e });
                  }

        },
        winBid(obj){
            console.log('[winBid]')
            // this.beforeMatch(obj)
            this.doMatch(obj)
        },
        beforeMatch(obj){
            console.log('[beforeMatch begin]')
            BidService.beforeMatch(obj.order_id, obj.id).then(res=>{
                console.log('beforeMatch res:::', res)
                if(res.data =='ok'){
                    this.doMatch(obj)
                }else{
                    Notify.error('beforeMatch fail\n massage:', res)
                }
            }).catch(e=>{console.log('beforeMatch err::', e)})
        },

        async doMatch(obj){
            console.log('do match begin !!!')
            const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
            const adminAccount = accounts[0];

            const parula = new Parula(window.ethereum, {}, (line) =>
              console.info("[*] ", line)
            );

            // var or = JSON.parse(this.orderDetail.order_rawdata)
            const orderWallet = adminAccount; //or.message.maker;
            const typeMv = this.orderDetail.maTypeMV
            const contAddr = this.orderDetail.maContAddr
            const tokenId = this.orderDetail.maTokenId

            const bidParams = {
              "maker": orderWallet,
              "maTypeMV": typeMv,
              "maContractAddress": contAddr,
              "maValue": tokenId,
              "bidId": obj.id
            }
            console.log('bidParams::', bidParams)
            var ret = await parula.createBidMatch(bidParams)

            // var ret = await parula.createBidMatch({
            //     maker:ALICE_ADDRESS,
            //     maTypeMV:ERC721, maContractAddress:parula.nftAddress, maValue:tokenId,
            //     bidId:tempBidId
            // })
            if(ret.status==false) {
              location.href = location.href
              return
              }
            this.afterMatch(obj)
            
            console.log('match결과 ret:', ret)
            if(ret){
                // 성공시 
                console.log('성공시 !!!', ret)
            }else {
                // 실패시
                console.log('실패시 !!!', ret)
            }
          console.log('obj.order_wallet',obj.order_wallet)
          console.log('obj',obj)
           OrderService.orderSold(obj.bidder_id, obj.price, 11, 21, orderWallet, obj.order_wallet, obj.order_id).then(res=>{
            console.log('매치후 orderSold res::',res)
          })
            
        },
        afterMatch(obj){
            console.log('afterMatch begin::',obj)
            // order_id, bid_id, buyer_id, sold_price, sold_price_usd, sold_price_nativesold_price, sold_price_usd, sold_price_native
             BidService.afterMatch(obj.order_id, obj.id, obj.bidder_id, obj.price,0,0).then(res=>{
                 console.log('afterMatch res::',res)
            })
        },
    

    }
}
</script>
