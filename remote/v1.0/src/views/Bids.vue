<template>
<div>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Bid Management</h2>
    <!-- <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mr-2">Start New Chat</button>
      <div class="dropdown ml-auto sm:ml-0">
        <button class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300" aria-expanded="false">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </button>
        <div class="dropdown-menu w-40">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <a href=""
              class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
              <UsersIcon class="w-4 h-4 mr-2" /> Create Group
            </a>
            <a href=""
              class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
              <SettingsIcon class="w-4 h-4 mr-2" /> Settings
            </a>
          </div>
        </div>
      </div>
    </div> -->
  </div>
  <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
    <!-- BEGIN: Chat Side Menu -->
    <div class="col-span-12 lg:col-span-4 xxl:col-span-3">
      <div class="intro-y pr-1">
        <div class="box p-2">
          <div class="chat__tabs nav nav-tabs justify-center" role="tablist">
            <a id="pending-tab" data-toggle="tab" data-target="#pending" href="javascript:;"
              class="flex-1 py-2 rounded-md text-center active" role="tab" aria-controls="pending"
              aria-selected="true">on Auction</a>
            <a id="onsale-tab" data-toggle="tab" data-target="#onsale" href="javascript:;"
              class="flex-1 py-2 rounded-md text-center" role="tab" aria-controls="onsale"
              aria-selected="true">closed</a>
            <a id="fail-tab" data-toggle="tab" data-target="#fail" href="javascript:;"
              class="flex-1 py-2 rounded-md text-center" role="tab" aria-controls="fail"
              aria-selected="false">matched</a>

            <a id="profile-tab" data-toggle="tab" data-target="#profile" href="javascript:;"
              class="flex-1 py-2 rounded-md text-center" role="tab" aria-controls="profile"
              aria-selected="false">info</a>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div id="pending" class="tab-pane active" role="tabpanel" aria-labelledby="pending-tab">
          <OrderPending v-on:onSelected ="onSelected" :orderState="'onAuction'" > </OrderPending>
        </div>
        <div id="onsale" class="tab-pane" role="tabpanel" aria-labelledby="onsale-tab">
          <OrderPending v-on:onSelected ="onSelected" :orderState="'closed'"> </OrderPending>
        </div>
        <div id="fail" class="tab-pane" role="tabpanel" aria-labelledby="fail-tab">
          <OrderPending v-on:onSelected ="onSelected" :orderState="'matched'"> </OrderPending>
        </div>

        <div id="profile" class="tab-pane" role="tabpanel" aria-labelledby="profile-tab">
          <div class="pr-1">
            <div class="box px-5 py-10 mt-5">
              <div class="w-20 h-20 flex-none image-fit rounded-full overflow-hidden mx-auto">
                <img alt=""
                  :src="require(`@/assets/images/${$f()[0].photos[0]}`)" />
              </div>
              <div class="text-center mt-3">
                <div class="font-medium text-lg">
                  {{ $f()[0]["users"][0]["name"] }}
                </div>
                <div class="text-gray-600 mt-1">
                  Tailwind HTML Admin Template
                </div>
              </div>
            </div>
            <div class="box p-5 mt-5">
              <div class="flex items-center border-b border-gray-200 dark:border-dark-5 pb-5">
                <div>
                  <div class="text-gray-600">Country</div>
                  <div class="mt-1">New York City, USA</div>
                </div>
                <GlobeIcon class="w-4 h-4 text-gray-600 ml-auto" />
              </div>
              <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
                <div>
                  <div class="text-gray-600">Phone</div>
                  <div class="mt-1">+32 19 23 62 24 34</div>
                </div>
                <MicIcon class="w-4 h-4 text-gray-600 ml-auto" />
              </div>
              <div class="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
                <div>
                  <div class="text-gray-600">Email</div>
                  <div class="mt-1">
                    <div class="mt-1">{{ $f()[0]["users"][0]["email"] }}</div>
                  </div>
                </div>
                <MailIcon class="w-4 h-4 text-gray-600 ml-auto" />
              </div>
              <div class="flex items-center pt-5">
                <div>
                  <div class="text-gray-600">Joined Date</div>
                  <div class="mt-1">{{ $f()[0]["dates"][0] }}</div>
                </div>
                <ClockIcon class="w-4 h-4 text-gray-600 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Chat Side Menu -->
    <!-- BEGIN: Chat Content -->
    <div class="intro-y col-span-12 lg:col-span-8 xxl:col-span-9">
      <div class="h-screen box">
        <!-- BEGIN: Chat Active -->
        <div v-if="!isBidNone " class="h-full flex flex-col">
          <div class="flex flex-col sm:flex-row border-b border-gray-200 dark:border-dark-5 px-5 py-4">
            <div class="flex items-center">
              <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
                <img v-if="selectedOrder.thumbnail" alt="" class="rounded-full"
                  :src="selectedOrder.thumbnail" />
                  <div v-else class="w-full h-full rounded-full bg-gray-100" ></div>
              </div>
              <div class="ml-3 mr-auto">
                <div class="font-medium text-base">
                  <span v-if="selectedOrder.title">{{ selectedOrder.title }}</span>
                  <div v-else class="w-24 bg-gray-400"></div>
                </div>
                <div class="text-gray-600 text-xs sm:text-sm">
                  <div v-if="selectedOrder.bid_cnt">{{ selectedOrder.bid_cnt }} bid <span class="mx-1">•</span></div>
                  <div v-else class="w-24 bg-gray-400"></div>
                   
                  <a href="javascript:;" name="creator-tooltip" class="tooltip">{{selectedOrder.pen_name}}</a>
                   <!-- BEGIN: Custom Tooltip Content -->
                  <div class="tooltip-content">
                      <TippyContent to="creator-tooltip">
                          <div class="relative flex items-center py-1">
                              <div class="w-12 h-12 image-fit">
                                  <img alt="" class="rounded-full" :src="selectedOrder.avatar" />
                              </div>
                              <div class="ml-4 mr-auto">
                                  <div class="font-medium dark:text-gray-300 leading-relaxed">
                                      {{selectedOrder.name}}
                                  </div>
                                  <!-- <div class="text-gray-600">
                                      {{selectedOrder.pen_name}}
                                  </div> -->
                              </div>
                          </div>
                      </TippyContent>
                  </div>
                  <!-- END: Custom Tooltip Content -->
                </div>
              </div>
            </div>
            <div
              class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-gray-200 pt-3 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0">
              <a href="javascript:;" class="w-5 h-5 text-gray-600">
                <RefreshCcwIcon class="w-5 h-5 motion-safe:animate-spin active:text-gray-100"  @click="reloadBids" />
              </a>
              <!-- <a href="javascript:;" class="w-5 h-5 text-gray-600 ml-5">
                <PauseCircleIcon class="w-5 h-5" />
              </a>
              <a href="javascript:;" class="w-5 h-5 text-gray-600 ml-5">
                <PowerIcon class="w-5 h-5" />
              </a> -->
              <div class="dropdown ml-auto sm:ml-3">
                <a href="javascript:;" class="dropdown-toggle w-5 h-5 text-gray-600" aria-expanded="false">
                  <MoreVerticalIcon class="w-5 h-5" />
                </a>
                <div class="dropdown-menu w-40">
                  <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                    <a href=""
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                      <PauseCircleIcon class="w-4 h-4 mr-2" />Pause sale</a>
                    <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                      <PowerIcon class="w-4 h-4 mr-2" />Close sale</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
            
            <div class="clear-both"></div>
            <!-- {{selectedOrder}} -->


            <div class="clear-both"></div>
            <BiddingList ref="bidlist" :orderInfo="selectedOrder" />
            <div class="clear-both"></div>
           
          </div>
          
        </div>
        <!-- END: Chat Active -->
        <!-- BEGIN: Chat Default -->
        <div v-else class="h-full flex items-center">
          <div class="mx-auto text-center">
            <div class="w-120 h-120 flex-none image-fit rounded-full overflow-hidden mx-auto ">
              <!-- <img alt="Icewall Tailwind HTML Admin Template" :src="require(`@/assets/images/${$f()[0].photos[0]}`)" /> -->
              <ShoppingCartIcon class="w-20 h-20" />
            </div>
            <div class="mt-3">
              <div class="font-medium">
                Hey, Let's make a big deal!
              </div>
              <div class="text-gray-600 mt-1">
                Please select an order to see a list of bids.
              </div>
            </div>
          </div>
        </div>
        <!-- END: Chat Default -->
      </div>
    </div>
    <!-- END: Chat Content -->
  </div>
</div>
</template>

<script>
import OrderPending from '../custom-components/bid/orderPending.vue'
import BiddingList from '../custom-components/bid/biddingList.vue'
import { assetForm} from '../custom-components/asset/AssetForm.vue'
// import BidService from '../services/bid.service.js'
import { ref } from 'vue'
// import BlockChainList from "../custom-components/blockchain/blockchainList.vue"

// import { OrderDone } from './CMS-Carousel.vue'

export default {

  setup() {
    
    return {
     
    }
  },
  components: {
    OrderPending,
    BiddingList
  },
  data: function () {
    return {
      isBidNone:false,
      selectedOrder:{}
    }
  },
  props: [],
  beforeCreate() {
  },
  created: function () {

  },
  methods: {
    onSelected(obj){
      console.log('obj:::', obj)
      this.isBidNone  = false;
      this.selectedOrder = obj;
      this.$refs.bidlist.load(this.selectedOrder.id)
    },
    reloadBids(){
      this.$refs.bidlist.load(this.selectedOrder.id)
    }
  }
}
</script>