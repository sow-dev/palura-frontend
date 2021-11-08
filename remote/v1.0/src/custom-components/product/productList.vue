<template>
  <div>
    <div
      class="grid grid-cols-12 overflow-x-scroll overflow-y-hidden gap-6 mt-5"
    >
      <div
        class="intro-y col-span-12 overflow-auto lg:overflow-visible w-full tableflow"
      >
        <table class="table table--sm table-report -mt-2">
          <thead>
            <tr>
              <th class="text-center whitespace-nowrap">ID</th>
              <th class="text-center whitespace-nowrap">Title</th>
              <th class="text-center whitespace-nowrap">Content</th>
              <th class="text-center whitespace-nowrap">Contract Type</th>
              <th class="text-center whitespace-nowrap">Artist</th>
              <th class="text-center whitespace-nowrap">Owner</th>
              <th class="text-center whitespace-nowrap">Token Id</th>
              <th class="text-center whitespace-nowrap">Status</th>
              <th class="text-center whitespace-nowrap">Work</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" v-bind:key="item.id" class="intro-y h-20">
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-center">
                <!-- <img :src="item.thumbnail" class="object-cover h-16 w-16" /> -->
                  <div v-if="item.sub_content_type === 'MP4'">
                    <video :src="item.thumbnail" class="w-16 h-16" autoplay loop></video>
                  </div>
                  <div v-else>
                    <img :src="item.thumbnail" class="w-16 h-16 object-cover" />
                  </div>
              </td>
              <td class="text-center">
                <!-- {{ getContractType(item.contract_type) }} -->
                {{ item.type }}
              </td>
              <td class="text-center">{{ item.artist_name }}</td>
              <td class="text-center">
                {{ item.owner_name }}
                <a
                  v-if="item.owner_wallet != item.real_wallet"
                  class="flex justify-center text-red-500 mt-1"
                  href="javascript:;"
                  @click="walletWarningModal(item)"
                >
                  <!-- @click="fixOwnerWallet(item)" -->
                  <!-- <eye-off-icon
                    size="1.0x"
                    class="custom-class text-red-500 mr-1"
                  /> -->
                  Warning
                </a>
                <!--
                ONDB: {{ item.owner_wallet ? item.owner_wallet : "null" }} != 
                ONCHAIN: {{ item.real_wallet }} 
                -->
              </td>
              <!-- TODO: owner- DB:chain 일치 여부 표시하자 일단 -->
              <td class="text-center">
                {{ item.symbol + "[" + item.token_id + "]" }}
              </td>

              <td class="text-center">
                {{ item.state === 1 ? "Normal" : "Abnormal" }}
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
        <Modal ref="warningModal" :title="title" :message="message" />
      </div>
      <!-- END: Data List -->
      <!-- END: Pagination -->
    </div>
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
import Web3 from "web3";
import ethSigUtil from "eth-sig-util";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import ProductService from "../../services/product.service.js";
import Modal from "../../global-components/modal/Main.vue";
import UserService from "../../services/user.service.js";
import Notify from "../../services/notification.service";
import ContentViwer from '../ContentViwer.vue'

import { Parula } from "../../parula-js";

export default {
  setup() {},
  components: {
    VPagination,
    Modal,
    ContentViwer,
  },

  data: function() {
    return {
      items: [],

      // modal props
      title: "",
      message: "",

      // pagination props
      current_page: 1,
      per_page: 10,
      pages: 1,
    };
  },

  created: function() {
    this.onLoad();
    this.parula = new Parula(window.ethereum, {}, (line) =>
      console.info("[*] ", line)
    );
  },

  methods: {
    onLoad: function() {
      this.loadProductList(this.current_page, this.per_page);
    },

    onDetail: function(item) {
      this.$router.push("/pruduct/productdetail/" + String(item.id));
    },

    onEdit: function(item) {
      this.$router.push("/product/productedit/" + String(item.id));
    },

    onDelete: function(deleteKey) {
      this.$emit("onDelete", deleteKey);
    },

    changePage(event) {
      this.currentPage = event;
      this.loadProductList(this.current_page, this.per_page);
    },

    loadProductList(page, per_page) {
      ProductService.list(page, per_page)
        .then((res) => {
          this.items = res.data.items;
          this.total_count = res.data.total;
          this.pages = Math.ceil(res.data.total / this.per_page);

          this.$emit("total_count", this.total_count);

          this.items.forEach((item) => {
            this.parula
              .getTokenOwnerOf(item.contract_address, item.token_id)
              .then((real_wallet) => {
                item.real_wallet = real_wallet;
              })
              .catch((error) => {
                console.log(error);
                Notify.error(
                  "Warning",
                  "There seems to be some products that have not been minted properly."
                );
              });
          });
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    //ONDB: {{ item.owner_wallet ? item.owner_wallet : "null" }} !=
    // ONCHAIN: {{ item.real_wallet }}

    walletWarningModal: function(item) {
      this.title = "Mint doesn't work.";
      this.message = `
      on DB: ${item.owner_wallet ? item.owner_wallet : "Null"} <br />
      on CHAIN: ${item.real_wallet ? item.real_wallet : "Null"}
      `;
      this.$refs.warningModal.onDeleteModal();
    },
    // "\n      on DB: 0xf212B4453500381A324F765c934EE39FcFbFED09\n      on CHAIN: Null\n      "
    async fixOwnerWallet(item) {
      var info = await UserService.getUserbyAddress(item.real_wallet);
      if (info.status != 200 && info.data) {
        Notify.error(
          "Warning",
          `No user information for real_wallet(${item.real_wallet}`
        );
        return; // 그래도 업데이트 하게 할지 고민 필요
      } else {
        const real_user = info.data.items[0];
        Notify.success(
          "Progress",
          `${item.name}(${item.token_id})'s owner will update as '${real_user.nickname}'`
        );
      }

      const web3 = new Web3(window.web3.currentProvider);
      const method = "personal_sign";

      const now = new Date();
      const msg = `
        I will fix the ${item.name}(${
        item.token_id
      })'s owner information from '${item.owner_wallet}' to '${
        item.real_wallet
      }'.
        - ${now.toUTCString()} -
      `;
      const msgParam = [msg, web3.currentProvider.selectedAddress];

      const res = await web3.currentProvider.send(method, msgParam);
      const sig = res.result;

      console.log(msg, sig);

      ProductService.fixOwnerWallet(item.id, item.real_wallet, msg, sig) //owner_id 는 sql 쿼리에서 알아서 조회해서 들어감
        .then((res) => {
          // 새로고침 해줘? 아니면 그냥 값 바꿀까? 그게 싸긴 할듯
          item.owner_wallet = item.real_wallet;
          Notify.success("Success", "You fixed it.");
          console.log(res);
        })
        .catch((e) => {
          var err = e;
          if (e.response && e.response.data) err = e.response.data;
          Notify.error("Fail", err);
        });

      // var recovered = await ethSigUtil.recoverPersonalSignature({data:msg, sig})
      // console.log(recovered);
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
tbody > .intro-x {
  border-radius: 5px;
  box-shadow: 3px 3px 2px #ccc;
}
</style>
