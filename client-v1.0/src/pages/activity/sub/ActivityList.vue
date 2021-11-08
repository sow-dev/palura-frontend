!<template>
    <div class="w-full lg:w-4/5 h-auto overflow-initial ml-auto mb-10 float-left">
        <div id="aaa" class="market-album w-auto h-auto relative my-20 mx-auto cursor-pointer relative"
            v-for="item in items" v-bind:key="item.id" data-aos="fade-right" data-aos-offset="0"
            data-aos-easing="ease-in-sine">
            <ItemPurchased v-if="item.event== 'purchased'" :ds=item />
            <ItemBid v-else-if="item.event== 'bid'" :ds=item />
            <ItemListed v-else-if="item.event== 'listed'" :ds=item />
            <ItemMint v-else-if="item.event== 'mint'" :ds=item />
            <ItemWonAuction v-else-if="item.event== 'wontheauction'" :ds=item />
            <div v-else>
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
import ItemPurchased from "./activity-item-purchased"
import ItemBid from "./activity-item-bid"
import ItemListed from "./activity-item-listed.vue"
import ItemMint from "./activity-item-mint"
import ItemWonAuction from "./activity-item-wontheauction.vue"

export default {
    props:{
        items:[]
    },components:{
        ItemPurchased,
        ItemBid,
        ItemListed,
        ItemMint,
        ItemWonAuction
    }
}
</script>

<style>
.item-img {
    background-image: url("../../../assets/img/mymape_user.png");
    background-position: center;
    background-size: cover;
    transform: scale(1.1);
}
.title_underline:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 1.5px;
  left: 50%;
  position: absolute;
  background: #444444;
  transition: width 0.6s ease 0s, left 0.6s ease 0s;
  width: 0;
}
.title_underline:hover:after { 
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
    /* width:100%; */
    padding-left:25%;
}

.hover-bg-gray > p:hover{
    background:#262626;
}
@media screen and (max-width: 900px) { 
    #aaa:nth-child(even){
    margin-left:15%;
    padding:0;
} 
 #aaa:nth-child(odd){
    margin-left:1%;
} 
}
</style>