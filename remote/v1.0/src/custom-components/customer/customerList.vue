<template>
  <div>
    <!-- <Delete /> -->
    <div class="grid grid-cols-12 overflow-x-scroll gap-6 mt-5">
      <!-- BEGIN: Data List -->
      <div
        class="intro-y col-span-12 overflow-auto lg:overflow-visible w-full tableflow"
      >
        <table class="table table-report -mt-2 ">
          <thead>
            <tr>
              <th class="text-center whitespace-nowrap">ID</th>
              <th class="text-center whitespace-nowrap">Avatar</th>
              <th class="text-center whitespace-nowrap">Name</th>
              <th class="text-center whitespace-nowrap">Nickname</th>
              <th class="text-center whitespace-nowrap">Registered</th>
              <!-- <th class="text-center whitespace-nowrap">작업</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" v-bind:key="item.id" class="intro-y">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center w-28">
                <div v-if="item.avatar">
                  <img class="object-cover h-16 w-16" :src="item.avatar" />
                </div>
                <div v-else>
                  <img
                    class="object-cover h-16 w-16"
                    src="../../assets/images/empty_user.png"
                  />
                </div>
              </td>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">{{ item.nickname }}</td>
              <td class="text-center">
                {{ item.created_at.substring(0, 10) }}
              </td>
              <!-- <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <a
                    class="flex items-center mr-3"
                    href="javascript:;"
                    v-on:click="onEdit(item)"
                  >
                    <CheckSquareIcon class="w-4 h-4 mr-1" />
                    Edit
                  </a>
                  <a
                    class="flex items-center text-theme-21"
                    href="javascript:;"
                    v-on:click="onDelete(item.id)"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center mt-5 mb-3">
      <v-pagination
        v-model="current_page"
        :pages="pages"
        :range-size="current_page"
        active-color="#DCEDFF"
        @update:modelValue="pageUpdate"
      />
    </div>
  </div>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import UserService from "../../services/user.service.js";

export default {
  setup() {},
  components: {
    VPagination,
  },

  data: function() {
    return {
      data: [],

      current_page: 1,
      per_page: 10,
      pages: 1,
    };
  },

  created: function() {
    this.onload();
  },

  methods: {
    onload: function() {
      UserService.listPaging(this.current_page, this.per_page, "userOnly").then(
        (res) => {
          this.data = res.data.items;
          this.pages = Math.ceil(res.data.total / this.per_page);
        }
      );
    },

    // onEdit: function(obj) {
    //   this.$emit("onEdit", obj);
    // },
    // onDelete: function(id) {
    //   this.$emit("onDelete", id);
    // },

    // pageChange(pageNumber)  {
    //   this.currentPage = pageNumber;
    // },

    pageUpdate() {
      UserService.listPaging(this.current_page, this.per_page, "userOnly").then(
        (res) => {
          this.data = res.data.items;
          this.pages = Math.ceil(res.data.total / this.per_page);
        }
      );
    },
  },
};
</script>
<style scoped>
/* .tableflow{
  overflow-x: auto;
} */
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
