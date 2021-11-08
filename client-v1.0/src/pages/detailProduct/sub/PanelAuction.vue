<template>
  <div class="sub-wrapper">
      <notifications position="bottom right"/>
      <ModalBidAuction v-if="customer" ref="modal_bid_popup" :order="detailList" :customer="customer" :bidlist="bidlist" />
      <ModalBuyNowAuction v-if="customer" ref="modal_buynow_popup" :order="detailList" :customer="customer" />
      <div class="w-full h-screen left-0 top-0 bg-black bg-opacity-75 z-50 fixed flex" v-if="mainphoto">
          <!-- <img :src="detailList.image" class="h-5/6 mx-auto my-auto"> -->
          <ContentViwerDetailModal v-model="detailList.image"  :fileType="detailList.main_content_type" />
          <button class="w-12 h-12 absolute right-0 top-0" @click="closePhoto()">
              <svg class="mx-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8323 10.0001L19.6199 2.21215C20.1267 1.70557 20.1267 0.88651 19.6199 0.379933C19.1133 -0.126644 18.2943 -0.126644 17.7877 0.379933L9.99988 8.16793L2.21228 0.379933C1.70548 -0.126644 0.886669 -0.126644 0.380103 0.379933C-0.126701 0.88651 -0.126701 1.70557 0.380103 2.21215L8.1677 10.0001L0.380103 17.7881C-0.126701 18.2947 -0.126701 19.1138 0.380103 19.6204C0.632555 19.8731 0.964493 20 1.29619 20C1.62789 20 1.95959 19.8731 2.21228 19.6204L9.99988 11.8324L17.7877 19.6204C18.0404 19.8731 18.3721 20 18.7038 20C19.0355 20 19.3672 19.8731 19.6199 19.6204C20.1267 19.1138 20.1267 18.2947 19.6199 17.7881L11.8323 10.0001Z" fill="white"/>
              </svg> 
          </button>
      </div>
      
    <div class="bg-white h-2/3 mb-4 flex flex-wrap justify-center mt-10">
    <div class="w-full md:w-1/2 lg:w-2/3  text-white">
        <ContentViwerDetail v-if="detailList.image" v-model="detailList.image"  :fileType="detailList.main_content_type" />
    <!-- <div class="relative w-edit h-edit object-cover">
      <img v-if="detailList.image" :src='detailList.image' class="w-full h-full m-0 p-0 object-cover" style='' >
      <div v-else class="w-full h-full bg-parula-gray-3 rounded-md animate-pulse" ></div>
      <button class="w-12 h-12 bg-black bg-opacity-50 absolute right-0 bottom-0" @click="openPhoto()">
        <svg class="mx-auto my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M7.32653 6.45489L2.25889 1.38448H5.75277C6.09357 1.38448 6.36787 1.11019 6.36787 0.769387C6.36787 0.428585 6.09357 0.154289 5.75277 0.154289L0.773789 0.15152C0.610312 0.15152 0.455143 0.215257 0.338786 0.331614C0.222428 0.447971 0.158691 0.60314 0.158691 0.766617V5.74837C0.158691 6.0864 0.432987 6.36346 0.773789 6.36346C1.11459 6.36346 1.38889 6.08917 1.38889 5.74837V2.25449L6.45653 7.3249C6.57565 7.44403 6.73359 7.505 6.89153 7.505C7.04947 7.505 7.20741 7.44403 7.32653 7.3249C7.56756 7.08384 7.56756 6.69592 7.32653 6.45489Z" fill="white"/>
        <path d="M19.6611 0.334376C19.5447 0.218019 19.3895 0.154282 19.2261 0.154282H14.2471C13.9063 0.154282 13.632 0.428577 13.632 0.769379C13.632 1.11018 13.9063 1.38448 14.2471 1.38448H17.741L12.6705 6.45212C12.4295 6.69318 12.4295 7.08107 12.6705 7.32213C12.7924 7.44402 12.9476 7.50222 13.1055 7.50222C13.2635 7.50222 13.4214 7.44125 13.5405 7.32213L18.611 2.25448V5.74836C18.611 6.08916 18.8853 6.36346 19.2261 6.36346C19.5669 6.36346 19.8412 6.08916 19.8412 5.74836V0.769379C19.8412 0.605902 19.7774 0.450733 19.6611 0.334376Z" fill="white"/>
        <path d="M19.2261 13.6365C18.8853 13.6365 18.611 13.9108 18.611 14.2516V17.7455L13.5405 12.6779C13.2995 12.4368 12.9116 12.4368 12.6705 12.6779C12.4295 12.9189 12.4295 13.3068 12.6705 13.5479L17.7382 18.6183H14.2471C13.9063 18.6183 13.632 18.8926 13.632 19.2334C13.632 19.5742 13.9063 19.8485 14.2471 19.8485H19.2261C19.5669 19.8485 19.8412 19.5742 19.8412 19.2334V14.2544C19.8412 13.9136 19.5669 13.6365 19.2261 13.6365Z" fill="white"/>
        <path d="M7.32605 12.6779C7.08775 12.4368 6.6971 12.4368 6.45881 12.6779L1.3884 17.7455V14.2544C1.3884 13.9136 1.1141 13.6393 0.773301 13.6393C0.432499 13.6393 0.158203 13.9136 0.158203 14.2544V19.2334C0.158203 19.3969 0.22194 19.552 0.338297 19.6684C0.454655 19.7847 0.609823 19.8485 0.773301 19.8485H5.75228C6.09308 19.8485 6.36738 19.5742 6.36738 19.2334C6.36738 18.8926 6.09308 18.6183 5.75228 18.6183H2.2584L7.32605 13.5479C7.56707 13.3069 7.56707 12.9189 7.32605 12.6779Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="19.697" height="19.697" fill="white" transform="translate(0.151367 0.15152)"/>
        </clipPath>
        </defs>
        </svg>
    </button>
    </div> -->
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3  px-6 pb-6 flex flex-col ">
        <div class="w-full flex justify-end">
            <LikeHeart v-if="customer && detailList.id" :marketId="detailList.content_id" :userId="customer.id" />
        </div>
          <div class="w-full flex flex-row" >
            <img v-if="detailList.avatar_min" class="w-20 h-20 p-1 bg-white rounded-full object-cover mb-4 ml-4" :src="detailList.avatar_min" alt="" />
            <div v-else class="w-20 h-20 p-1 bg-white rounded-full bg-parula-gray-3 object-cover"></div>
            <div class="text-parula-dark mt-2 ml-8 font-bold flex flex-col justify-center">
                <div v-if="detailList.title" class="text-2xl break-words mb-1">{{detailList.title}}</div>
                <div v-else class="w-48 h-10 mb-3 bg-parula-gray-3 rounded-md animate-pulse">{{detailList.title}}</div>
                <!--  add [dark] class for bright background -->
                <div v-if="detailList.nickname" class="text-sm ext-parula-dark font-semibold text-sm dark">{{detailList.nickname}}</div>
                <div v-else class="w-48 h-10 mb-3 bg-parula-gray-3 rounded-md animate-pulse"></div>
            </div>
          </div>
           <!-- <p class="w-full text-left text-black overflow-scroll font-extralight xl:mt-0 2xl:h-30 xl:h-24 2xl:mt-4">
                  It was a warm summer night in New York and we were wandering around Times Square, I had dreamed of seeing it from above. An hour later I found myself taking in the beauty of this historic place from above. My world came alive with color and it was if I was dreaming with my eyes wide open. Our world is a magical place but
                   </p> -->
            <div class="block max-h-48 font-extralight text-sm text-left overflow-y-auto overscroll-contain overscroll-auto md:overscroll-contain px-6">
                <span class="font-medium text-parula-dark" v-html="detailList.description" />
            </div>
              <div class="w-full block px-6 ">
              <p class="text-sm my-6 font-medium text-parula-gray-1"> {{detailList.tag}} </p>
              </div>

      <hr class="block w-full  border-t-26 "  v-if="detailList.order_state!=3"/>

        <div class="my-3 ml-1 flex flex-col justify-start px-8"  v-if="detailList.order_state!=3">
            <div class="text-sm font-semibold text-parula-gray-1 my-1 ">AUCTION ENDS IN</div> 
            <div class="flex">
                <CountdownAuction :end_at="detailList.end_at" :detailList="detailList"/>
            </div>            
        </div>
      <hr class="block w-full  border-t-26"   v-if="detailList.order_state!=3"/>
        <div class="my-3  flex flex-row justify-between "  v-if="detailList.order_state!=3">
            <div class="text-sm font-semibold text-parula-gray-1 sm:mx-1 lg:mx-3 xl:mx-9">STATE</div> 
            <div class="flex mr-9">
                <ProgressAuction :begin_at="detailList.begin_at" :end_at="detailList.end_at" :detailList="detailList" />
            </div>            
        </div>
      <hr class="block w-full mb-3  border-t-26"  />
      <div class="flex flex-row justify-between sm:mx-1 lg:mx-3 xl:mx-9 gap-2">
        <div class="">
            <div class="text-sm lg:text-xs 2xl:text-sm  font-semibold text-parula-gray-1 flex relative ">START PRICE&nbsp;
                <span data-text="The amount suggested by the auctioneer to open the bidding." 
                 class="tooltip left text-xs font-light">
                    <svg width="13" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 0.125C4.03582 0.125 3.09329 0.410914 2.2916 0.946586C1.48991 1.48226 0.865067 2.24363 0.496089 3.13442C0.127112 4.02521 0.030571 5.00541 0.218674 5.95107C0.406777 6.89672 0.871076 7.76537 1.55286 8.44715C2.23464 9.12893 3.10328 9.59323 4.04894 9.78133C4.99459 9.96943 5.97479 9.87289 6.86558 9.50391C7.75637 9.13494 8.51775 8.51009 9.05342 7.70841C9.58909 6.90672 9.875 5.96418 9.875 5C9.875 3.70707 9.36139 2.46709 8.44715 1.55285C7.53291 0.638615 6.29293 0.125 5 0.125ZM4.625 2.75C4.625 2.65054 4.66451 2.55516 4.73484 2.48484C4.80516 2.41451 4.90055 2.375 5 2.375C5.09946 2.375 5.19484 2.41451 5.26517 2.48484C5.33549 2.55516 5.375 2.65054 5.375 2.75V5C5.375 5.09946 5.33549 5.19484 5.26517 5.26517C5.19484 5.33549 5.09946 5.375 5 5.375C4.90055 5.375 4.80516 5.33549 4.73484 5.26517C4.66451 5.19484 4.625 5.09946 4.625 5V2.75ZM5 7.4375C4.88875 7.4375 4.78 7.40451 4.68749 7.3427C4.59499 7.28089 4.52289 7.19304 4.48032 7.09026C4.43775 6.98748 4.42661 6.87438 4.44831 6.76526C4.47002 6.65615 4.52359 6.55592 4.60225 6.47725C4.68092 6.39859 4.78115 6.34501 4.89026 6.32331C4.99938 6.3016 5.11248 6.31274 5.21526 6.35532C5.31804 6.39789 5.4059 6.46999 5.4677 6.56249C5.52951 6.65499 5.5625 6.76375 5.5625 6.875C5.5625 7.02418 5.50324 7.16726 5.39775 7.27275C5.29226 7.37824 5.14919 7.4375 5 7.4375Z" fill="#DDDDDD"/>
                    </svg>
                </span>
            </div>
            <div class="flex flex-row items-end mt-2">
                <div class="text-4xl font-semibold mr-1 text-parula-dark">
                    <!-- {{detailList.price_begin}} -->
                    <DecimalValue v-model="detailList.price_begin" />
                    
                    </div>
                <div class="text-lg text-parula-dark font-bold">{{detailList.taSymbol}}</div>
            </div>
            <!-- <div v-if="detailList.assset_symbol=='TKN'" class="mt-2 text-parula-gray-1"> -->
            <div v-if="exchangeRate.length>0" class="mt-2 text-parula-gray-1">
                {{exchangeRate[0].amount * detailList.price_begin }}$
            </div>
        </div>
        <div class="">
            <div class="text-sm lg:text-xs 2xl:text-sm  font-semibold text-parula-gray-1">CURRENT BID PRICE</div>
            <div class="flex flex-row items-end mt-2">
                <div v-if="!bidlist || bidlist.length == 0" class="text-4xl font-semibold mr-1">
                    <!-- {{ detailList.price_begin }} -->
                    <DecimalValue v-model="detailList.price_begin" />
                </div>
                <div v-else class="text-4xl font-semibold mr-1 text-parula-dark">
                    <!-- {{bidlist[bidlist.length-1].price}} -->
                    <DecimalValue v-model="bidlist[bidlist.length-1].price" />
                    </div>
                <div class="text-lg text-parula-dark font-bold">{{detailList.taSymbol}}</div>
            </div>
            <!-- <div v-if="detailList.assset_symbol=='TKN'" class="mt-2 text-parula-gray-1"> -->
            <div v-if="exchangeRate.length>0" class="mt-2 text-parula-gray-1">
                {{exchangeRate[0].amount * detailList.price_fixed }}$
            </div>
        </div>
      </div>

    <hr class="block w-full mb-3  border-t-26  mt-3"  />
      <div class="flex flex-row justify-between sm:mx-1 lg:mx-3 xl:mx-9 gap-2">
          <div class="">
            <div class="text-sm lg:text-xs 2xl:text-sm  font-semibold text-parula-gray-1 flex">BUY IT NOW PRICE&nbsp;
                <span data-text="The amount suggested by the auctioneer to open the bidding." 
                 class="tooltip left text-xs font-light">
                    <svg width="13" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 0.125C4.03582 0.125 3.09329 0.410914 2.2916 0.946586C1.48991 1.48226 0.865067 2.24363 0.496089 3.13442C0.127112 4.02521 0.030571 5.00541 0.218674 5.95107C0.406777 6.89672 0.871076 7.76537 1.55286 8.44715C2.23464 9.12893 3.10328 9.59323 4.04894 9.78133C4.99459 9.96943 5.97479 9.87289 6.86558 9.50391C7.75637 9.13494 8.51775 8.51009 9.05342 7.70841C9.58909 6.90672 9.875 5.96418 9.875 5C9.875 3.70707 9.36139 2.46709 8.44715 1.55285C7.53291 0.638615 6.29293 0.125 5 0.125ZM4.625 2.75C4.625 2.65054 4.66451 2.55516 4.73484 2.48484C4.80516 2.41451 4.90055 2.375 5 2.375C5.09946 2.375 5.19484 2.41451 5.26517 2.48484C5.33549 2.55516 5.375 2.65054 5.375 2.75V5C5.375 5.09946 5.33549 5.19484 5.26517 5.26517C5.19484 5.33549 5.09946 5.375 5 5.375C4.90055 5.375 4.80516 5.33549 4.73484 5.26517C4.66451 5.19484 4.625 5.09946 4.625 5V2.75ZM5 7.4375C4.88875 7.4375 4.78 7.40451 4.68749 7.3427C4.59499 7.28089 4.52289 7.19304 4.48032 7.09026C4.43775 6.98748 4.42661 6.87438 4.44831 6.76526C4.47002 6.65615 4.52359 6.55592 4.60225 6.47725C4.68092 6.39859 4.78115 6.34501 4.89026 6.32331C4.99938 6.3016 5.11248 6.31274 5.21526 6.35532C5.31804 6.39789 5.4059 6.46999 5.4677 6.56249C5.52951 6.65499 5.5625 6.76375 5.5625 6.875C5.5625 7.02418 5.50324 7.16726 5.39775 7.27275C5.29226 7.37824 5.14919 7.4375 5 7.4375Z" fill="#DDDDDD"/>
                    </svg>
                </span>
            </div>
            <div class="flex flex-row items-end mt-2" v-if="detailList.immediate_price!=null">
                <div class="text-4xl font-semibold mr-1 text-parula-dark">
                    <!-- {{detailList.immediate_price}} -->
                    <DecimalValue v-model="detailList.immediate_price" />
                </div>
                <div class="text-lg text-parula-dark font-bold">{{detailList.taSymbol}}</div>
            </div>
            <div class="flex flex-row items-end mt-2" v-else>
                <!-- <div class="text-4xl font-semibold mr-1"></div> -->
                <div class="text-lg text-parula-dark font-bold">-</div>
            </div>
            <!-- <div v-if="detailList.assset_symbol=='TKN'" class="mt-2 text-parula-gray-1"> -->
            <div v-if="exchangeRate.length>0" class="mt-2 text-parula-gray-1">
                {{exchangeRate[0].amount * detailList.immediate_price }}$
            </div>
        </div>
          <div class="">
            <!-- <div class="text-sm lg:text-xs 2xl:text-sm  font-semibold text-parula-gray-1">RESERVE PRICE</div> -->
            <!-- <div class="flex flex-row items-end mt-2" v-if="detailList.reserve_price!=null">
                <div class="text-4xl font-semibold mr-1 text-parula-dark" >{{detailList.reserve_price}}</div>
                <div class="text-lg text-parula-dark font-bold">{{detailList.taSymbol}}</div>
            </div>
            <div class="flex flex-row items-end mt-2" v-else>
                <div class="text-4xl font-semibold mr-1" > </div>
                <div class="text-lg text-parula-dark font-bold">-</div>
            </div>
            
            <div v-if="exchangeRate.length>0" class="mt-2 text-parula-gray-1">
                {{exchangeRate[0].amount * detailList.reserve_price }}$
            </div> -->
        </div>
          
      </div>
      <hr class="block w-full border-t-26  mt-3" />
                <div class="flex flex-row mt-3 mb-3 sm:ml-1 lg:ml-3 xl:ml-10">
                <div class="grid grid-cols-1 gap-x-2 gap-y-1 place-content-between font-semibold  mr-10">
                    <div class="text-parula-gray-1 mb-1 font-semibold flex text-sm items-center"> FEE</div>
                    <div class="text-parula-dark mb-1">Creator royaltie<span class="text-parula-gray-1 font-medium ml-3">{{detailList.royalties/100}}%</span></div>
                    <div class="text-parula-dark mb-1">Platform<span class="text-parula-gray-1 font-medium ml-3">2.5%</span></div>
                </div>
                <div v-if="detailList.has_donate==1" class="grid grid-cols-1 gap-x-2 gap-y-1 place-content-between font-semibold">
                    <div class="text-parula-gray-1 mb-3 font-semibold flex flex-row items-center"> 
                        <div class="mr-2">
                            DONATION  
                        </div>
                        <div>
                        <svg class="fill-current text-parula-gray-1" width="16" height="32" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 0.125C4.03582 0.125 3.09329 0.410914 2.2916 0.946586C1.48991 1.48226 0.865067 2.24363 0.496089 3.13442C0.127112 4.02521 0.030571 5.00541 0.218674 5.95107C0.406777 6.89672 0.871076 7.76537 1.55286 8.44715C2.23464 9.12893 3.10328 9.59323 4.04894 9.78133C4.99459 9.96943 5.97479 9.87289 6.86558 9.50391C7.75637 9.13494 8.51775 8.51009 9.05342 7.70841C9.58909 6.90672 9.875 5.96418 9.875 5C9.875 3.70707 9.36139 2.46709 8.44715 1.55285C7.53291 0.638615 6.29293 0.125 5 0.125ZM4.625 2.75C4.625 2.65054 4.66451 2.55516 4.73484 2.48484C4.80516 2.41451 4.90055 2.375 5 2.375C5.09946 2.375 5.19484 2.41451 5.26517 2.48484C5.33549 2.55516 5.375 2.65054 5.375 2.75V5C5.375 5.09946 5.33549 5.19484 5.26517 5.26517C5.19484 5.33549 5.09946 5.375 5 5.375C4.90055 5.375 4.80516 5.33549 4.73484 5.26517C4.66451 5.19484 4.625 5.09946 4.625 5V2.75ZM5 7.4375C4.88875 7.4375 4.78 7.40451 4.68749 7.3427C4.59499 7.28089 4.52289 7.19304 4.48032 7.09026C4.43775 6.98748 4.42661 6.87438 4.44831 6.76526C4.47002 6.65615 4.52359 6.55592 4.60225 6.47725C4.68092 6.39859 4.78115 6.34501 4.89026 6.32331C4.99938 6.3016 5.11248 6.31274 5.21526 6.35532C5.31804 6.39789 5.4059 6.46999 5.4677 6.56249C5.52951 6.65499 5.5625 6.76375 5.5625 6.875C5.5625 7.02418 5.50324 7.16726 5.39775 7.27275C5.29226 7.37824 5.14919 7.4375 5 7.4375Z" 
                            />
                        </svg>
                        </div>
                    </div>
                    <div class="text-parula-dark mb-1">organization<span class="text-parula-gray-1 font-medium ml-3">UNICEF</span></div>
                    <div class="text-parula-dark mb-1">Percent<span class="text-parula-gray-1 font-medium ml-3">{{detailList.donate_ratio}}%</span></div>
                </div>
                </div>

      <div class="flex flex-wrap justify-center " v-if="detailList.order_state!=3">
        <div class="w-full ">
          <button  v-if="detailList.immediate_buyable!==true" v-on:click="showBuyNowModal"
            class="w-full bg-parula-1 hover:bg-blue-900 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button" >Buy It Now</button>
        </div>
        <div class="w-full mt-5">
          <button class="w-full bg-white border border-black hover:bg-gray-800 hover:text-gray-50 text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button" @click="showBidModal">Place a Bid</button>
        </div>
        
      </div>
      <div v-else>
          <!--판매완료상태-->
           <button  
            class="w-full bg-black text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button" >Sold Out</button>
      </div>
    </div>
  </div>
