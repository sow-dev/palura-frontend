<template>
    <div class="w-full">
        <div v-if="fileType === 'MP4'">
            <video :src="inputVal" class="w-full h-72 lg:h-80 sm:h-96 object-cover rounded-sm z-0" autoplay loop></video>
        </div>
        <div v-else>
            <img  :src="inputVal" class="w-full h-72 lg:h-80 sm:h-96 object-cover rounded-sm" alt="None">
        </div>
    </div>
</template>

<script >

export default {
    components:{
        
    },
    props: {
        modelValue:String,
        fileType:String
    },
     computed: {
         inputVal: {
             get() {
                 return this.modelValue;
             },
             set(val) {
                 this.$emit('update:modelValue', val);
             }
         }
     },
    methods: {}
}
</script>
