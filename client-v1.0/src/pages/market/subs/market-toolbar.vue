<template>
 <body class="bg-gray-200 font-sans leading-normal tracking-normal my-6">
    <nav class="relative bg-white  border-gray-300 text-gray-900 ">
    <div class="container mx-auto flex justify-between mb-24 border-05-tb">

    <!-- <button class="cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-light" @click="onFilter"> -->
    <button class="cursor-pointer  px-4 text-sm lg:text-base font-light" @click="onFilter">
        <span class="sm:px-12 pt-2 pb-5 hover:underline text-sm text-gray-900 font-medium hover-text-blue-edit duration-300 underline" :class="{'text-white':isOpen}">
            Filter</span>
    </button>
 <!-- :class="{'hidden': !isOpen }" -->
    <div class="absolute top-edit shadow-2xl  bg-white w-full z-20 duration-300" :class="{'hidden': !isOpen }" @blur="onFocusOut">
            <div class="box p-2 pt-6 sm:pt-0 sm:p-5 sm:pl-36 relative">
                <div class=" flex absolute right-0 top-8 sm:right-4 sm:top-0">
                    <div class="text-sm font-medium mr-5 hover:text-gray-500 underline" @click="ds.clear=!ds.clear;onChange()">Clear</div>
                    <div class="text-xl font-medium mr-5 hover:text-gray-500"  @click="ds.clear=!ds.clear;onChange() & onFilter()">
                        <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0724 12.4972L24.8818 0.687841C25.0392 0.530412 25.0392 0.275219 24.8818 0.11779C24.7244 -0.0395888 24.4692 -0.0395888 24.3118 0.11779L12.5023 11.9272L0.692939 0.11779C0.532789 -0.0368676 0.277596 -0.032433 0.122888 0.127717C-0.0279897 0.283937 -0.0279897 0.531621 0.122888 0.687841L11.9323 12.4972L0.122888 24.3067C-0.0372621 24.4614 -0.0416967 24.7165 0.113011 24.8767C0.267719 25.0368 0.522912 25.0413 0.683062 24.8866C0.686439 24.8834 0.689714 24.88 0.692939 24.8767L12.5023 13.0673L24.3118 24.8767C24.4719 25.0314 24.7271 25.027 24.8818 24.8668C25.0327 24.7106 25.0327 24.4629 24.8818 24.3067L13.0724 12.4972Z" fill="black"/>
                        </svg>
                    </div>
                </div>
                <div class="mt-10">
                <div class="text-sm m-2"> 
                    <label class="block uppercase tracking-wide text-parula-dark text-xs sm:text-sm font-bold mb-2" for="grid-first-name">
                            Choose type your looking for
                </label></div>
                
                <div class="flex justify-start ml-2 mb-6">
                <button class="px-2 sm:px-16 py-1 text-sm font-light  bg-white outline-none focus:outline-none m-1 hover-black  hover:m-0 focus:m-0 border border-05-26 hover:border-4 focus:border-4 hover:text-gray-800   transition-all"
                :class="{'text-white bg-parula-dark': ds.aution_only }" @click="reset();ds.aution_only=!ds.aution_only;">
                    <i class="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none"></i>Auction Only
                </button>
                <button class="px-2 sm:px-16 py-1 text-sm font-light  bg-white outline-none focus:outline-none m-1  hover:m-0 focus:m-0 border border-05-26 hover:border-4 focus:border-4 hover-black hover:text-gray-800   transition-all"
                :class="{'text-white bg-parula-dark': ds.fixed_only }" @click="reset();ds.fixed_only=!ds.fixed_only;">
                    <i class="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none"></i>Fixed Price Only
                </button>
                <button class="px-2 sm:px-16 py-1 text-sm font-light  bg-white outline-none focus:outline-none m-1  hover:m-0 focus:m-0 border border-05-26 hover:border-4 focus:border-4 hover-black hover:text-gray-800  transition-all"
                :class="{'text-white bg-parula-dark': ds.liked }" @click="reset();ds.liked=!ds.liked;">
                    <i class="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none"></i>Liked 
                </button>
                <button class="px-2 sm:px-16 py-1 text-sm font-light  bg-white outline-none focus:outline-none m-1  hover:m-0 focus:m-0 border border-05-26 hover:border-4 focus:border-4 hover-black hover:text-gray-800  transition-all"
                :class="{'text-white bg-parula-dark': ds.genesis }" @click="reset();ds.genesis=!ds.genesis;">
                    <i class="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none font-semibold"></i>Genesis Price
                </button>
                </div>
                 <div class="">
                     <div class="flex sm:flex-wrap  mb-6">
                        
                        <div class="w-full md:w-1/6 pl-2 mb-2 sm:mb-0">
                            <label class="block uppercase tracking-wide text-parula-dark text-sm font-bold mb-2" for="grid-last-name">
                                Mint After
                            </label>
                            <input v-model="ds.mint_after" class="appearance-none block w-full bg-gray-200 text-gray-700 border-05-26 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="MM-DD-YYYY">
                        </div>
                        <div class="w-full md:w-1/6 pl-2 sm:px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-parula-dark text-sm font-bold mb-2" for="grid-first-name">
                                Mint before
                            </label>
                            <input v-model="ds.mint_before" class="appearance-none block w-full bg-gray-200 text-gray-700 border-05-26 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="MM-DD-YYYY">
                        </div>
                       
                    </div>
                 </div>
                
                <div class="ml-2">
                    <label class="block uppercase tracking-wide text-parula-dark text-sm font-bold  mb-2">
                            TOKEN TYPE
                    </label>
                    <div class="flex justify-start">
                        <button
                            class="px-4 sm:px-16 py-1 text-sm font-light  bg-white outline-none focus:outline-none m-1 hover-black hover:m-0 focus:m-0 border border-05-26 hover:border-4 focus:border-4 hover:border-05-26 hover:text-gray-800  focus:border-purple-200 transition-all"
                            :class="{'text-white bg-parula-dark': ds.assetType == 'all' }"
                            @click="ds.assetType='all';">
                            <i class="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none"></i>All
                        </button>
                        <button
                            class="px-4 sm:px-16 py-1 text-sm font-light  bg-white outline-none focus:outline-none m-1 hover-black hover:m-0 focus:m-0 border border-05-26 hover:border-4 focus:border-4 hover:border-05-26 hover:text-gray-800  focus:border-purple-200 transition-all"
                            :class="{'text-white bg-parula-dark': ds.assetType == 'erc721' }"
                            @click="ds.assetType='erc721';">
                            <i class="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none"></i>ERC 721
                        </button>
                        <button
                            class="px-4 sm:px-16 py-1 text-sm font-light  bg-white outline-none focus:outline-none m-1 hover-black hover:m-0 focus:m-0 border border-05-26 hover:border-4 focus:border-4 hover:border-05-26 hover:text-gray-800  focus:border-purple-200 transition-all"
                            :class="{'text-white bg-parula-dark': ds.assetType =='erc20' }"
                            @click="ds.assetType ='erc20';">
                            <i class="mdi mdi-circle-outline mr-2 text-xl align-middle leading-none"></i>ERC 20
                        </button>
                    </div>
                </div>
                

            </div>    
            </div>

            <div class="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-end items-baseline">
                        <div class="mx-6 flex flex-row py-2 mr-6 flex-wrap">
                            <button
                                class="w-32 h-11 rounded flex border-solid border-05-26 text-white bg-parula-dark hover:bg-gray-900 mx-2 justify-center place-items-center"
                                @click="onChange() & onFilter()"
                                >
                                <div class="">Search</div>
                            </button>
                        </div>
                    </div>
    </div>

    <div class="w-full sm:w-1/2 h-22 relative bg-black-500 flex ">
        <div class="w-8/12 py-3 sm:py-2 relative sm:mx-auto text-gray-600 ">
                <input class="border-0 border-gray-300 bg-white h-10   rounded-lg text-sm focus:outline-none  w-11/12 text-left sm:text-right text-parula-gray-1"
                type="search" name="search" id="searchbar" placeholder="Search by Painting, Artists or Keyword" v-model="ds.search" v-on:keyup.enter="onChange(ds.search.value)">
                <button class="absolute right-0 top-0 mt-6 sm:mt-5 mr-2 sm:mr-4" @click="onChange(ds.search.value)">
                <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                    width="512px" height="512px">
                    <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
                </button>
            </div>
            <section class="dropdown sm:mt-4 z-10" id="theme">
                <div class="group inline-block border-l-2">
                    <button
                        class="select outline-none focus:outline-none py-3 px-3 sm:py-1 rounded-sm flex items-center w-14 sm:w-44"
                    >
                        <span class="text pr-1 font-light flex-1 text-sm text-gray-900 hover:text-gray-200">Recently Active</span>
                        <span>
                        <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180
                            transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                        </span>
                    </button>
                    <!-- <ul class="bg-white border-2 border-black rounded-sm transform scale-0 group-hover:scale-100 absolute 
                    transition duration-150 ease-in-out origin-top min-w-32"> -->
                    <ul  class="option-list absolute right-0 mt-2 w-36 sm:w-48 bg-white rounded-md overflow-hidden market_filter_shadow z-50 transform scale-0 group-hover:scale-100 absolute 
                    transition duration-80 ease-in-out origin-top min-w-42 min-h-42" >
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        :class="{'text-white bg-gray-800': ds.recentlyActive }" @click="ds.recentlyActive=!ds.recentlyActive;onChange()"
                        >Recently Active</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400" 
                        :class="{'text-white bg-gray-800': ds.EndingSoon }" @click="ds.EndingSoon=!ds.EndingSoon;onChange()"
                        >Ending Soon</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        :class="{'text-white bg-gray-800': ds.LowestPrice }" @click="ds.LowestPrice=!ds.LowestPrice;onChange()"
                         >Lowest Price</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400" 
                        :class="{'text-white bg-gray-800': ds.HighestPrice }" @click="ds.HighestPrice=!ds.HighestPrice;onChange()"
                        >Highest Price</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        :class="{'text-white bg-gray-800': ds.Newest }" @click="ds.Newest=!ds.Newest;onChange()"
                         >Newest</li>
                        <li class="option z-50 block px-4 py-2 text-sm text-gray-900 font-light border-gray-50 border-b hover:bg-gray-400"
                        :class="{'text-white bg-gray-800': ds.Oldest }" @click="ds.Oldest=!ds.Oldest;onChange()"
                         >Oldest</li> 
                    </ul>
                </div>
            </section>
        </div>
    </div>
    </nav>
