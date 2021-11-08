<template>
  <div>
    <div class="flex ...">
      <div class="flex-1"></div>
      <div class="flex-shrink-0  w-3/5">
        <ProductForm></ProductForm>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>

<script>
import ProductForm from "../../custom-components/product/productForm.vue";

export default {
  components: {
    ProductForm,
  },
  data: function() {},
  created: function() {},
  props: [],
  methods: {},
};
</script>
