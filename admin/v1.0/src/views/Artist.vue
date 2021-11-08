<template>
  <div>
    <h1 class="text-lg font-medium mt-10">Artist</h1>

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
        <div id="daterangepicker" class="w-2/5">
          <Datepicker
            locale="de"
            weekStart="0"
            range
            placeholder="Enter it based on your local time."
            monthNameFormat="long"
            :enableTimePicker="false"
            :format="(format = 'yyyy/MM/dd')"
            ref="DatePicker"
            v-model="date_range"
          >
            <template #input-icon>
              <CalendarIcon class="ml-2" />
            </template>
          </Datepicker>
        </div>
      </div>
      <div class="flex justify-center gap-2 mt-5">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="onClear"
        >
          Clear
        </button>
        <button type="button" class="btn btn-primary" @click="search">
          Search
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center mt-5">
      <div v-if="total_count > 0">
        <label>Total Count: {{ total_count }}</label>
      </div>
      <div v-else>
        <label>Total Count: 0</label>
      </div>
      <router-link to="/artist/enroll" class="btn btn-primary shadow-md"
        >Add New Aritst</router-link
      >
    </div>

    <div>
      <ArtistList
        :search_pram="search_pram"
        ref="ArtistList"
        @onDelete="onDeleteConfirm"
        @total_count="getTotalCount"
      />
    </div>

    <!-- BEGIN: Delete Confirm Modal Content -->
    <div id="artist-del-modal" class="modal" tabindex="-1" aria-hidden="true">
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
import ArtistList from "../custom-components/artist/artistList.vue";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

import UserService from "../services/user.service.js";
import Notify from "../services/notification.service";

export default {
  components: {
    ArtistList,
    Datepicker,
  },

  data: function() {
    return {
      deleteKey: String,

      // search parameter
      date_range: "",
      search_pram: "",
      total_count: Number,
    };
  },

  methods: {
    search: function() {
      let start_date;
      let end_date;

      if (this.date_range) {
        start_date = this.date_range[0].toISOString().slice(0, 10);
        end_date = this.date_range[1].toISOString().slice(0, 10);
      }

      this.$refs.ArtistList.search(this.search_pram, start_date, end_date);
      // console.log(this.search_pram, start_date, end_date);
    },

    onClear: function() {
      this.search_pram = "";
      this.date_range = "";
      this.$refs.DatePicker.clearValue();
    },

    getTotalCount: function(count) {
      this.total_count = count;
    },

    onDeleteConfirm(deleteKey) {
      this.deleteKey = deleteKey;
      cash("#artist-del-modal").modal("show");
    },

    onDeleteProduct() {
      UserService.delete(this.deleteKey)
        .then((res) => {
          Notify.success(
            "Success",
            "The product has been successfully deleted."
          );
          this.$refs.ArtistList.onload();
          cash("#artist-del-modal").modal("hide");
        })
        .catch((error) => {
          Notify.success("Error", "An error occurred while deleting.");
          cash("#artist-del-modal").modal("hide");
        });
    },
  },
};
</script>
