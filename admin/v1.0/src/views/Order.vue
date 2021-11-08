<template>
  <h2 class="text-lg font-medium mt-10">Order List</h2>
  <div class="flex justify-between items-center mt-5">
    <div v-if="total_count > 0">
      <label>Total Count: {{ total_count }}</label>
    </div>
    <div v-else>
      <label>Total Count: 0</label>
    </div>
    <router-link to="/order/enroll" class="btn btn-primary shadow-md"
      >Add New Order</router-link
    >
  </div>

  <OrderList
    ref="reload"
    @onDelete="onDeleteConfirm"
    @total_count="getTotalCount"
  />

  <!-- BEGIN: Delete Confirm Modal Content -->
  <div id="Order-del-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-gray-600 mt-2">
              Do you really want to delete these Order? <br />This process
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
</template>
<script>
import OrderList from "../custom-components/order/OrderList.vue";

import OrderService from "../services/order.service.js";

// import OrderManage from "../custom-components/OrderManage.vue"

export default {
  data: function() {
    return {
      // enrollPath: this.$route.fullPath + "/enroll",
      total_count: Number,
    };
  },

  components: {
    OrderList,
  },

  methods: {
    getTotalCount: function(count) {
      this.total_count = count;
    },

    onDeleteConfirm(deleteKey) {
      this.deleteKey = deleteKey;
      cash("#Order-del-modal").modal("show");
    },

    onDeleteProduct() {
      OrderService.delete(this.deleteKey)
        .then((res) => {
          console.log("Order is deleted:", res);
          cash("#Order-del-modal").modal("hide");
          this.$refs.reload.onload();
        })
        .catch((error) => {
          //alert(error)
          cash("#Order-del-modal").modal("hide");
        });
    },
  },
};
</script>

<style scoped>
.tableMain {
  width: 100%;
}
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