<!-- 
<teleport to="#destination">
    <PlaceBid ref="modal">
            <div class="w-4/5 h-full bg-white mx-auto justify-center items-center content-center relative xl:pt-12 2xl:pt-20">
                <div class="w-full  mx-auto flex 2xl:gap-12 justify-center self-center content-center items-center flex-height xl:h-4/5 xl:gap-4 2xl:h-4/5">
                    <div class="w-full h-full flex flex-col 2xl:gap-12 xl:gap-4">
                        <h1 class="underline text-sm font-semibold">PLACE YOUR BID</h1>
                        <div class="2xl:w-64 2xl:h-60 border-2 border-black xl:w-52 xl:h-48">
                            <img :src='detailList.image' class="w-full h-full object-cover">
                        </div>
                        <div class="">
                            <h1 class="text-xl font-bold">{{detailList.title}}</h1>
                            <p class="text-sm font-bold text-gray-8a mt-2">{{detailList.nickname}}</p>
                        </div>
                    </div>
                    <div class="w-full h-full flex-col content-center mb-8 relative">
                        <p class="text-gray-8a text-sm font-semibold">CURRNET BID</p>
                        <div class="flex justify-between mb-12">
                            <p><span class="text-2xl font-bold mr-2">{{detailList.price_begin}}</span>{{detailList.symbol}}</p>
                            <p class="text-sm font-bold leading-10 text-gray-8a">$2,692.01</p>
                        </div>
                        <p class="text-gray-8a text-sm font-semibold">YOUR BALANCE</p>
                        <div class="flex justify-between">
                            <p><span class="text-2xl font-bold mr-2">{{detailList.price_begin}}</span>{{detailList.symbol}}</p>
                            <p class="text-sm font-bold leading-10 text-gray-8a">$0</p>
                        </div>
                    </div>
                    <div class="w-full h-full flex-col content-center mb-8 ">
                        <p class="text-gray-8a text-sm font-semibold">PLACE YOUR BID</p>
                        <div class="flex  border-bottom-05 border-black mb-12">
                            <input type="number" class="w-full text-2xl font-bold">
                            <p class="text-sm font-bold leading-10">{{detailList.symbol}}</p>
                            
                        </div>
                        <p class="text-gray-8a text-sm font-semibold">TOTAL BID AMOUNT</p>
                        <div class="flex justify-between">
                            <p class="text-sm font-bold"><span class="text-2xl font-bold mr-2">{{detailList.price_begin}}</span>{{detailList.symbol}}</p>
                            <p class="text-sm font-bold leading-10 text-gray-8a">$2,692.01</p>
                        </div>
                    </div>
                    
                </div>
                <div class="flex justify-center self-center content-center items-center xl:ml-0 2xl:ml-20  ">
                    <div class="w-full"></div>
                    <p class="text-xs ml-10">Bids placed during an auction cannot be withdrawn. 
                        By placing a bid you indicate that you have read and agree to the 
                    <span class="underline"> Auction Terms of Use</span></p>
                    <div class="w-full text-right">
                        <button class="border-2 border-black px-6 py-2 "  v-on:click="clickBidBtn">Submit Bid</button>
                    </div>
                </div>
            </div>
    </PlaceBid>
