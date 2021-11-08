<template>
  <div>
    <h2 class="text-lg font-medium mt-10">
      Product
    </h2>
    <div class="flex justify-between items-center mt-5">
      <div v-if="total_count > 0">
        <label>Total Count: {{ total_count }}</label>
      </div>
      <div v-else>
        <label>Total Count: 0</label>
      </div>
      <router-link to="/product/productadd" class="btn btn-primary shadow-md"
        >Add New Product</router-link
      >
    </div>

    <ProductList
      ref="ProductList"
      @onDelete="onDeleteConfirm"
      @onEdit="onEditModal"
      @total_count="getTotalCount"
    />

    <!-- BEGIN: Delete Confirm Modal Content -->
    <div id="product-del-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these Product? <br />This process
                cannot be undone.
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger w-24"
                @click="onDeleteProduct"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Modal Content -->
  </div>
</template>

<script>
import ProductList from "../custom-components/product/productList";

export default {
  components: {
    ProductList,
  },

  data: function() {
    return {
      // dataSource: [],
      delIdx: 0,
      loading: false,
      total_count: Number,
    };
  },

  props: ["isHiddens", "isRefreshes"],

  methods: {
    getTotalCount: function(count) {
      this.total_count = count;
    },

    onDeleteConfirm(id) {
      this.delIdx = id;
      cash("#product-del-modal").modal("show");
    },

    // onDeleteProduct() {
    //   // console.log("Delete Key ::::", this.delIdx);

    //   ProductService.delbyid(this.delIdx)
    //     .then(() => {
    //       this.$refs.ProductList.onLoad();
    //       Notify.success(
    //         "Success",
    //         "The product has been successfully deleted."
    //       );
    //       cash("#product-del-modal").modal("hide");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       Notify.success("Error", "An error occurred while deleting.");
    //       cash("#product-del-modal").modal("hide");
    //     });
    // },
  },
};
</script>

<style scoped>
tbody img {
  width: 5vw;
  height: 5vw;
  object-fit: cover;
  object-position: center;
}
.intro-x {
  border-radius: 5px;
  box-shadow: 3px 3px 2px #ccc;
}
</style>
