<template>
 <body class="bg-gray-200 font-sans leading-normal tracking-normal">
<nav class="relative bg-white  border-gray-300 text-gray-900">
  <div class="container mx-auto flex justify-between mb-12">
   
    <ul class="flex ml-38">
	
      <!--Regular Link-->
      <li class="toggleable">
        <input type="checkbox" value="selected" id="toggle-one" class="toggle-input1 hidden">
          <label for="toggle-one" class="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">Artwork</label>
          <div role="toggle" class="p-6 mega-menu1 mb-16 sm:mb-0 shadow-xl bg-white z-10 absolute left-0 text-left w-full hidden">
            <div class="container mx-auto w-11/12 flex flex-col justify-between mx-2">
              

              <h3 class="font-bold text-xl text-black text-bold mb-5 mt-5">Details</h3>
              <ul class=" flex flex-wrap content-start text-center gap-7 px-4 w-full sm:w-1/2 lg:w-full border-gray-600 border-b lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <li>
                  <a id="input1"   class="border-2 border-black bg-white block p-1 w-52  hover:bg-black text-black-500 hover:text-white">List Price</a>
                </li>
                <li>
                  <a id="input2"   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Reserve Price</a>
                </li>
                <li>
                  <a id="input3"   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Like Auction</a>
                </li>
                <!-- <li>
                  <a id="input4"   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Upcoming Auction</a>
                </li>
                <li>
                  <a id="input5"   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Secondary Sale</a>
                </li>
                 <li>
                  <a id="input6"   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Open Offer</a>
                </li>
                 <li>
                  <a id="input7"   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Never Received an Offer</a>
                </li> -->
                 <li>
                  <a id="input8"   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Genesis Price</a>
                </li>
              </ul>





              <h3 class="font-bold text-xl text-black text-bold mb-5 mt-5">File Types</h3>
              <ul class=" flex flex-wrap content-start text-center gap-7 px-4 w-full sm:w-1/2 lg:w-full border-gray-600 border-b lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52  hover:bg-black text-black-500 hover:text-white">Still Image</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">GIF</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">3D Artwork</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Video</a>
                </li>
              </ul>

              


                <h3 class="font-bold text-xl text-black text-bold mb-5 mt-5">Date Minted</h3>
              <ul class=" flex flex-wrap content-start text-center gap-7 px-4 w-full sm:w-1/2 lg:w-full border-gray-600 border-b lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <li>
                  <input   class="border-2 border-black bg-white block p-1 w-52 text-center hover:bg-black text-black-500 hover:text-white" placeholder="MM-DD-YYYY">
                </li>
                <a>~</a>
                <li>
                  <input   class="border-2 border-black bg-white block p-1 w-52 text-center hover:bg-black text-black-500 hover:text-white" placeholder="MM-DD-YYYY">
                </li>
                
              </ul>





              </div>
            </div>
          </li>
	  





      <!--Toggleable Link-->
      <li class="toggleable">
        <input type="checkbox" value="selected" id="toggle-two" class="toggle-input2 hidden">
          <label for="toggle-two" class="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">Artist</label>
          <div role="toggle" class="p-6 mega-menu2 mb-16 sm:mb-0 shadow-xl bg-white z-10  absolute left-0 text-left w-full hidden">
            <div class="container mx-auto w-11/12 flex flex-col justify-between mx-2">




              <h3 class="font-bold text-xl text-black text-bold mb-5 mt-5">Details</h3>
              <ul class=" flex flex-wrap content-start text-center gap-7 px-4 w-full sm:w-1/2 lg:w-full border-gray-600 border-b lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52  hover:bg-black text-black-500 hover:text-white">New in past week</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">New in past manth</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">No sales yet</a>
                </li>
              </ul>





              <h3 class="font-bold text-xl text-black text-bold mb-5 mt-5">Connections</h3>
              <ul class=" flex flex-wrap content-start text-center gap-7 px-4 w-full sm:w-1/2 lg:w-full border-gray-600 border-b lg:border-b-0 pb-6 pt-6 lg:pt-3">
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52  hover:bg-black text-black-500 hover:text-white">Artists you follow</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Artists you've collected</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-52 hover:bg-black text-black-500 hover:text-white">Artists that follow you</a>
                </li>
                <li>
                  <a   class="border-2 border-black bg-white block p-1 w-auto hover:bg-black text-black-500 hover:text-white">Artists followed by those you follow</a>
                </li>
              </ul>





              </div>
            </div>
          </li>
		  
          <!-- ## Toggleable Link Template ##
      
		  <li class="toggleable"><input type="checkbox" value="selected" id="toggle-xxx" class="toggle-input"><label for="toggle-xxx" class="cursor-pointer">Click</label><div role="toggle" class="mega-menu">
			Add your mega menu content
			</div></li>
		  
		  -->
		  
          <!--Hoverable Link-->
        
          <!-- ## Hoverable Link Template ##
      
		  <li class="hoverable hover:bg-blue-800 hover:text-white"><a   class="relative block">x</a><div class="mega-menu">
			Add your mega menu content
			</div></li>
		  
		  -->
        </ul>
        <div class="w-1/2 h-22 relative bg-black-500 mt-3 flex ">
           <div class="w-full pt-2 relative mx-auto text-gray-600 ">
                <input class="border-0 border-gray-300 bg-white h-10 pl-5 pr-5 mr-5 rounded-lg text-sm focus:outline-none  w-11/12"
                type="search" name="search" placeholder="Search by painting, artists or keyword">
                <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                    <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
                </button>
            </div>
             <div class="dropdown mt-3 z-10">
              <div class="group inline-block border-l-2">
                <button
                    class="outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center w-44"
                >
                    <span class="pr-1 font-semibold flex-1">Resently Active</span>
                    <span>
                    <svg
                        class="fill-current h-4 w-4 transform group-hover:-rotate-180
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                    </svg>
                    </span>
                </button>
                <ul
                    class="bg-white border-2 border-black rounded-sm transform scale-0 group-hover:scale-100 absolute 
                transition duration-150 ease-in-out origin-top min-w-32"
                >
                    <li class="rounded-sm px-3 py-1 bg-gray-26">Resently Active</li>
                    <li class="rounded-sm px-3 py-1 bg-gray-26">Ending Soon</li>
                    <li class="rounded-sm px-3 py-1 bg-gray-26">Lowest Price</li>
                    <li class="rounded-sm px-3 py-1 bg-gray-26">Highest Price</li>
                    <li class="rounded-sm px-3 py-1 bg-gray-26">Newest</li>
                    <li class="rounded-sm px-3 py-1 bg-gray-26">Oldest</li>

                    <!-- <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                    <button
                        class="w-full text-left flex items-center outline-none focus:outline-none"
                    >
                        <span class="pr-1 flex-1">Langauges</span>
                        <span class="mr-auto">
                        <svg
                            class="fill-current h-4 w-4
                            transition duration-150 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                            />
                        </svg>
                        </span>
                    </button>
                    <ul
                        class="bg-white border rounded-sm absolute top-0 right-0 
                transition duration-150 ease-in-out origin-top-left
                min-w-32
                "
                    >
                        <li class="px-3 py-1 hover:bg-gray-100">Javascript</li>
                        <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                        <button
                            class="w-full text-left flex items-center outline-none focus:outline-none"
                        >
                            <span class="pr-1 flex-1">Python</span>
                            <span class="mr-auto">
                            <svg
                                class="fill-current h-4 w-4
                                transition duration-150 ease-in-out"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                            </span>
                        </button>
                        <ul
                            class="bg-white border rounded-sm absolute top-0 right-0 
                    transition duration-150 ease-in-out origin-top-left
                    min-w-32
                    "
                        >
                            <li class="px-3 py-1 hover:bg-gray-100">2.7</li>
                            <li class="px-3 py-1 hover:bg-gray-100">3+</li>
                        </ul>
                        </li>
                        <li class="px-3 py-1 hover:bg-gray-100">Go</li>
                        <li class="px-3 py-1 hover:bg-gray-100">Rust</li>
                    </ul>
                    </li> -->
                </ul>
            </div>
         </div>
         </div>




        





      </div>
    </nav>
  </body>
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
           var g = true;
           var h = true;

       
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
                   g = true;
                   h = true;
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                    g = true;
                    h = true;
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
                    g = true;
                    h = true;
                }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                    g = true;
                    h = true;
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
                g = true;
                h = true;
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                    g = true;
                    h = true;
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
                    g = true;
                    h = true;
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                    g = true;
                    h = true;
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
                    g = true;
                    h = true;

               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                    g = true;
                    h = true;
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
                    g = true;
                    h = true;
                    
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                    g = true;
                    h = true;
               }
           })
           $(document).on("click", "#input7", function(){
                if( g == true ){
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    $(this).css("backgroundColor","#000000");
                    $(this).css("color","#ffffff");
                    g= false;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    a = true;
                    f = true;
                    h = true;
                    
               }else {
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    a = true;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    f = true;
                    g = true;
                    h = true;
               }
           })
           $(document).on("click", "#input8", function(){
                if( h == true ){
                    $(".input-all").css("backgroundColor","#ffffff");
                    $(".input-all").css("color","#000000");
                    $(this).css("backgroundColor","#000000");
                    $(this).css("color","#ffffff");
                    h = false;
                    b = true;
                    c = true;
                    d = true;
                    e = true;
                    a = true;
                    g = true;
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
                    g = true;
                    h = true;
               }
           })

          $(".toggle-input1").click(function(){
            if( $(".toggle-input1").is(":checked")){
              $(".mega-menu1").css("display","inline-block");
              $(".mega-menu2").css("display","none");
              $(".toggle-input2").prop('checked', false);
            } else {
              $(".mega-menu1").css("display","none");
              $(".mega-menu2").css("display","none");
              $(".toggle-input1").prop('checked', false);
              $(".toggle-input2").prop('checked', false);

            }
          })
          $(".toggle-input2").click(function(){
            if( $(".toggle-input2").is(":checked")){
              $(".mega-menu2").css("display","inline-block");
              $(".mega-menu1").css("display","none");
              $(".toggle-input1").prop('checked', false);
            } else {
              $(".mega-menu1").css("display","none");
              $(".mega-menu2").css("display","none");
              $(".toggle-input1").prop('checked', false);
              $(".toggle-input2").prop('checked', false);

            }
          })

       })



