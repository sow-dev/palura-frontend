<template>
  <div class="my-wrapper">
    <ParulaHeader v-bind:LoginAddrs="LoginAddr" @savingAddr="savingAddrs"/>
      <div class="my-back">
          <div class="my-main">
            <!-- <snapText /> -->
            <!-- <TextReveal /> -->
            <Section01 />
          </div>
      </div>
  </div>
</template>

<script>
import ParulaHeader from "../../../components/ParulaHeader.vue";
import snapText from '../../../components/effects/snapText.vue'
import TextReveal from '../../../components/effects/textReveal.vue'
import Section01 from '../../../components/effects/section01.vue'


export default {
    components: {
        ParulaHeader,
        snapText,
        TextReveal,Section01
    },

   data: function(){
       return{
            LoginAddr:'',
            UserData:{}        
       }
       
   },
//    props:['LoginAddrs'],
   methods:{
       
   }
}
</script>

<style scoped>
.my-wrapper{
    width:100%;
    height:100%;
    margin: 0 auto;
}
</style> 