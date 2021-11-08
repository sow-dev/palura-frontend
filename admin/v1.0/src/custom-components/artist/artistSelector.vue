<template>
  <div>
    <select
      @change="onChanged($event)"
      class="form-select form-select sm:mt-2 sm:mr-2"
      aria-label=".form-select type"
    >
      <option
        v-for="(i, idx) in ds"
        :key="idx"
        v-bind:value="JSON.stringify(i)"
        >{{ i.nickname }}</option
      >
    </select>
  </div>
</template>

<script>
import CreatorService from "../../services/creator.service.js";
import Notify from "../../services/notification.service";

export default {
  data: function() {
    return {
      ds: [],
    };
  },

  created: function() {
    this.onLoad();
  },

  computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },

  props: ["modelValue"],

  emits: ["update:modelValue"],

  methods: {
    onLoad() {
      CreatorService.listPaging(1, 100)
        .then((res) => {
          // console.log("ResInfo:", res)
          this.ds = res.data;
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    onChanged(e) {
      const obj = JSON.parse(e.target.value);
      this.inputVal = obj.id;
      this.$emit("changed", obj);
    },
  },
};
</script>
