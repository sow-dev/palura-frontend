<template>

<div>
    <div class="flex h-screen flex-wrap">
        <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
            <div class="main w-full h-auto text-center my-0 mx-auto overflow-hidden flex-wrap">
            <MainOpen />
            <!-- <Container /> -->
            <div class="w-full h-80screen">
                <p class="text-2xl font-semibold text-left ml-28">Artist Spotlight</p>
                <div class="w-full h-full relative mt-8">
                    <!-- <img :src="itemlist.items[0].image" alt=""> -->
                    <img class="w-86per h-full justify-cover mx-auto" src="../../../src/assets/img/parula_artist-01.jpg" alt="">
                    <div class="absolute left-36 bottom-10 text-white font-opensans">
                        <p class="text-2xl font-semibold text-left ml-1">Artist <span class="text-xl font-extralight">of</span><br>
                        This Month.
                        </p>
                        <p class="text-5xl font-semibold text-left mt-8">
                            Matt Moloney
                        </p>
                    </div>
                </div>
            </div>
                <div class="main-wrapper w-full h-full my-0 mx-auto relative">
                    
                    <!-- <ParulaHeader />
                    <div class="main-border w-full relative h-50vh mb-40">
                    
                        <h1 class="text-85xl font-semibold mt-32 leading-head">Think Environment<br>ART LIFE. Parula.</h1>
                        <div class="ml-100">
                            <p class="w-2/6 mx-auto text-sm mt-16 text-left">안녕하세요! 파룰라에 오신 것을 환영합니다.<br>
                            파룰라는 북미, 좁은 지역에 서식하는 매우 작은 철새입니다. 희귀 철새로서 환경에 예민하다 알려져
                            <br> 특정 지역에 길들어져 있습니다. 
                            </p>
                            <p class="w-2/6 mx-auto text-sm mt-10 text-left">
                                파룰라와 함께 <br>
                                아름다운 모험을 떠날 준비 되셨나요? 
                                신묘한 Inspiration을 잔뜩 얻을 수 있을거에요! <span class="font-semibold">그럼, 이제 저를 따라오세요 :)</span>
                            </p>
                        </div>
                            
                    </div>  -->
                    
                    <div class="w-11/12 h-full my-0 mx-auto mt-40">
                        <p class="text-2xl font-semibold text-left ml-10">Recent Activity</p>
                        <ActivitySlider />
                    </div>
                     <div class="w-11/12 h-full my-0 mx-auto mt-16 mb-16">
                        <p class="text-2xl font-semibold text-left ml-10">Most Popular</p>
                        <PopularSlider />
                    </div>





                    <!-- <div class="max-w-screen-2xl h-full my-0 mx-auto mt-64">
                
                    
                        <Tetris />
                    </div> -->







                    <!-- <div class="parula-main mt-80">
                        <h1>파룰라 서비스 소개</h1>
                        <p>파룰라에 참여하는 방법을 알려드려요.</p>
                        <div class="parula-info">

                        </div>
                    </div> -->
                    <!-- 다른것들  -->
                




                    <!-- <AlbumWrapper /> -->
                    







