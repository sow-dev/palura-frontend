<template>
  <div class="my-wrapper w-full h-full my-0 mx-auto">
    <ParulaHeader />
    <div class="market-wrapper w-full h-full my-0 mx-auto relative">
       <CheckPopUp />
    </div>
  </div>
</template>

<script>
import Filter from '../../../components/market/Filter.vue';
import ParulaHeader from "../../../components/ParulaHeader.vue";
import OrderService from "../../../services/order.service.js"
import HistoryService from "../../../services/history.service.js"
import AOS from 'aos';
import "aos/dist/aos.css";
import CheckPopUp from "../../../components/PopUp/checkPopUP.vue"

export default {
    created: function() {
        // 
        
    },
    data: function(){
        return{
            itemlist:[],
        }
    },
    components: {
        ParulaHeader,
        Filter,
        CheckPopUp
    },
    methods:{
      
    }
}
</script>

<style scoped>

/* #aaa:hover {
    background-color: tomato;
} */
#aaa:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 3px;
  left: 50%;
  position: absolute;
  background: #ffe427;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
#aaa:hover:after { 
  width: 100%; 
  left: 0; 
}
.my-wrapper {
    width:100%;
    max-width: 1440px;
    height:100%;
    margin: 0 auto;
    position:relative;
}
.market-album {
    /* width:80%;
    height:100%;
    position: relative; */
    display: -webkit-box;
    /* margin:0 auto;
    margin-top:5%; */

}

.collection-wrapper {
    width:100%;
    height:100%;
    overflow: scroll;
    margin-top: 5%;
    display: -webkit-inline-box;
}

.market-album{
    transition: all .2s ease-in-out;
}
.market-album:hover {
    transform: scale(1.1);
    padding-left:0%;
    /* cursor: pointer; */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

</style>