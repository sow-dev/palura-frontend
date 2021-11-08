<template>
  <span>
    {{inputVal}}
  </span>
</template>

<script>

import BigNumber from "bignumber.js";
export default {
  data: function () {
    return {
      
    }
  },
  created: function () {

  },
  computed: {
    inputVal: {
      get() {
        if (this.modelValue) {
          let n = new BigNumber(this.modelValue).toFixed()
          return n;
        }else{
          return '0'
        }

      },
      set(val) {
        let n = new BigNumber(val)
        this.$emit('update:modelValue', n.toFixed());
      }
    }
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {}
    
}
</script>