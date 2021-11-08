<template>
<div>
    <select @change="onChanged($event)"  class="form-select form-select sm:mt-2 sm:mr-2" aria-label=".form-select type">
        <option value="-1">Select Contract</option>
        <option v-for="(i, idx) in ds" :key="idx" v-bind:value="JSON.stringify(i)">{{i.name}}</option>
    </select>
</div>
</template>

<script>

import ContractService from '../../services/contract.service'

export default {
    data: function () {
        return {
            ds:[]
        }
    },
    created: function () {
        this.onLoad();
    },
    computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  },
    props: ['modelValue'],
    emits:['update:modelValue'],
    methods: {
        onLoad() {
            ContractService.list().then(
                res => {
                    console.log("ResInfo:", res)
                    this.ds = res.data
                    this.inputVal = this.ds[0].id
                    this.$emit('changed', this.ds[0])
                })
        },
        onChanged(e){
            const obj = JSON.parse(e.target.value);
            this.inputVal = obj.id
            this.$emit('changed', obj)
        }
    }
}
</script>