<template>
  <label>
    <input v-model="name" />
    <!-- <div v-if="v$.name.$error">Name field has an error.</div> -->
    <!-- {{ v$.name }} -->
    <p v-for="error of v$.$errors" :key="error.$uid">
      <strong>{{ error.$validator }}</strong>
      <small> on property</small>
      <strong>{{ error.$property }}</strong>
      <small> says:</small>
      <strong>{{ error.$message }}</strong>
    </p>
  </label>

  <button @click="submitForm">click</button>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, maxLength, alphaNum } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      name: "",
    };
  },

  validations() {
    return {
      name: { required, maxLength: maxLength(5), alphaNum, $autoDirty: true },
    };
  },

  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return;
      else {
        console.log("Success", this.name);
      }
      // actually submit form
    },
  },
};
</script>
