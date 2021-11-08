<template>
  <div>
    <div class="flex ...">
      <div class="flex-1"></div>
      <div class="flex-shrink-0  w-3/5">
        <ProductFormDetail></ProductFormDetail>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>

<script>
import ProductFormDetail from "../../custom-components/product/productFormDetail.vue";
export default {
  components: {
    ProductFormDetail,
  },
  data: function() {},
  created: function() {},
  props: [],
  methods: {},
};
</script>
