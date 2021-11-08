<template>
    <div class="w-full h-full">
        <div class="w-full items-center">
        <div class="px-5">
            <div class="underline mr-3 font-semibold text-lg">TERMS OF SERVICE</div>
            <div class=" mt-5">
               <p class="text-sm Break All">Please take a few minutes to read and understand 
                   <a href="#" class="underline text-blue-600"> Terms of Service.</a> To continue, you'll need to accept the <br>
                    Terms of Service by checking the box. <br>
                </p>
                <form class="mt-10 text-sm">
                    <input id="checkbox" type="checkbox" name="checktext" value="1" class="mr-2" v-model="checkedNames" @change="onChecked">
                    <label for="checktext">I'm at least 13 years old.</label><br>
                     <input id="checkbox" type="checkbox" name="checktext2" value="2" class="mr-2" v-model="checkedNames" @change="onChecked">
                    <label for="checktext2">I accept the Terms of Service.</label>
                </form>
            </div>
            <p class="text-red-600 font-light text-sm my-5 transition duration-150 ease-in-out  ">{{error_msg}}</p>
            <div class="w-full flex justify-end my-5">
                <button class="w-24 text-center py-1 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-black hover:text-white" v-on:click="onNext">Next</button>
            </div>
            <br>
            <a href="./" class="text-sm font-semibold">&#60; Back to Home</a>
        </div>
         
         </div>
    </div> 
</template>


<script>
export default {
    data: function() {
        return {
            checkedNames: [],
            error_msg:"",
        }
    },
     props: {
    },
    components: {
    },
    methods: {
        onNext:function() {
            // console.log('checkedNames :'+ this.props.checkedNames + this.props.checkedNames2);
            
            console.log(this.checkedNames);
            if(this.checkedNames.length == 2) {
                console.log('this.checkedNames.length '+this.checkedNames.length)
                this.$emit('onNext')
                return 
            } else {
                this.error_msg = "*Required consent is required to continue."
            }
        },
        onChecked(){
            if(this.checkedNames.length == 2){
                this.error_msg = ''
            }
        }
    }
}
</script>
<style scoped>
</style>