export default {
  data:function(){
    return{
      a:false,
    }
  }
}
</script>

<style scoped>
.bg-gray-26:hover{
  background:#262626;
  color:#fff;
}





 /* #Mega Menu Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  .mega-menu {
    /* display: none; */
    /* left: 0;
    position: absolute;
    text-align: left;
    width: 100%; */
  }



  /* #hoverable Class Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  .hoverable {
    position: static;
  }

  .hoverable > a:after {
    content: "\25BC";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -1px;
  }

  .hoverable:hover .mega-menu {
    display: block;
  }
/* .toggle {
  height:55vh;
  overflow: scroll;
} */

  /* #toggle Class Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  .toggleable > label:after {
    content: "\25BC";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -1px;
  }

  .toggle-input1, .toggle-input2 {
    display: none;
  } 
  /* .toggle-input1:not(checked) ~ .mega-menu {
    display: none;
  }
  .toggle-input2:not(checked) ~ .mega-menu {
    display: none;
  }

  .toggle-input1:checked ~ .mega-menu {
    display: block;
  }
  .toggle-input2:checked ~ .mega-menu {
    display: block;
  } */


  .toggle-input1:checked + label {
    color: white;
    background: #2c5282; /*@apply bg-blue-800 */
  }
  .toggle-input2:checked + label {
    color: white;
    background: #2c5282; /*@apply bg-blue-800 */
  }

  .toggle-input1:checked ~ label:after {
    content: "\25B2";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -1px;
  }
  .toggle-input2:checked ~ label:after {
    content: "\25B2";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -1px;
  }

  .dropdown > div{
      border-color: #ccc;
  }
  
  .dropdown li>ul                 { transform: translatex(100%) scale(0) }
  .dropdown li:hover>ul           { transform: translatex(101%) scale(1) }
  .dropdown li > button svg       { transform: rotate(-90deg) }
  .dropdown li:hover > button svg { transform: rotate(-270deg) }

  .group:hover .group-hover\:scale-100 { transform: scale(1) }
  .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
  .scale-0 { transform: scale(0) }
  .min-w-32 { min-width: 8rem }
</style>