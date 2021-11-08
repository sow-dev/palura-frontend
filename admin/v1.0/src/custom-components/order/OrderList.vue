<template>
  <div>
    <div
      class="grid grid-cols-12 overflow-x-scroll overflow-y-hidden gap-6 mt-5"
    >
      <div
        class="col-span-12 overflow-auto lg:overflow-visible w-full tableflow"
      >
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="text-center whitespace-nowrap">ID</th>
              <th class="text-center whitespace-nowrap">Title</th>
              <th class="text-center whitespace-nowrap">content</th>
              <th class="text-center whitespace-nowrap">Contract ID</th>
              <th class="text-center whitespace-nowrap">Type</th>
              <th class="text-center whitespace-nowrap">Fixed Sales</th>
              <th class="text-center whitespace-nowrap">Tax Ratio</th>
              <th class="text-center whitespace-nowrap">Donation Ratio</th>
              <!-- <th class="text-center whitespace-nowrap">Exchange Fee</th> -->
              <th class="text-center whitespace-nowrap">Royalties</th>
              <th class="text-center whitespace-nowrap">Status</th>
              <th class="text-center whitespace-nowrap">Seller</th>
              <th class="text-center whitespace-nowrap">Wrok</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" v-bind:key="item.id" class="intro-y h-20">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.title }}</td>
              <td class="text-center">
                <!-- <img :src="item.thumbnail" class="object-cover h-16 w-16" /> -->
                <div v-if="item.sub_content_type === 'MP4'">
                    <video :src="item.thumbnail" class="w-16 h-16" autoplay loop></video>
                  </div>
                  <div v-else>
                    <img :src="item.thumbnail" class="w-16 h-16 object-cover" />
                  </div>
              </td>
              <td class="text-center">{{ item.contract_id }}</td>
              <td class="text-center">
                <div v-if="item.order_type === 1">Fixed</div>
                <div v-if="item.order_type === 2">Auction</div>
              </td>
              <td class="text-center">
                <DecimalValue v-model="item.price_fixed" />
                {{ item.assetSymbol }}
                <!-- {{ item.price_fixed }} -->
              </td>
              <td class="text-center">{{ item.tax_ratio }}</td>
              <td class="text-center">{{ item.donate_ratio }}</td>
              <td class="text-center">
                {{ Number((item.fee_creator / 100).toFixed(2)) }}
              </td>
              <td class="text-center">
                <div v-if="item.order_state === 0">Pending</div>
                <div v-if="item.order_state === 1">Onsales</div>
                <div v-if="item.order_state === 2">Hold</div>
                <div v-if="item.order_state === 3">Sold</div>
                <div v-if="item.order_state === 4">Closed</div>
                <div v-if="item.order_state === 5">On Match</div>
                <div v-if="item.order_state === 6">Match Fail</div>
              </td>
              <!-- <td class="text-center">{{ item.seller_id }}</td> -->
              <td class="text-center">{{ item.creator_name }}</td>

              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <a
                    class="flex items-center mr-3"
                    href="javascript:;"
                    @click="onEdit(item)"
                  >
                    <CheckSquareIcon class="w-4 h-4 mr-1" />
                    Edit
                  </a>

                  <div class="flex justify-center">
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle flex items-center mr-3"
                        href="javascript:;"
                      >
                        <MenuIcon class="w-4 h-4 mr-1" />
                        Status
                      </a>
                      <div class="dropdown-menu w-28">
                        <div
                          class="dropdown-menu__content box dark:bg-dark-1 p-2"
                        >
                          <div
                            class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-center"
                            @click="changeStatus(item.id, 'pending')"
                          >
                            Pending
                          </div>
                          <div
                            class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-center"
                            @click="changeStatus(item.id, 'onSales')"
                          >
                            Onsales
                          </div>
                          <div
                            class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-center"
                            @click="changeStatus(item.id, 'hold')"
                          >
                            Hold
                          </div>
                          <div
                            class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-center"
                            @click="changeStatus(item.id, 'sold')"
                          >
                            Sold
                          </div>
                          <div
                            class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md text-center"
                            @click="changeStatus(item.id, 'closed')"
                          >
                            Closed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <a
                    class="flex items-center text-theme-21"
                    href="javascript:;"
                    @click="changeStatus(item.id)"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                  </a> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <VueTailwindPagination
      :current="currentPage"
      :total="totalContent"
      :per-page="perPage"
      class="mt-5 w-3/5"
      @page-changed="changePage($event)"
    >
    </VueTailwindPagination> -->
    <div class="flex justify-center mt-5 mb-3">
      <v-pagination
        v-model="current_page"
        :pages="pages"
        :range-size="current_page"
        active-color="#DCEDFF"
        @update:modelValue="changePage"
      />
    </div>
  </div>
</template>

<script>
// import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
// import "@ocrv/vue-tailwind-pagination/dist/style.css";

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import Notify from "../../services/notification.service";
import OrderService from "../../services/order.service";
import DecimalValue from "../DecimalValue.vue";
export default {
  components: {
    VPagination,
    DecimalValue,
    // VueTailwindPagination,
  },

  data: function() {
    return {
      current_page: 1,
      per_page: 10,
      pages: 1,

      // currentPage: 1,
      // totalContent: 20,
      // perPage: 10,
      data: Array,
    };
  },

  created: function() {
    this.load();
  },

  methods: {
    load: function() {
      OrderService.listPaging(this.current_page, this.per_page)
        .then((res) => {
          // this.data = res.data.items;
          // this.totalContent = res.data.total;

          this.data = res.data.items;
          console.log("this.data ==>", this.data);
          this.total_count = res.data.total;
          this.pages = Math.ceil(res.data.total / this.per_page);

          this.$emit("total_count", this.total_count);
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    onEdit: function(item) {
      this.$router.push("/order/edit/" + String(item.id));
      // console.log("item ::::", item);
    },

    changeStatus: function(id, state) {
      // console.log(id, state);

      OrderService.updateState(id, state)
        .then((res) => {
          console.log("res ::::", res);
          Notify.success(
            "Success",
            "The Order State has been successfully updated."
          );

          this.load();
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });

      cash("#dropdown").dropdown("hide");
    },

    changePage(event) {
      // this.currentPage = event;
      this.current_page = event;

      OrderService.listPaging(this.current_page, this.per_page)
        .then((res) => {
          // this.data = res.data.items;
          // this.totalContent = res.data.total;

          this.data = res.data.items;
          this.total_count = res.data.total;
          this.pages = Math.ceil(res.data.total / this.per_page);
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },
  },
};
</script>