<!-- 
                    <div class="albumslider-wrapper trigger w-full h-full mx-auto mt-36 m-24" id="trigger2">

                    <AlbumSlider/>

                    </div>
                     -->






                    
                    <!-- <div class="gall-wrapper">
                        <h1>작가 소개</h1>
                        <p>작가와 작품에 대해 자세히 소개합니다.</p>

                        <div class="gall1">
                            <div class="gall1-l">
                                <div></div>
                                <h1>01 작가명</h1>
                                <p>작품과 작가에 대한 간략한 설명이 들어갑니다.<br>
                                콜렉터들이 작가의 작품 세계가 향하는 방향을<br> 
                                함께 바라보고 그려나갈 수 있는<br>
                                설명이면 좋겠죠?!</p>
                            </div>
                            <div class="gall1-r">
                                <div></div>
                                <h2>작품명</h2>
                            </div>
                        </div>


                        <div class="gall2">
                            <div class="gall2-l">
                                <div></div>
                                <h2>작품명</h2>
                            </div>

                            <div class="gall2-r">
                                <div></div>
                                <h1>01 작가명</h1>
                                <p>작품과 작가에 대한 간략한 설명이 들어갑니다.<br>
                                콜렉터들이 작가의 작품 세계가 향하는 방향을<br> 
                                함께 바라보고 그려나갈 수 있는<br>
                                설명이면 좋겠죠?!</p>
                            </div>
                        </div>


                        <div class="gall3">
                            <div class="gall3-l">
                                <div></div>
                                <h1>01 작가명</h1>
                                <p>작품과 작가에 대한 간략한 설명이 들어갑니다.<br>
                                콜렉터들이 작가의 작품 세계가 향하는 방향을<br> 
                                함께 바라보고 그려나갈 수 있는<br>
                                설명이면 좋겠죠?!</p>
                            </div>
                            <div class="gall3-r">
                                <div></div>
                                <h2>작품명</h2>
                            </div>
                        </div>



                        <div class="gall4">
                            <div class="gall4-l">
                                <div></div>
                                <h2>작품명</h2>
                            </div>

                            <div class="gall4-r">
                                <div></div>
                                <h1>01 작가명</h1>
                                <p>작품과 작가에 대한 간략한 설명이 들어갑니다.<br>
                                콜렉터들이 작가의 작품 세계가 향하는 방향을<br> 
                                함께 바라보고 그려나갈 수 있는<br>
                                설명이면 좋겠죠?!</p>
                            </div>
                        </div>


                        <div class="gall5">
                            <div class="gall5-l">
                                <div></div>
                                <h1>01 작가명</h1>
                                <p>작품과 작가에 대한 간략한 설명이 들어갑니다.<br>
                                콜렉터들이 작가의 작품 세계가 향하는 방향을<br> 
                                함께 바라보고 그려나갈 수 있는<br>
                                설명이면 좋겠죠?!</p>
                            </div>

                            <div class="gall5-r">
                                <div></div>
                                <h2>작품명</h2>
                            </div>
                        </div>
                    </div>   임시로 작가님 사진이 없어서 감춰놓음-->

                    <!-- <Container /> -->
                
                </div>
                    <ParulaFooter />
            </div>
        
        </div>
        <div class="flex-1 "></div>
    </div>


    
    </div>
</template>
<script>
import AlbumSlider from "./sub/AlbumSlider.vue";
import AlbumWrapper from "./sub/AlbumWrapper.vue";
import ParulaHeader from "../../components/ParulaHeader.vue";
import ParulaFooter from "../../components/ParulaFooter.vue";
// import {ref, computed } from "vue";
// import { computed, onMounted, toRef } from "vue";
// import { useStore } from "vuex";
import OrderService from "../../services/order.service.js"
import Tetris from './sub/tetris.vue';
import Container from './sub/container.vue';
import MainOpen from './sub/mainOpen.vue'
import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import ActivitySlider from "./sub/ActivitySlider.vue";
import PopularSlider from "./sub/PopularSlider.vue";


