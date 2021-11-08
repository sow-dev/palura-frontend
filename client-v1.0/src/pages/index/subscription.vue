<template>
<div class="w-full py-18 px-4 mt-24 mb-12" style="background-color: #064994;">
    <!-- marging just for display-->
    <div class="px-4 pt-3 pb-4  -mx-4 ">
        <div class="max-w-xl mx-auto">
            <h2 class="text-2xl text-left inline-block font-semibold text-white mb-2">Become an Artist on Parula</h2>
            <p class="text-white text-sm pl-px mb-5"> 
                Join our community in our Artist’s Enclave.<br>
            Showcase, promote and sell in our digital marketplace.
            </p>
            <form action="#" class="mt-12">
                <div class="items-center relative w-full sm:w-3/5 mx-auto">
                    <input type="email"
                        class="w-full px-2 py-3 bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none"
                        required>
                    <button class="text-gray-200 px-6 py-2 rounded shadow border-05 absolute right-1 top-1"
                        style="background-color: #064994;">Send</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>


<script >
    export default {
        created: function () {
        },
        data: function () {
            return {}
        },
        props:['image','title','pen_name'],
        components: {},
    } 
</script>

<style scope>
  .py-18 {
      padding-top:4.5rem;
      padding-bottom:4.5rem;
  }
  .border-05{
      border:0.5px solid #064994;
  }
</style>