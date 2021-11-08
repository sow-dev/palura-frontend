<template>     
<div class="w-full h-55screen">
    <p class="text-2xl font-bold text-left text-gray-900 ml-1">The Artist Spotlight</p>
    <div class="w-full h-full relative mt-5">
        <!-- <img :src="itemlist.items[0].image" alt=""> -->
        <img class="w-full h-full absolute justify-cover mx-auto" src="../../../../src/assets/img/spotLight.jpg" alt="">
        
        <div class="absolute inset-0 z-20 flex lg:items-end sm:items-center justify-center lg:w-full sm:w-full">
            <div class="relative bottom-10 text-white font-opensans lg:right-1/3">
                <p class=" font-semibold text-left lg:text-2xl sm:text-sm">Artist
                </p>
                <p class=" font-semibold text-left mt-8 lg:text-5xl sm:text-3xl">
                    Matt Moloney
                </p>
            </div>
        </div>
        
    </div>
</div>
    
</template>

<script>
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

      },

}
</script>


<style scope>
.bgSpotlight{
 /* background-color: #064994; */
}


</style>