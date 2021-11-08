<template>
<div class="flex min-h-screen flex-wrap">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
         <div class="my-wrapper 2xl:w-1440px w-full h-full mx-auto relative">
            <!-- <notifications /> -->
            <ParulaHeader/>
            <div v-if="ds">
            <PanelAuction v-if="ds.order_type==2" :detailList="ds"  />
            <PanelFixed v-else :detailList="ds" />
            </div>
            <div class="bg-white  mb-4 flex flex-wrap justify-center mt-20 w-11/12 mx-auto sm:w-full">
                <div class="w-full md:w-1/2 lg:w-3/5 mr-auto mb-10">
                <Creator :userId="ds.creator_id" />
                <Artworks :userId="ds.creator_id" :penName="ds.pen_name" />
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 flex flex-col px-6 ">
                <div class="bg-white">
                <nav class="flex flex-col sm:flex-row border-b">
                    <button class="text-parula-dark py-4 px-6 w-full block hover:text-gray-500 focus:outline-none "
                    :class="{'text-parula-dark border-b font-medium ': mode=='history'}" @click="mode='history'" >
                        HISTORY
                    </button>
                    <button class="text-parula-dark py-4 px-6 w-full block hover:text-gray-500 focus:outline-none"
                     :class="{'text-parula-dark border-b font-medium': mode=='policy'}" @click="mode='policy'">
                        POLICY
                    </button>
                </nav>
                </div>

                <div class="w-full block">
                <SubHistory v-if="mode=='history'" v-bind:historyInfos="historyInfo" />
                <SubPolicy v-if="mode=='policy'"  />
            </div>

                </div>
                
            </div>
        </div>
        </div>
        <div class="flex-1 "></div>
        <div class="block bg-gray-50 h-60 w-full">
            
        </div>
</div>
 
</template>

<script>

import ParulaHeader from "../../components/ParulaHeader.vue";

// import DetailComponent from "./sub/DetailComponent.vue";
import PanelAuction from "./sub/PanelAuction.vue"
import PanelFixed from "./sub/PanelFixed.vue"
import OrderService from "../../services/order.service"
import UserService from "../../services/user.service.js"
import HistoryService from "../../services/history.service.js"
import ProductService from "../../services/product.service.js"
// import BidService from "../../services/bid.service.js"
import Creator from "./sub/Creator"
import Artworks from "./sub/artworks"
import SubHistory from "./sub/SubHistory.vue"
import SubPolicy from "./sub/SubPolicy.vue"
export default {
    beforeCreate:function(){
      
    },
    created: function() {
    //   const url =  window.location.href
      const urlSearchParams =new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      //console.log(params)
    //   var orderId = url.split("/").pop();
      this.marketId =params.id
    //   console.log('this.marketId',this.marketId)
      this.loadAll(this.marketId)
    },
    data: function(){
        return{
    //         itemlist:[],
            marketId:"",
            ds:null,
            mode:'history',
            detailList:null,
            creatorInfo:{
                avata:'',
            },
            userInfo:null,
            CreatorArt:null,
            historyInfo:null
            
            // isBought:false
        }
    },
    // props: ['ismarketIds'],
    components: {
        ParulaHeader,
        PanelAuction,
        PanelFixed,
        Creator,
        Artworks,
        SubHistory,
        SubPolicy,
        // DetailComponent,
    },
    methods:{
        clickDetails: function(id) {
            this.marketId= id
            console.log(this.marketId);
        // location.href="/subpage.html";
      },
      async loadAll() {
          await this.loadMarketDetail(this.marketId)
          this.loadHistory(this.ds.content_id)
      },

      loadMarketDetail(_orderId){
          return new Promise((resolve, reject)=>{
              OrderService.detailbyid(_orderId).then(res=>{
              console.log('loadMarketDetail;::',_orderId, res.data)
            //   this.ds = res.data
              this.ds = res.data
            //    this.loadCreator(this.ds.creator_id)
               resolve(this.ds)
            }).catch(e=>{
                reject(e)
            })
          })
          
      },
      loadCreator(_creatorId){
          UserService.byId(_creatorId).then(res=>{
              console.log('loadCreator:::',res.data)
              this.creatorInfo = res.data
          }).catch(e=>{

          })
      },
      loadUserInfo(){
          const address = web3.currentProvider.selectedAddress;
           UserService.byAddress(address).then(res=>{
                this.userInfo= res.data.items[0];
           }).catch(e=>{

           })
      },
      loadHistory(_content_id){
          //1,'product',this.detailList.content_id
        console.log('_content_id:::',_content_id)

        // HistoryService.list(1,'product',_content_id).then(res=>{ //임시로 전부다 나오게
        //     console.log('HistoryService res:::',res.data)  
        //     this.historyInfo=res.data
        // })
        ProductService.getHistory(_content_id).then(res=>{
            console.log('_content_id',_content_id)
            console.log('상품히스토리 res:::',res.data)  
            this.historyInfo=res.data
        })
      },
      loadCreatorWorks(_creatorId){
        //   this.detailList.creator_id
        OrderService.dsplistCreator(_creatorId).then(res=>{
            console.log('dsplistCreator res',res.data)
        this.CreatorArt = res.data
        })
      }


    }
}
</script>

<style>
#logo-other{
    display:inline-block;
}
.border-b{
    border-bottom:0.5px solid #262626;
}

</style>