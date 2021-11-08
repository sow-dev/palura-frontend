<template>
  <div>
    <div v-if="decimals != null">
      <input type="text" class="form-control w-full mt-0" placeholder="0" v-model="inputVal" @keypress="onlyNumber($event)" :disabled="disabled" />
      <p class="text-xs text-right">Raw: {{weiValue}} / Decimals: {{decimals}}</p>
    </div>
    <div v-else >
      <p class="text-red-500"> To enter pricing information, first select a product. </p>
    </div>
  </div>
</template>

<script>

import BigNumber from "bignumber.js";
export default {
  data: function () {
    return {
      weiValue: '',
    }
  },
  created: function () {

  },
  computed: {
    inputVal: {
      get() {
        console.log('this.modelValue:::', this.modelValue)
        if (this.modelValue) {
          BigNumber.config({
            DECIMAL_PLACES: this.decimals
          })
          let n = new BigNumber(this.modelValue).toFixed()
          return n;
        }else{
          return '0'
        }

      },
      set(val) {
        BigNumber.config({
          DECIMAL_PLACES: this.decimals
        })
        let n = new BigNumber(val)
        // this.weiValue = val * (10 ** this.decimals)
        this.weiValue = n.multipliedBy(10 ** this.decimals).toFixed()
        
        this.$emit('update:modelValue', n.toFixed());
      }
    }
  },
  props: ['modelValue', 'decimals', 'disabled'],
  emits: ['update:modelValue'],
  created: function () {
    this.dspValue = new BigNumber();

  },
  methods: {
    onlyNumber: function (evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    }
  }
}
</script>