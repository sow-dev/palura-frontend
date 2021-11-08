<template>
<div class="flex h-screen flex-wrap">
    <div class="flex-1 "></div>
        <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 mx-auto relative">
            <div class="my-wrapper w-full h-full my-0 mx-auto relative">
                <ParulaHeader />
                <div class="w-11/12 mx-auto sm:w-full h-full my-0 sm:mx-3 relative">
                    <div class="w-full md:w-1/4 block md:absolute md:right-0 text-left">
                       <ActivityFilter :items="itemlist" v-on:Filter="Data"/>
                     </div>
                    <div class=" w-full md:w-4/5 h-full overflow-initial mx-auto mb-10 float-left">
                        <ActivityList :items="itemlist"/>
                     </div>
                     
            </div>
        </div>
    </div>
    <div class="flex-1 "></div>
</div>








  
</template>

<script>
import ActivityFilter from './sub/ActivityFilter.vue';
import ActivityList from './sub/ActivityList.vue'
import ParulaHeader from "../../components/ParulaHeader.vue";
import OrderService from "../../services/order.service.js"
import HistoryService from "../../services/history.service.js"
import AOS from 'aos';
import "aos/dist/aos.css";





export default {
    created: function() {
        console.log('this.itemlist',this.itemlist)
         HistoryService.listAll(1).then(
            res=>{
                // console.log("resinfo", res.data)
                this.itemlist = res.data.items
                console.log('this.itemlist',this.itemlist)
            }
        )
        AOS.init();
    },
    data: function(){
        return{
            itemlist:[],
        }
    },
    components: {
        ParulaHeader,
        ActivityFilter,
        ActivityList
    },
    methods:{   
        Data:function(data) {
            console.log('data',data)
            this.itemlist=data;
            console.log('필터후itemlist',this.itemlist)
        }
    }
}
</script>
<style>
#logo-other{
    display:inline-block;
}
</style>

<style scoped>

/* #aaa:hover {
    background-color: tomato;
} */
#aaa:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 1.5px;
  left: 50%;
  position: absolute;
  background: #000;
  transition: width 1s ease 0s, left 1s ease 0s;
  width: 0;
}
#aaa:hover:after { 
  width: 90%; 
  left: 0; 
}
.my-wrapper {
    /* width:100%;
    height:100%;
    margin: 0 auto;
    position:relative; */
}
.market-album {
    /* width:80%;
    height:100%;
    position: relative; */
    display: -webkit-box;
    /* margin:0 auto;
    margin-top:5%; */

}

/* .collection-wrapper {
    width:100%;
    height:100%;
    overflow: scroll;
    margin-top: 5%;
    display: -webkit-inline-box;
} */

.market-album{
    transition: all .2s ease-in-out;
}
.market-album:hover {
    transform: scale(1.1);
    padding-left:0%;
    /* cursor: pointer; */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.act-point svg{
    display:initial;
    margin-bottom:1px;
}
#aaa:nth-child(even){
    width:100%;
    margin-left:25%;
}

.hover-bg-gray > p:hover{
    background:#262626;
}
</style>