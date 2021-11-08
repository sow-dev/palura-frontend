<template>
<div class="flex h-screen flex-wrap">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
         <div class="my-wrapper 2xl:w-1440px w-full h-full mx-auto relative">
            <ParulaHeader/>
            
            <div v-if="marketId" class="component-wrapper"  >
                <DetailComponent v-bind:isChoicedMarketIds="marketId" v-bind:Bought="isBought" v-on:boughtChange="boughtChanges" v-if="isBought==false"/>
            </div>
            <!-- <div v-if="detailList.order_type==0">
                <AuctionDetail v-bind:ismarketIds="marketId" v-bind:Bought="isBought" v-on:boughtChange="boughtChanges" v-if="isBought==false" />
            </div>
            <div v-else> 
                <FixedDetail v-bind:ismarketIds="marketId" v-bind:Bought="isBought" v-on:boughtChange="boughtChanges" v-if="isBought==false" />
            </div> -->
            
        </div>
        
        </div>
        <div class="flex-1 "></div>
</div>
 
</template>

<script>

import ParulaHeader from "../../components/ParulaHeader.vue";
// import MarketComponent from "../../components/market/MarketComponent.vue";

import DetailComponent from "./sub/DetailComponent.vue";
// import AuctionDetail from "./sub/aution-detail.component";
// import FixedDetail from "./sub/fixed-detail.component";
// import FixedDetailComponent from './sub/fixed-detail.component.vue';


export default {
    beforeCreate:function(){
      
    },
 
    created: function() {
      const url =  window.location.href
      var orderId = url.split("/").pop();
      this.marketId =orderId;
    //   this.marketId=localStorage.getItem('clickedId')
      console.log('this.marketId',this.marketId)
    },
    data: function(){
        return{
    //         itemlist:[],
            marketId:null,
            isBought:false
        }
    },
    // props: ['ismarketIds'],
    components: {
        ParulaHeader,
        // MarketComponent,
        DetailComponent,
        
    },
    methods:{
        clickDetails: function(id) {
        this.marketId= id
        console.log(this.marketId);
        // location.href="/subpage.html";
      }
    }
}
</script>

<style>
#logo-other{
    display:inline-block;
}
</style>
