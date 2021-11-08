<template>
  <div class="w-full elative">
        <div class="w-full lg:fixed mt-8 lg:mt-12  bg-white z-10">
            <h1 class="font-bold text-lg mx-2 md:mx-0 mb-1">Filters</h1>
            <div class="max-w-full m-2 lg:w-60 grid grid-cols-4  lg:grid-cols-1  gap-5 text-sm hover-bg-gray over overscroll-x-auto">
                <p class="text-center px-2 py-2  text-black transition-colors duration-150 border border-black focus:shadow-outline hover:text-white lg:w-20"
                @click="all" v-bind:class="{'white': clickedBtn==false, 'clicked': clickedBtn==true}">ALL</p>
                <p class="text-center px-2 py-2  text-black transition-colors duration-150 border border-black focus:shadow-outline hover:text-white lg:w-36" 
                @click="mint" v-bind:class="{'white': clickedBtn2==false, 'clicked': clickedBtn2==true}">Listings</p>
                <p class="text-center px-2 py-2 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:text-white lg:w-24"
                @click="sold" v-bind:class="{'white': clickedBtn3==false, 'clicked': clickedBtn3==true}">Sold</p>
                <p class="text-center px-2 py-2  text-black transition-colors duration-150 border border-black focus:shadow-outline hover:text-white lg:w-20"
                @click="bid" v-bind:class="{'white': clickedBtn4==false, 'clicked': clickedBtn4==true}">Bids</p>
            </div>
        </div>
    </div>
</template>

<script>
import HistoryService from "../../../services/history.service"

export default {
     props: {
         items:[],
     },
     data:function() {
         return {
             clickedBtn:false,
             clickedBtn2:false,
             clickedBtn3:false,
             clickedBtn4:false
         }
     },
     methods:{
          mint:function() {
            console.log('this.itemlist',this.itemlist)
            this.clickedBtn2 = !this.clickedBtn2
            this.clickedBtn = false
            this.clickedBtn3 = false
            this.clickedBtn4 = false
            HistoryService.mint(1).then(
                res=>{
                    console.log("mint", res.data.items)
                    this.itemlist = res.data.items
                    console.log('this.itemlist',this.itemlist)
                    this.$emit('Filter',this.itemlist)
                    
                }
            ) 
            
        },
        all:function(){
            console.log('this.itemlist',this.itemlist)
            this.clickedBtn = !this.clickedBtn
            this.clickedBtn2 = false
            this.clickedBtn3 = false
            this.clickedBtn4 = false
            HistoryService.listAll(1).then(
                res=>{
                    console.log("listed", res.data.items)
                    this.itemlist = res.data.items
                    console.log('this.itemlist',this.itemlist)
                    this.$emit('Filter',this.itemlist)
                    
                    }
                    
            ) 
        },
        sold:function() {
            console.log('this.itemlist',this.itemlist)
            this.clickedBtn3 = !this.clickedBtn3
            this.clickedBtn = false
            this.clickedBtn2 = false
            this.clickedBtn4 = false
             HistoryService.sold(1).then(
            res=>{
                console.log("sold", res.data.items)
                this.itemlist = res.data.items
                console.log('this.itemlist',this.itemlist)
                this.$emit('Filter',this.itemlist)
                
            }
        ) 
        },
        bid:function() {
            console.log('this.itemlist',this.itemlist)
            this.clickedBtn4 = !this.clickedBtn4
            this.clickedBtn = false
            this.clickedBtn2 = false
            this.clickedBtn3 = false
            HistoryService.bid(1).then(
            res=>{
                console.log("bid", res.data.items)
                this.itemlist = res.data.items
                console.log('this.itemlist',this.itemlist)
                this.$emit('Filter',this.itemlist)
                
            }
        )     
        },
        scrollevent(_scrolled){
            console.log('_scrolled', _scrolled)
        }

    }
}
</script>

<style>
.hover-bg-gray > p:hover{
    background:#262626;
}

.white {
    background-color: white;
       
   }
.clicked {
    background-color: #262626;
    color: white !important;
}
</style>