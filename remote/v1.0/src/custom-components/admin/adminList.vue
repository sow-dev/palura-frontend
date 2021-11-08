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
              <th class="text-center whitespace-nowrap">아바타</th>
              <th class="text-center whitespace-nowrap">성명</th>
              <th class="text-center whitespace-nowrap">필명</th>
              <th class="text-center whitespace-nowrap">공개 ID</th>
              <th class="text-center whitespace-nowrap">등록일</th>
              <th class="text-center whitespace-nowrap">작업</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" v-bind:key="item.id" class="intro-y">
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <VueTailwindPagination
        :current="currentPage"
        :total="totalContent"
        :per-page="perPage"
        @page-changed="onPageClick($event)"
      >
      </VueTailwindPagination>
    </div>
  </div>
</template>

<script>
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import CreatorService from "../../services/creator.service.js";

export default {
  setup() {},
  components: {
    VueTailwindPagination,
  },
  data: function() {
    return {
      currentPage: 1,
      totalContent: 20,
      perPage: 10,
      data: [],
    };
  },
  created: function() {
    CreatorService.listPaging(this.currentPage, this.perPage).then((res) => {
      console.log("res ::::", res);

      this.data = res.data.items;
      this.totalContent = res.data.total;
      // console.log('this.data',this.data)
      // console.log(this.creatorInfo)
    });
  },
  props: ["creatorInfo"],
  methods: {
    onEdit: function(obj) {
      this.$emit("onEdit", obj);
    },
    onDelete: function(id) {
      this.$emit("onDelete", id);
    },
    onPageClick(event) {
      this.currentPage = event;
      console.log("this.currentPage", this.currentPage);
      // this.getData(this.currentPage);
      CreatorService.listPaging(this.currentPage, this.perPage).then((res) => {
        console.log("res ::::", res);

        this.data = res.data.items;
        this.totalContent = res.data.total;
        // console.log('this.data',this.data)
        // console.log(this.creatorInfo)
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
