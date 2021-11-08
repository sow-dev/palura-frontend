<template>
    <div class="flex flex-row items-center  text-xs text-parula-gray-1 space-x-2" v-if="detailList.order_state!=3">
    <div class="">start</div>
    <div class="bg-parula-gray-2 rounded h-2 w-28" role="progressbar" :aria-valuenow="percent" aria-valuemin="0"
        aria-valuemax="100">
        <div class="bg-parula-dark rounded-xl h-2 text-center" :style="`width: ${percent}%; transition: width 3s;`">
        </div>
    </div>
    <div class="mr-2">end</div>
    </div>
    <div v-else>

    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted(){
        setTimeout(() => {
            this.percent = this.remainPercent(this.begin_at, this.end_at)        
        }, 1500);
    },
    props: ['begin_at', 'end_at','detailList'],
    data: function () {
        return {
            percent: 0
        }
    },

    methods: {
        remainPercent(begintime, endtime) {
            const now = new Date();
            var yearNow = now.getFullYear();
            var monthNow = now.getMonth()+1;
            var dayNow = now.getDate();
            var hoursNow = now.getHours();
            var minutesNow = now.getMinutes();
            var secondNow = now.getSeconds();
            var dateNow = new Date(yearNow, monthNow, dayNow, hoursNow, minutesNow, secondNow);

            var endTimeType=endtime.split("-")
            var endTimeType2 = endtime.split(":")
            var endTimeYear = endTimeType[0];
            var endTimeMonth = endTimeType[1];
            var endTimeDate = endTimeType[2].substring(0,2);
            var endTimeHours = endTimeType2[0].slice(-2);
            var endTimeMinutes = endTimeType2[1];
            var endTimeSeconds = endTimeType2[2].substring(0,2);
            var dateEnd = new Date(endTimeYear, endTimeMonth, endTimeDate, endTimeHours, endTimeMinutes, endTimeSeconds);

            var beginTimeType=begintime.split("-")
            var beginTimeType2 = begintime.split(":")
            var beginTimeYear = beginTimeType[0];
            var beginTimeMonth = beginTimeType[1];
            var beginTimeDate = beginTimeType[2].substring(0,2);
            var beginTimeHours = beginTimeType2[0].slice(-2);
            var beginTimeMinutes = beginTimeType2[1];
            var beginTimeSeconds = beginTimeType2[2].substring(0,2);
            var dateBegin = new Date(beginTimeYear, beginTimeMonth, beginTimeDate, beginTimeHours, beginTimeMinutes, beginTimeSeconds);


            const total = Date.parse(dateEnd) - Date.parse(dateBegin)
            const current = Date.parse(dateEnd) - Date.parse(dateNow)
            console.log('total',total)
            console.log('current',current)
            console.log('100 - (current /  total* 100)',100 - (current /  total* 100))
            return 100 - (current /  total* 100)
        },
    }
}
</script>

<style>

</style>