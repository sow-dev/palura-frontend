<template>
<div class="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-40" v-show="!isHiddens">
  <div class="filter-wrapper float-right bg-gray-300">
      <div class="mt-28 w-10/12 mx-auto">
        <h1 class="text-2xl ">FILTER BY</h1>
        <div class="w-full h-1 border-b-2 border-black my-12"></div>
        <div class="w-full h-full grid grid-cols-2 gap-4 mb-12">
            <div class="w-full relative">
                <label for="toggle1" class="text-s text-gray-700">List Price</label>
                <div class="absolute inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in right-0">
                    <input type="checkbox" name="toggle1" id="toggle1" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle1" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="toggle2" class="text-s text-gray-700">Open Offer</label>
                <div class="absolute right-0 inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle2" id="toggle2" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle2" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="toggle3" class="text-s text-gray-700">Owned By Creator</label>
                <div class="absolute right-0 inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle3" id="toggle3" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle3" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="toggle4" class="text-s text-gray-700">Sold</label>
                <div class="absolute right-0 inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle4" id="toggle4" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle4" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="toggle5" class="text-s text-gray-700">Reserve Price</label>
                <div class="absolute right-0 inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle5" id="toggle5" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle5" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="toggle6" class="text-s text-gray-700">Bid</label>
                <div class="absolute right-0 inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle6" id="toggle6" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle6" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="toggle7" class="text-s text-gray-700">Likes</label>
                <div class="absolute right-0 inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle7" id="toggle7" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle7" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="toggle8" class="text-s text-gray-700">Follwings</label>
                <div class="absolute right-0 inline-block w-10 mr-2 ml-4 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle8" id="toggle8" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-gray-new appearance-none cursor-pointer"/>
                    <label for="toggle8" class="toggle-label block overflow-hidden h-3 mt-1 rounded-full bg-gray-400 cursor-pointer"></label>
                </div>
            </div>




        </div>
        <h1 class="text-2xl ">SORT BY</h1>
        <div class="w-full h-1 border-b-2 border-black my-12"></div>
        <div class="w-full h-full grid grid-cols-2 gap-4 mb-12 text-center font-semibold leading-10">
            <div id="input1" class="input-all w-56 h-11 bg-white border-2 border-black">Recently Active</div>
            <div id="input2" class="input-all w-56 h-10 bg-white border-2 border-black">Ending Soon</div>
            <div id="input3" class="input-all w-56 h-10 bg-white border-2 border-black">Lowest Price</div>
            <div id="input4" class="input-all w-56 h-10 bg-white border-2 border-black">Highest Price</div>
            <div id="input5" class="input-all w-56 h-10 bg-white border-2 border-black">Newest</div>
            <div id="input6" class="input-all w-56 h-10 bg-white border-2 border-black">Oldest</div>

        </div>
        <div class="close" v-on:click="closeButton()">
            <svg width="25" height="25" viewBox="1 1 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 26L24.7503 2.24975" stroke="black"/>
                <path d="M1 1L24.7502 24.7503" stroke="black"/>
            </svg>
    
            </div>
                
                
    </div>
  </div>
</div>
</template>

<script>
window.$ = window.jQuery = require('jquery');
       $(document).ready(function(){
           var a = true;
           var b = true;
           var c = true;
           var d = true;
           var e = true;
           var f = true;
       
           $(document).on("click", "#input1", function(){
               if( a == true ){
                   $(".input-all").css("backgroundColor","#ffffff");
                   $(".input-all").css("color","#000000");
                   $(this).css("backgroundColor","#000000");
                   $(this).css("color","#ffffff");
                   a = false;
                   b = true;
                   c = true;
                   d = true;
                   e = true;
                   f = true;
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
               }

            //    if($(this).css('backgroundColor','#000000')) {
            //        $(this).css("backgroundColor","#ffffff");
            //    }
           })


            $(document).on("click", "#input2", function(){
                if( b == true ){
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    $(this).css("backgroundColor","#000000");
                    $(this).css("color","#ffffff");
                    b = false;
                    a = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
               }
           })
           $(document).on("click", "#input3", function(){
               if( c == true ){
                $(".input-all").css("backgroundColor","#ffffff");
                $(".input-all").css("color","#000000");
                $(this).css("backgroundColor","#000000");
                $(this).css("color","#ffffff");
                c = false;
                b = true;
                a = true;
                d = true;
                e = true;
                f = true;
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
               }
           })
            $(document).on("click", "#input4", function(){
                if( d == true ){
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    $(this).css("backgroundColor","#000000");
                    $(this).css("color","#ffffff");
                    d = false;
                    b = true;
                    c = true;
                    a = true;
                    e = true;
                    f = true;
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
               }
           })
           $(document).on("click", "#input5", function(){
                if( e == true ){
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    $(this).css("backgroundColor","#000000");
                    $(this).css("color","#ffffff");
                    d = false;
                    b = true;
                    c = true;
                    d = true;
                    a = true;
                    f = true;

               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
               }
           })
           $(document).on("click", "#input6", function(){
                if( f == true ){
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    $(this).css("backgroundColor","#000000");
                    $(this).css("color","#ffffff");
                    f = false;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    a = true;
                    
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
               }
           })
       })



export default {
    props:{
        userInfos:Object,
        isHiddens:Boolean
    },
    data:function(){
            return{
               ds:[],
                a : false,
            }
        },
    methods: {
        closeButton: function(){
            this.$emit("nonViewPop");
        },
    }
}
</script>

<style scoped>
*{
    box-sizing:border-box;
    margin:0;
    padding:0;

}
    .filter-wrapper {
        width:30vw;
        height:100vh;
        position:absolute;
        top:0;
        right:0;
        border-left:1px solid #ccc;
        border-bottom:1px solid #ccc;
        /* background:#fff; */
        z-index: 99999;
        /* margin-right:10%; */
    }
    form {
        width:70%;
        margin:0 auto;
        margin-top:5%;
    }
    .input > input {
        width:100%;
        margin-bottom:10%;
        height:30px;
        border-bottom:1px solid #000;
    }
    #bizFile {
        display:inline-block;
        width: 110px;
        height: 110px;
        border-radius: 200px;
        background: #ccc;
        line-height: 110px;
        text-align: center;
        right:0;
        top:30%;
        color:black;
        font-size:14px;
    }
    .input > button {
        width:135px;
        height:32px;
        border:1px solid #000;
        margin-top:7%;
    }
    h1 {
        font-weight:600;
    }
    .close {
        position: absolute;
        right:5%;
        top:5%;
    }

.toggle-checkbox:checked {
  @apply: right-0 bg-black;
  right: 0;
  background-color: black;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-black;
  background-color: #6D6D6D;
}
.bg-gray-new {
    background-color: #BABABA;
}
/* .grid-template-new {
    grid-template-rows: 1fr,1fr;
} */
</style>