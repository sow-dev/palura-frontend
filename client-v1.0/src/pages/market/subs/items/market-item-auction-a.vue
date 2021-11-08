<template>

    <!-- <div class="w-full h-full2 mx-auto" >
        <div class="market-img w-full h-full mx-auto relative" v-on:click="clicked(id)">
                <img :src="image" class="w-full h-full object-cover ">
                <div class="w-full h-16 bg-black bg-opacity-70 absolute bottom-0 pl-3 pt-3">
                    <p class="text-xs text-wh font-light">AUCTION ENDS IN 5,610 BLOCKS</p>
                    <h2 class="text-base text-white">
                        {{created_at.substring(0, 10) + "..."}} 
                        </h2>
                    <h2 class="text-xl text-white absolute right-2 bottom-2">{{price_begin}}<span class="text-base pl-1">{{asset_symbol}}</span></h2>
                </div>
            </div>
        <div class="market-txt w-full h-60px mx-auto relative mt-4">
            <h1 class="text-normal font-semibold">{{title}}{{id}}</h1>
            <p class="mt-2 gray-color text-xs font-medium">{{pen_name}}</p>
            <h2 class="absolute right-0 bottom-0 gray-color text-sm font-semibold">{{price_begin}}{{sold_price}}<span>{{asset_symbol}}</span></h2>
            
        </div>
    </div> -->

    <div class="intro-y w-full h-full mx-auto">
    <div class="relative shadow-2xl">
        <a :id="'hover_div_'+id" class="absolute inset-0 z-5 bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-70 duration-300"
        :href= "'./detail.html?id='+id">
            <h1 class="tracking-wider text-white">see more</h1>
        </a>
        <div class="absolute bottom-0 z-4 w-full bg-black bg-opacity-70 text-left flex flex-col items-start justify-center text-white py-5 px-3" v-if="orderState !=3">
             <div class="text-xs font-medium" style="font-size:7pt">AUCTION ENDS IN</div>
             
             <div class="flex  justify-between w-full">
                 <div class="items-start content-start">
                     <div class="text-left" v-html="htmlCounter"></div>
                 </div>
                 <div class="text-right items-end content-end" >
                     <!-- <span class="text-sm m-0" v-if="orderState !=3">{{price_begin}}</span> -->
                     <!-- <span class="text-xs m-0" v-if="orderState !=3">{{asset_symbol}}</span> -->
                     <span class="text-sm m-0" >
                         <DecimalValue v-model="price_begin" />
                     </span>
                     <span class="text-xs m-0" >{{asset_symbol}}</span>
                 </div>
             </div>
        </div>

        <div class="absolute bottom-0 z-4 w-full bg-black bg-opacity-70 text-left flex flex-col items-start justify-center text-white py-5 px-3" v-else>
             <div class="flex  justify-center w-full">
                 <div class="text-center text-lg font-semibold ">SOLD OUT</div>
             </div>
        </div>


        <!-- <img v-if="image !==''" :src="image" class="w-full h-72 lg:h-80 sm:h-96 object-cover rounded-sm" alt="None"> -->
        <ContentViwerMarket v-if="image !==''" id="video_obj" v-model="image" :fileType="fileType" />
        <div v-else class="w-full h-72 lg:h-80 sm:h-96 bg-gray-50" ></div>
    </div>
    <h1 class="mt-5 text-lg text-parula-dark font-semibold">{{title}}</h1>
    <div class="flex justify-between mt-1 text-parula-gray-1">
        <div>{{pen_name}}</div>
        <div>
            <!-- {{price_fixed}}  -->
            <DecimalValue v-model="price_fixed" />
            <span style="font-size:10px;">{{asset_symbol}}</span></div>
    </div>
</div>
</template>


<script >
import  DecimalValue from '../../../../components/DecimalValue'
import ContentViwerMarket from './ContentViwerMarket'
    export default {
        mounted: function () {
            if(this.fileType =='MP4'){
                console.log('mounted MP4')
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
            return {
                interval:{},
                htmlCounter:"",
            }
        },
        props:['id','title','image', 'fileType','pen_name','price_fixed','asset_symbol','price_begin', 'sold_price', 'end_at','created_at','orderState'],
        computed:{
            
        },
        mounted:function(){
            this.setupInterval();
        },
        components: {
            DecimalValue,
            ContentViwerMarket
        },
        methods:{
            remainTime(endtime) {
                // console.log(Date.parse(endtime))
                // console.log(Date.parse(endtime) - Date.parse(new Date()))
                
                // console.log(new Date(endtime))
                // console.log(new Date())
                const total = Date.parse(endtime)  - Date.parse(new Date())
                const seconds = Math.floor((total / 1000) % 60);
                const minutes = Math.floor((total / 1000 / 60) % 60);
                const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
                const days = Math.floor(total / (1000 * 60 * 60 * 24));

                return {
                    total,
                    days,
                    hours,
                    minutes,
                    seconds
                };
            },
            setupInterval(){
                const t =this.remainTime(this.end_at)
                console.log(t.total, t.hour, t.days)
                if(t.total < 0 || this.orderState.order_state==3){
                    this.htmlCounter = '<span class="text-sm mr-5 bg-black mr-5 my-5 round-lg">Auction ended</span>';
                    return;
                }
                this.interval = setInterval(() => {
                    if(this.end_at){
                        const t =this.remainTime(this.end_at)
                        //
                        const html = `<span class="market-item-aution-time-val">${t.days}</span><span class="market-item-aution-time-dsp">D</span>
                        <span class="market-item-aution-time-val">${('00' + t.hours).slice(-2)}</span><span class="market-item-aution-time-dsp">H</span>
                        <span class="market-item-aution-time-val">${('00' + t.minutes).slice(-2)}</span><span class="market-item-aution-time-dsp">M</span>
                        <span class="market-item-aution-time-val">${ ('00' + t.seconds).slice(-2)}</span><span class="market-item-aution-time-dsp">S</span>`
                        this.htmlCounter = html;
                    }else{
                        this.htmlCounter =''
                    }
                }, 1000);
            },
             formatDate(d){
                console.log('time 정보',new Date(d))
                // const target = this.$dayjs(d)
                // const now = this.$dayjs()
                // console.log('now',now)
                const now =  Date()
                const target = new Date(d)
                const secondsLeft = target - now;

                console.log('sss:', secondsLeft)
                const days = Math.floor(secondsLeft/24/60/60);
                const hoursLeft = Math.floor((secondsLeft) - (days*86400));
                const hours = Math.floor(hoursLeft/3600);
                const minutesLeft = Math.floor((hoursLeft) - (hours*3600));
                const minutes = Math.floor(minutesLeft/60);
                const seconds = secondsLeft % 60;

            return {
                "days":days,
                "hours":hours,
                "minutes":minutes,
                "second":seconds,
                "date":target
            }
            // console.log('this.$dayjs(d):::',this.$dayjs(d))
            // return this.$dayjs(d).format('YYYY/MM/DD')
            //return ''
            }
        },
        destroyed(){
            clearInterval(this.interval);
        } 
    } 
</script>

<style scope>
.market-item-aution-time-val{
    font-size: 12pt;
}
 
 .market-item-aution-time-dsp{
    font-size: 8pt;
    margin-right: 5px;
}
</style>