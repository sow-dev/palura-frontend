<template>
    <div class="w-full">
        <div v-if="fileType === 'MP4'">
            <video :src="inputVal" class="h-5/6 mx-auto my-auto" autoplay loop></video>
        </div>
        <div v-else>
            <img  :src="inputVal" class="h-5/6 mx-auto my-auto" alt="None">
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
