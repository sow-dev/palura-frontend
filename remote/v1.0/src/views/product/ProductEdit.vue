<template>
  <div>
    <div class="flex ...">
      <div class="flex-1"></div>
      <div class="flex-shrink-0  w-3/5">
        <ProductFormEdit></ProductFormEdit>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>

<script>
import ProductFormEdit from "../../custom-components/product/productFormEdit.vue";
export default {
  components: {
    ProductFormEdit,
  },
  data: function() {},
  created: function() {},
  props: [],
  methods: {},
};
</script>
