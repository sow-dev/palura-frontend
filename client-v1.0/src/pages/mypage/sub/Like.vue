<template>
  <div class="w-full mt-10">
      <div class="relative">
          <div class="w-full flex justify-between">
              <h1 class="text-3xl font-bold">Liked</h1>
              <section class="dropdown mt-3 z-10 mr-5" id="Theme3">
                <div class="group inline-block">
                    <button
                        class="flex select3 outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center w-44"
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
          <div class="border-dashed border-0 w-full overflow-x-scroll p-5 mt-3 h-full flex flex-row">
              <div class=" flex items-center justify-center  bg-parula-gray-3 scroll  h-96" v-if="likeInfo.length < 1">
                    <!-- <div class="flex flex-col md:flex-row">     -->
                            <img src="../../../assets/img/liked.png" class="rounded-sm w-20 ">
                            <div class="text-xl mt-6 ml-6 ">
                                Looks like there's nothing in this collection yet!<br>
                                <span class="text-sm">See what's being created and collected in the <a href="" class="underline font-semibold">activity feed.</a></span>
                            </div>
                    <!-- </div> -->
              </div>
              <div class="flex gap-10 p-5 scroll  " v-else>
                <div class="container bg-white w-60 mx-auto  rounded-lg max-w-md hover:shadow-2xl transition duration-300 " 
                    v-for="item in likeInfo"
                    v-bind:key="item.id">
                        <img :src="item.thumbnail" class="rounded-t-lg w-full h-72 object-cover">
                    <div class="py-6 px-3">
                        <h1 class="md:text-1xl text-base hover:text-gray-600 transition duration-200  font-bold text-gray-900 ">
                            {{item.name}}</h1>
                        <div class="flex justify-between">
                            <span class="text-parula-gray-1 my-2 text-sm ">{{item.creator_nickname}}</span>
                            <!-- <span class="text-parula-gray-1 my-2 ">{{item.sold_price}}</span> -->
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import LikeService from '../../../services/like.service.js'
import UserService from '../../../services/user.service.js'
import SessionService from "../../../services/session.service"

export default {
    created: function() {
        this.userName = SessionService.getNickname();
        if(this.userName){
            UserService.likedHistoryNewest(this.userName).then(res=>{
                this.likeInfo = res.data.items;
            })
        }
    },
    data: function(){
       return{
            likeInfo:{},
            userName : ''
       }
   },
    props:{
        UserDatas:Object,
        UserNames:String
    },
    methods: {
        saveUserInfo:function() {
            this.userId = this.UserDatas.id
        },
        newestBtn:function() {
        UserService.likedHistoryNewest(this.userName).then(res=>{
            this.likeInfo = res.data.items
        })
        },
        oldestBtn:function() {
            UserService.likedHistoryOldest(this.userName).then(res=>{
                this.likeInfo = res.data.items
               
            })
        }
    }
}
</script>

<style scoped>
.like-main {
    width: 90%;
    height:auto;
    margin:0 auto;
    background: #fff;
    padding-top:5%;
    margin-bottom:10%;
}
.like-header {
    /* display: flex; */
}
.like-header > h1 {
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
.like-wrapper {
    width:100%;
    height:100%;
    overflow: scroll;
    margin-top: 5%;
    display: -webkit-inline-box;
}
.like-wrapper > div {
    margin-right: 5%;
}
.like1 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
}
.like2 {
    width: 218px;
    height: 273px;
    background: #f7f7f7;
}
.like3 {
    width: 219px;
    height: 408px;
    background: #f7f7f7;
}
.like4 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
}

.border-dashed{
    border-color:#bababa;
}
</style>
