<template>
  <div v-if="itemlist.length>0">
    <div class="mt-5 ml-8 text-xl font-semibold"><span class="capitalize">{{penName}}</span><span>`s Artworks</span></div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="item in itemlist" v-bind:key="item.id" class="flex flex-col">
        <div class="w-48 h-56 ">
          <img class="w-full h-full object-cover rounded-sm shadow-sm" :src="item.image">
        </div>
        <div class="text-left relative w-full h-16">
          <p class="text-black text-normal font-semibold mt-3 uppercase drop-shadow-xl">{{title}}</p>
        </div>
      </Slide>
      <template v-if="itemlist.length >3" #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import Portfolio from "../../../services/portfolio.service"


import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Navigation,
    
  },
   created: function() {
        Portfolio.artworks(this.userId).then(
            res=>{
                console.log("resinfo", res)
                this.itemlist = res.data.items;
                console.log("아이템리스트",this.itemlist)
            }
        )
    },
  props: {
      userId: String,
      penName:String
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 3,
        snapAlign: 'start',
      },

    },
   itemlist:[],
  // ChoicedMarketId:""
    a:false,
  }),
});
</script>
<style>

.carousel__item {
  min-height: 200px;
  width:100%;
  background-color: var(--carousel-color-primary);
  color:  var(--carousel-color-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 2.5rem;
  width: 200px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  /* border: 1px solid black; */
  background-color:#fff;
  color:#000;
  top:45%;
}
.gray-color{
  color:#8a8a8a;
}
</style>