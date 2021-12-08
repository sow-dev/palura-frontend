<template>
  <div>
    <div v-if="decimals != null">
      <!-- <input
        type="number"
        class="form-control w-full mt-0"
        placeholder="0"
        v-model="inputVal"
        @keypress="onlyNumber($event)"
      /> -->
      <input
        type="text"
        class="form-control w-full mt-0"
        placeholder="0"
        v-model="inputVal"
        @keypress="onlyNumber($event)"
      />
      <p class="text-xs text-right">
        Raw: {{ weiValue }} / Decimals: {{ decimals }}
      </p>
    </div>
    <div v-else>
      <input
        type="text"
        class="form-control w-full mt-0"
        placeholder="Please select the product Before entering the price information"
        disabled
      />
      <p class="text-xs text-right">
        Raw: {{ weiValue }} / Decimals: {{ decimals }}
      </p>
      <!-- <p class="text-red-500">
        To enter pricing information, first select a product.
      </p> -->
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";

export default {
  props: ["modelValue", "decimals"],

  emits: ["update:modelValue", "initValue"],

  data: function() {
    return {
      weiValue: "",
    };
  },

  computed: {
    inputVal: {
      get() {
        // console.log("this.modelValue:::", this.modelValue);

        if (this.modelValue) {
          BigNumber.config({
            DECIMAL_PLACES: this.decimals,
          });
          let n = new BigNumber(this.modelValue).toFixed();

          return n;
        } else {
          return "";
        }
      },
      set(val) {
        // console.log("set:val ::::", val);

        BigNumber.config({
          DECIMAL_PLACES: this.decimals,
        });
        let n = new BigNumber(val);

        const weiValue = n.multipliedBy(10 ** this.decimals).toFixed();

        if (weiValue.slice(0, -this.decimals) === "") {
          this.weiValue = "0." + weiValue.slice(-this.decimals);
        } else
          this.weiValue =
            weiValue.slice(0, -this.decimals) +
            "." +
            weiValue.slice(-this.decimals);

        if (this.weiValue === "NaN" || this.weiValue === "0.NaN") {
          this.weiValue = "";
          this.$emit("update:modelValue", "");
          this.$emit("initValue");
        } else {
          this.$emit("update:modelValue", n.toFixed());
        }
      },
    },
  },

  created: function() {
    this.dspValue = new BigNumber();
  },
  methods: {
    onlyNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
