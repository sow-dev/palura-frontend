<template>
<div>
  
  
</div>
</template>
<script>
import BidService from '../services/bid.service.js'
import { defineComponent, ref } from 'vue'

export default {
components:{

},
  setup() {
      const chatBox = ref(false)
      const showChatBox = () => {
        chatBox.value = !chatBox.value
      }

      return {
        chatBox,
        showChatBox
      }
    },
    data: function () {
      return {
      }
    },
    created: function () {
      
    },
    methods: {

    }
  }
</script>
<style scoped>
</style>