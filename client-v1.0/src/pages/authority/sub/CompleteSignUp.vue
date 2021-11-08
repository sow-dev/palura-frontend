<template>
  <div class="">
      <div class="">
          <div class="">
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
</template>

<script>


export default {
    components: {

    },
    methods:{
        onDone(){
            // this.$emit('onBack')
            location.href="/login.html?mode=login";
        }
    }
}
</script>
