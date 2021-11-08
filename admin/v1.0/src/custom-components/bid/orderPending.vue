<template>

<div id="chats111" class="tab-pane active" role="tabpanel" aria-labelledby="chats111-tab">
    <div class="pr-1">
        <div class="box px-5 pt-5 pb-5 lg:pb-0 mt-5">
            <div class="relative text-gray-700 dark:text-gray-300">
                <input type="text"
                    class="form-control py-3 px-4 border-transparent bg-gray-200 pr-10 placeholder-theme-13"
                    placeholder="Search" />
                <SearchIcon class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0" />
            </div>
            <div class="overflow-x-auto scrollbar-hidden">
                <div class="flex my-2">
                    <a href="javascript:;" class=" mr-4 cursor-pointer">
                        <div class="text-xs text-gray-600  text-center mt-2 hidden">
                            option 1
                        </div>
                    </a>
                    <a href="javascript:;" class=" mr-4 cursor-pointer hidden">
                        <div class="text-xs text-gray-600  text-center mt-2">
                            option 2
                        </div>
                    </a>
                    <a href="javascript:;" class="mr-4 cursor-pointer hidden">
                        <div class="text-xs text-gray-600  text-center mt-2">
                            option 3
                        </div>
                    </a>
                    <a href="javascript:;" class="mr-4 cursor-pointer hidden">
                        <div class="text-xs text-gray-600  text-center mt-2">
                            option 4
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4">
        <div v-for="(i, idx) in list" :key="idx"
            class="intro-x cursor-pointer box relative flex items-center p-5 mt-5" :class="{ 'mt-5': idx }"
            @click="onSelectRow(i)">
            <div class="w-12 h-12 flex-none image-fit mr-1">
                <img alt="" class="rounded-full"
                    :src="i.thumbnail" />
                <div class="w-3 h-3 bg-theme-20 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
            </div>
            <div class="ml-2 overflow-hidden w-full">
                <div class="flex items-center justify-between ">
                    <a href="javascript:;" class="font-medium">{{i.title}}</a>
                    <div class="text-xs text-gray-500 ml-auto">
                        {{ formatDate(i.end_at) }}
                    </div>
                </div>
                <div class="w-full truncate text-gray-600 mt-0.5">
                    {{ i.description }}
                </div>
            </div>
            <div v-if="i.bid_cnt>0"
                class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-theme-25 font-medium -mt-1 -mr-1">
                {{ i.bid_cnt}}
            </div>
        </div>
    </div>
</div>

</template>

<script>

import dayjs from 'dayjs';
import OrderService from '../../services/order.service'

export default {
    setup() {},
    components: {
      
    },
    data: function(){
        return {
            list:[]
        }
    },
    created: function() {
        this.load();
    },
    props:{
        orderState:String
    },
    methods: {
        load(){
            //stateBy=onsales&filterBy=auctionOnly&sortBy=highestPrice&isBidEnd=true

            let param = {
                sortBy: "newest",
            }
            if(this.orderState){
                // onAuction, closed, matched
                param['auctionStateBy'] = this.orderState
            }
            console.log("param:::", param)
            OrderService.joinBidlist(0, 1000, param).then(r=>{
                console.log("joinBidlist:",r)
                this.list = r.data.items;
            })
        },
         formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('YYYY-MM-DD HH:MM');
        },onSelectRow(obj){
            console.log('item', )
            this.$emit('onSelected', obj)
        }
    }
}
</script>
