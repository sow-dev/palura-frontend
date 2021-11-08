<template>
<div>
    <div class="w-48 h-56">
        <a :href="'./detail.html?id='+id">
            <!-- <img class="w-full h-full object-cover rounded-sm shadow-xl" :src="image"> -->
            <ContentViwerMain v-model="image" />
        </a>
      </div>
      <div class="text-left relative w-full h-16">
        <p class="text-normal font-semibold mt-3 uppercase drop-shadow-xl">{{title}}</p>
        <p class="text-sm font-medium text-gray-edit  mt-1 lowercase drop-shadow-xl">{{pen_name}}</p>
      </div>
</div>
</template>


<script >
import ContentViwerMain from './ContentViwerMain'
export default {
    created: function () {
    },
    data: function () {
        return {}
    },
    props:['id','image','title','pen_name'],
    components: {
        ContentViwerMain
    },
    methods: {
        moveDetail:function(id){     
            location.href = `/detail.html?id=${id}`;
        }
    }
} 
</script>

<style scope>
  .text-blue-edit{
      color: #064994;
  }
  .text-gray-edit{
      color:#8a8a8a;
  }
</style>