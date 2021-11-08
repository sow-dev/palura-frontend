<template>
  <div v-if="option === 'type'">
    <select
      ref="refSelect"
      @change="change($event)"
      class="form-select form-select sm:mt-0 sm:mr-2"
      aria-label=".form-select type"
    >
      <option value="-1">Select</option>
      <option
        v-for="(asset, idx) in type_ds"
        :key="idx"
        :value="JSON.stringify(asset)"
        >{{ asset.type }}</option
      >
    </select>
  </div>

  <div v-else-if="option === 'symbol'">
    <select
      ref="refSelect"
      @change="change($event)"
      class="form-select form-select sm:mt-0 sm:mr-2"
      aria-label=".form-select type"
    >
      <option value="-1">Select</option>
      <option
        v-for="(asset, idx) in symbol_ds"
        :key="idx"
        :value="JSON.stringify(asset)"
        >{{ asset.symbol }}</option
      >
    </select>
  </div>
</template>

<script>
import AssetService from "../../services/asset.service.js";
export default {
  props: {
    option: String,
    category: Number,
    blockchain_id: [Number, String],
    contract_type: String,
  },

  emtis: {
    changeType: [Number, String],
    changeAsset: [Number, String],
  },

  data: function() {
    return {
      type_ds: [],
      symbol_ds: [],
    };
  },

  watch: {
    blockchain_id: function() {
      this.type_ds = [];
      this.symbol_ds = [];

      if (this.blockchain_id === "") {
        this.$emit("changeType", "");
        this.$emit("changeAsset", "");
      } else {
        AssetService.listByCategory(this.blockchain_id, this.category).then(
          (res) => {
            if (this.category === 1) {
              this.symbol_ds = res.data;
            } else if (this.category === 2) {
              this.type_ds = res.data;
            }
          }
        );
      }
    },

    contract_type: function() {
      this.symbol_ds = [];

      if (this.contract_type === "") {
        this.$emit("changeAsset", "");
      } else {
        AssetService.listByCategory(this.blockchain_id, this.category).then(
          (res) => {
            res.data.forEach((asset) => {
              if (asset.type === this.contract_type) {
                this.symbol_ds.push(asset);
              }
            });
          }
        );
      }
    },
  },

  methods: {
    change(e) {
      if (e.target.value === "-1") {
        if (this.option === "type") {
          this.$emit("changeType", "");
        } else if (this.option === "symbol") {
          this.$emit("changeAsset", "");
        }
      } else {
        if (this.option === "type") {
          const selected_item = JSON.parse(e.target.value);
          this.$emit("changeType", selected_item.type);
        } else if (this.option === "symbol") {
          const selected_item = JSON.parse(e.target.value);
          this.$emit("changeAsset", selected_item);
        }
      }
    },
  },
};
</script>
