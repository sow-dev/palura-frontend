<template>
  <div>
    <!-- <Delete /> -->
    <div class="grid grid-cols-12 overflow-x-scroll gap-6 mt-5">
      <!-- BEGIN: Data List -->
      <div
        class="intro-y col-span-12 overflow-auto lg:overflow-visible w-full tableflow"
      >
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="text-center whitespace-nowrap">ID</th>
              <th class="text-center whitespace-nowrap">Avatar</th>
              <th class="text-center whitespace-nowrap">Name</th>
              <th class="text-center whitespace-nowrap">Pen name</th>
              <th class="text-center whitespace-nowrap">Nickname</th>
              <th class="text-center whitespace-nowrap">Registered</th>
              <th class="text-center whitespace-nowrap">Work</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center w-28"><img :src="item.avatar_min" /></td>

              <td class="text-center">{{ item.name }}</td>

              <td>
                <div class="text-center">
                  {{ item.pen_name }}
                </div>
              </td>

              <td class="text-center">{{ item.nickname }}</td>

              <td class="text-center">
                {{ item.created_at.substring(0, 10) }}
              </td>
              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <a
                    class="flex items-center mr-3"
                    href="javascript:;"
                    @click.stop="onEdit(item)"
                  >
                    <CheckSquareIcon class="w-4 h-4 mr-1" />
                    Edit
                  </a>
                  <a
                    class="flex items-center text-theme-21"
                    href="javascript:;"
                    @click.stop="onDelete(item.nickname)"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
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
  components: { VPagination },

  props: { search_pram: String },

  data: function() {
    return {
      current_page: 1,
      per_page: 10,
      pages: 1,

      total_count: Number,
      data: Array,
    };
  },

  created: function() {
    this.onload();
  },

  methods: {
    onload: function() {
      UserService.listPaging(
        this.current_page,
        this.per_page,
        "collectorOnly"
      ).then((res) => {
        this.data = res.data.items;
        this.total_count = res.data.total;
        this.pages = Math.ceil(res.data.total / this.per_page);

        this.$emit("total_count", this.total_count);
      });
    },

    search: function(param, start_date, end_date) {
      UserService.list(
        1,
        10,
        "collectorOnly",
        param,
        start_date,
        end_date
      ).then((res) => {
        this.data = res.data.items;
        this.total_count = res.data.total;
        this.pages = Math.ceil(res.data.total / this.per_page);
        this.current_page = 1;

        this.$emit("total_count", this.total_count);
      });
    },

    // onDetailpage: function(user) {
    //   this.$router.push("/user-detail/" + String(user.nickname));
    //   // this.$emit("id", user.id);
    // },

    onEdit: function(item) {
      this.$router.push("/collector/edit/" + String(item.nickname));
    },

    onDelete: function(deleteKey) {
      this.$emit("onDelete", deleteKey);
    },

    pageUpdate: function(event) {
      this.current_page = event;

      if (this.search_pram === String) {
        this.changePage();
      } else {
        this.searchChangePage();
      }
    },

    changePage() {
      UserService.listPaging(
        this.current_page,
        this.per_page,
        "collectorOnly"
      ).then((res) => {
        this.data = res.data.items;
        this.total_count = res.data.total;
        this.pages = Math.ceil(res.data.total / this.per_page);

        this.$emit("total_count", this.total_count);
      });
    },

    searchChangePage() {
      UserService.list(
        this.current_page,
        this.per_page,
        "collectorOnly",
        this.search_pram
      ).then((res) => {
        this.data = res.data.items;
        this.total_count = res.data.total;
        this.pages = Math.ceil(res.data.total / this.per_page);

        this.$emit("total_count", this.total_count);
      });
    },
  },
};
</script>
<style scoped>
/* .tableflow{
  overflow-x: auto;
} */
/* .intro-x td:nth-child(9){

 width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;

}
.intro-x td:nth-child(10){

width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;

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