</body>
</template>


<script>

window.onload = function(){
    function onClickSelect(e) {
    const isActive = e.currentTarget.className.indexOf("active") !== -1;
    // if (isActive) {
    //     e.currentTarget.className = "select";
    // } else {
    //     e.currentTarget.className = "select active";
    // }
    }

    document.querySelector("#theme .select").addEventListener("click", onClickSelect);

    function onClickOption(e) {
    const selectedValue = e.currentTarget.innerHTML;
    document.querySelector("#theme .text").innerHTML = selectedValue;
    }

    var optionList = document.querySelectorAll("#theme .option");
    for (var i = 0; i < optionList.length; i++) {
    var option = optionList[i];
    option.addEventListener("click", onClickOption);
    }
}

export default {
    created: function() {
       
    },
    data: function(){
        return{
             isOpen:false,
             ds:{
                 aution_only:false,
                 fixed_only:false,
                 liked:false,
                 genesis:false,
                 clear:false,
                 assetType:'all',
                 mint_before:'',
                 mint_after:'',
                 assetType:'',
                 search:'',
                 recentlyActive:false,
                 EndingSoon:false,
                 LowestPrice:false,
                 HighestPrice:false,
                 Newest:false,
                 Oldest:false,
             }
        }
    },
     props: {
    },
    components: {
    },
    methods:{
       open(val){
           this.isOpen = val;
       },
       onFilter(){
           this.isOpen = !this.isOpen;
           this.$emit('toggleFilter', this.isOpen)
       },
       onFocusOut(){
           alert('s')
           this.isOpen = false
           this.$emit('toggleFilter', this.isOpen)
       },
       reset(){
           this.ds.aution_only = false;
           this.ds.fixed_only = false;
           this.ds.liked = false;
           this.ds.genesis = false;
       },
       onChange(){
           console.log('change!!!')
           this.$emit('filterChanged', this.ds)
       },
       onSort(param){
           this.ds.sortby = param;
           this.$emit('filterChanged', this.ds)
       }
    } 
}
</script>