window.onload = function(){

(function () {
gsap.registerPlugin(MotionPathPlugin, );

// MotionPathHelper.create(".astronaut"); 
//모션패스헬퍼가 원하는 곡선으로 변경해주는 플러그인인데 상단에서 같이 호줄해야하기도하고 필요없음.
//gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);식으로 호출하면 될듯.



gsap.set(".astronaut", {scale: 0.5, autoAlpha: 1});

gsap.to(".astronaut", {
  duration: 5, 
  ease: "power1.inOut",
  immediateRender: true,
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5],
    autoRotate: 90
  }
});



 var controller = new ScrollMagic.Controller();

  var revealElements = document.getElementsByClassName("animation1");
  for (var i=0; i<revealElements.length; i++) {
    
    var scene = new ScrollMagic.Scene({
      triggerElement: revealElements[i],
      offset: 50,
      triggerHook: 0.6
    })
    .setClassToggle(revealElements[i], "visible") // add class toggle
    .addTo(controller)
    // .addIndicators({name: "(box) " + (1), colorStart:"#F6B352", colorTrigger:"#F6B352"});
  }

    var scene = new ScrollMagic.Scene({
      triggerElement: "#trigger2", //트리거 설정
      triggerHook: 0.6
    })
    .setClassToggle("#animate2", "visible")
    .addTo(controller)
    // .addIndicators({name: "(box) " + (2), colorStart:"#F6B352", colorTrigger:"#F6B352"});
  
    // var controller2 = new ScrollMagic.Controller();

            var wipeAnimation = gsap.timeline()
            // wipeAnimation.to("#slideContainer", {duration: 0.5, z: -150})
            // wipeAnimation.to("#slideContainer", {duration: 1, x: "-25%"})
            // wipeAnimation.to("#slideContainer", {duration: 0.5, z: 50})


            // wipeAnimation.to("#slideContainer", {duration: 0.5, z: -150, delay:1})
            // wipeAnimation.to("#slideContainer", {duration: 1, x: "-50%"})
            // wipeAnimation.to("#slideContainer", {duration: 0.5, z: 50})


            // wipeAnimation.to("#slideContainer", {duration: 0.5, z: -150, delay: 1})
            // wipeAnimation.to("#slideContainer", {duration: 1, x: "-75%"})
            // wipeAnimation.to("#slideContainer", {duration: 0.5, z: 50})


            wipeAnimation.to("#panel", {duration: 0.5, z: -150})
            wipeAnimation.to("#panel", {duration: 1, x: "-25%"})
            wipeAnimation.to("#panel", {duration: 0.5, z: 50})


            wipeAnimation.to("#panel", {duration: 0.5, z: -150, delay:1})
            wipeAnimation.to("#panel", {duration: 1, x: "-50%"})
            wipeAnimation.to("#panel", {duration: 0.5, z: 50})


            wipeAnimation.to("#panel", {duration: 0.5, z: -150, delay: 1})
            wipeAnimation.to("#panel", {duration: 1, x: "-75%"})
            wipeAnimation.to("#panel", {duration: 0.5, z: 50})
	




		// create scene to pin and link animation
		var scene = new ScrollMagic.Scene({
				triggerElement: "#pinContainer",
				triggerHook: "onLeave",
				duration: "600%"
			})
			.setPin("#pinContainer")
			.setTween(wipeAnimation)
			// .addIndicators({name: "(box) " + (3), colorStart:"#F6B352", colorTrigger:"#F6B352"}) // add indicators (requires plugin)
			.addTo(controller);





}
())


}






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
          AlbumSlider,
          AlbumWrapper,
          ParulaHeader,
          ParulaFooter,
          Tetris,
        Container,
        MainOpen,
        ActivitySlider,
        PopularSlider,
      },
    //   setup() {
    //     const store = useStore();
    //     const stateConter = computed(() => store.state.Counter);
    //     const stateModuleA = computed(() => store.state.moduleA);
    //     const counter = computed(() => store.state.Counter.counter);
    //     const test = computed(() => store.getters.time2);
    //     const doubleGetters = computed(() => store.getters["moduleA/doubleCount"]);
    //     const inc = () => store.commit("setCounter", counter.value + 1);
    //     const globalFunc = () => store.dispatch("moduleA/other");
    //     // const web3 = store.state.web3;
    //    return {
    //        inc, counter, test, stateConter, stateModuleA, doubleGetters, globalFunc
    //     } 
    // }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap');
