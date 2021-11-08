<template>
  <div class="intro-y box mt-3 p-5">
    <div class="view">
      <a v-if="!getInfo.image" @click="onModalProduct">
        <div class="w-full h-40 bg-white border-solid border-gray-300">
          <h1
            class="grid place-items-center text-centfer font-medium text-xl antialiased"
          >
            Product Choice
          </h1>
        </div>
      </a>
      <div
        v-else
        class="flex gap-5 pb-5 justify-center items-center w-fullbg-white border-solid border-gray-300"
      >
        <!-- <h3 :src="getInfo.name" class="imgMain" /> -->

        <img
          :src="getInfo.image"
          class="cursor-pointer h-36"
          @click="onModalProduct"
        />
        <div>
          <h2 class="imgTitle">{{ getInfo.name }}</h2>
          <!-- <h2 class="text-gray-600">Name / Pen Name</h2> -->
          <br />
          <h2 class="text-gray-600">
            Registered: {{ String(getInfo.created_at).substring(0, 10) }}
          </h2>
        </div>
      </div>
      <template v-if="v$.getInfo.image.$silentErrors">
        <p v-for="error of v$.getInfo.image.$silentErrors" :key="error.$uid">
          <sub class="text-red-500">{{ error.$message }}</sub>
        </p>
      </template>

      <div class="box p-5 mt-3">
        <label for="image" class="form-label">Main Content</label>
        
        <div v-if="getInfo.image">
          <!-- <img :src="getInfo.image" class="form-control w-full" /> -->
          <ContentViwer v-model="getInfo.image" :fileType="getInfo.main_content_type" />

        </div>
        <div v-else>
          <input
            type="text"
            class="form-control"
            disabled
            placeholder="Choice Product"
          />
        </div>

        <label for="thumbnail" class="form-label mt-3">Sub Content</label>
        <div v-if="getInfo.thumbnail">
          <!-- <img :src="getInfo.thumbnail" class="form-control w-full" /> -->
          <ContentViwer v-model="getInfo.thumbnail" :fileType="getInfo.sub_content_type" />
        </div>
        <div v-else>
          <input
            type="text"
            class="form-control"
            disabled
            placeholder="Choice Product"
          />
        </div>
      </div>

      <div class="box p-5 mt-3">
        <label for="creator2" class="form-label mt-5">Artist</label>
        <input
          id="creator2"
          ref="seller"
          type="text"
          class="form-control w-full mt-0"
          placeholder="Input text"
          v-model="seller"
          :disabled="true"
        />

        <!-- <p>태그컨트롤 :</p><input type="text"> -->
        <label for="tag_control" class="form-label mt-6">Tag</label>
        <input
          id="tag_control"
          type="text"
          class="form-control w-full mt-0"
          placeholder="Enter the tag in your work"
          autocomplete="off"
          :value="tag"
          @input="inputTag"
          @keypress.enter.prevent="addTag"
        />
        <template v-if="v$.tag_list.$silentErrors">
          <p v-for="error of v$.tag_list.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>

        <div>
          <button
            v-for="(item, index) in tag_list"
            :key="index"
            type="button"
            class="bg-blue-600 rounded-full text-xs text-white h-auto w-auto p-1 mt-2 mr-1"
            @click="deleteTag(index)"
          >
            {{ item }}
          </button>
        </div>

        <label for="tag_control" class="form-label mt-6">Title</label>
        <input
          id="tag_control"
          type="text"
          class="form-control w-full mt-0"
          placeholder="Input text"
          v-model="title"
        />
        <template v-if="v$.title.$silentErrors">
          <p v-for="error of v$.title.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>

        <label for="detail2" class="form-label mt-6">Description</label>
        <TextEditor ref="description" v-model="description" />
        <template v-if="v$.description.$silentErrors">
          <p v-for="error of v$.description.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>
        <!-- <input
          id="detail2"
          ref="description"
          v-model="description"
          type="message"
          class="form-control w-full mt-0"
          placeholder="Input text"
          :disabled="true"
        /> -->

        <div class="mt-3">
          <label for="asset_id" class="form-label">Asset</label>
          <AssetSelector
            id="asset_id"
            v-model="asset_id"
            :blockchain_id="selectedProduct.blockchain_id"
            :category="1"
            :option="'symbol'"
            @changeAsset="changeAsset"
          />
          <template v-if="v$.asset_id.$silentErrors">
            <p v-for="error of v$.asset_id.$silentErrors" :key="error.$uid">
              <sub class="text-red-500">{{ error.$message }}</sub>
            </p>
          </template>
        </div>

        <div class="mt-3">
          <label for="royalties" class="form-label">Royalties</label>
          <input
            type="number"
            placeholder=""
            class="form-control w-1/4 pl-3 ml-5"
            ref="royalties"
            v-model="royalties"
            :disabled="true"
          />
        </div>
      </div>

      <div v-if="state.tab === 0" class="box p-5 mt-3">
        <label for="price_fixed" class="form-label mt-6">Fixed Price</label>
        <!-- <input
          id="price_fixed"
          type="number"
          class="form-control w-full mt-0"
          placeholder="0"
          v-model="price_fixed"
        /> -->
        <InputDecimal
        id="price_fixed"
        class="form-control w-full mt-0"
        v-model="price_fixed" :decimals="selectedProduct.decimals" />
        
        <template v-if="v$.price_fixed.$silentErrors">
          <p v-for="error of v$.price_fixed.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>
      </div>

      <div v-else-if="state.tab === 1" class="box p-5 mt-3">
        <label for="price_begin" class="form-label">Begin Price</label>
        <!-- <input
          id="price_begin"
          type="number"
          class="form-control w-full mt-0"
          placeholder="0"
          v-model="price_begin"
        /> -->
        <InputDecimal
        id="price_begin" class="form-control w-full mt-0"
        v-model="price_begin" :decimals="selectedProduct.decimals" />
        
        <template v-if="v$.price_begin.$silentErrors">
          <p v-for="error of v$.price_begin.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>

        <div class="flex place-items-center mt-5">
          <label class="form-check-label" for="show-example-1"
            >Immediate Sale</label
          >
          <input
            id="show-example-1"
            data-target="#simple-editor"
            class="show-code form-check-switch ml-3"
            type="checkbox"
            v-model="immediate_buyable"
            value="true" />
        </div>
        <div class="mt-1" v-if="immediate_buyable === true">
          <label class="form-check-label ml-5" for="immediate_price"
            >Immediate Sale Price
          </label>
          <!-- <input
            type="number"
            class="form-control w-1/4 pl-3 ml-3"
            placeholder="0"
            v-model="immediate_price"
          /> -->
          <InputDecimal
          id="immediate_price" class="form-control w-full mt-0"
          v-model="immediate_price" :decimals="selectedProduct.decimals" />
        </div>
        <template v-if="v$.immediate_price.$silentErrors">
          <p
            v-for="error of v$.immediate_price.$silentErrors"
            :key="error.$uid"
          >
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>

        <div class="flex place-items-center mt-5">
          <label class="form-check-label" for="show-example-2"
            >Set Reserved Price</label
          >
          <input
            id="show-example-2"
            data-target="#simple-editor"
            class="show-code form-check-switch ml-3"
            type="checkbox"
            v-model="is_reserve"
            value="true"
          />
        </div>
        <div class="mt-1" v-if="is_reserve === true">
          <label class="form-check-label" for="reserve_price"
            >Reserved Price</label
          >
          <!-- <input
            type="number"
            class="form-control w-1/4 ml-3 pl-3"
            placeholder="0"
            v-model="reserve_price"
          /> -->
          <InputDecimal
          id="reserve_price" class="form-control w-full mt-0"
          v-model="reserve_price" :decimals="selectedProduct.decimals" />
        </div>
        <template v-if="v$.reserve_price.$silentErrors">
          <p v-for="error of v$.reserve_price.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>

        <label for="begin_at" class="form-label mt-5">Date</label>
        <Datepicker
          locale="de"
          weekStart="0"
          autoApply
          range
          placeholder="Enter it based on your local time."
          monthNameFormat="long"
          :closeOnAutoApply="false"
          :format="(format = 'yyyy/MM/dd HH:mm')"
          v-model="date"
        >
          <template #input-icon>
            <CalendarIcon class="ml-2" />
          </template>
        </Datepicker>
      </div>

      <div class="box p-5 mt-3">
        <div class="flex place-items-center">
          <label for="use_tax2" class="form-check-label">Tax</label>
          <input
            id="use_tax2"
            data-target="#simple-editor"
            class="show-code form-check-switch ml-3"
            type="checkbox"
            v-model="has_tax"
            value="true"
          />
        </div>

        <div class="mt-1" v-if="has_tax === true">
          <label for="use_tax2" class="tax_ratio ml-5">Tax Rate</label>
          <input
            type="number"
            class="form-control w-1/4 pl-3 ml-3"
            v-model="tax_ratio"
            placeholder="0"
          />
        </div>

        <div class="flex place-items-center mt-5">
          <label for="use_donation2" class="form-check-label">Donation</label>
          <input
            id="use_donation2"
            data-target="#simple-editor"
            class="show-code form-check-switch ml-3"
            type="checkbox"
            v-model="has_donate"
            value="true"
          />
        </div>

        <div class="mt-1" v-if="has_donate === true">
          <label for="use_tax2" class="donate_ratio ml-5">Donation Rate</label>
          <input
            type="number"
            class="form-control w-1/4 pl-3 ml-3"
            v-model="donate_ratio"
            placeholder="0"
          />
        </div>

        <div class="flex place-items-center mt-5">
          <label class="form-check-label" for="order_state2"
            >Register For Sales Immediately</label
          >
          <input
            id="order_state2"
            class="show-code form-check-switch mr-0 ml-3"
            type="checkbox"
            v-model="order_state"
            value="1"
          />
        </div>
      </div>

      <div class="flex flex-row-reverse gap-2 mt-5">
        <button class="btn btn-primary shadow-md" @click="orderRegister">
          Register
        </button>
        <router-link to="/order" class="btn btn-outline-secondary shadow-md"
          >Cancel</router-link
        >
      </div>

      <!-- BEGIN: product choice Modal Content -->
      <div
        id="product-choice-modal"
        class="modal"
        data-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        ref="assetModal"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Product list
              </h2>
              <a href="javascript:;" data-dismiss="modal"
                ><XIcon class="w-4 h-4 mr-2"
              /></a>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body h-4/6">
              <ProductChoice @selected="onSelectProduct" />
            </div>
            <!-- END: Modal Body -->
            <!-- BEGIN: Modal Footer -->
            <div class="modal-footer text-right">
              <!-- <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary w-20 mr-1"
              >
                Cancel
              </button> -->
            </div>
            <!-- END: Modal Footer -->
          </div>
        </div>
      </div>
      <!-- END: Add Modal Content -->
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

