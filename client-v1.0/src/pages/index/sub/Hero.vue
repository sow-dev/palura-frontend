<template>
<div>
    <div class="z-30 relative items-center justify-center w-full w-screen h-screen">
        <div>
            <div class="inset-0  h-screen">
                <video src="../../../assets/video/paint_drop.mp4" autoplay muted loop
                    class="object-cover w-full h-full">
                </video>
                <!-- <iframe class="object-cover w-full h-full" src="https://www.youtube.com/embed/OhyQRljsp2w?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
            </div>

            <div class="absolute inset-0 z-40  flex justify-between h-full px-8 ">
                <div class="relative z-20 w-full h-24  pt-2 ">
                    <div class="flex items-center justify-between h-full w-full">
                        <!-- <h1 class="w-auto h-12"> Parula</h1> -->

                        <!-- <div id="nav" class=" text-white absolute top-0 left-0 hidden block w-full mt-20 border-b border-gray-200 sm:border-none sm:px-5 sm:block sm:relative sm:mt-0 sm:px-0 sm:w-auto">
                            <nav class="flex flex-col items-center py-3  bg-red-500 sm:flex-row sm:bg-transparent sm:border-none sm:py-0">
                                <a href="#" class="px-1 mb-1 mb-5 mr-0 text-base sm:mb-0 sm:mr-4 lg:mr-8">About</a>
                                <a href="#_" class="px-1 mb-1 mb-5 mr-0 text-base sm:mb-0 sm:mr-4 lg:mr-8">Contact</a>
                                <a href="#" class="px-1 mb-1 mb-5 mr-0 text-base sm:mb-0 sm:mr-4 lg:mr-8">Servies & Products</a>
                            </nav>
                        </div> -->

                        <!-- <div id="nav-mobile-btn"
                            class="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none sm:hidden sm:mt-10">
                            <span
                                class="block w-full h-1 mt-2 duration-200 transform bg-white rounded-full sm:mt-1"></span>
                            <span class="block w-full h-1 mt-1 duration-200 transform bg-white rounded-full"></span>
                        </div> -->
                    </div>
                </div>
            </div>
            
            <div
                class="absolute inset-0 z-20 flex items-center justify-center h-screen w-full bg-gray-900 bg-opacity-50">
            </div>
            <div data-aos="flip-down"
                class="absolute inset-0  z-30 container flex flex-col items-center justify-center h-full max-w-6xl pl-0 mx-auto  sm:pl-8 xl:pl-0 md:flex-row md:justify-between">
                <div class="flex flex-col items-center justify-center mx-auto">
                    <div class="relative text-center ">
                        <h1 class="text-white relative mb-4 text-6xl font-bold font-sans italic leading-none text-center lg:text-9xl xl:text-9xl">
                            <span class="filter drop-shadow" style="color:#FFFFFF">CREATE</span><br>
                            <span class="filter drop-shadow" style="color:#FFFFFF">TUNE</span><br>
                            <span class="filter drop-shadow" style="color:#FFFFFF">DROP</span>
                            </h1>
                        <p class="text-gray-400 text-sm lg:text-4xl lg:text-center font-sans italic">NFT Artworks</p>

                    </div>
                </div>

            </div>

            <div class="absolute bottom-0 z-30 w-full">
            <Wave  />
            </div>

        </div>

    </div>
<div class="h-64"></div>
</div>

<!-- 
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init({
            offset:100,
            duration :1000
        });
    </script>
    <script>
        if( document.getElementById('nav-mobile-btn') ){
            document.getElementById('nav-mobile-btn').addEventListener('click', function(){
                if( this.classList.contains('close') ){
                    document.getElementById('nav').classList.add('hidden');
                    this.classList.remove('close');
                } else {
                    document.getElementById('nav').classList.remove('hidden');
                    this.classList.add('close');
                }
            });
        }
    </script> -->

</template>
<script>
import Wave from "./Wave.vue"
export default {
    created: function() {
       
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
Wave
      },

}
</script>


<style scope>
  
</style>