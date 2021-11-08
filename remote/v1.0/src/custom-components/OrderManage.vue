<template>
    <div class="pro-wrapper" v-if="!isHiddens">
        <h1>작가등록</h1>
        <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
            <p><span> content_type </span><input type="text" id="content_type" v-model="content_type"></p>
            <p><span> content_id </span><input type="text" id="content_id" v-model="content_id"></p>
            <p><span> title </span><input type="text" id="title" v-model="title"></p>
            <p><span> description </span><input type="text" id="description" v-model="description"></p>
            <p><span> image </span><input type="text" id="image" v-model="image"></p>
            <p><span> thumbnail </span><input type="text" id="thumbnail" v-model="thumbnail"></p>
            <p><span> tag </span><input type="text" id="tag" v-model="tag"></p>
            <p><span> chain_id </span><input type="text" id="chain_id" v-model="chain_id"></p>
            <p><span> asset_id </span><input type="text" id="asset_id" v-model="asset_id"></p>
            <p><span> order_rawdata </span><input type="text" id="order_rawdata" v-model="order_rawdata"></p>
            <p><span> order_signature </span><input type="text" id="order_signature" v-model="order_signature"></p>
            <p><span> order_wallet </span><input type="text" id="order_wallet" v-model="order_wallet"></p>
            <p><span> contract_id</span><input type="text" id="contract_id" v-model="contract_id"></p>
            <p><span> order_type </span><input type="text" id="role" v-model="order_type"></p>
            <p><span> price_fixed </span><input type="text" id="price_fixed" v-model="price_fixed"></p>
            <p><span> price_begin </span><input type="text" id="price_begin" v-model="price_begin"></p>
            <p><span> immediate_buyable </span><input type="text" id="immediate_buyable" v-model="immediate_buyable"></p>
            <p><span> immediate_price </span><input type="text" id="immediate_price" v-model="immediate_price"></p>
            <p><span> is_reserve </span><input type="text" id="is_reserve" v-model="is_reserve"></p>
            <p><span> reserve_price </span><input type="text" id="reserve_price" v-model="reserve_price"></p>
            <p><span> has_tax </span><input type="text" id="has_tax" v-model="has_tax"></p>
            <p><span> tax_ratio </span><input type="text" id="tax_ratio" v-model="tax_ratio"></p>
            <p><span> has_donate </span><input type="text" id="has_donate" v-model="has_donate"></p>
            <p><span> donate_ratio </span><input type="text" id="donate_ratio" v-model="donate_ratio"></p>
            <p><span> fee_exchange </span><input type="text" id="fee_exchange" v-model="fee_exchange"></p>
            <p><span> fee_creator </span><input type="text" id="fee_creator" v-model="fee_creator"></p>
            <p><span> order_state </span><input type="text" id="order_state" v-model="order_state"></p>
            <p><span> seller </span><input type="text" id="seller" v-model="seller"></p>
            <button type="submit"> 완료 </button>
        </form>
        <button class="close" v-on:click="closeButton()">닫기</button>
        
    </div>
</template>
<script>
import OrderService from '../services/order.service.js'

export default {
    data: function() {
        return {
           content_type:"",
           content_id:"", 
           title:"", 
           description:"", 
           image:"", 
           thumbnail:"", 
           tag:"", 
           chain_id:"",
           asset_id:"", 
           order_rawdata:"",
           order_signature:"", 
           order_wallet:"", 
           contract_id:"", 
           order_type:"", 
           price_fixed:"", 
           price_begin:"", 
           immediate_buyable:"", 
           immediate_price:"", 
           is_reserve:"",
           reserve_price:"", 
           has_tax:"", 
           tax_ratio:"", 
           has_donate:"", 
           donate_ratio:"",
           fee_exchange:"", 
           fee_creator:"", 
           order_state:"", 
           seller:""
        }
    },
   
    props: {
        isHiddens: Boolean,
    },
   
    methods:{
        closeButton: function(){
            console.log('1')
            // this.isHiddens = !this.isHiddens;
            this.$emit('nonViewPop');
            console.log(this.isHiddens)
        },
        submitForm: function(){
           var content_type = this.content_type; 
           var content_id = this.content_id;
           var title =this.title;
           var description = this.description;
           var image = this.image;
           var thumbnail = this.thumbnail;
           var tag =this.tag; 
           var chain_id = this.chain_id; 
           var asset_id =this.asset_id; 
           var order_rawdata = this.order_rawdata;
           var order_signature= this.order_signature;
           var order_wallet = this.order_wallet; 
           var contract_id = this.contract_id;
           var order_type =this.order_type;
           var price_fixed = this.price_fixed;
           var price_begin = this.price_begin;
           var immediate_buyable = this.immediate_buyable;
           var immediate_price =this.immediate_price; 
           var is_reserve = this.is_reserve; 
           var reserve_price =this.reserve_price; 
           var has_tax = this.has_tax;
           var tax_ratio= this.tax_ratio;
           var has_donate = this.has_donate;
           var donate_ratio = this.donate_ratio;
           var fee_exchange = this.fee_exchange;
           var fee_creator =this.fee_creator; 
           var order_state = this.order_state; 
           var seller =this.seller; 
           OrderService.insert(
              content_type, content_id, title, description, image, thumbnail, tag, chain_id,asset_id, order_rawdata,
                 order_signature, order_wallet, contract_id, order_type, price_fixed, price_begin, immediate_buyable, immediate_price, is_reserve,reserve_price, 
                 has_tax, tax_ratio, has_donate, donate_ratio, fee_exchange, fee_creator, order_state, seller
           ).then(res=>{
                console.log("Resssss:", res)
                this.$emit('nonViewPop');
                this.$emit('DoRefresh');
                console.log(this.isHiddens)
            })
        }
    }

}
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}
.pro-wrapper {
    width:60%;
    height: 70vh;
    position: absolute;
    top: 50px;
    left:20%;
    border: 2px solid #000;
    margin:0 auto;
    background: #fff;
}
h1 {
    margin: 3% 0;
}
form{
    width:80%;
    height:80%;
    margin: 0 auto;
    border: 2px solid #000;
    text-align: left;
    
}
form > p {
/* margin-left: 15%;
margin-top: 5%; */
}
form > p > span {
    width:200px;
    border: 1px solid #000;
    display: inline-block;
    height:20px;
}
form  input {
    width:200px;
    height:20px;
}
button {
    font-size: 25px;
    width: 150px;
    height:80px;
    margin-left: 35%;
    margin-top:5%;
}
.close {
    width:50px;
    height:20px;
    font-size: 15px;
    margin-top:2%;
    margin-left:80%;
}
</style>
