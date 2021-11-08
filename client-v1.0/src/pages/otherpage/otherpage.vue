<template>
  <div class="my-wrapper">
    <ParulaHeader />
      <div class="my-back">
          <OtherCollector />
          <div class="my-main">
            <OtherCollection />
          </div>
      </div>
  </div>
</template>

<script>
import ParulaHeader from "../../components/ParulaHeader.vue";
import OtherCollector from "../../components/OtherCollector.vue"
import OtherCollection from "../../components/OtherCollection.vue"


export default {
    components: {
        ParulaHeader,
        OtherCollector,
        OtherCollection,
    }
}
</script>
<style>
#logo-other{
    display:inline-block;
}
</style>

<style scoped>
.my-wrapper{
    width:100vw;
    height:100vh;
 
}
.my-back {
    width:100%;
    height:100%;
}
.my-main{
    width:100%;
    height:100%;


}

</style>