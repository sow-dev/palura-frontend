<template>
<div class="w-screen">
    <div class="z-30 relative items-center justify-center w-full w-screen h-screen">
        <div>
            <div class="inset-0  h-screen">
                <video src="../../assets/video/paint_drop.mp4" autoplay muted loop
                    class="object-cover w-full h-full">
                </video>
                <!-- <iframe class="object-cover w-full h-full" src="https://www.youtube.com/embed/OhyQRljsp2w?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
            </div>

            <div class="absolute inset-0 z-40 flex h-full ">
                <div class="text-white absolute  top-0 left-0 block w-full">
                    <div class="flex-1 "></div>
                    <div
                        class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
                        <ParulaHeader />
                    </div>
                    <div class="flex-1"></div>
                </div>
            </div>

            <div
                class="absolute inset-0 z-20 flex items-center justify-center h-screen w-full bg-gray-900 bg-opacity-50">
            </div>
            <div data-aos="flip-down"
                class="absolute inset-0  z-30 container flex flex-col items-center justify-center h-full max-w-6xl pl-0 mx-auto  sm:pl-8 xl:pl-0 md:flex-row md:justify-between">
                <div class="flex flex-col items-center justify-center mx-auto">
                    <div class="relative text-center ">
                        <h1
                            class="text-white relative mb-4 text-6xl font-bold font-inter leading-none text-center lg:text-7xl xl:text-8xl w-11/12 mx-auto sm:w-full">
                            <span class="filter drop-shadow " style="color:#FFFFFF">CREATE TUNE DROP</span>
                        </h1>
                        

                    </div>
                </div>

            </div>

            <!-- <div class="absolute bottom-0 z-30 w-full ">
                <Wave />
            </div> -->

        </div>

    </div>

    <div class="h-24"></div>
    <section class="flex w-full">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
            <SpotLight />
        </div>
        <div class="flex-1"></div>
    </section>
    <section class="flex w-full mt-32">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-11/12 sm:w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
            <!-- <p class="text-2xl font-semibold font-sans text-left w-11/12 ml-auto">Recent Activity</p> -->
            <ActivitySlider />
        </div>
        <div class="flex-1"></div>
    </section>
    <section class="flex w-full mt-8">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-11/12 sm:w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
            <PopularSlider />
        </div>
        <div class="flex-1"></div> 
    </section>

    
    <section class="flex w-full ">
        <!-- <div class="flex-1 "></div> -->
        <div class="flex-shrink-0 w-full h-auto sm:w-full mx-auto">
            <Subscription />
            <Footer />
        </div>
        <!-- <div class="flex-1"></div> -->
    </section>

     <!-- <section class="flex w-full ">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
            <Subscription />
            <Footer />
        </div>
        <div class="flex-1"></div>
    </section> -->

    <!-- 
    <section class="flex w-full mt-24">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
            <ParulaFooter />
        </div>
        <div class="flex-1"></div>
    </section> -->
</div>

</template>
<script>
import ParulaHeader from "../../components/ParulaHeader.vue";
import ParulaFooter from "../../components/ParulaFooter.vue";

import Wave from "./sub/Wave.vue"
import SpotLight from "./sub/Spotlight.vue"


import AlbumSlider from "./sub/AlbumSlider.vue";
import AlbumWrapper from "./sub/AlbumWrapper.vue";

import Subscription  from "./subscription.vue"
import Footer from "./footer.vue"

import OrderService from "../../services/order.service.js"
import Tetris from './sub/tetris.vue';
import Container from './sub/container.vue';
// import MainOpen from './sub/mainOpen.vue'
import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import ActivitySlider from "./sub/ActivitySlider.vue";
import PopularSlider from "./sub/PopularSlider.vue";






export default {
    created: function() {
        OrderService.dsplist().then(
            res=>{
                console.log("resinfo", res)
                this.itemlist = res.data
                // console.log(itemlist)
                 console.log("123")
            }
        )
    },
    data: function(){
        return{
            itemlist:[],
        }
    },
    mounted() {
        console.log(this.foo); // bar
      
    },
    computed:{
       
    },
      components: {
          ParulaHeader,
          ParulaFooter,
          Wave,
          SpotLight,

          AlbumSlider,
          AlbumWrapper,
          Subscription,
          Footer,

          Tetris,
        Container,
        ActivitySlider,
        PopularSlider,
      },
}
</script>
<style>
#logo-main{
    display:inline-block;
}
</style>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
.font-opensans {
    font-family: 'Open Sans', sans-serif;
}
.font-inter {
    font-family: 'Inter', sans-serif;
}
.h-80screen{
    height:87vh;
}
.h-55screen{
    height:55vh;
}
.ml-18 {
    margin-left:4.5rem;
}
.w-86per{
    width:85%;
}
.w-1440{
   width: 1440px; 
}
.leading-head{
    line-height: inherit !important;
}
.text-85xl{
    font-size: 7rem;
    line-height: 1;
}
.ml-100 {
    margin-left:30%;
}
.-mt-100 {
    margin-top: -80%;
}
.-mt-six {
    margin-top: -40%;
}





</style>