.font-opensans {
    font-family: 'Open Sans', sans-serif;
}
.h-80screen{
    height:87vh;
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
.body2:nth-child(n+6) {
    display:none;
}
.main{
    /* max-width: 1536px; */
    /* margin: 0 auto;
    position:relative; */
    /* height:100%; */
    /* width:100%; */
    /* width:100%; */
    /* max-width: 1500px; */
    /* margin: 0 auto; */
}
.body2-l > h1 {
    font-size: 25px;
    font-weight: 600;
    line-height:10vh;
}
.body2{
    /* width:100%;
    height:50%;
    position: relative;
    margin: 0 auto;
    margin-bottom:2%; */
    display:-webkit-box; /* tailwind css가 webkit box를 지원안함. */
}













/* .albumslider-wrapper {
    width:100%;
    height:100%;e
} */
.main {
    /* background-color:#ccc; */
    /* width: 80%; */
    /* width:100%;
    height: 100%; */
    /* text-align: center; */
    /* margin: 0 auto; */
    /* overflow: hidden; */
}


.main-border{
    /* width:100%;
    height:50vh;
    position: relative; */
}
.main-border > h1 {
    /* position: absolute;
    font-size: 60px; */
    /* font-weight: 100;
    bottom:-10%;
    left:5%;
    letter-spacing: 15px; */
}
.main-border > h1 > span {
    /* font-weight: 400; */
}
.main-body {
    /* width:90%;
    max-width: 1600px;
    height:100%;
    margin:0 auto; */
}
.body1 {
    /* text-align: left;
    margin-top: 5%;
    line-height:30px;
    margin-bottom:5%; */
}
.body1 > p > span {
    /* font-weight: 600; */
}

.body2-l{
    /* width:20%;
    height: 30vh;
    text-align: left;
    margin-left:15%; */
}


/* .body2-r {
    width:45%;
    height:50vh;
    position:absolute;
    top:-27%;
    right:5%;
    background-image: url("../../img/08am.png");
    background-size: cover;
    background-position: center;
} */




















/* .body2:nth-of-type(2),
.body2:nth-of-type(3), 
.body2:nth-of-type(4),
.body2:nth-of-type(5),
.body2:nth-of-type(6){
    display: none;
} */
/* .body3 {
    width:100%;
    margin:0 auto;
    position: relative;
}
.body3-l {
    width:35%;
    height:70vh;
    background-image: url("../../img/semgratin.png");
    background-size: cover;
    background-position: center;
    position:absolute;
}
.body3-r {
    width:70%;
    height:60vh;
    margin-left:40%;
    text-align: left;
    padding-top: 10%;
}
.body4{
    width:100%;
    height:100%;
    position:relative;
    text-align: left;
}
.body4-l{
    width:50%;
    padding-top:10%;
}
.body4-l > div {
    width:100%;
    height: 50vh;
     background-image: url("../../img/jamsan.png");
    background-size: cover;
    background-position: center;
    margin-top:10%;
}
.body4-r{
    width:35%;
    position:absolute;
    right:-5%;
    top:-13%;
}
.body4-r >h1, .body4-r >p{
    margin-left:10%;
}
.body4-r > div {
    width:100%;
    height: 95vh;
     background-image: url("../../img/yoonseohe.png");
    background-size: cover;
    background-position: center;
    margin-top:10%;
}
.body5{
    width:100%;
    height:50vh;
    margin-top:10%;
    position: relative;
}
.body5-l{
    width:20vw;
    height:20vw;
    background-image: url("../../img/santa.png");
    background-size: cover;
    background-position: center;
    position: absolute;
    left:-5%;
}
.body5-r{
    width:80%;
    height:20vw;
    text-align: left;
    margin-left:20vw;
    padding-top:19%;
}
.body5-r > h1 {
    font-size: 25px;
    font-weight: 600;
} */

/* .parula-info{
    width:100%;
    margin:0 auto;
    margin-top:5%;
    height:50vh;
    text-align: center;
} */
/* .parula-main > h1 {
    font-size: 25px;
    font-weight: 600;
} */

.footer-l {
    /* width:15%; */
    /* float: left; */
    /* margin:0 auto;
    text-align: left; */
    /* margin-left: 10%; */
}

.footer-l >p {
    /* width:55%; */
    /* margin-bottom:5%; */
    /* text-decoration: underline; */
}

.footer-r > p {
    /* color: #ccc; */
}
.album-wrapper{
    /* width:90%;
    height:80%;
    margin: 0 auto;
    margin-top: 10%;
    margin-bottom:20%; */
}


.trigger {
  height: auto;
  font-weight: bold;
  font-size: 30px;
}





/* .albumtile1 > div {
    background-image: url("../../img/08am.png");
    background-position: center;
}
.albumtile2 > div {
    background-image: url("../../img/jamsan.png");
    background-position: center;
}
.albumtile3 > div {
    background-image: url("../../img/santa.png");
    background-position: center;
}
.albumtile4> div {
    background-image: url("../../img/semgratin.png");
    background-position: center;
}
.albumtile5 > div {
    background-image: url("../../img/yoonseohe.png");
    background-position: center;
} */



.albumslider-wrapper {
    /* width:100%;
    margin:0 auto;
    margin-top:10%;
    margin-bottom:10%; */
}
/* .gall-wrapper {
    width:100%;
    margin: 0 auto;
}

.gall-wrapper h1 {
    font-size: 25px;
    font-weight: 600;
    margin-top:10%;
    margin-bottom: 5%;
}
.gall-wrapper h2 {
    font-size: 20px;
    font-weight: 500;
    margin-top:2%;
}
.gall-wrapper > h1, .gall-wrapper > p {
    text-align: left;
    margin-top:1%;
    margin-bottom:1%;
    margin-left:10%;
}
.gall-wrapper > p {
    margin-bottom:10%;
}
.gall1,.gall2,.gall5{
    width:85%;
    height:80vh;
    margin: 0 auto;
}
.gall3, .gall4 {
    width:100%;
    height:90vh;
    margin: 0 auto;
}
.gall1-l, .gall3-l {
    width:25%;
    float:left;
}
.gall1-r h2 {
    margin-right:3%;
}
.gall2-l, .gall4-l {
    width:60%;
    float:left;
}
.gall5 {
    display:flex;
}
.gall5-l{
    width:60%;
}
.gall5-r {
    width:40%;
    height:80%;
    position:relative;
}
.gall2-l {
    display: flex;
}
.gall1-l > div, .gall2-r > div, .gall3-l > div, .gall4-r >div, .gall5-l > div{
    width:12vw;
    height:12vw;
    background:#bababa;
    border-radius: 150px;
    margin:0 auto;
    margin-top:7%;
}
.gall1-r, .gall3-r{
    width:75%;
    height:100%;
    overflow: hidden;
    position:relative;
    text-align: right;
}
.gall2-r, .gall4-r {
    width:40%;
    height:100%;
    overflow: hidden;
    position:relative;
}
.gall1-r > div, .gall3-r > div {
    width:80%;
    height:48vh;
    background: #bababa;
    position:relative;
    margin-left:20%;
}
.gall3-l > div {
    margin-top:15%;
}
.gall3-r > div {
    height:65vh;
}
.gall2-l > div, .gall5-r > div {
    width: 48vh;
    height:65vh;
    background: #bababa;
}
.gall4-l > div {
    width:100%;
    height:55vh;
    background: #bababa;
}
.gall2-l > h2, .gall5-r > h2 {
    writing-mode: tb-rl;
    text-align: right;
    margin-bottom:3%;
    margin-left: 3%;

}
.gall2-r > div {
    margin-top:13%;
}
.gall3-l {
    text-align: right;
}
.gall3-r  h2 {
    text-align: left;
    margin-left:22%;
}
.gall4-l h2 {
    text-align: left;
    margin-left:5%;
}
.gall5-r > div {
    float:left;
}
.gall5-r > h2 {
    position:absolute;
    right:0;
    bottom:0;
} */
/* .parula-info{
    background-image: url('../../assets/img/parula.jpeg');
    background-attachment: fixed;
    background-size: cover;
} */


/* .container1 {
    width:100vw;
    height:600vh;
} */


  /* @media screen and (min-width: 1440px) {
     .main{
         max-width:1440px;
     }
  } */
  


</style>