<style scoped>
.bg-parula-dark{
  background-color:#262626;
}
.hover-black:hover{
  background-color:#262626;
  color:#fff;
}
.top-edit{
    top:3.6rem;
}
.border-05-tb{
    border-top:0.5px solid #f3f3f3;
    border-bottom:0.5px solid #f3f3f3;
}
.dropdown:focus-within .dropdown-menu {
  opacity:1;
  transform: translate(0) scale(1);
  visibility: visible;
}
.hover-text-blue-edit:hover{
    color:#064994;
}
.border-05-26{
    border: 0.5px solid #262626;
}
/** 
.market_filter_shadow{
    transition: margin-top .2s;
    box-shadow: 0 3px 10px rgb(0 0 0 / 9%);
    margin-top: 1.25rem;
    width: 100%;
}

*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
*{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
}
.bg-gray-26:hover{
  background:#262626;
  color:#fff;
}
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

  .toggle-input1:checked + label {
    color: white;
    background: #2c5282; 
  }
  .toggle-input2:checked + label {
    color: white;
    background: #2c5282; 
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

.market-wrapper{
    max-width:1440px;
}
.market-img {
    height:14vw;
    width:100%;
    
    background:#000;
}

.market-txt > h1 {
    
    font-weight: 700;
    margin-left:1%;
}
.market-txt > p {
    color:#8a8a8a;
    margin-left:1%;
}
.market-album{
    height:20vw;
}


.market-album > .market-img{
    transition: all .6s ease-in-out;
}
.grid-option{
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, minmax(0, auto));
}
.market-img:hover{
    opacity: 0.6;
    }
.h-full2{
    height:20vw;
}
.gray-color{
    color:#8a8a8a;
}
.input-all:hover {
    background-color:#262626;
    color:#ffffff;
}
*/

  .dropdown > div{
      border-color: #ccc;
      z-index:99999;
  }
  .dropdwon ul, .dropdown li {
      z-index:9999;
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