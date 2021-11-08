
<template>
  <div class="w-full mt-10">
      <div class="relative">
          <div class="w-full flex justify-between">
              <h1 class="text-3xl font-bold">Auction</h1>
              <section class="dropdown mt-3 z-10 mr-5" id="Theme2">
                <div class="group inline-block">
                    <button
                        class="flex select2 outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center w-44"
                    >
                        <span class="text pr-1 font-light flex-1 text-sm text-gray-900 hover:text-gray-200">Newest</span>
                        <span>
                        <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180
                            transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                        </span>
                    </button>
    
                    <ul  class="option-list absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden market_filter_shadow z-50 transform scale-0 group-hover:scale-100 absolute 
                    transition duration-80 ease-in-out origin-top min-w-42 min-h-42" >
                        <!-- <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        :class="{'text-white bg-gray-800': ds.recentlyActive }" @click="ds.recentlyActive=!ds.recentlyActive;onChange()"
                        >Recently Active</li> -->
                        <!-- <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        
                        >Recently Active</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400" 
                      
                        >Ending Soon</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                      
                         >Lowest Price</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400" 
                       
                        >Highest Price</li> -->
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        v-on:click="newestBtn"
                         >Newest</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        v-on:click="oldestBtn"
                         >Oldest</li>
                        </ul>
                    </div>
                </section>
            </div>
            <!-- collection-wrapper -->
        <!-- <div class="flex flex-row overflow-x-scroll    shadow-inner border-dashed border-0 bg-parula-gray-3  w-full h-full ml-3 md:ml-0"> -->
          <div class="w-full flex flex-row overflow-x-scroll border-dashed border-0  mt-3 w-full h-full p-5">

              <div class="h-96 flex items-center justify-center w-full my-auto " v-if="auctionInfo.length<1"> 
                  <div class=" flex flex-col md:flex-row">
                    <img src="../../../assets/img/auction.png" class="rounded-t-lg w-20 mx-auto object-cover">
                    <p class="text-lg md:text-xl mt-6 ml-6 text-center md:text-left">Looks like there's nothing in this collection yet!<br>
                        See what's being created and collected in the <a href="" class="underline font-semibold">Market feed.</a></p>
                  </div>
                  
              </div>
              <!-- <div v-else class="m-5 bg-white rounded-xl w-60"
                v-for="item in auctionInfo"
                v-bind:key="item.id" >
           
                    <img :src="item.thumbnail" class="w-full h-40 rounded-t-xl object-cover">
                    <div class="flex flex-col m-2 bg-white">
                    <div class="my-2 border-b-2">
                        {{item.price}} <span class="text-xs">{{item.asset_symbol}}</span>
                    </div>
                    <div class="flex justify-between my-2 ">
                        <div class="text-semibold">{{item.product_name}}</div>
                        <div class="text-sm text-light text-parula-gray-1">{{item.creator_pen_name}}</div>
                    </div>
                    <div class="flex justify-end text-parula-gray-1">
                        <div class="text-sm">bid at <span class="text-xs">{{item.bid_at.replace('T',' ').replace('.000Z','')}}</span></div>    
                    </div>
                    </div>
              </div> -->
              <div v-else class="flex gap-10 p-5 scroll"> 
                <div class="container w-60 bg-white mx-auto  rounded-lg max-w-md hover:shadow-2xl transition duration-300"
                    v-for="item in auctionInfo"
                    v-bind:key="item.id">
                    <!-- <div class="w-40 flex"> -->
                        <!-- <span class="text-xs">{{item}}</span> -->
                        <img :src="item.thumbnail" class="rounded-t-lg w-full h-64 object-cover">
                        <div class="flex flex-col p-2 bg-white">

                         <!-- 첫번쨰 시안  -->   
                        <!-- <div class="my-2 " v-if="item.sold_at==null">
                            <div class="px-4">
                                <p class="text-sm text-parula-gray-1 font-semibold text-left">My Bid Price</p>
                                <p class="text-right text-base text-parula-dark font-semibold"><span class="text-lg">
                                    <DecimalValue v-model="item.price" /></span>	&nbsp;{{item.asset_symbol}}</p>
                            </div>
                            <div class="border-b-edit my-4"></div>
                            <div class="flex px-4 justify-between" >
                                <p class="text-sm text-parula-gray-1 font-semibold">Creator<br>
                                    <span class="text-sm text-parula-dark font-semibold">@{{item.creator_pen_name}}</span>
                                   
                                </p>
                                 <div class="w-10 h-10 bg-black rounded-full"></div>
                            </div>
                            <button class="w-full h-8 bg-parula-dark text-white mt-2" v-if="item.highest_bidder_id==item.bidder_id">내가 최고 입찰자</button>
                            <button class="w-full h-8 bg-parula-dark text-white mt-2" v-else>Try it again</button>
                        </div> -->


                        <!-- 두번쨰 시안  -->
                        <div class="my-2 " v-if="item.sold_at==null">
                            <div class="px-4 flex justify-between items-center">
                                <p class="text-sm text-parula-gray-1 font-semibold text-left">My Bid Price</p>
                                <p class="text-right text-base text-parula-dark font-semibold"><span class="text-lg">
                                <DecimalValue v-model="item.price" /></span>	&nbsp;{{item.asset_symbol}}</p>
                            </div>
                            <div class="border-b-edit my-4"></div>
                            <div class="px-4">
                                <p class="text-sm text-parula-gray-1 font-semibold text-left">Current high bid by </p>
                                <p class="text-sm text-parula-dark font-semibold text-left">@{{item.highest_bidder_nickname}}</p>
                                <p class="text-right text-base text-parula-dark font-semibold"><span class="text-lg">
                                    <DecimalValue v-model="item.highest_bid_price" /></span>	&nbsp;{{item.asset_symbol}}</p>
                            </div>
                            <button class="w-full h-8 bg-parula-dark text-white mt-2" v-if="item.highest_bidder_id==item.bidder_id">내가 최고 입찰자</button>
                            <button class="w-full h-8 bg-parula-dark text-white mt-2" v-else>Try it again</button>
                        </div>

                        <!-- 세번쨰 시안  -->
                        <!-- <div class="my-2 " >
                            <div class="flex px-4 justify-between" >
                                <p class="text-sm text-parula-gray-1 font-semibold">Creator<br>
                                    <span class="text-sm text-parula-dark font-semibold">@{{item.creator_pen_name}}</span>
                                   
                                </p>
                                 <div class="w-10 h-10 bg-black rounded-full"></div>
                            </div>
                            <div class="border-b-edit my-4"></div>
                             <div class="flex px-4 justify-between" >
                                <p class="text-sm text-parula-gray-1 font-semibold">Owner<br>
                                    <span class="text-sm text-parula-dark font-semibold">@{{item.creator_pen_name}}</span>
                                   
                                </p>
                                 <div class="w-10 h-10 bg-black rounded-full"></div>
                            </div>
                            <button class="w-full h-8 bg-parula-dark text-white mt-4">다른 사람이 구매완료</button>
                          
                        </div> -->




                            <!-- {{item.price}} <span class="text-xs">ETH</span>
                        <div class="flex justify-between  ">
                            <div class="text-semibold">{{item.product_name}}</div>
                            <div class="text-sm text-light text-parula-gray-1">{{item.creator_pen_name}}</div>
                        </div> -->
                            <!-- <div class="flex justify-end text-parula-gray-1">
                                <div class="text-sm">bid at <span class="text-xs">{{item.bid_at.replace('T',' ').replace('.000Z','')}}</span></div>    
                            </div> -->
                        </div>
                </div>
            </div>
          </div>
        </div>  
    </div>  
