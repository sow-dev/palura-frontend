<template>

<div class="relative w-edit h-edit">
    <div v-if="inputVal" class="w-full">
        <div v-if="fileType === 'MP4'">
            <video :src="inputVal" class="w-full h-full m-0 p-0 object-cover" style="max-height: 1024px;" autoplay
                loop></video>
        </div>
        <div v-else>
            <img :src="inputVal" class="w-full h-full m-0 p-0 object-cover" style="max-height: 1024px;" alt="None">
        </div>
    </div>
    <div v-else class="w-full h-full bg-parula-gray-3 rounded-md animate-pulse"></div>
    <button class="w-12 h-12 bg-black bg-opacity-50 absolute right-0 bottom-0" @click="showModal()">
        <svg class="mx-auto my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
                <path
                    d="M7.32653 6.45489L2.25889 1.38448H5.75277C6.09357 1.38448 6.36787 1.11019 6.36787 0.769387C6.36787 0.428585 6.09357 0.154289 5.75277 0.154289L0.773789 0.15152C0.610312 0.15152 0.455143 0.215257 0.338786 0.331614C0.222428 0.447971 0.158691 0.60314 0.158691 0.766617V5.74837C0.158691 6.0864 0.432987 6.36346 0.773789 6.36346C1.11459 6.36346 1.38889 6.08917 1.38889 5.74837V2.25449L6.45653 7.3249C6.57565 7.44403 6.73359 7.505 6.89153 7.505C7.04947 7.505 7.20741 7.44403 7.32653 7.3249C7.56756 7.08384 7.56756 6.69592 7.32653 6.45489Z"
                    fill="white" />
                <path
                    d="M19.6611 0.334376C19.5447 0.218019 19.3895 0.154282 19.2261 0.154282H14.2471C13.9063 0.154282 13.632 0.428577 13.632 0.769379C13.632 1.11018 13.9063 1.38448 14.2471 1.38448H17.741L12.6705 6.45212C12.4295 6.69318 12.4295 7.08107 12.6705 7.32213C12.7924 7.44402 12.9476 7.50222 13.1055 7.50222C13.2635 7.50222 13.4214 7.44125 13.5405 7.32213L18.611 2.25448V5.74836C18.611 6.08916 18.8853 6.36346 19.2261 6.36346C19.5669 6.36346 19.8412 6.08916 19.8412 5.74836V0.769379C19.8412 0.605902 19.7774 0.450733 19.6611 0.334376Z"
                    fill="white" />
                <path
                    d="M19.2261 13.6365C18.8853 13.6365 18.611 13.9108 18.611 14.2516V17.7455L13.5405 12.6779C13.2995 12.4368 12.9116 12.4368 12.6705 12.6779C12.4295 12.9189 12.4295 13.3068 12.6705 13.5479L17.7382 18.6183H14.2471C13.9063 18.6183 13.632 18.8926 13.632 19.2334C13.632 19.5742 13.9063 19.8485 14.2471 19.8485H19.2261C19.5669 19.8485 19.8412 19.5742 19.8412 19.2334V14.2544C19.8412 13.9136 19.5669 13.6365 19.2261 13.6365Z"
                    fill="white" />
                <path
                    d="M7.32605 12.6779C7.08775 12.4368 6.6971 12.4368 6.45881 12.6779L1.3884 17.7455V14.2544C1.3884 13.9136 1.1141 13.6393 0.773301 13.6393C0.432499 13.6393 0.158203 13.9136 0.158203 14.2544V19.2334C0.158203 19.3969 0.22194 19.552 0.338297 19.6684C0.454655 19.7847 0.609823 19.8485 0.773301 19.8485H5.75228C6.09308 19.8485 6.36738 19.5742 6.36738 19.2334C6.36738 18.8926 6.09308 18.6183 5.75228 18.6183H2.2584L7.32605 13.5479C7.56707 13.3069 7.56707 12.9189 7.32605 12.6779Z"
                    fill="white" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="19.697" height="19.697" fill="white" transform="translate(0.151367 0.15152)" />
                </clipPath>
            </defs>
        </svg>
    </button>
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
    methods: {
        showModal(){
            this.$emit('showModal');
        }
    }
}
</script>



<style scope>
.border-t-26{
    border-top:0.5px solid #262626 !important;
}

@media screen and (max-width: 1440px) {
.w-edit{
    width:100%;
}
.h-edit{
    height:100%;
}
}
@media screen and (min-width: 1440px) {
.w-edit{
    width:43vw;
}
.h-edit{
    height:36vw;
}
}
</style>