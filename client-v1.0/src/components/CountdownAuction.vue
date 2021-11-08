<template>
<div class="text-left" v-html="htmlCounter">
</div>
</template>


<script >
    export default {
        created: function () {
        },
        data: function () {
            return {
                interval:{},
                htmlCounter:"",
            }
        },
        props:['end_at','detailList'],
        computed:{
            
        },
        mounted:function(){
            this.setupInterval();
        },
        components: {},
        methods:{
            remainTime(endtime) {
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
                if(t.total < 0 || this.detailList.order_state==3){
                    this.htmlCounter = '<span class="text-sm mr-5 mr-5 my-5 round-lg">Auction ended</span>';
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
            }
        },
        destroyed(){
            clearInterval(this.interval);
        } 
    } 
</script>

<style scope>
.market-item-aution-time-val{
    font-size: 18pt;
    font-weight: 700;
}
 
 .market-item-aution-time-dsp{
    font-size: 10pt;
    font-weight: 500;
    margin-right: 8px;
}
</style>