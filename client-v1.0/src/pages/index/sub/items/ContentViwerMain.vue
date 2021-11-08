<template>
    <div class="w-48 h-56">
        <div v-if="fileType === 'MP4'">
            <video :src="inputVal" class="w-48 h-56 object-cover rounded-sm shadow-xl" autoplay loop></video>
        </div>
        <div v-else>
            <img  :src="inputVal" class="w-48 h-56 object-cover rounded-sm shadow-xl" alt="None">
        </div>
    </div>
</template>

<script >

export default {
    components:{
        
    },
    props: {
        modelValue:String,
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
    mounted: function () {
        this.fileType=this.getExt(this.inputVal)
    },
    data: function () {
        return {
            fileType:'JPG'
            }
    },
    methods: {
        getExt(filename) {
            console.log(filename)
            if(filename == null){
                return ''
            }
            else{
                // console.log('filename:', filename)
                var fileLen = filename.length;
                var lastDot = filename.lastIndexOf('.');
                if(lastDot < 1)return '';
                var fileExt = filename.substring(lastDot+1, fileLen).toLowerCase();

                console.log('fileExt:', fileExt)
                if(fileExt.toUpperCase() == 'MP4'){
                    return 'MP4'
                }else {
                    return fileExt;
                }
                
            }
        },
    }
}
</script>
