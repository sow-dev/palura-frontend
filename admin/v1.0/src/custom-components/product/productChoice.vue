<template>
<div>
  <!-- Search Start -->
  <div class="box p-3">
    <div class="input-group mt-2">
      <select id="key" v-model="key" class="input-group-text w-1/4" disabled>
        <option value="name">Name</option>
        <!-- <option value="creator">Artist</option>
        <option value="owner">Owner</option> -->
      </select>

      <input
        id="value"
        v-model="value"
        type="text"
        class="form-control"
        placeholder="Enter a search word."
      />
    </div>

    <div class="w-full mt-2">
      <!-- 달력 시작 -->
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

      <div class="flex flex-row-reverse gap-2 mt-5">
        <button type="button" class="btn btn-primary" @click="search">
          Search
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="onClear"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
  <!-- Search End -->
  <!-- List Start -->
  <div>
    <div
      v-for="item in productList"
      :key="item.product_id"
      class="cursor-pointer box relative flex items-center p-5 mt-1"
      @click="select(item)"
    >
      <div class="w-12 h-12 flex-none image-fit mr-1">
        <!-- <img alt="img" class="rounded-full" :src="item.thumbnail" /> -->
        <div v-if="item.sub_content_type === 'MP4'">
          <video :src="item.thumbnail" class="w-12 h-12" autoplay loop></video>
        </div>
        <div v-else>
          <img :src="item.thumbnail" class="w-12 h-12 object-cover" />
        </div>
      </div>
      <div class="ml-2 overflow-hidden">
        <div class="flex items-center">
          <a href="javascript:;" class="font-medium">{{ item.name }}</a>
        </div>

        <div class="truncate text-gray-600 mt-0.5">
          {{ item.username === null ? "user name" : item.artist_name }} /
          {{ item.pen_name === null ? "pen name" : item.airtist_pen_name }}
        </div>
      </div>
      <!-- <div class="position: absolute right-15 text-gray-600">
        {{ item.owner }}
      </div> -->
      <div class="position: absolute right-5 text-gray-600">
        {{ String(new Date(item.created_at)).substring(0, 15) }}
      </div>
    </div>
    <!-- List End -->
    <!-- Pagination Start -->
    <div class="flex justify-center mt-5">
      <v-pagination
        v-model="currentPage"
        :pages="pages"
        :range-size="currentPage"
        active-color="#DCEDFF"
        @update:modelValue="changePage"
      />
    </div>
    <!-- Pagination End -->
  </div>
</div>
</template>

<script>
import Web3 from "web3";
import ProductService from "../../services/product.service.js";
import Notify from "../../services/notification.service";

import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  components: { VPagination, Datepicker },

  emits: {
    selected: Object,
  },

  data: function() {
    return {
      // list parameters
      productList: [],

      // search parameters
      key: "name",
      value: "",
      state: "registerable",
      date_range: "",

      pages: 1,
      currentPage: 1,
      perPage: 10,
    };
  },

  mounted() {
    this.search();
  },

  methods: {
    changePage: function(currentPage) {
      this.currentPage = currentPage;

      let start_date;
      let end_date;

      if (this.date_range) {
        start_date = this.date_range[0].toISOString().slice(0, 10);
        end_date = this.date_range[1].toISOString().slice(0, 10);
      }

      const web3 = new Web3(window.web3.currentProvider);

      ProductService.listSearch(
        this.currentPage,
        this.perPage,
        this.key,
        this.value,
        this.state,
        start_date,
        end_date,
        web3.currentProvider.selectedAddress
      )
        .then((res) => {
          this.pages = Math.ceil(res.data.total / this.perPage);
          this.productList = res.data.items;
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    search: function() {
      this.currentPage = 1;

      let start_date;
      let end_date;

      if (this.date_range) {
        start_date = this.date_range[0].toISOString().slice(0, 10);
        end_date = this.date_range[1].toISOString().slice(0, 10);
      }

      const web3 = new Web3(window.web3.currentProvider);

      ProductService.listSearch(
        this.currentPage,
        this.perPage,
        this.key,
        this.value,
        this.state,
        start_date,
        end_date,
        web3.currentProvider.selectedAddress
      )
        .then((res) => {
          this.pages = Math.ceil(res.data.total / this.perPage);
          this.productList = res.data.items;
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    select(item) {
      // console.log("item ::::", JSON.stringify(item));
      console.log('productList',this.productList);
      this.$emit("selected", item);
    },

    onClear: function() {
      this.value = "";
      this.date_range = "";
      this.$refs.DatePicker.clearValue();
    },
  },
};
</script>
