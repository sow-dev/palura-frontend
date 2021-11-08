<template>
  <div>
    <div class="mb-2">
      <div class="flex gap-2">
        <input
          class="form-control flex-initial"
          v-model="searchParam"
          v-on:keyup.enter="search"
          placeholder="Name or Nickname or Penname"
        />
        <button
          type="button"
          class="btn btn-primary flex-initial"
          @click="search"
        >
          search
        </button>
      </div>
    </div>

    <div
      v-for="item in list"
      :key="item.id"
      class="intro-y cursor-pointer box relative flex items-center p-5 border-2"
      @click="onSelected(item)"
    >
      <div class="w-12 h-12 flex-none image-fit mr-1">
        <img alt="avatar" class="rounded-full" :src="item.avatar_min" />
      </div>

      <div class="ml-2 overflow-hidden">
        <div class="flex items-center font-medium">
          {{ item.name }}
          <div class="text-xs text-gray-500 ml-1">
            {{ item.nickname }}
          </div>
        </div>

        <div class="w-full truncate text-gray-600">
          {{ item.pen_name }}
        </div>
      </div>

      <div class="position: absolute right-3 text-gray-600">
        {{ String(item.created_at).substring(0, 10) }}
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <v-pagination
        v-model="page"
        :pages="total"
        :range-size="pageSize"
        active-color="#DCEDFF"
        @update:modelValue="search()"
      />
    </div>
  </div>
</template>

<script>
// import productService from '../../services/product.service'
import userService from "../../services/user.service";
import Notify from "../../services/notification.service";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  components: {
    VPagination,
  },

  data: function() {
    return {
      list: [],
      searchParam: "",
      page: 1,
      pageSize: 5,
      total: 0,
      userType: "creatorOnly",
    };
  },

  // created: function() {
  //   // this.search();
  //   console.log(" this.userType ==> ", this.userType);
  // },

  props: {
    idsl: {},
  },

  methods: {
    onSelected(item) {
      this.$emit("selectedArtist", item);
    },

    search() {
      userService
        .list(this.page, this.pageSize, this.userType, this.searchParam)
        .then((res) => {
          this.total = Math.ceil(res.data.total / this.pageSize);
          this.list = res.data.items;
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },
  },
};
</script>
