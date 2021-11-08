<template>
    <div class="w-full">
        <div v-if="fileType === 'MP4'">
            <video :src="inputVal" class="w-full" autoplay loop></video>
        </div>
        <div v-else>
            <img :src="inputVal" class="w-full" />
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
