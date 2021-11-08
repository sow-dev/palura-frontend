<template>
<div class="flex h-screen flex-wrap">
    <div class="flex-shrink-0 w-full h-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12  mx-auto">
        <div class="my-wrapper 2xl:w-1440px w-full h-full mx-auto relative">
    <!-- <notifications /> -->
    <ParulaHeader />
      <div class="sign-back">
          <div class="sign-main">
                <h1 class="text-5xl font-thin">Hi,</h1>
                <p class="mt-10 text-sm font-extralight">
                    Welcome to parula.<br>
                    The parula is a very small migratory bird inhabiting small areas of North America. <br>
                    As a rare migratory bird, it is known for being sensitive to the environment and has been domesticated in a specific area.<br>
                    Are you ready for a beautiful adventure with Farula? <br>
                    You'll get loads of mysterious Inspirations! <br>
                </p>
                <p class="pt-5 text-sm font-normal">Come on, let's go together  :)</p> 
                <div class="flex justify-end">
                    <button class="mt-10 font-light px-10 text-md text-center py-1 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-black hover:text-white" v-on:click="onDone">Go PARUALA</button>
                </div>
        </div>
      </div>
     </div>
    </div>
</div>
</template>

<script>
import ParulaHeader from "../../components/ParulaHeader.vue";
// import { notify } from "@kyvg/vue3-notification";

export default {
    components: {
        ParulaHeader,
    },
    created: function(){
    //   notify({
    //     title: "Authorization",
    //     text: "You have been logged in!",
    //     });

    },
    methods: {
         onDone(){
            // this.$emit('onBack')
            location.href="/login.html?mode=login";
        }
    }

}
</script>

<style scoped>
.sign-wrapper{
    width:100vw;
    height:100vh;
}
.sign-back {
    width:100%;
    height:100%;
    background: #f7f7f7;
}
.sign-main{
    margin-left: 10%;
    padding-top:6%;
}
.sign-main > h1 {
    font-size: 48px;
    font-weight: 300;
}
.sign-main > h1 > span {
    font-weight:700;
    letter-spacing: 9px;
}
.sign-main > p {
    font-size: 12px;
    margin-top:2%;
    line-height: 20px;
}
.sign-main > p > span {
    font-weight:700;
}
.sign-main > a {
    display:inline-block;
    margin-top:3%;
    font-size: 12px;
    padding: 5px 15px;
    border:1px solid #000;
}
</style>