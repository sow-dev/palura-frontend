<template>
<div>
    <!-- 'id','title','image','pen_name','price_fixed','asset_symbol','price_begin', 'sold_price', 'created_at' -->
<div class="min-h-screen py-0 px-0 w-11/12 mx-auto sm:w-full">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-0 md:gap-x-20 xl:gap-x-24 2xl:gap-x-32 gap-y-16 3xl:gap-x-64  blur-md duration-300 " :class="{'filter blur-3xl': isBlur }">
    <!-- class="container mx-auto shadow-lg rounded-lg max-w-md hover:shadow-2xl transition duration-300" -->
    <div v-for="i in ds" v-bind:key="i.id" >
        <!-- <img :src="item.image" alt=""
            class="rounded-t-lg w-full">
        <div class="p-6">
            <h1
                class="md:text-1xl text-xl hover:text-indigo-600 transition duration-200  font-bold text-gray-900">
                This is Amazing for people to visit.</h1>
            <p class="text-gray-700 my-2 hover-text-900 ">Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Praesentium quis.</p>
        </div> -->
        <!-- {{i }} -->
        <ItemFixedA v-if="i.order_type ==1" :id="i.id" :title="i.title" :image="i.thumbnail" :pen_name="i.pen_name" :price_fixed="i.price_fixed" :asset_symbol="i.assetSymbol" :orderState="i.order_state" :fileType="i.sub_content_type" />
        <ItemAuctionA  v-else :id="i.id" :title="i.title" :image="i.thumbnail" :pen_name="i.pen_name" :price_fixed="i.price_fixed" 
        :asset_symbol="i.assetSymbol" :price_begin="i.price_begin" :sold_price="i.sold_price" :end_at="i.end_at" :created_at="i.created_at" :orderState="i.order_state" :fileType="i.sub_content_type"/>
        
    </div>

</div>
</div>

 <div class="grid grid-option gap-x-32 place-content-center ">
    <div class="market-album block relative w-full h-full mt-4"
        v-for="item in ds"
        v-bind:key="item.id"
        >
    <!-- <div class="w-full h-full mx-auto" v-if="item.price_fixed != 0">
        <div class="market-img w-full h-full mx-auto bg-black" v-on:click="clicked(item.id)">
            <img :src="item.image" class="w-full h-full object-cover ">
        </div>
        
        <div class="market-txt w-full h-60px  mx-auto relative mt-4" > 
            <h1 class="text-normal font-semibold">{{item.title}}{{item.id}}&nbsp;</h1>
            <p class="mt-2 gray-color text-xs font-medium">{{item.pen_name}}&nbsp;</p>
            <h2 class="absolute right-0 bottom-0 gray-color text-sm font-semibold">{{item.price_fixed}}&nbsp;<span style="font-size:10px;">{{item.asset_symbol}}</span></h2>
        </div>
    </div> -->
    <!-- <ItemFixedA v-if="item.price_fixed != 0" />
    <ItemAuctionA v-else /> -->

    <!-- <div class="w-full h-full2 mx-auto"  v-else>
        <div class="market-img w-full h-full mx-auto relative" v-on:click="clicked(item.id)">
                <img :src="item.image" class="w-full h-full object-cover ">
                <div class="w-full h-16 bg-black bg-opacity-70 absolute bottom-0 pl-3 pt-3">
                    <p class="text-xs text-white font-light">AUCTION ENDS IN 5,610 BLOCKS</p>
                    <h2 class="text-base text-white">{{item.created_at.substring(0, 10) + "..."}}</h2>
                    <h2 class="text-xl text-white absolute right-2 bottom-2">{{item.price_begin}}<span class="text-base pl-1">{{item.asset_symbol}}</span></h2>

                </div>
            </div>
        <div class="market-txt w-full h-60px mx-auto relative mt-4">
            <h1 class="text-normal font-semibold">{{item.title}}{{item.id}}</h1>
            <p class="mt-2 gray-color text-xs font-medium">{{item.pen_name}}</p>
            <h2 class="absolute right-0 bottom-0 gray-color text-sm font-semibold">{{item.price_begin}}{{item.sold_price}}<span>{{item.asset_symbol}}</span></h2>
            
        </div>
    </div> -->
    </div>
</div>
</div>
</template>


<script >
    import ItemFixedA  from './items/market-item-fiexd-a.vue'
    import ItemAuctionA  from './items/market-item-auction-a.vue'
    export default {
        created: function () {
        },
        data: function () {
            return {
                isBlur:false
            }
        },
        props:['ds'],
        components: {
            ItemFixedA,
            ItemAuctionA,
        },methods:{
            blur(val){
                this.isBlur = val;
            }
        }
    } 
</script>

<style scope>
  
</style>