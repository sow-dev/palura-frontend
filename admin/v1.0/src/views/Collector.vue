<template>
  <div>
    <h2 class="text-lg font-medium mt-10">Collector</h2>
    <div class="box w-full p-5 mt-5">
      <div
        class="flex flex-col sm:flex-row items-center border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto mb-2 ml-5">Search</h2>
      </div>

      <div class="flex gap-2 mt-5">
        <label class="flex flex-row-reverse items-center sm:w-12 p-1 ml-20"
          >Artist</label
        >
        <input
          class="form-control w-1/3"
          v-model="search_pram"
          placeholder="Name or Nickname or Penname"
        />
      </div>

      <div class="flex gap-2 mt-2">
        <!-- 달력 시작 -->
        <label class="flex flex-row-reverse items-center sm:w-12 p-1 ml-20"
          >Date</label
        >
      </div>
      <div class="flex justify-center gap-2 mt-5">
        <button type="button" class="btn btn-outline-secondary" @click="clear">
          Clear
        </button>
        <button type="button" class="btn btn-primary" @click="search">
          Search
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center mt-5">
      <label>Total Count: {{ total_count }}</label>
      <router-link to="/collector/enroll" class="btn btn-primary shadow-md"
        >Add New Collector</router-link
      >
    </div>

    <div>
      <CollectorList
        :search_pram="search_pram"
        ref="CollectorList"
        @onDelete="onDeleteConfirm"
        @total_count="getTotalCount"
      />
    </div>

    <!-- BEGIN: Delete Confirm Modal Content -->
    <div
      id="collector-del-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these Artist? <br />This process
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
import CollectorList from "../custom-components/collector/collectorList.vue";

import UserService from "../services/user.service.js";

const today = new Date();

const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);

const now = year + "-" + month + "-" + day;

export default {
  components: {
    CollectorList,
  },
  data: function() {
    return {
      deleteKey: String,

      daterange: "2021-01-01 - " + now,
      search_pram: "",
      total_count: Number,
    };
  },

  methods: {
    search: function() {
      const start_date = this.daterange.slice(0, 10);
      const end_date = this.daterange.slice(13, 23);

      this.$refs.CollectorList.search(this.search_pram, start_date, end_date);
    },

    clear: function() {
      this.search_pram = "";
      this.daterange = "2021-01-01 - " + now;
    },

    getTotalCount: function(count) {
      this.total_count = count;
    },

    onDeleteConfirm(deleteKey) {
      this.deleteKey = deleteKey;
      cash("#collector-del-modal").modal("show");
    },

    onDeleteProduct() {
      UserService.delete(this.deleteKey)
        .then((res) => {
          console.log("User is deleted:", res);
          cash("#collector-del-modal").modal("hide");
          this.$refs.CollectorList.onload();
        })
        .catch((error) => {
          //alert(error)
          cash("#collector-del-modal").modal("hide");
        });
    },
  },
};
</script>
