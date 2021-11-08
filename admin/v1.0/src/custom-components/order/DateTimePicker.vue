<template>
     <Datepicker v-model="picked" />
</template>

<script>
import VueTimepicker from 'vue3-timepicker'
import Datepicker from 'vue3-datepicker'
// import Datepicker from '../src/datepicker/Datepicker.vue'

export default {
    components: {
        Datepicker,
        VueTimepicker
    },
   data: function() {
    return {
      picked: new Date()
    };
  },
  
}
</script>