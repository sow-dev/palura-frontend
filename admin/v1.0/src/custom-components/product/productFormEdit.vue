<template>
  <div>
    <div class="grid ">
      <div class="intro-y col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Layout -->
        <div class="intro-y box p-5 mt-3">
          <div class="mt-3">
            <label for="title" class="form-label">Title</label>
            <input
              id="title"
              type="text"
              class="form-control w-full"
              v-model="data.name"
              placeholder="title"
            />
            <template v-if="v$.data.name.$silentErrors">
              <p v-for="error of v$.data.name.$silentErrors" :key="error.$uid">
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <label for="title" class="form-label">Description</label>
            <div class="mt-2">
              <TextEditor v-model="data.description" />
            </div>
            <template v-if="v$.data.description.$silentErrors">
              <p
                v-for="error of v$.data.description.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>
          <div class="mt-3">
            <label for="image" class="form-label">Main Content</label>
            <!-- <img for="image" :src="data.image" class="form-control w-full" /> -->
            <ContentViwer
              v-model="data.image"
              :fileType="data.main_content_type"
            />
          </div>
          <div class="mt-3">
            <label for="thumbnail" class="form-label">Sub Content</label>
            <!-- <img for="thumbnail" :src="data.thumbnail" class="form-control w-full" /> -->
            <ContentViwer
              v-model="data.thumbnail"
              :fileType="data.sub_content_type"
            />
          </div>
          <div class="mt-3">
            <label for="network_id" class="form-label">Network</label>
            <input
              id="title"
              type="text"
              class="form-control w-full"
              v-model="network_name"
              disabled
            />
          </div>

          <div class="mt-3">
            <label for="contract_type" class="form-label">Contract Type</label>

            <input
              id="contract_type"
              type="text"
              class="form-control w-full"
              v-model="data.asset_type"
              disabled
            />
          </div>
          <div class="mt-3">
            <label for="asset_id" class="form-label">Asset Type</label>
            <input
              id="asset_id"
              type="text"
              class="form-control w-full"
              v-model="data.asset_symbol"
              disabled
            />
          </div>
          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-2">
              <div class="input-group">
                <div id="lb_amount" class="input-group-text w-24">
                  Number of issues
                </div>
                <input
                  id="amount"
                  type="number"
                  class="form-control w-full"
                  v-model="data.amount"
                  disabled
                />
              </div>
              <div class="input-group">
                <div id="input-group-3" class="input-group-text w-24">
                  Royalties
                </div>
                <input
                  id="royalties"
                  type="number"
                  class="form-control w-full"
                  v-model="data.royalties"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-2">
              <div class="input-group">
                <div class="input-group-text w-24">Artist</div>
                <input
                  type="text"
                  id="artist-name"
                  class="form-control"
                  v-model="artist.name"
                  disabled
                />
              </div>

              <div class="input-group">
                <div class="input-group-text w-24">Pen Name</div>
                <input
                  type="text"
                  id="artist-panname"
                  class="form-control"
                  v-model="artist.pen_name"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-2">
              <div class="input-group">
                <div class="input-group-text w-24">Owner</div>
                <input
                  type="text"
                  id="owner-name"
                  class="form-control"
                  v-model="owner.name"
                  disabled
                />
              </div>

              <div class="input-group">
                <div class="input-group-text w-24">Nickname</div>
                <input
                  type="text"
                  id="owner-nickname"
                  class="form-control"
                  v-model="owner.nickname"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div class="input-group">
              <!-- <div class="input-group-text w-36">소유주 지갑주소</div> -->
              <div class="input-group-text">Wallet address of owner</div>
              <input
                type="text"
                id="owner-account"
                class="form-control"
                v-model="data.init_owner_wallet"
                disabled
              />
            </div>
          </div>
        </div>
        <!-- END: Form Layout -->

        <div class="flex flex-row-reverse">
          <button
            class="btn btn-primary shadow-md mt-5 mr-2"
            @click="productEdit"
          >
            Update
          </button>
          <router-link
            to="/product"
            class="btn btn-outline-secondary shadow-md mt-5 mr-2"
            >Cancel</router-link
          >
        </div>
      </div>
      <Modal ref="successModal" />
    </div>
  </div>
</template>

<script>
import TextEditor from "../TextEditor.vue";
import ProductService from "../../services/product.service";
import UserService from "../../services/user.service";
import Notify from "../../services/notification.service";
import Modal from "../../global-components/modal/Main.vue";
import BlockchainService from "../../services/blockchain.service";

import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import ContentViwer from "../ContentViwer";

export default {
  components: {
    TextEditor,
    ContentViwer,
    Modal,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  validations() {
    return {
      data: {
        name: {
          required,
          maxLength: maxLength(100),
          $autoDirty: true,
        },
        description: {
          required,
          maxLength: maxLength(2000),
          $autoDirty: true,
        },
      },
    };
  },

  created: function() {
    this.onLoad();
  },

  data: function() {
    return {
      data: {
        name: "",
        description: "",
      },

      network_name: "",
      contrect_name: "",
      asset_name: "",
      artist: {},
      owner: {},

      editObj: {
        id: "",
        name: "",
        description: "",
      },

      page_loding: false,
    };
  },

  methods: {
    onLoad: async function() {
      const id = this.$route.params.id;
      // console.log("id ==> ", id);

      ProductService.getId(id)
        .then((res) => {
          // console.log("res ==> ", res);
          this.data = res.data;
          this.data.royalties = Number((this.data.royalties / 100).toFixed(2));

          BlockchainService.get(this.data.blockchain_id).then((network) => {
            // console.log("network res => ", network);
            this.network_name = network.data[0].name;
          });

          UserService.getId(this.data.creator_id).then((artist) => {
            // console.log("artist res => ", artist);
            this.artist = artist.data;
          });

          UserService.getId(this.data.owner_id).then((owner) => {
            // console.log("owner res => ", owner);
            this.owner = owner.data;
          });
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    productEdit: function() {
      if (this.v$.$silentErrors.length !== 0) {
        Notify.error("Validation Error", "Please, Check the validation.");
      } else {
        this.editObj.id = this.data.id;
        this.editObj.name = this.data.name;
        this.editObj.description = this.data.description;

        ProductService.update(
          this.editObj.id,
          this.editObj.name,
          this.editObj.description
        )
          .then(() => {
            this.$refs.successModal.onSuccessModal(
              "Success",
              "The product has been successfully edited."
            );
          })
          .catch((error) => {
            Notify.error(error.name, error.message);
          });
      }
    },
  },
};
</script>
