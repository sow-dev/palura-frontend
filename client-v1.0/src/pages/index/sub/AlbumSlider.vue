
<template>
  <div v-if="cms.content" class="wrapper animation2" id="animate2">
    <SplitCarousel v-bind="option">
      <SplitCarouselItem v-for="item in cms.content.items" :key="item.idx" id="boxbox">
        
        <div class="box"><img :src="item.img"></div>
      </SplitCarouselItem>
    </SplitCarousel>
    
    <!-- <select v-model="option.timingFunction">
      <option v-for="opt in timingFuntionOptions" :key="opt.label"  :value="opt.value"  >{{opt.label}}</option>
    </select> -->
    <!-- <span class="text-sm">{{cms.content}}</span> -->
  
  </div>
</template>

<script>
import OrderService from "../../../services/order.service.js"
import CmsService from "../../../services/cms.services"


window.onload = function(){

// (function () {

//   var controller = new ScrollMagic.Controller();
//   var scene1 = new ScrollMagic.Scene({
//       triggerElement: "#trigger1", //트리거 설정
//       triggerHook: 0.7
//     })
//     .setClassToggle("#animate2", "visible")
//     .addTo(controller)
//     .addIndicators();
  

// }())

}





// const defaultConfig = {
//   displayAmount: 4,
//   autoplay: true,
//   speed: 500,
//   interval: 3000,
//   loop: true,
//   height: 600,
//   itemWidth: 400,
//   pauseOnHover: true,
//   timingFunction: "ease",
//   arrowVisible: "default",
// };
const kebabize = (str) => {
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
};
export default {
  name: "App",
   created: function() {
        this.loadOrder()
        this.loadCms();
    },
  data() {
    return {
      cms:{},
      itemlist:[],
      option :{
        displayAmount: 2,
        autoplay: true,
        speed: 500,
        interval: 3000,
        loop: true,
        height: 600,
        itemWidth: 400,
        pauseOnHover: true,
        timingFunction: "ease",
        arrowVisible: "default",
      },
      timingFuntionOptions: [
        {
          value: "ease",
          label: "ease",
        },
        {
          value: "ease-in",
          label: "ease-in",
        },
        {
          value: "ease-out",
          label: "ease-out",
        },
        {
          value: "ease-in-out",
          label: "ease-in-out",
        },
        {
          value: "linear",
          label: "linear",
        },
        {
          value: "steps(2, start)",
          label: "steps(2, start)",
        },
        {
          value: "cubic-bezier(0.06, 0.29, 0.19, 1.4)",
          label: "cubic-bezier(0.06, 0.29, 0.19, 1.4)",
        },
      ],
    };
  },
//   computed: {
//     diffConfig() {
//       const keys = Object.keys(defaultConfig);
//       const result = {};
//       keys.forEach((key) => {
//         if (this.option[key] !== defaultConfig[key]) {
//           result[key] = this.option[key];
//         }
//       });
//       return result;
//     },
//     componentCode() {
//       const optionString = Object.entries(this.diffConfig)
//         .map(([key, value]) => {
//           const stringKey = ["timingFunction", "arrowVisible"];
//           return `${stringKey.includes(key) ? "" : ":"}${kebabize(
//             key
//           )}="${value}"`;
//         })
//         .join(" ");
//       return `
// <SplitCarousel ${optionString}>
//   <SplitCarouselItem v-for="item in ${this.itemlist}" :key="item.id">
//     {{ item }}
//   </SplitCarouselItem>
// </SplitCarousel>
// `;
//     },
//   },
  methods:{
    loadCms(){
      CmsService.getTypeNcode("main", "carousel").then(res=>{
        console.log("cms !!! :::", res.data)
        this.cms = res.data
        this.option.displayAmount = this.cms.displayAmount;
      })
    },
    loadOrder(){
      OrderService.dsplist().then(
            res=>{
                console.log("resinfo", res)
                this.itemlist = res.data.items
                // console.log(itemlist)
                 console.log("123")
            }
        );
    }
  }
};
</script>

<style>

.wrapper {
  width: 100%;
  margin: 0 auto;
}
.box {
  border: 1px solid #eee;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:12%;
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.operator {
  padding: 30px 0;
}
.code {
  margin: 0;
}
details {
  padding: 25px 0 0 10px;
}
.box > img {
  object-position: center;
  height:100%;
  object-fit: cover;
}
#boxbox:nth-child(n+6){
  display:none;
}
/* .animation2 {
  color: #fff;
  padding: 40px;
  font-size: 50px;
  background-color: crimson;
  box-shadow: 3px 14px 30px #ddd;
  transform: translateY(30px);
  opacity: 0;
  
}
.visible {
    opacity: 1;
    transform: translateY(0);
    transition: all 1.1s;
  } */
.trigger {
  height: auto;
  font-weight: bold;
  font-size: 30px;
}
.animation2 {
  transform: translateY(30px);
  opacity: 0;
}
.animation2.visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 1.1s;
}
#boxbox {
  width: 20vw!important;
}
@media screen and (max-width: 1200px) {
  #boxbox {
  width: 36vw!important;
}
}
@media screen and (max-width: 900px) {
  #boxbox {
  width: 50vw!important;
}
}
</style>
