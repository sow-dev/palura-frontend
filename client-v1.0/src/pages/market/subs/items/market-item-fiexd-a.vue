<template>
    <div>
        <div class="intro-y w-full h-full mx-auto"  v-if="orderState !=3">
            <div class="relative shadow-2xl">
                <a  :id="'hover_div_'+id" class="absolute inset-0 z-5 bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-70 duration-300"
                :href= "'./detail.html?id='+id">
                    <h1 class="tracking-wider text-white">see more</h1>
                </a>
                <!-- <img v-if="image !==''" :src="image" class="w-full h-72 lg:h-80 sm:h-96 object-cover rounded-sm" alt="None"> -->
                <!-- fileType:{{fileType}} -->
                <ContentViwerMarket v-if="image !==''" id="video_obj" v-model="image" :fileType="fileType"  />
                <div v-else class="w-full h-72 lg:h-80 sm:h-96 bg-gray-50" ></div>
            </div>
            <h1 class="mt-5 text-lg text-parula-dark font-semibold">{{title}}</h1>
            <div class="flex justify-between w-full mt-1 text-parula-gray-1">
                <div>{{pen_name}}</div>
                <div> <DecimalValue v-model="price_fixed" /><span style="font-size:10px;">{{asset_symbol}}</span></div>
            </div>
        </div>


        <div class="intro-y w-full h-full mx-auto"  v-else>
            <div class="relative shadow-2xl relative">
                <a class="absolute inset-0 z-5 bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-70 duration-300"
                :href= "'./detail.html?id='+id">
                    <h1 class="tracking-wider text-white">see more</h1>
                </a>
                <ContentViwerMarket v-if="image !==''" v-model="image" :fileType="fileType" />
                <!-- <img v-if="image !==''" :src="image" class="w-full h-72 lg:h-80 sm:h-96 object-cover rounded-sm" alt="None"> -->
                <div v-else class="w-full h-72 lg:h-80 sm:h-96 bg-gray-50" ></div>
                 <div class="absolute bottom-0 z-4 w-full bg-black bg-opacity-70 text-left flex flex-col items-start justify-center text-white py-5 px-3">
                    <div class="flex  justify-center w-full">
                        <div class="text-center text-lg font-semibold ">SOLD OUT</div>
                    </div>
                </div>
            </div>
            <h1 class="mt-5 text-lg text-parula-dark font-semibold">{{title}}</h1>
            <div class="flex justify-between w-full mt-1 text-parula-gray-1">
                <div>{{pen_name}}</div>
                <div>
                     <!-- {{price_fixed}} -->
                     <DecimalValue v-model="price_fixed" /><span style="font-size:10px;">{{asset_symbol}}</span></div>
            </div>
           
        </div>



    </div>
</template>


<script >
import  DecimalValue from '../../../../components/DecimalValue'
import ContentViwerMarket from './ContentViwerMarket.vue'

    export default {
        mounted: function () {
            if(this.fileType =='MP4'){
                // console.log('mounted MP4')
                const video_objs =  document.getElementsByTagName('video')
                console.log('video_obj', video_objs)
                video_objs.forEach(element => {
                    console.log('element', element)
                    element.addEventListener('mouseover', this.hoverVideo, false);
                    element.addEventListener('mouseout', this.hideVideo, false);
                    element.addEventListener('click', ()=>{
                        location.href = './detail.html?id='+this.id
                    }, false);
                });
            }
        },
        data: function () {
            return {}
        },
        props:['id','title','image', 'fileType','pen_name','price_fixed','asset_symbol','orderState'],
        components: {
            DecimalValue,
            ContentViwerMarket
        },
        methods: {
            hoverVideo(e) {
                console.log('mouseover')
                const hover_div =  document.getElementById('hover_div_'+this.id)
                hover_div.style.opacity = 1;
                
            },
            hideVideo(e) {
                console.log('mouseout')
                const hover_div =  document.getElementById('hover_div_'+this.id)
                hover_div.style.opacity = 0;
            }
        }
    } 
</script>

<style scope>
</style>

