<template>
    <div class="grid grid-cols-2 gap-2 sm:gap-8  w-activity-edit items-center">
        <div class="w-40 h-40  sm:w-52 sm:h-52 overflow-hidden shadow-sm rounded-sm hover:shadow-lg transition duration-300">
            <ContentViwerActivity v-model="ds.target_thumbnail" />
        </div>  
        <div class="flex flex-col flex-wrap ml-5  justify-center w-3/5 h-52  tracking-wide leading-relaxed">
            <h1 class="text-lg font-semibold mb-2">
                <a :href="'./detail.html/'+ds.target_id" class="text-gray-800 hover:text-blue-500" >{{ds.target_name}}
                </a></h1>
            
            <p class="text-md " style="color:#6d6d6d">{{ds.event}} by <b>{{ds.user_nickname}}</b></p>
            <!-- <p>상태 :  {{ds.evt}}</p> -->
            <p class="mt-1 mb-2 text-xs font-medium" style="color:#6d6d6d">
                {{timeLeft(ds.created_at)}}
                <!-- {{ds.created_at.replace('T',' ').replace('.000Z','')}} -->
            </p>
        </div>
    </div>
</template>


<script >
import ContentViwerActivity from './ContentViwerActivity'
export default {
    created: function () {
    },
    data: function () {
        return {}
    },
    props:["ds"],
    components: {
        ContentViwerActivity
    },
    computed:{
        
    },
    methods:{
        remainTime(endtime) {
            const now = new Date();
            var yearNow = now.getFullYear();
            var monthNow = now.getMonth()+1;
            var dayNow = now.getDate();
            var hoursNow = now.getHours();
            var minutesNow = now.getMinutes();
            var secondNow = now.getSeconds();
            console.log('yearNow',yearNow)
            console.log('monthNow',monthNow)
            console.log('dayNow',dayNow)
            console.log('hoursNow',hoursNow)
            console.log('minutesNow',minutesNow)
            console.log('secondNow',secondNow)

            var endTimeType=endtime.split("-")
            var endTimeType2 = endtime.split(":")
            console.log('endTimeType',endTimeType)
            console.log('endTimeType2',endTimeType2)
            var endTimeYear = endTimeType[0];
            var endTimeMonth = endTimeType[1];
            var endTimeDate = endTimeType[2].substring(0,2);
            var endTimeHours = endTimeType2[0].slice(-2);
            var endTimeMinutes = endTimeType2[1];
            var endTimeSeconds = endTimeType2[2].substring(0,2);
            
            
            var dateNow = new Date(yearNow, monthNow, dayNow, hoursNow, minutesNow, secondNow);
            var dateEnd = new Date(endTimeYear, endTimeMonth, endTimeDate, endTimeHours, endTimeMinutes, endTimeSeconds);
            
            console.log('dateNow',dateNow)
            console.log('dateEnd',dateEnd)

            const total = Date.parse(dateNow)- Date.parse(dateEnd)
            

            console.log('new Date()',new Date())
            console.log('endtime',new Date(endtime))
            console.log('endtime',endtime)

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
        timeLeft(_dt){
            const tm = this.remainTime(_dt)
            let res ='';
            if(Number(tm.days) > 0){
                if(Number(tm.days)==1){
                    res =`${tm.days} day`
                }else {
                res =`${tm.days} days`
                }
            }
            if(Number(tm.hours) > 0){
                res = `${res} ${tm.hours} hours`
                if(Number(tm.hours) >= 1){
                    return res + ' ago'
                }
            }
            if(Number(tm.minutes) > 0){
                res =`${res} ${tm.minutes} minutes`
            }
            res =`${res} ${tm.seconds} seconds ago`

            return res;

        }
    }
} 
</script>

<style scope>
  
</style>