</teleport> -->
  </div>
</template>

<script >
import UtilService from "../../../services/utility.services.js"
import SessionService from "../../../services/session.service.js"
import LikeHeart from "./LikeHeart"
import UserService from "../../../services/user.service.js"
import OrderService from "../../../services/order.service"
import CountdownAuction from "../../../components/CountdownAuction.vue"
import ProgressAuction from "./ProgressAuction.vue"
import ModalBidAuction from "./ModalBidAuction.vue"
import ModalBuyNowAuction from "./ModalBuyNowAuction.vue"
import {Parula} from "../../../parula-js/src/parula.js"
import { ref } from "vue";
import BidService from '../../../services/bid.service'
import { notify } from "@kyvg/vue3-notification";

import  DecimalValue from '../../../components/DecimalValue.vue'
import ContentViwerDetail from './ContentViwerDetail.vue'
import ContentViwerDetailModal from './ContentViwerDetailModal.vue'

export default {
    setup() {
    const disableTeleport = ref(false);
    const modal = ref(null);
    const modal3 = ref(null);
    function showModal() {
      // VMmodal.vue에 접근하여 show 함수 실행
      modal.value.show();
    }
    function showModal3() {
      // VMmodal.vue에 접근하여 show 함수 실행
      modal3.value.show3();
    }
    function modalHide() {
      // VMmodal.vue에 접근하여 show 함수 실행
      modal.value.hide();
    }
    return {
      disableTeleport,
      modal,
      modal3,
      showModal,
      showModal3,
      modalHide
    };
},
    created: function () {
        var __session = SessionService.loadSession(); // 이거 왜 하는거지?
        if (Object.keys(__session).length > 0){
            if (__session) {
                // this.customerId = __session.userId;
                console.log('session::', __session)
            }
        }

        this.loadAll() // TODO: 이거 위치 확인하기 위에 올라가야하는거 아닌지
    },
    data: function () {
        return {
            marketId: '',
            userId: '',
            customer:null,
            bidlist:[],
            exchangeRate: [],
            // detailList:{}
            mainphoto: false,
            
        }
    },
    props: {
        detailList: {}
    },
    components: {
        LikeHeart,
        CountdownAuction,
        ProgressAuction,
        ModalBidAuction,
        ModalBuyNowAuction,
        DecimalValue,
        ContentViwerDetail,
        ContentViwerDetailModal
    },
    methods: {
        async loadAll(){
            await this.loadCustomer()
            console.log('this.detailList.order_id::',this.detailList.id)
            this.loadBidUsers(this.detailList.id)
        },
        loadExRate() {
            // if(this.detailList.asset_symbol =='ETH'){
            UtilService.pricing().then(res => {
                console.log('exchange rate:', res)
                this.exchangeRate = res.data;
            })
            // }
        },
        openPhoto() {
            this.mainphoto = !this.mainphoto;
        },
        closePhoto() {
            this.mainphoto = !this.mainphoto;
        },
        async loadCustomer() {
            return new Promise((resolve, reject)=>{
                const address = web3.currentProvider.selectedAddress;
                UserService.byAddress(address).then(res => {
                    this.customer = res.data.items[0];
                    console.log('***** customer', this.customer)
                    // this.customerId = userInfo.id
                    // this.customerAccont = userInfo.account
                    resolve(this.customer)
                }).catch(e => {
                    reject(e)
                })
            });
        },
        loadBidUsers(_order_id){
            BidService.getUserList(_order_id).then(res=>{
                this.bidlist = res.data;
                console.log(' this.bidlist', this.bidlist)
            }).catch(e =>{
                alert(e)
            })
        },
        showBidModal(){
            const session = SessionService.loadSession();
            if(Object.keys(session).length < 1) {
              notify({ type: "error", text: "Login is required" });
            }else{
                this.$refs.modal_bid_popup.showModal(true)
            }
        },
        showBuyNowModal(){
            const session = SessionService.loadSession();
            if(Object.keys(session).length < 1) {
              notify({ type: "error", text: "Login is required" });
            }else{
                this.$refs.modal_buynow_popup.showModal(true)
            }

        },
    //     clickImmediateBuyBtn: async function() {
    //     try{
    //     // console.error('111')   
    //     this.detailList.order_signature;
    //     this.detailList.order_rawdata;
    //     const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
    //     const account = accounts[0];
    //     console.log('web3 '+window.ethereum.stringify)
    //     console.log('window.ethereum.chainId '+window.ethereum.chainId)
    //     const parula = new Parula(window.ethereum, {}, line=>console.info('[*] ',line));
    //     console.log('accounts[0]'+accounts[0])

    //     const Param ={
    //         maker:accounts[0],  //order 생성자 주소  
    //         maTypeMV:this.detailList.taTypeMV,           // takerAsset,  // ta, Asset(ETH, "0x", 200), ERC20 //구매
    //         maContractAddress:this.detailList.taContAddr,  // contract
    //         maValue:Number(this.detailList.immediate_price), //판매가격
            
    //         sellOrderId:Number(this.detailList.id),    // off-chain registered, 아니면 order_id만 받고, getOrder로 가져와? 그게 성능상 좋겠구만
    //         //이게 어떤값? tokenId?

    //         // salt:0,       // when regist order to orderbook salt is 1, else salt is 0 //hash 값이 달라지게
    //         // start:0,      // Date() //비경매
    //         // end:0,        // Date() //비경매
    //     }

    //     const ret = await parula.createBuyOrderAndMatch(Param)    
    //     console.log('경매즉시구매ret::'+ret)
    //     }  catch (err) {
    //         alert(err)
    //         return
    //     }
        
    //     // console.log('this.customerId',this.customer.id)
    //     // console.log('this.detailList.id',this.detailList.id)
    //     // console.log('this.detailList.immediate_price',this.detailList.immediate_price)
    //     await OrderService.orderSold(this.customerId, this.detailList.immediate_price, 11, 21, this.detailList.order_wallet, this.customer.account , this.detailList.id).then(
    //         res=>{
    //             console.log("즉시구매인서트완료", res)
    //             // this.boughtChange()
    //             // location.href="/buycomplete.html"; //특정값 주고 컴포넌트를 넣는게 좋을듯
    //         }
    //     )   
    // }
    }
}
</script>
<style scope>
.border-t-26{
    border-top:0.5px solid #262626 !important;
}

  .tooltip {
  position:relative; /* making the .tooltip span a container for the tooltip text */
  border-bottom:1px dashed #eaeaea; /* little indicater to indicate it's hoverable */
}
.tooltip:before {
  content: attr(data-text); /* here's the magic */
  position:absolute;
  
  /* vertically center */
  transform:translateY(-50%);
  
  /* move to right */
  
  /* basic styles */
  width:150px;
  padding:10px;
  /* border-radius:10px; */
  background:#eaeaea;
  color: #000;
  text-align:center;

  display:none;
}
.tooltip:hover:before {
  display:block;
}
.tooltip.left:before {
  /* reset defaults */
  left:-100%;
  margin:initial;

  /* set new values */
  top:100%;
  margin-top:44px;
}
.tooltip:after {
  content: "";
  position:absolute;
  
  /* position tooltip correctly */
  left:10%;
  margin-left:-5px;
 
  /* vertically center */
  top:50%;
  transform:translateY(-50%);
 
  /* the arrow */
  border:10px solid #eaeaea;
  border-color: transparent #eaeaea transparent transparent;
  transform: rotate(90deg);
  
  display:none;
}
.tooltip:hover:before, .tooltip:hover:after {
  display:block;
}
/* 
@media screen and (max-width: 1440px) {
.w-edit{
    width:100%;
}
.h-edit{
    height:100%;
}
}
@media screen and (min-width: 1440px) {
.w-edit{
    width:43vw;
}
.h-edit{
    height:36vw;
}
} */
</style>