import ProductChoice from "../product/productChoice.vue";
import ProductService from "../../services/product.service.js";
import OrderService from "../../services/order.service.js";
import UploadService from "../../services/upload.service.js";
import Web3 from "web3";
import { Parula } from "../../parula-js/src/parula.js";
// import ContractService from "../../services/contract.service.js";
import AssetSelector from "../asset/AssetSelector";
import TextEditor from "../TextEditor.vue";

import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import Notify from "../../services/notification.service";

import { reactive, computed } from "vue";
import InputDecimal from "../InputDecimal.vue";
import ContentViwer from "../ContentViwer";

const date = new Date();

const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);

const today = year + "-" + month + "-" + day;

export default {
  props: {
    tab: Number,
  },

  watch: {
    tab: function() {
      this.init();
    },
  },

  setup(props) {
    const state = reactive({
      tab: computed(() => props.tab),
    });

    return {
      v$: useVuelidate(),
      state,
    };
  },

  validations() {
    if (this.tab === 0) {
      return {
        getInfo: {
          image: {
            required,
            $autoDirty: true,
          },
        },
        title: {
          required,
          maxLength: maxLength(100),
          $autoDirty: true,
        },
        description: {
          required,
          maxLength: maxLength(2000),
          $autoDirty: true,
        },
        tag_list: {
          required,
          maxLength: maxLength(10),
          $autoDirty: true,
        },
        asset_id: {
          required,
          $autoDirty: true,
        },

        // normal sales
        price_fixed: {
          required,
          $autoDirty: true,
        },
      };
    } else if (this.tab === 1) {
      return {
        getInfo: {
          image: {
            required,
            $autoDirty: true,
          },
        },
        title: {
          required,
          maxLength: maxLength(100),
          $autoDirty: true,
        },
        description: {
          required,
          maxLength: maxLength(2000),
          $autoDirty: true,
        },
        tag_list: {
          required,
          maxLength: maxLength(10),
          $autoDirty: true,
        },
        asset_id: {
          required,
          $autoDirty: true,
        },

        // auction
        price_begin: {
          required,
          $autoDirty: true,
        },
        immediate_price: {
          required,
          $autoDirty: true,
        },
        reserve_price: {
          required,
          $autoDirty: true,
        },
      };
    }
  },

  computed: {
    web3() {
      console.log("web3" + web3);
      let web3 = new Web3(window.web3.currentProvider);
      return web3;
    },
  },

  data: function() {
    return {
      // format: "yyyy/MM/dd HH:mm",

      selectedProduct: {},
      selectedContract: {},
      selectedAsset: {},
      selectedContractMaker: {},
      isHidden: true,
      choosedID: "", //선택 상품 번호
      getInfo: {
        image: "", // valdiation check
      }, //상품정보 get 저장
      changeView: false, //상품선택여부 확인
      content_type: "",
      content_id: "",
      product_id: "",
      title: "",
      description: "",
      image: "",
      thumbnail: "",
      tag: "",
      tag_list: [],
      owner_id: "",
      chain_id: "",
      asset_id: "",
      order_rawdata: "",
      order_signature: "",
      order_wallet: "",
      contract_id: "",
      order_type: "",
      price_fixed: "",
      price_begin: "",
      immediate_buyable: "",
      immediate_price: "",
      is_reserve: "",
      date: "",
      reserve_price: "",
      has_tax: "",
      tax_ratio: "",
      has_donate: "",
      donate_ratio: "",
      fee_exchange: "",
      royalties: "",
      order_state: "",
      seller: "",
      sourceImg: {
        done: false,
        img: "",
      },
      sourceThumnails: {
        done: false,
        img: "",
      },
    };
  },
  components: {
    Datepicker,
    ProductChoice,
    AssetSelector,
    InputDecimal,
    TextEditor,
    ContentViwer
  },

  methods: {
    onModalProduct: function() {
      cash("#product-choice-modal").modal("show");
    },

    onSelectProduct: async function(item) {
      const p = await ProductService.productJoinAsset(item.id);

      console.log('p::::', p)
      this.selectedProduct = p.data;

      this.getInfo = item;
      this.owner_id = this.getInfo.owner_id;
      this.title = this.getInfo.name;
      this.image = this.getInfo.image;
      this.thumbnail = this.getInfo.thumbnail;
      this.created_at = this.getInfo.created_at;
      this.seller = this.getInfo.artist_name;
      this.$refs.description.value = this.getInfo.description;
      this.description = this.getInfo.description;
      this.royalties = Number((this.getInfo.royalties / 100).toFixed(2));
      this.$refs.royalties.value = Number(
        (this.getInfo.royalties / 100).toFixed(2)
      );

      this.chain_id = this.getInfo.blockchain_id;
      this.order_wallet = this.getInfo.init_owner_wallet;

      cash("#product-choice-modal").modal("hide");
    },

    onChangeContract: function(param) {
      this.selectedContract = param;
    },

    changeAsset: function(e) {
      this.asset_id = e.id;
      this.selectedAsset = e;
      // console.log("this.selectedAsset ::::", this.selectedAsset);
    },

    inputTag: function(e) {
      this.tag = e.target.value;
    },

    addTag: function() {
      this.tag = this.tag.replace(/(\s*)/g, "");

      if (this.tag === "") return;
      else {
        this.tag_list.push(this.tag);
        this.tag = "";
      }
    },

    deleteTag: function(index) {
      this.tag_list.splice(index, 1);
    },

    clickManage: function() {
      this.isHidden = false;
    },

    nonShow: function() {
      this.isHidden = !this.isHidden;
    },

    console: function() {
      var abc = document.getElementById("input-file");
      var dfc = document.getElementById("fileName");
      dfc.innerText = abc.value;
      // console.log(abc.value);
    },
    handleChange(event) {
      // console.log("handleChange Start");
      // console.log("event.target.files", event.target.files);
      //   console.log("MediaInfo:::", MediaInfo)
      //   console.log('file received', file);
      const file = event.target.files[0];

      MediaInfo({ format: "JSON" }, (mediaInfo) => {
        if (file) {
          // console.log('file received', file);

          const reader = new FileReader();
          const getSize = () => file.size;
          const readChunk = (chunkSize, offset) =>
            new Promise((resolve, reject) => {
              reader.onload = (event) => {
                if (event.target.error) {
                  reject(event.target.error);
                }
                resolve(new Uint8Array(event.target.result));
              };
              reader.readAsArrayBuffer(file.slice(offset, offset + file.size));
            });

          mediaInfo
            .analyzeData(getSize, readChunk)
            .then((info) => {
              // this.$refs.ta.value = JSON.stringify(result, null, 2);
              console.log("result:::", info);
              UploadService.media(file, "account", info, reader).then((res) => {
                console.log("res:::" + JSON.stringify(res.path));

                console.log("파일:::" + JSON.stringify(file));
                console.log("파일:::" + JSON.stringify(file));
                // console.log('인포:::' +info)
                console.log("리더:::" + JSON.stringify(reader));

                let imgPath = res.path;
                console.log("imgPath", imgPath);
                this.sourceImg.done = true;
                this.sourceImg.img =
                  "https://parular-contents.s3.ap-northeast-2.amazonaws.com/" +
                  imgPath;
                console.log("this.sourceImg.img" + this.sourceImg.img);
                this.image = this.sourceImg.img;
                console.log("this.image" + this.image);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    handleChange2(event) {
      console.log("handleChange Start");
      console.log("event.target.files", event.target.files);
      const file = event.target.files[0];

      MediaInfo({ format: "JSON" }, (mediaInfo) => {
        if (file) {
          const reader = new FileReader();
          const getSize = () => file.size;
          const readChunk = (chunkSize, offset) =>
            new Promise((resolve, reject) => {
              reader.onload = (event) => {
                if (event.target.error) {
                  reject(event.target.error);
                }
                resolve(new Uint8Array(event.target.result));
              };
              reader.readAsArrayBuffer(file.slice(offset, offset + file.size));
            });

          mediaInfo
            .analyzeData(getSize, readChunk)
            .then((info) => {
              console.log("result:::", info);
              UploadService.media(file, "account", info, reader).then((res) => {
                console.log("res:::" + JSON.stringify(res.path));

                console.log("파일:::" + JSON.stringify(file));
                console.log("파일:::" + JSON.stringify(file));
                console.log("인포:::" + info);
                console.log("리더:::" + JSON.stringify(reader));

                let imgPath = res.path;
                console.log("333" + imgPath);
                this.sourceThumnails.done = true;
                this.sourceThumnails.img =
                  "https://parular-contents.s3.ap-northeast-2.amazonaws.com/" +
                  imgPath;

                this.thumbnail = this.sourceThumnails.img;
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },

    init: function() {
      this.selectedProduct = {};
      this.selectedAsset = {};
      this.selectedContract = {};
      this.selectedContractMaker = {};
      this.isHidden = true;
      this.choosedID = "";
      this.getInfo = {
        image: "",
      };
      this.changeView = false;
      this.content_type = "";
      this.content_id = "";
      this.product_id = "";
      this.title = "";
      this.description = "";
      this.image = "";
      this.thumbnail = "";
      this.tag = "";
      this.tag_list = [];
      this.owner_id = "";
      this.chain_id = "";
      this.asset_id = "";
      this.order_rawdata = "";
      this.order_signature = "";
      this.order_wallet = "";
      this.contract_id = "";
      this.order_type = "";
      this.price_fixed = "";
      this.price_begin = "";
      this.immediate_buyable = "";
      this.immediate_price = "";
      this.is_reserve = "";
      this.date = "";
      this.reserve_price = "";
      this.has_tax = "";
      this.tax_ratio = "";
      this.has_donate = "";
      this.donate_ratio = "";
      this.fee_exchange = "";
      this.royalties = "";
      this.order_state = "";
      this.seller = "";
      this.sourceImg = {
        done: false,
        img: "",
      };
      this.sourceThumnails = {
        done: false,
        img: "",
      };
    },

    orderRegister: async function() {
      if (this.v$.$silentErrors.length !== 0) {
        Notify.error("Validation Error", "Please, Check the validation.");
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const parula = new Parula(window.ethereum, {}, (line) =>
          console.info("[*] ", line)
        );

        let begin_at = "";
        let end_at = "";

        if (this.tab === 1) {
          if (this.date !== "") {
            begin_at = this.date[0].toISOString();
            end_at = this.date[1].toISOString();
          } else {
            Notify.error("Error", "The date has not been set.");
            throw new Error("The date has not been set.");
          }
        }

        let ret;

        if (this.tab === 0) {
          console.log("sellorder prams ::::", {
            maker: accounts[0],
            maTypeMV: this.selectedProduct.asset_type_mv,
            maContractAddress: this.selectedProduct.asset_address,
            maValue: Number(this.selectedProduct.token_id),

            taTypeMV: this.selectedAsset.type_mv,
            taContractAddress: this.selectedAsset.address,
            taValue: Number(this.price_fixed),
          });

          ret = await parula.createSellOrder({
            maker: accounts[0],
            maTypeMV: this.selectedProduct.asset_type_mv,
            maContractAddress: this.selectedProduct.asset_address,
            maValue: Number(this.selectedProduct.token_id),

            taTypeMV: this.selectedAsset.type_mv,
            taContractAddress: this.selectedAsset.address,
            taValue: Number(this.price_fixed),
          });
        } else if (this.tab === 1) {
          console.log("sellorder prams ::::", {
            startDatetime: Date.parse(begin_at),
            endDatetime: Date.parse(end_at),

            maker: accounts[0],
            maTypeMV: this.selectedProduct.asset_type_mv,
            maContractAddress: this.selectedProduct.asset_address,
            maValue: Number(this.selectedProduct.token_id),

            taTypeMV: this.selectedAsset.type_mv,
            taContractAddress: this.selectedAsset.address,
            taPriceBegin: this.price_begin,
            taPriceEnd: this.immediate_price,
          });

          ret = await parula.createAuction({
            startDatetime: Date.parse(begin_at),
            endDatetime: Date.parse(end_at),

            maker: accounts[0],
            maTypeMV: this.selectedProduct.asset_type_mv,
            maContractAddress: this.selectedProduct.asset_address,
            maValue: Number(this.selectedProduct.token_id),

            taTypeMV: this.selectedAsset.type_mv,
            taContractAddress: this.selectedAsset.address,
            taPriceBegin: Number(this.price_begin),
            taPriceEnd: Number(this.immediate_price),
          });
        }

        await this.createOrder(ret);
      }
    },

    createOrder: function(ret) {
      let order_type = "";
      let begin_at;
      let end_at;

      if (this.tab === 0) {
        order_type = "fixed"; //오더타입? content_type과 중복아닌가?
      } else if (this.tab === 1) {
        order_type = "auction"; //오더타입? content_type과 중복아닌가?

        if (this.date !== "") {
          begin_at = this.date[0].toISOString();
          end_at = this.date[1].toISOString();

          begin_at = Date.parse(begin_at);
          end_at = Date.parse(end_at);
        } else {
          Notify.error("Error", "The date has not been set.");
          throw new Error("The date has not been set.");
        }
      }

      const content_type = "product";
      const content_id = this.getInfo.id;
      const title = this.title;
      const description = this.description;
      const image = this.image;
      const thumbnail = this.thumbnail;
      const tag_list = this.tag_list.toString();
      // const chain_id = window.ethereum.chainId; //블록체인 아이디 ret.blockNumber parula.chain_id //확인필요
      const chain_id = this.chain_id;
      const asset_id = this.asset_id; //에셋id? 에셋 테이블에서 가져오는 id
      const order_rawdata = JSON.stringify(ret.data); //주문전자서명데이터 ret.data "order":{"maker":"0xae542d524cb33e9057c3176bdda08679271d0d3b",
      const order_signature = ret.signature; //주문전자서명 ret.signature "signature":"0xb516a506862bf08e6396c03d408aceba197824f8d58bf8ae8ba56eb209e5558a151d7e0425a8eaed1e330495e2f49e0254d65c095c45fd17af1cb64e08c9532c1b"
      const order_wallet = this.order_wallet;
      const contract_id = this.contract_id; //거래컨트랙트 아이디? exchange table? 이거슨필요한가?
      const price_fixed = this.price_fixed;
      const price_begin = this.price_begin;
      const immediate_buyable = this.immediate_buyable;
      const immediate_price = this.immediate_price;
      const is_reserve = this.is_reserve;
      const reserve_price = this.reserve_price;
      const has_tax = this.has_tax;
      const tax_ratio = this.tax_ratio;
      const has_donate = this.has_donate;
      const donate_ratio = this.donate_ratio;
      const fee_exchange = this.fee_exchange;
      const royalties = Number((this.royalties * 100).toFixed(2));
      const owner_id = this.owner_id;

      if (this.order_state === true) {
        this.order_state = "onSales";
      } else {
        this.order_state = "pending";
      }

      const order_state = this.order_state;

      OrderService.insert(
        // product_id,
        content_type,
        content_id,
        title,
        description,
        image,
        thumbnail,
        tag_list,
        chain_id,
        asset_id,
        order_rawdata,
        order_signature,
        order_wallet,
        contract_id,
        order_type,
        price_fixed,
        price_begin,
        immediate_buyable,
        immediate_price,
        is_reserve,
        begin_at,
        end_at,
        reserve_price,
        has_tax,
        tax_ratio,
        has_donate,
        donate_ratio,
        fee_exchange,
        royalties,
        order_state,
        owner_id
      )
        .then((res) => {
          Notify.success(
            "Success",
            "The Order has been successfully registered."
          );

          this.init();
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },
  },
};
</script>

<style>
/* #button{
  position:relative;
  width: 65px;
  height:32px;
} */
#toggle1,
#toggle2,
#toggle3 {
  border: 0px solid #000;
}
.toggle-checkbox:checked {
  right: 0;
  background: #ff8a00;
}
.toggle-checkbox:checked + .toggle-label {
  background: rgba(255, 138, 0, 0.15);
}
/* p{
    margin-top:1%;

} */

.susu input {
  width: 40px;
}

#seller {
  width: 10vw;
}
/* .choose-wrapper {
    width: 20vw;
    height: 20vh;
    background: white;
    border-radius: 25px;
    margin-bottom:0%;
} */
.choose-wrapper2 {
  width: 100%;
  height: 30%;
  /* margin:0 auto; */
  background: white;
  border-radius: 25px;
  /* margin-top:10%; */
  margin-bottom: 0%;
}
div > h1 {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
}
/* .choose-wrapper > h1 {
    font-size: 20px;
    font-weight: 700;
    padding-top:5%;
} */
.imgMain {
  margin: auto;
}
.imgTitle {
  font-weight: bolder;
}
form {
  width: 40vw;
}
.datepicker1 {
  height: 55vh;
  width: 100%;
  z-index: 99999999;
}
/* .v3dp__popout{
  width: 10% !important;
  height: 100% !important;
  z-index:99999;
}
.v3dp__popout > div{
  width: 10vw !important;
  height: 100% !important;
}
.v3dp__elements > button {
  width: 10%;
  height:10%;
} */
.v3dp__body {
  /* width:50% !important; */
  z-index: 99999999 !important;
}
.v3dp__divider {
  /* width: 5% !important; */
  z-index: 99999999 !important;
}
.v3dp__elements {
  /* width:3px !important; */
  /* padding: 0; */
  /* margin-left: -10% !important; */
  z-index: 99999999;
  grid-template-columns: 14.4% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% !important;
}
.v3dp__elements > button {
  width: 95%;
  z-index: 99999999 !important;
}
</style>
