<template>
  <div class="w-full mt-10">
      <div class="relative">
          <div class="w-full flex justify-between">
              <h1 class="text-3xl font-bold">Purchase History</h1>
              <section class="dropdown mt-3 z-10 mr-5" id="Theme">
                <div class="group inline-block">
                    <button class="flex select outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center w-44">
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
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        v-on:click="newestBtn">Newest</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400" 
                        v-on:click="oldestBtn">Oldest</li>
                    </ul>
                </div>
            </section>
          </div>
          <!-- collection-wrapper -->
          <div class="border-dashed border-0 w-full mt-3 p-5" >
              <div v-if="this.historyTotals.length < 1" class="h-96 flex items-center justify-center  bg-parula-gray-3">
                         <img src="../../../assets/img/my-collection.png" alt="">\
                  <p class="text-xl mt-6 ml-6">Looks like there's nothing in this collection yet!<br>
                    See what's being created and collected in the <a href="" class="underline font-semibold">activity feed.</a></p>
              </div>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 p-0 xl:p-5">  
                <div v-for="item in historyBinded" v-bind:key="item.id"
                    class="container bg-white w-60 mx-auto rounded-lg max-w-md hover:shadow-2xl transition duration-300">
                    <img :src="item.thumbnail" class="rounded-t-lg w-full h-72 object-cover">
                    <div class="py-6 px-3">
                        <h1 class="md:text-1xl text-xl hover:text-gray-600 transition duration-200  font-bold text-gray-900 ">
                            {{item.product_name}}</h1>
                        <div class="flex justify-between">
                            <span class="text-parula-gray-1 my-2 ">{{item.creator_nickname}}</span>
                            <!-- <span class="text-parula-gray-1 my-2 ">{{item.sold_price}}</span> -->
                        </div>
                        <!-- <div class="flex justify-end text-xs">{{item.sold_at}}</div> -->

                    </div>
                </div>
              </div>
          </div>
          <div v-if="historyTotals.length > 3" class="w-full flex justify-end my-3">
            <button class="py-1 px-5 shadow-sm text-parula-dark bg-parula-gray-2 border-0 border-gray-600 text-black text-sm rounded-xl" @click="is_more=!is_more;newestBtn()">
                More
            </button>
        </div>
          
      </div>
  </div>
</template>

<script>
import sessionService from '../../../services/session.service.js'
import UserService from '../../../services/user.service.js'




export default {
     data: function(){
       return{
            userName:this.UserDatas.name,
            userId:this.UserDatas.id,
            historyTotals:[],
            historyBinded:[],

            recentlyActive:false,
            EndingSoon:false,
            LowestPrice:false,
            HighestPrice:false,
            Newest:false,
            Oldest:false,
            is_more: false,
       }
   },
    props:{
        UserDatas:Object,
        UserIds:String
    },
    conmputed: {
        // setId:function() {
        //     return this.UserIds
        // }
    },
    created: function() {
        this.userId = sessionService.getUserId();
        this.userName = sessionService.getNickname();
        console.log('this.UserIds',this.UserIds)
        // UserService.purchaseHistory(this.userName).then(res=>{
        //     console.log('purchaseHistory::',res.data.items)
        //     // this.historyTotals = res.data.items
        //     const items = res.data.items
        //     // items.push(items[0])
        //     if(this.is_more){
        //         this.historyTotals = items;
        //     } else{
        //         if(items.length > 3){
        //             this.historyTotals = items.slice(0,3);
        //         }else {
        //             this.historyTotals = items;
        //         }
        //     }
        // })
        this.newestBtn();
    },

    methods: {
        newestBtn: function () {
            UserService.purchaseHistoryNewest(this.userName).then(res => {
                // console.log('purchaseHistory::',res.data.items)
                // this.historyTotals = res.data.items
                this.historyTotals = res.data.items
                this.binding()

            })
        },
        oldestBtn: function () {
            UserService.purchaseHistoryOldest(this.userName).then(res => {
                // console.log('purchaseHistory::',res.data.items)
                // this.historyTotals = res.data.items
                this.historyTotals = res.data.items
                this.binding()

            })
        },
        binding(items){
            // this.historyTotals.push(this.historyTotals[0])
            // this.historyTotals.push(this.historyTotals[0])
            // this.historyTotals.push(this.historyTotals[0])
            // this.historyTotals.push(this.historyTotals[0])
            // this.historyTotals.push(this.historyTotals[0])
            // this.historyTotals.push(this.historyTotals[0])
            if(this.is_more){
                this.historyBinded = this.historyTotals;
            } else{
                if(this.historyTotals.length > 3){
                    this.historyBinded = this.historyTotals.slice(0,3);
                }else {
                    this.historyBinded = this.historyTotals;
                }
            }
        }
    }
    // lowestBtn:function() {
    //     OrderService.purchaseHistory(this.userId , 1).then(res=>{
    //         console.log('purchaseHistory::',res.data.items)
    //         this.historyTotals = res.data.items
    //     })
    // },
    // highesttBtn:function() {
    //     OrderService.purchaseHistory(this.userId , 1).then(res=>{
    //         console.log('purchaseHistory::',res.data.items)
    //         this.historyTotals = res.data.items
    //     })
    // }
   
}
</script>

<style>
.collection-main {
    width: 90%;
    height:auto;
    margin:0 auto;
    background: #fff;
}
.collection-header {
    /* display: flex; */
}
.collection-header > h1 {
    font-size:28px;
    font-weight: 700;
    color:#262626;
    width:200px;
    display:contents;
    overflow: hidden;
}
.header-right{
    float: right;
    
}
.menu {
    display: flex;
}
.menu > div {
    margin-right:5%;
}
.scroll {
    font-size:12px;
    color:#8a8a8a;
    line-height:25px;
}
.chosen-select {
    border-bottom: 1px solid #8a8a8a;
    font-size:18px;
    color:#8a8a8a;
    font-weight:500;
}
.collection-wrapper {
    width:100%;
    height:40vh;
    overflow: scroll;
    margin-top: 5%;
    display: -webkit-inline-box;
}
/* .collection-wrapper > div {
    margin-right: 5%;
} */
.collection1 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
}
.collection2 {
    width: 218px;
    height: 273px;
    background: #f7f7f7;
}
.collection3 {
    width: 219px;
    height: 408px;
    background: #f7f7f7;
}
.collection4 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
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
