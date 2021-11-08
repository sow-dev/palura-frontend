<template>
  <div id="pinContainer" class="w-full h-screen overflow-hidden">
        <div id="slideContainer" class="h-full">
            <section class="panel flex flex-row mx-auto relative h-full float-left w-3/12" v-for="(item) in itemlist" v-bind:key="item.name" 
            v-bind:style="{ backgroundImage: 'url(' + item.image + ')' }" id="{{'panel'+idx}}"
            >
            <!-- 가로 -->
                <!-- <div class="w-10/12 h-3/5 flex flex-row mx-auto my-auto z-50" >
                    <div class="w-full h-full"  >
                        <div class="w-5/6 h-full object-cover justify-center items-center  mx-auto my-auto">
                            <img :src="item.image" class="w-full h-full object-cover">
                        </div>
                        
                    </div>
                    <div class="w-4/6 h-full text-left flex items-center relative">
                        <div class="w-1/2">
                            <h1 class="text-3xl"><span class="font-semibold text-4xl">{{item.title}}</span>/{{item.name}}</h1>
                            <p>{{item.description.substring(0,200)+"..."}}</p>
                        </div>
                        <button class="absolute bottom-28">더보기</button>
                        <div class="absolute right-0 top-1/4 flex">
                        <div class="nextBtn">
                        </div>
                            <button>NEXT</button>
                        </div>
                    </div>
                </div> -->
                <!-- 세로 -->
                <div class="w-10/12 h-4/5 flex flex-row mx-auto my-auto z-50" >
                    <div class="w-full h-full"  >
                        <div class="w-3/6 h-full object-cover justify-center items-center  mx-auto my-auto">
                            <img :src="item.image" class="w-full h-full object-cover">
                        </div>
                        
                    </div>
                    <div class="w-4/6 h-full text-left flex items-center relative">
                        <div class="w-1/2">
                            <h1 class="text-3xl"><span class="font-semibold text-4xl">{{item.title}}</span>/{{item.name}}</h1>
                            <p>{{item.description.substring(0,200)+"..."}}</p>
                        </div>
                        <button class="absolute bottom-0">더보기</button>
                        <div class="absolute right-0 top-1/4 flex">
                        <div class="nextBtn">
                        </div>
                            <button>NEXT</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- <section class="panel turqoise bg-gray-300 flex flex-row">
                <div class="w-1/2 h-full bg-blue-500">3</div>
                <div class="w-1/2 h-full bg-red-500">4</div>
            </section>
            <section class="panel green bg-gray-300 flex flex-row">
                <div class="w-1/2 h-full bg-red-500">5</div>
                <div class="w-1/2 h-full bg-blue-500">6</div>
            </section>
            <section class="panel bordeaux  bg-gray-300 flex flex-row">
                <div class="w-1/2 h-full bg-blue-500">7</div>
                <div class="w-1/2 h-full bg-red-500">8</div>
            </section> -->
        </div>
    </div>
</template>
<script>
import OrderService from "../../services/order.service.js"



// window.onload = function(){

// 	$(function () { // wait for document ready
// 		// init
// 		var controller = new ScrollMagic.Controller();
// 		// define movement of panels
// 		var wipeAnimation = gsap.timeline()
// 			// animate to second panel
//             .to("#slideContainer", {duration: 0.5, z: -150})
//             .to("#slideContainer", {duration: 1, x: "-25%"})
//             .to("#slideContainer", {duration: 0.5, z: 0})


//             .to("#slideContainer", {duration: 0.5, z: -150, delay:1})
//             .to("#slideContainer", {duration: 1, x: "-50%"})
//             .to("#slideContainer", {duration: 0.5, z: 0})


//             .to("#slideContainer", {duration: 0.5, z: -150, delay: 1})
//             .to("#slideContainer", {duration: 1, x: "-75%"})
//             .to("#slideContainer", {duration: 0.5, z: 0})



// 		// create scene to pin and link animation
// 		new ScrollMagic.Scene({
// 				triggerElement: "#pinContainer",
// 				triggerHook: "onLeave",
// 				duration: "500%"
// 			})
// 			.setPin("#pinContainer")
// 			.setTween(wipeAnimation)
// 			.addIndicators() // add indicators (requires plugin)
// 			.addTo(controller);

            

// })
// }



export default {
    created: function() {
        OrderService.dsplist().then(
            res=>{
                this.itemlist = res.data.items

            }
        )
    },
    data: function() {
        return{
            itemlist:[],
        }
    },
    components:{
    }
}

</script>
<style scoped>
	#pinContainer {
		-webkit-perspective: 1000;
		        perspective: 1000;
		/* width: 100%;
		height: 100vh;
		overflow: hidden; */
	}
	#slideContainer {
		width: 400%; /* to contain 4 panels, each with 100% of window width */
        display:-webkit-box;
	
	}
	.panel {
		/* height: 100%; */
		/* width: 25%;  */
        /* relative to parent -> 25% of 400% = 100% of window width */
		/* float: left; */
        /* display: flex; */
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        background-color: rgba(0,0,0,0.5);
        position:relative;
	}
    .panel::before{
        content: "";
        background-color: #fff;
        opacity: 0.7;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .nextBtn {
        width:200px;
        height:0px;
        margin-top:12px;
        margin-right: 30px;
        border:1px solid #000;
    }
    /* .header{
        display: none !important;
    } */
</style>