</template>

<script>
import UserService from '../../../services/user.service.js'
import SessionService from "../../../services/session.service"
import DecimalValue from '../../../components/DecimalValue'

export default{
     data: function(){
       return{
            userId:this.UserDatas.id,
            auctionInfo:[],
            name:this.UserDatas.name,
            sellerInfo:[],
       }
   },
    components: {
        DecimalValue,
    },
    props:{
        UserDatas:Object,
        UserIds:String
    },
    conmputed: {
     
    },
    created: function() {
        this.userName = SessionService.getNickname();
        this.sellerid = UserService.byId();
        
        UserService.bidHistoryNewest(this.userName).then(res=>{
            this.auctionInfo = res.data.items
            this.sellerInfo= res.data.items.seller_id;
         
        })
        // UserService.byId(this.sellerid).then(res=>{
        // this.seller = res
        // console.log("asdfjkhalkjsdfhalkjsdhfkljasdhfkjahsdf",res)
        // })
        // this.newestBtn();
    },
    methods: {
        newestBtn:function() {
        UserService.bidHistoryNewest(this.userName).then(res=>{
            this.auctionInfo = res.data.items
            console.log('this.auctionInfo',this.auctionInfo)
            this.auctionInfo.push(this.auctionInfo[0])
            this.auctionInfo.push(this.auctionInfo[0])
            this.auctionInfo.push(this.auctionInfo[0])
            this.auctionInfo.push(this.auctionInfo[0])  
        })
        },
        oldestBtn:function() {
            UserService.bidHistoryOldest(this.userName).then(res=>{
                this.auctionInfo = res.data.items  
            })
        },

       

    }
   
}
</script>

<style scoped>
.h-edit-60vh{
    height:60vh;
}
.scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}
.border-dashed{
    border-color:#bababa;
}
.dropdown:focus-within .dropdown-menu {
  opacity:1;
  transform: translate(0) scale(1);
  visibility: visible;
}
.dropdown > div{
      border-color: #ccc;
      z-index:99999;
  }
  .dropdwon ul, .dropdown li {
      z-index:9999;
  }
  .dropdown li>ul                 { transform: translatex(100%) scale(0) }
  .dropdown li:hover>ul           { transform: translatex(101%) scale(1) }
  .dropdown li > button svg       { transform: rotate(-90deg) }
  .dropdown li:hover > button svg { transform: rotate(-270deg) }

  .group:hover .group-hover\:scale-100 { transform: scale(1) }
  .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
  .scale-0 { transform: scale(0) }
  .min-w-32 { min-width: 8rem }
</style>



