<template>
  <select @change="changed($event)" class="form-select sm:mt-2 sm:mr-2">
    <option value="-1">Select</option>
    <option
      v-for="(blockchain, idx) in ds"
      :key="idx"
      :value="JSON.stringify(blockchain)"
      >{{ blockchain.name }}</option
    >
  </select>
</template>
<script>
import BlockchainService from "../../services/blockchain.service";

export default {
  emits: {
    changeNetwork: [String, Number],
  },

  created: function() {
    this.load();
  },

  data: function() {
    return {
      ds: [],
    };
  },

  methods: {
    load() {
      BlockchainService.list().then((res) => {
        this.ds = res.data;
      });
    },

    changed(e) {
      if (e.target.value === "-1") {
        this.$emit("changeNetwork", "");
      } else {
        const selected_item = JSON.parse(e.target.value);
        this.$emit("changeNetwork", selected_item.id);
      }
    },
  },
};
</script>
