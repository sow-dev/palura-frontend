<template>
  <div class="intro-y box mt-3 p-5">
    <div class="view">
      <!-- product choice -->

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
          placeholder="Input text"
          :value="tag"
          :disabled="true"
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
            :disabled="true"
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
          <label for="asset_id" class="form-label">Asset Type</label>
          <input
            id="asset_id"
            type="text"
            class="form-control w-full"
            v-model="asset_symbol"
            :disabled="true"
          />
        </div>

        <!-- <label for="asset" class="form-label mt-6">Asset Type</label>
        <AssetSelector
          ref="assetSelector"
          v-model="asset_id"
          class="ml-4 w-full"
          :blockchain="selectedProduct.blockchain_id"
          :tokenType="'erc20'"
          @changed="onChagneAsset"
        /> -->

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
          :disabled="true"
        /> -->
        <!-- price_fixed::{{price_fixed}} -->

        <InputDecimal
          id="price_fixed"
          class="form-control w-full mt-0"
          v-model="price_fixed"
          :decimals="decimals"
          :disabled="true"
        />

        <template v-if="v$.price_fixed.$silentErrors">
          <p v-for="error of v$.price_fixed.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>
      </div>

      <div v-else-if="state.tab === 1" class="box p-5 mt-3">
        <label for="price_begin" class="form-label">Begin Price</label>
        <input
          id="price_begin"
          type="number"
          class="form-control w-full mt-0"
          placeholder="0"
          v-model="price_begin"
          :disabled="true"
        />
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
            value="true"
            :disabled="true"
          />
        </div>
        <div class="mt-1" v-if="immediate_buyable === true">
          <label class="form-check-label ml-5" for="immediate_price"
            >Immediate Sale Price
          </label>
          <input
            type="number"
            class="form-control w-1/4 pl-3 ml-3"
            placeholder="0"
            v-model="immediate_price"
            :disabled="true"
          />
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
            :disabled="true"
          />
        </div>
        <div class="mt-1" v-if="is_reserve === true">
          <label class="form-check-label" for="reserve_price"
            >Reserved Price</label
          >
          <input
            type="number"
            class="form-control w-1/4 ml-3 pl-3"
            placeholder="0"
            v-model="reserve_price"
            :disabled="true"
          />
        </div>
        <template v-if="v$.reserve_price.$silentErrors">
          <p v-for="error of v$.reserve_price.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>
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
            :disabled="true"
          />
        </div>

        <div class="mt-1" v-if="has_tax === true">
          <label for="use_tax2" class="tax_ratio ml-5">Tax Rate</label>
          <input
            type="number"
            class="form-control w-1/4 pl-3 ml-3"
            v-model="tax_ratio"
            placeholder="0"
            :disabled="true"
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
            :disabled="true"
          />
        </div>

        <div class="mt-1" v-if="has_donate === true">
          <label for="use_tax2" class="donate_ratio ml-5">Donation Rate</label>
          <input
            type="number"
            class="form-control w-1/4 pl-3 ml-3"
            v-model="donate_ratio"
            placeholder="0"
            :disabled="true"
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
            :disabled="true"
          />
        </div>
      </div>

      <div class="flex flex-row-reverse gap-2 mt-5">
        <button class="btn btn-primary shadow-md" @click="orderUpdate">
          Save
        </button>
        <router-link to="/order" class="btn btn-outline-secondary shadow-md"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import ProductChoice from "../product/productChoice.vue";
import OrderService from "../../services/order.service.js";
import AssetService from "../../services/asset.service";
import Web3 from "web3";
import AssetSelector from "../asset/AssetSelector";
import TextEditor from "../TextEditor.vue";
import InputDecimal from "../InputDecimal.vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import Notify from "../../services/notification.service";

import { reactive, computed } from "vue";
import ContentViwer from "../ContentViwer";

export default {
  props: {
    tab: Number,
  },

  // watch: {
  //   tab: function() {
  //     this.init();
  //   },
  // },

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

  mounted: function() {
    const isEdit = this.$route.path.split("/");

    if (isEdit[2] === "edit" && this.$route.params.id) {
      this.id = this.$route.params.id;
    }

    OrderService.detail(this.id)
      .then((res) => {
        console.log("res ::::", res);
        const data = res.data;

        this.getInfo.image = data.image;
        this.getInfo.thumbnail = data.thumbnail;
        this.seller = data.name;
        this.tag_list = data.tag.split(",");
        this.title = data.title;
        this.description = data.description;

        this.royalties = Number((data.royalties / 100).toFixed(2));
        this.price_fixed = data.price_fixed;

        this.price_begin = data.price_begin;
        this.immediate_buyable = true;
        this.immediate_price = data.immediate_price;
        this.is_reserve = true;
        this.reserve_price = data.reserve_price;

        if (data.begin_at) {
          this.begin_at = data.begin_at.slice(0, 10);
        }

        if (data.end_at) {
          this.end_at = data.end_at.slice(0, 10);
        }

        this.has_tax = data.has_tax === 1 ? true : false;
        this.tax_ratio = data.tax_ratio;
        this.has_donate = data.has_donate === 1 ? true : false;
        this.donate_ratio = data.donate_ratio;

        if (data.order_state > 0) {
          this.order_state = true;
        } else {
          this.order_state = false;
        }

        if (data.order_type === 1) {
          this.$emit("editTab", 0);
        } else if (data.order_type === 2) {
          this.$emit("editTab", 1);
        }

        this.asset_symbol = data.taSymbol;
        this.decimals = data.decimals;
        // AssetService.get(data.asset_id)
        //   .then((res) => {
        //     // console.log("res ::::", res.data[0].symbol);

        //     this.asset_symbol = res.data[0].symbol;
        //     this.decimals = res.data[0].decimals
        //   })
        //   .catch((error) => {
        //     Notify.error(error.name, error.message);
        //   });
      })
      .catch((error) => {
        Notify.error(error.name, error.message);
      });
  },

  data: function() {
    return {
      id: 0,
      decimals: 0,
      selectedProduct: {},
      selectedContract: {},
      selectedAsset: {},
      selectedContractMaker: {},
      asset_symbol: "",
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
    TextEditor,
    InputDecimal,
    ContentViwer
  },

  methods: {
    orderUpdate: function() {
      const parmas = {
        title: this.title,
        description: this.description,
      };

      OrderService.update(this.id, parmas)
        .then((res) => {
          console.log("res ::::", res);

          Notify.success("Success", "The Order has been successfully updated.");
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
