<template>
<div class="flex h-screen flex-wrap">
    <div class="flex-1 "></div>
    <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
        <div class="my-wrapper 2xl:w-1440px w-full h-full mx-auto relative">
            <ParulaHeader />
            
            <!-- <div class="component-wrapper w-full h-full mx-auto" v-if="ChoicedMarketId==''"> -->
            <!-- <button @click="onFilter()" >isGridBlur</button> -->
                <!-- {{filterParams}} -->
            <MarketToolbar ref="market_toolbar" v-on:toggleFilter="onFilter" v-on:filterChanged="onChangeFileter"  />
            <MarketGrid ref="market_grid" :ds="itemlist" />
            <!-- <MarketComponent v-bind:isChoicedMarketIds="ChoicedMarketId" v-on:clickDetail="clickDetails" /> -->

        </div>
    </div>
    <div class="flex-1 "></div>
</div>
 
</template>

<script>




import ParulaHeader from "../../components/ParulaHeader.vue";
// import MarketComponent from "../../components/market/MarketComponent.vue";
import MarketToolbar from "./subs/market-toolbar.vue"
import MarketGrid from "./subs/market-grid.vue"
import OrderService  from "../../services/order.service.js"

export default {
    data: function () {
        return {
            //itemlist:[],
            ChoicedMarketId: "",
            itemlist:[],
            filterParams:null,

        }
    },
    components: {
        ParulaHeader,
        // MarketComponent,
        MarketToolbar,
        MarketGrid
    },
    created:function(){
        this.defaultLoad()
    },
    methods: {
        onFilter(isOpen){
            console.log(isOpen)
            this.isGridBlur = isOpen
            this.$refs.market_grid.blur(isOpen)
            this.$refs.market_toolbar.open(isOpen)
        },
        onChangeFileter(params){
            console.log(params)
            this.filterParams= params
            if(params.aution_only == true){
                console.log("auction true")
                this.AuctionOnlyBtn();
                params.fixed_only = false;
                params.genesis = false;
            }
            if(params.fixed_only == true){
                console.log("fixed true")
                this.FixedOnlyBtn();
                params.aution_only = false;
                params.genesis = false;
            }
            if(params.liked == true) {
                console.log("liked true")
                this.LikeOnlyBtn();
            }
            if (params.genesis == true){
                console.log("genesis true")
                this.GenesisBtn();
                params.aution_only = false;
                params.fixed_only = false;
            } 
            if (params.clear == true){
                this.defaultLoad();
                params.aution_only = false;
                params.fixed_only = false;
                params.genesis = false;
                params.liked = false;
                params.clear = false;
            }
            if (params.assetType == 'erc721') {
                this.assetTypeBtn('erc721')
            }
            if (params.assetType == 'erc20') {
                this.assetTypeBtn('erc20');
            }
            if(params.assetType == 'all'){
                this.assetTypeBtn('');
            }
            if(params.mint_before.length > 8 ){
                var before_mint = params.mint_before
                this.mintBeforeBtn(before_mint);
            }
            if(params.mint_after.length > 8 ){
                var after_mint = params.mint_after
                this.mintBeforeBtn(after_mint);
            }
            if(params.search.length > 2 ) {
                var search_bar = params.search
                this.SearchBtn(search_bar)
            }
            if(params.recentlyActive == true){
                this.recentlyActiveBtn();
                console.log("recentlyactive")
                params.recentlyActive = false;
            }
            if(params.EndingSoon == true){
                this.EndingSoonBtn();
                params.EndingSoon = false;
            }
            if(params.LowestPrice == true) {
                this.LowestPriceBtn();
                params.LowestPrice = false;
            }
            if(params.HighestPrice == true) {
                this.HighestPriceBtn();
                params.HighestPrice = false;
            }
            if(params.Newest == true) {
                this.NewestBtn();
                params.Newest = false;
            }
            if(params.Oldest == true) {
                this.OldestBtn();
                params.Oldest = false;
            }
        },
        clickDetails: function (id) {
            this.ChoicedMarketId = id
            console.log(this.ChoicedMarketId);
            location.href = `/detail.html/${id}`;
        },
        clicked: function (id) {
            console.log('id   ' + id)
            this.$emit('clickDetail', id);
            window.scrollTo(0, 0); //페이지 이동시 스크롤 최상단으로 이동시킴.
        },
        defaultLoad(){
            OrderService.dsplist().then(
            res=>{
                console.log("resinfo", res)
                this.itemlist = res.data.items
                console.log("this.itemlist::::",this.itemlist)
            }
        )
        },
        OldestBtn: function () {
            OrderService.dsplistOldest().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        LowestPriceBtn: function () {
            OrderService.dsplistLowestPrice().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        HighestPriceBtn: function () {
            OrderService.dsplistHighestPrice().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        recentlyActiveBtn: function () {
            OrderService.dsplistRecentlyPrice().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        NewestBtn: function () {
            OrderService.dsplistRecentlyPrice().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        EndingSoonBtn: function () {
            OrderService.dsplistEndingSoon().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        AuctionOnlyBtn: function () {
            OrderService.dsplistAuctionOnly().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        FixedOnlyBtn: function () {
            OrderService.dsplistFixedPriceOnly().then(
                res => {
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
         LikeOnlyBtn: function() {
          OrderService.dsplistMostPopular().then(
            res=>{
                this.itemlist = res.data.items
                console.log(this.itemlist)
            }
            )
        },
        GenesisBtn: function() {
          OrderService.dsplistgenesisPriceOnly().then(
            res=>{
                this.itemlist = res.data.items
                console.log(this.itemlist)
            }
            )
        },
        assetTypeBtn: function(res) {
            OrderService.dsplistassetTypeBy(res).then(
            res=>{
                this.itemlist = res.data.items
                console.log(this.itemlist)
            }
            )
        },
        assetSymbolBtn: function() {
            const assetSymbol = document.getElementById('assetSymbol').value;
            console.log("assetSymbol 값",assetSymbol)
            OrderService.dsplistassetSymbolBy(assetSymbol).then(
                res=>{
                    this.itemlist = res.data.items
                    console.log(this.itemlist)
                }
            )
        },
        mintBeforeBtn: function(res) {
            OrderService.dsplistmintBefore(res).then(
            res=>{
                this.itemlist = res.data.items
                console.log(this.itemlist)
            }
            )
        },
        mintAfterBtn: function(res) {
            OrderService.dsplistmintAfter(res).then(
            res=>{
                this.itemlist = res.data.items
                console.log(this.itemlist)
            }
            )
        },
        SearchBtn: function(res) {
          OrderService.dsplistSearch(res).then(
            res=>{
                this.itemlist = res.data.items
                console.log(this.itemlist)
            }
            )
        },

    }
}

</script>
<style>
#logo-other{
    display:inline-block;
}
</style>
