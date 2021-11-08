<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="" v-for="(item, idx) in itemlist" v-bind:key="item.id">
        <div v-if="idx % 2 == 0">
          <div v-if="idx == idx" class="w-full flex flex-row -mt-36">
            <div class="w-6/12 flex justify-center items-center mb-32">
              <div class="flex flex-col gap-y-10 ml-56 mr-32">
                <h1 class="text-2xl font-semibold leading-10 text-left">
                  {{ item.artist }} / <span class="text-xl">{{ item.title }}</span>
                </h1>
                <p class="text-left">
                  {{ item.description.substring(0, 200) + "..." }}
                </p>
                <a class=" text-left underline font-bold"> See more</a>
              </div>
            </div>
            <div class="w-6/12" style="">
              <img :src="item.img" class="object-cover w-full h-screen p-10" />
            </div>
          </div>
        </div>

        <div v-if="idx % 2 == 1">
          <div v-if="idx == idx" class="w-full flex flex-row">
            <div class="w-6/12 -mt-36" style="">
              <img :src="item.img" class="object-cover w-full h-screen p-10" />
            </div>
            <div class="w-6/12 flex justify-center items-center mb-32">
              <div class="flex flex-col gap-y-10 mr-56">
                <h1 class="text-2xl font-semibold leading-10 text-left">
                  {{ item.artist }} / <span class="text-xl">{{ item.title }}</span>
                </h1>
                <p class="text-left">
                  {{ item.description.substring(0, 200) + "..." }}
                </p>
                <a class=" text-left underline font-bold"> See more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {ref, computed } from "vue";
// import { computed, onMounted, toRef } from "vue";
// import { useStore } from "vuex";
import OrderService from "../../../services/order.service.js";
import CmsService from "../../../services/cms.services.js";
// window.onload = function(){

// (function () {

//  var controller = new ScrollMagic.Controller();
//   var scene1 = new ScrollMagic.Scene({
//       triggerElement: "#trigger1", //트리거 설정
//       triggerHook: 0.6
//     })
//     .setClassToggle("#animate1", "visible")
//     .addTo(controller)
//     .addIndicators();

//   var revealElements = document.getElementsByClassName("animation2");
//   for (var i=0; i<revealElements.length; i++) {

//     var scene2 = new ScrollMagic.Scene({
//       triggerElement: revealElements[i],
//       offset: 50,
//       triggerHook: 0.6
//     })
//     .setClassToggle(revealElements[i], "visible") // add class toggle
//     .addTo(controller)
//     .addIndicators({name: "(box) " + (i+1), colorStart:"#F6B352", colorTrigger:"#F6B352"});
//   }

// }())

// }

export default {
  created: function() {
    // OrderService.dsplist().then((res) => {
    //   console.log("resinfo", res);
    //   this.itemlist = res.data.items;
    //   // console.log(itemlist)
    //   console.log("123");
    // });
    console.log("tetris 가져오기");
    CmsService.getTypeNcode("main", "tetris").then((res) => {
      console.log("tetris data:::", res);
      this.tetrisData = res.data.content;
      this.itemlist = this.tetrisData.items;
    });
  },
  data: function() {
    return {
      itemlist: [],
      tetrisData: Object,
    };
  },
  //   methods: {
  //     addTemplate: function() {
  //       let template = ``
  //       for (let i=0; i<itemlist.length; i++) {
  //         if (i % 2 == 0) {

  //         } else if () {
  //         }
  //       }
  //     }
  //   },
  mounted() {
    // console.log(this.foo); // bar
  },
  computed: {},
  components: {},
  //   template: `<div class="w-full">
  //     <div class="flex flex-col">
  //     {{ itemlist }}
  //     <div class="" v-for="(item, idx) in itemlist" v-bind:key="item.id">
  //         <div v-if="idx == 0" class="w-full flex flex-row">
  //         <div class="w-6/12 flex justify-center items-center mb-32">
  //             <div class="flex flex-col gap-y-10 ml-56 mr-32">
  //             <h1 class="text-2xl font-semibold leading-10 text-left">
  //                 {{ item.title }} / {{ item.artist }}
  //             </h1>
  //             <p class="text-left">
  //                 {{ item.description.substring(0, 200) + "..." }}
  //             </p>
  //             <a class=" text-left underline font-bold"> See more</a>
  //             </div>
  //         </div>
  //         <div class="w-6/12" style="">
  //             <img :src="item.img" class="object-cover w-full h-screen p-10" />
  //         </div>
  //         </div>

  //         <div v-if="idx == 1" class="w-full flex flex-row">
  //         <div class="w-6/12" style="">
  //             <img :src="item.img" class="object-cover w-full h-screen p-10" />
  //         </div>
  //         <div class="w-6/12 flex justify-center items-center mb-32">
  //             <div class="flex flex-col gap-y-10 mr-56 ml-32">
  //             <h1 class="text-2xl font-semibold leading-10 text-left">
  //                 {{ item.title }} / {{ item.artist }}
  //             </h1>
  //             <p class="text-left">
  //                 {{ item.description.substring(0, 200) + "..." }}
  //             </p>
  //             <a class=" text-left underline font-bold"> See more</a>
  //             </div>
  //         </div>
  //         </div>

  //         <div v-if="idx == 2" class="w-full flex flex-row">
  //         <div class="w-6/12 flex justify-center items-center mb-32">
  //             <div class="flex flex-col gap-y-10 ml-56 mr-32">
  //             <h1 class="text-2xl font-semibold leading-10 text-left">
  //                 {{ item.title }} / {{ item.artist }}
  //             </h1>
  //             <p class="text-left">
  //                 {{ item.description.substring(0, 200) + "..." }}
  //             </p>
  //             <a class=" text-left underline font-bold"> See more</a>
  //             </div>
  //         </div>
  //         <div class="w-6/12" style="">
  //             <img :src="item.img" class="object-cover w-full h-screen p-10" />
  //         </div>
  //         </div>
  //     </div>
  //     </div>
  //     {{ tetrisData }}
  //   </div>`,
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
};
</script>
<style>
.-mt-five {
  margin-top: -25%;
}
.-mt-six {
  margin-top: -40%;
}
</style>
