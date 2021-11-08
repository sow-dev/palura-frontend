<template>
<div>
  <p class="text-2xl font-semibold font-sans text-left">Recent Activity</p>
  <Carousel :settings="settings" :breakpoints="breakpoints">
    <Slide  v-for="item in itemlist"
      v-bind:key="item.id" class="flex flex-col ">
      <!--ItemBItemB{{item.title}} -->
      <!-- {{item.title}}
      {{item.pen_name}}
      {{item.pen_name}} -->
      <ItemA :id="item.id" :image="item.image" :title="item.title" :pen_name="item.pen_name" />
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import  ItemA  from './items/main-item-a.vue'
// import { ItemB } from './items/main-item-b.vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import OrderService from "../../../services/order.service.js"

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    ItemA,
    Navigation,
    
  },
   created: function() {
        OrderService.dsplist().then(
            res=>{
                console.log("resinfo", res)
                this.itemlist = res.data.items;
                console.log("아이템리스트",this.itemlist)
            }
        )
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
        itemsToShow: 4,
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
  min-height: 300px;
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

@media screen and (max-width: 768px) {
    .carousel__prev {
        left:2rem;
    }
   .carousel__next {
       right:2rem;
   }
}
</style>