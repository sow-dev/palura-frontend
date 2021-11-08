<template>
<div>
    <div class="w-48 h-56 ">
        <!-- <img class="w-full h-full object-cover rounded-lg shadow-xl" :src="image"> -->
        <ContentViwerMain v-model="image" />
      </div>
      <div class="text-left relative w-full h-16">
        <p class="text-normal font-semibold mt-3 uppercase ml-3 drop-shadow-xl">{{title}}</p>
        <p class="mt-1 text-gray-edit text-xs font-medium ml-3 lowercase drop-shadow-xl">{{pen_name}}</p>
        <!-- <p class="absolute right-0 bottom-0 gray-color text-sm font-semibold">{{item.price_fixed}}&nbsp;<span style="font-size:10px;">{{item.asset_symbol}}</span></p> -->
      </div>
</div>
</template>


<script >
import ContentViwerMain from './ContentViwerMain'
export default {
    created: function () {
        // this.image=''
        // this.title=''
        // this.pen_name=''
    },
    data: function () {
        return {}
    },
    // props:{
    //     image:String,
    //     title:String,
    //     pen_name:String
    // },
    props:['image','title','pen_name'],
    components: {
        ContentViwerMain
    },
} 
</script>

<style scope>
   .text-blue-edit{
      color: #064994;
  }
  .text-gray-edit{
      color:#8a8a8a;
  }
</style>