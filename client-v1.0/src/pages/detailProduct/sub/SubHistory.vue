<template>
  <div v-if="historyInfos" class="history-wrapper">
    <div  v-for="item in historyInfos.items" v-bind:key="item.id"  >
    
    <div v-if="item.event=='mint'" class="w-full flex flex-row border-b  	p-4">
      <img :src='item.target_thumbnail' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <div class="ml-3 font-medium text-base text-parula-dark">
       <div>Minted <span>{{item.asset_amount}}</span> edition for <span>{{item.asset_symbol}}</span></div>
       <p>by <span><b>@{{item.user_nickname}}</b></span> at <span class="text-xs">{{item.created_at.replace('T',' ').replace('.000Z','')}}</span></p>
      </div>
    </div>


    <div v-else-if="item.event=='listed'" class="w-full flex flex-row border-b  	p-4">
      <img :src='item.user_avatar' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <div class="ml-3 font-medium text-base text-parula-dark">
       <div>Listed <span>{{item.asset_amount}}</span> edition for <span>{{item.asset_symbol}}</span></div>
       <p>by <span><b>@{{item.user_nickname}}</b></span> at <span class="text-xs">{{item.created_at.replace('T',' ').replace('.000Z','')}}</span></p>
      </div>
    </div>

    <div v-else-if="item.event=='bid'" class="w-full flex flex-row border-b  	p-4">
      <img v-if="item.user_avatar!=''" :src='item.user_avatar' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <img v-else :src='pic' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <div class="ml-3 font-medium text-base text-parula-dark">
       <div>Bid </div>
       <p>by <span><b>@{{item.user_nickname}}</b></span> at <span class="text-xs">{{item.created_at.replace('T',' ').replace('.000Z','')}}</span></p>
      </div>
    </div>

    <div v-else-if="item.event=='sold'" class="w-full flex flex-row border-b  	p-4">
      <img v-if="item.user_avatar!=''" :src='item.user_avatar' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <img v-else :src='pic' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <div class="ml-3 font-medium text-base text-parula-dark">
       <div>Sold <span>{{item.asset_amount}}</span> edition </div>
       <p>to <span><b>@{{item.user_nickname}}</b></span> at <span class="text-xs">{{item.created_at.replace('T',' ').replace('.000Z','')}}</span></p>
      </div>
    </div>

    <div v-else-if="item.event=='wontheauction'" class="w-full flex flex-row border-b  	p-4">
      <img v-if="item.user_avatar!=''" :src='item.user_avatar' class="w-12 h-12 rounded-full text-parula-gray-3">
      <img v-else :src='pic' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <div class="ml-3 font-medium text-base text-parula-dark">
       <div>Won the auction </div>
       <p>by <span><b>@{{item.user_nickname}}</b></span> at <span class="text-xs">{{item.created_at.replace('T',' ').replace('.000Z','')}}</span></p>
      </div>
    </div>

    <div v-else class="w-full flex flex-row border-b  	p-4">
      <img v-if="item.user_avatar!=''" :src='item.user_avatar' class="w-12 h-12 rounded-full text-parula-gray-3">
      <img v-else :src='pic' class="w-12 h-12 rounded-full text-parula-gray-3 object-cover">
      <div class="ml-3 font-medium text-base text-parula-dark">
       <div>{{item.event}}</div>
       <p>by <span><b>@{{item.user_nickname}}</b></span> at <span class="text-xs">{{item.created_at.replace('T',' ').replace('.000Z','')}}</span></p>
      </div>
    </div>

    </div>

    
  </div>





</template>

<script>
import pic from '@/assets/img/mymape_user.png'

export default {
  props:['historyInfos'],
  data: function () {
        return {
            pic: pic
        }
    },
}
</script>

<style scope>
.border-b{
    border-bottom:0.5px solid #262626;
}
</style>