<template>
  <div>
    <div class="grid ">
      <div v-if="loading" class="col-span-12 lg:col-span-6">
        <!-- <h1 class="m-1 text-center">
          블록체인에 상품을 발행하는데 다소 시간이 걸릴수 있습니다.
        </h1> -->
        <div class="text-center font-extrabold text-2xl mt-32">
          It may take some time to issue products on the blockchain.
        </div>
        <!-- <LoadingIcon icon="circles" class="w-8 h-8" /> -->
        <div
          class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center mt-32"
        >
          <LoadingIcon icon="tail-spin" class="w-8 h-8" />
        </div>
      </div>
      <div v-if="!loading" class="intro-y col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Layout -->
        <div class="intro-y box p-5 mt-3">
          <div class="mt-3">
            <label class="form-label">Title</label>
            <input
              id="title"
              type="text"
              class="form-control w-full"
              v-model="addObj.title"
              placeholder="title"
            />
            <template v-if="v$.addObj.title.$silentErrors">
              <p
                v-for="error of v$.addObj.title.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <label class="form-label">Description</label>
            <div class="mt-2">
              <TextEditor v-model="addObj.description" />
            </div>
            <template v-if="v$.addObj.description.$silentErrors">
              <p
                v-for="error of v$.addObj.description.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <!-- <label for="network_id" class="form-label">네트워크</label> -->
            <label class="form-label">Network</label>
            <BlockchainSelector
              id="network_id"
              class="form-control"
              v-model="addObj.network_id"
              @changeNetwork="changeNetwork"
            />
            <template v-if="v$.addObj.network_id.$silentErrors">
              <p
                v-for="error of v$.addObj.network_id.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <label class="form-label">Contract Type</label>
            <AssetSelector
              id="contract_type"
              v-model="addObj.contract_type"
              :option="'type'"
              :blockchain_id="addObj.network_id"
              :category="2"
              @changeType="changeType"
            />
            <template v-if="v$.addObj.contract_type.$silentErrors">
              <p
                v-for="error of v$.addObj.contract_type.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <label class="form-label">Asset</label>
            <AssetSelector
              id="asset_id"
              v-model="addObj.asset_id"
              :blockchain_id="addObj.network_id"
              :contract_type="addObj.contract_type"
              :category="2"
              :option="'symbol'"
              @changeAsset="changeAsset"
            />
            <template v-if="v$.addObj.asset_id.$silentErrors">
              <p
                v-for="error of v$.addObj.asset_id.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-x-2">
              <div class="input-group">
                <!-- <div id="lb_amount" class="input-group-text w-24">발행수</div> -->
                <div
                  id="lb_amount"
                  class="input-group-text flex justify-center items-center w-2/3"
                >
                  Issues
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="amount"
                  v-model="addObj.amount"
                  min="1"
                  max="100000"
                  step="1"
                  :disabled="amountLock"
                  aria-describedby="input-group-3"
                />
              </div>
              <div class="input-group">
                <div
                  id="input-group-3"
                  class="input-group-text flex justify-center items-center w-2/3"
                >
                  Royalties
                </div>
                <input
                  id="royalties"
                  type="number"
                  class="form-control w-full"
                  v-model="addObj.royalties"
                  min="0"
                  max="5"
                  step="0.01"
                  placeholder=""
                />
              </div>
              <div>
                <template v-if="v$.addObj.amount.$silentErrors">
                  <p
                    v-for="error of v$.addObj.amount.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
              <div>
                <template v-if="v$.addObj.royalties.$silentErrors">
                  <p
                    v-for="error of v$.addObj.royalties.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-x-2">
              <div class="input-group">
                <div
                  class="input-group-text flex justify-center items-center w-2/3"
                >
                  Artist
                </div>
                <input
                  @click="onModalArtist"
                  id="creator-name"
                  type="text"
                  class="form-control"
                  placeholder="name"
                  autocomplete="off"
                  v-model="selected_artist.name"
                />
              </div>
              <input type="hidden" v-model="addObj.creator_id" />
              <div class="input-group">
                <div
                  class="input-group-text flex justify-center items-center w-2/3"
                >
                  Pen Name
                </div>
                <input
                  @click="onModalArtist"
                  id="creator-penname"
                  type="text"
                  class="form-control"
                  placeholder="penname"
                  autocomplete="off"
                  v-model="selected_artist.pen_name"
                />
              </div>
              <div>
                <template v-if="v$.selected_artist.name.$silentErrors">
                  <p
                    v-for="error of v$.selected_artist.name.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
              <div>
                <template v-if="v$.selected_artist.pen_name.$silentErrors">
                  <p
                    v-for="error of v$.selected_artist.pen_name.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-x-2">
              <div class="input-group">
                <div
                  class="input-group-text flex justify-center items-center w-2/3"
                >
                  Owner
                </div>
                <input
                  @click="onModalOwner"
                  id="owner-name"
                  type="text"
                  class="form-control"
                  placeholder="name"
                  autocomplete="off"
                  v-model="selected_owner.name"
                />
              </div>
              <input type="hidden" v-model="addObj.owner_id" />

              <div class="input-group">
                <div
                  class="input-group-text flex justify-center items-center w-2/3"
                >
                  Nickname
                </div>
                <input
                  @click="onModalOwner"
                  id="owner-nickname"
                  type="text"
                  class="form-control"
                  placeholder="nickname"
                  autocomplete="off"
                  v-model="selected_owner.nickname"
                />
              </div>
              <div>
                <template v-if="v$.selected_owner.name.$silentErrors">
                  <p
                    v-for="error of v$.selected_owner.name.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
              <div>
                <template v-if="v$.selected_owner.nickname.$silentErrors">
                  <p
                    v-for="error of v$.selected_owner.nickname.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div class="input-group">
              <!-- <div class="input-group-text w-36">소유주 지갑주소</div> -->
              <div
                class="input-group-text flex justify-center items-center w-2/3"
              >
                Wallet Address Of Owner
              </div>
              <input
                id="owner-account"
                type="text"
                class="form-control"
                placeholder="Wellet Address"
                v-model="addObj.init_owner_wallet"
              />
            </div>
            <template v-if="v$.addObj.init_owner_wallet.$silentErrors">
              <p
                v-for="error of v$.addObj.init_owner_wallet.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <!-- <label for="addObj.image" class="form-label"
              >작품 이미지 등록</label -->
            <label for="addObj.image" class="form-label">Main Content</label>
            <div v-if="addObj.image" class="relative">
              <Tippy
                tag="div"
                content="Remove this image?"
                @click="onRemoveItem('image')"
                class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2"
              >
                <xIcon class="w-4 h-4" />
              </Tippy>
              <ContentViwer
                v-model="addObj.image"
                :fileType="addObj.main_content_type"
              />
            </div>

            <div v-else>
              <ImageUploader
                id="image"
                v-model="addObj.image"
                :owner_nickname="selected_owner.nickname"
                :sub_bucket="sub_bucket"
                v-on:uploaded="imageUploaded"
              />
            </div>
            <template v-if="v$.addObj.image.$silentErrors">
              <p
                v-for="error of v$.addObj.image.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>

          <div class="mt-3">
            <!-- <label for="thumbnail" class="form-label">작품 썸네일 등록</label> -->
            <label for="thumbnail" class="form-label">Sub Content</label>
            <div v-if="addObj.thumbnail" class="relative">
              <Tippy
                tag="div"
                content="Remove this image?"
                @click="onRemoveItem('thumbnail')"
                class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2"
              >
                <xIcon class="w-4 h-4" />
              </Tippy>
              <ContentViwer
                v-model="addObj.thumbnail"
                :fileType="addObj.sub_content_type"
              />
            </div>
            <div v-else>
              <ImageUploader
                id="thumbnail"
                v-model="addObj.thumbnail"
                :owner_nickname="selected_owner.nickname"
                :sub_bucket="sub_bucket"
                v-on:uploaded="thumbnailUploaded"
              />
            </div>
            <template v-if="v$.addObj.thumbnail.$silentErrors">
              <p
                v-for="error of v$.addObj.thumbnail.$silentErrors"
                :key="error.$uid"
              >
                <sub class="text-red-500">{{ error.$message }}</sub>
              </p>
            </template>
          </div>
        </div>
        <!-- END: Form Layout -->
        <div class="flex flex-row-reverse gap-2 mt-5">
          <button class="btn btn-primary shadow-md" @click="addProduct">
            NFT Mint
          </button>
          <router-link to="/product" class="btn btn-outline-secondary shadow-md"
            >Cancel</router-link
          >
        </div>
      </div>
    </div>

    <Modal ref="successModal" />

    <!-- BEGIN: dit Modal Content -->
    <div
      id="artist-search-modal"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Creator Search
            </h2>
            <a href="javascript:;" data-dismiss="modal">
              <XIcon class="w-4 h-4 mr-2"
            /></a>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body ">
            <ArtistSearch
              ref="ArtistSearch"
              @selectedArtist="setArtist"
              :key="selected_artist.id"
            />
          </div>
          <!-- END: Modal Body -->
          <!-- BEGIN: Modal Footer -->
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
          </div>
          <!-- END: Modal Footer -->
        </div>
      </div>
    </div>

    <div
      id="owner-search-modal"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Owner Search
            </h2>
            <a href="javascript:;" data-dismiss="modal">
              <XIcon class="w-4 h-4 mr-2"
            /></a>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body ">
            <ArtistSearch
              ref="OwnerSearch"
              @selectedArtist="setOwner"
              :key="selected_owner.id"
            />
          </div>
          <!-- END: Modal Body -->
          <!-- BEGIN: Modal Footer -->
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
          </div>
          <!-- END: Modal Footer -->
        </div>
      </div>
    </div>
    <!-- : Add Modal Content -->
  </div>
</template>

<script>
import ImageUploader from "../imageUploader";
import TextEditor from "../TextEditor.vue";
import AssetSelector from "../asset/AssetSelector";
import BlockchainSelector from "../blockchain/BlockchainSelector.vue";
import { Parula } from "../../parula-js/src/parula";

import ArtistSearch from "../artist/artistSerch.vue";
import ProductService from "../../services/product.service";
import Notify from "../../services/notification.service";
import Modal from "../../global-components/modal/Main.vue";
import productService from "../../services/product.service";
import ContentViwer from "../ContentViwer";

import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
} from "@vuelidate/validators";

export default {
  components: {
    Modal,
    ArtistSearch,
    BlockchainSelector,
    ImageUploader,
    AssetSelector,
    TextEditor,
    ContentViwer,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  validations() {
    return {
      addObj: {
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
        network_id: {
          required,
          $autoDirty: true,
        },
        contract_type: {
          required,
          $autoDirty: true,
        },
        asset_id: {
          required,
          $autoDirty: true,
        },
        amount: {
          required,
          $autoDirty: true,
        },
        royalties: {
          required,
          minValueValue: minValue(0),
          maxValueValue: maxValue(5),
          maxLength: maxLength(4),
          $autoDirty: true,
        },
        init_owner_wallet: {
          required,
          minLength: minLength(42),
          maxLength: maxLength(42),
          $autoDirty: true,
        },
        image: {
          required,
          $autoDirty: true,
        },
        thumbnail: {
          required,
          $autoDirty: true,
        },
      },
      selected_artist: {
        name: {
          required,
          $autoDirty: true,
        },
        pen_name: {
          required,
          $autoDirty: true,
        },
      },
      selected_owner: {
        name: {
          required,
          $autoDirty: true,
        },
        nickname: {
          required,
          $autoDirty: true,
        },
      },
    };
  },

  data: function() {
    return {
      page_loding: false,
      amountLock: false,
      getNetwork_id: "",
      selected_artist: {
        name: "",
        pen_name: "",
      },
      selected_owner: {
        name: "",
        nickname: "",
      },
      sub_bucket: "product",

      addObj: {
        // valdation check를 위해 type이 Number라도 init은 ""으로 설정. (서민혁)
        title: "",
        description: "",
        network_id: "", // number, init: ""
        contract_type: "",
        asset_id: "", // number, init: ""
        amount: "", // number, init: ""
        royalties: "", // number, init: ""

        image: "",
        thumbnail: "",
        main_content_id: 0,
        main_content_type: "",
        sub_content_id: 0,
        sub_content_type: "",

        collection_id: 0,

        state: 0,
        creator_id: 0,
        owner_id: 0,
        owner_wallet_id: 0,
        init_mint_wallet: "",
        init_owner_wallet: "",
        token_id: "",
        metadata_version: "3",
        metadata:
          "aed7c0f90ce9e85d0c237083369c4be059a04c8799811e576f159370f584401e70585090777257624f0533bd1256c7f7ba743779806b964795ae22a7880d963f1b",
        metadata_hist_id: "222",
        metadata_url: "222",
        content_media_id: 0,
        // creatorInfo: [],
      },
      loading: false,
    };
  },

  methods: {
    onRemoveItem: function(key) {
      if (key === "image") {
        this.addObj.image = "";
        this.addObj.main_content_id = 0;
        this.addObj.main_content_type = "";
      } else if (key === "thumbnail") {
        this.addObj.thumbnail = "";
        this.addObj.sub_content_id = 0;
        this.addObj.sub_content_type = "";
      }
    },

    setArtist(artist) {
      this.selected_artist.id = artist.id;
      this.selected_artist.nickname = artist.nickname;
      this.selected_artist.pen_name = artist.pen_name;
      this.selected_artist.name = artist.name;
      this.selected_artist.avatar = artist.avatar;

      this.addObj.creator_id = artist.id;

      cash("#artist-search-modal").modal("hide");
    },

    onModalArtist() {
      this.$refs.ArtistSearch.search();
      cash("#artist-search-modal").modal("show");
    },

    setOwner(owner) {
      console.log("Owner ::::", owner);

      this.selected_owner.id = owner.id;
      this.selected_owner.nickname = owner.nickname;
      this.selected_owner.pen_name = owner.pen_name;
      this.selected_owner.name = owner.name;
      this.selected_owner.avatar = owner.avatar;

      this.addObj.owner_id = owner.id;

      cash("#owner-search-modal").modal("hide");
    },

    onModalOwner() {
      this.$refs.OwnerSearch.search();
      cash("#owner-search-modal").modal("show");
    },

    addProduct: async function() {
      if (this.v$.$silentErrors.length !== 0) {
        Notify.error("Validation Error", "Please, Check the validation.");
      } else {
        this.loading = true;

        // let ethereum = window.ethereum;

        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          // const chainId = window.ethereum.chainId;
          const parula = new Parula(window.ethereum, {}, (line) =>
            console.info("[*] ", line)
          );
          console.log("parula " + parula);

          /* 전자서명 생성 */
          // const signMessage = `mint ${adminAddress} ${Date.now()}`
          // console.log('signMessage:' , signMessage)
          // const sinedData = this.sign(parula.web3,adminAddress,'mint ')

          var metadata_url = "https://api.parula.io/asset/metadata/1";
          var royaltiesTo = [];
          console.log('this.addObj',this.addObj)
          if (this.addObj.royalties > 0) {
            this.addObj.royalties = Number(
              (this.addObj.royalties * 100).toFixed(2)
            );
            royaltiesTo = [
              [this.addObj.init_owner_wallet, this.addObj.royalties],
            ];
          }

          const adminAddress = accounts[0];
          this.addObj.init_mint_wallet = adminAddress;

          const insert_res = await this.productInsertAPI();

          if (insert_res) {
            const ret = await parula.createArtwork(
              adminAddress,
              this.addObj.init_owner_wallet,
              metadata_url,
              royaltiesTo
            );

            if (typeof ret === "undefined") {
              Notify.error("Error", "Product add has been rejected.");
              this.loading = false;
            } else {
              const update_result = await this.updateState(
                insert_res.id,
                1,
                ret.tokenId
              );
              console.log("update_result ==> ", update_result);
              // Notify.success(
              //   "Success",
              //   "The product has been successfully registered."
              // );
              this.$refs.successModal.onSuccessModal(
                "Success",
                "The product has been successfully registered."
              );
              this.loading = false;
            }
          } else {
            console.error("API product.insert fail");
            // Notify.error(error);
          }
        } catch (error) {
          Notify.error(error);
          this.loading = false;
        }
      }
    },

    imageUploaded(param) {
      console.log("imageUploaded ==> ", param);
      this.addObj.main_content_id = param.id;
      this.addObj.main_content_type = param.type;
    },

    thumbnailUploaded(param) {
      console.log("thumbnailUploaded ==> ", param);
      this.addObj.sub_content_id = param.id;
      this.addObj.sub_content_type = param.type;
    },

    changeNetwork: function(e) {
      this.addObj.network_id = e;
    },

    changeType: function(e) {
      this.addObj.contract_type = e;
    },

    changeAsset(e) {
      this.addObj.asset_id = e.id;

      if (this.addObj.contract_type === "ERC721") {
        this.addObj.amount = 1;
        this.amountLock = true;
      } else {
        this.addObj.amount = 0;
        this.amountLock = false;
      }
    },

    async sign(web3, from, msgParams) {
      let strMethod = "personal_sign";
      // let from = await web3.eth.getAccounts();
      // if (!from[0]) return this.onConnect()
      let paramVals = [msgParams, from];
      console.log("sign params:", strMethod, paramVals);
      return await web3.currentProvider.send(strMethod, paramVals);
    },

    getRandomInt(min, max) {
      //min ~ max 사이의 임의의 정수 반환
      return Math.floor(Math.random() * (max - min)) + min;
    },

    productInsertAPI() {
      return new Promise((resolve, reject) => {
        //token_id는 인서트할때는 랜덤한정수, 토큰발행후 업데이트에서 state 1로 업데이트 하면서 token_id 넣어줌
        this.addObj.token_id = this.getRandomInt(90000000, 99999999);

        ProductService.insert(
          this.addObj.title,
          this.addObj.description,
          this.addObj.amount,
          this.addObj.royalties,
          this.addObj.image,
          this.addObj.thumbnail,
          this.addObj.main_content_id,
          this.addObj.main_content_type,
          this.addObj.sub_content_id,
          this.addObj.sub_content_type,
          this.addObj.asset_id,
          this.addObj.collection_id,
          this.addObj.contract_type,
          this.addObj.state,
          this.addObj.creator_id,
          this.addObj.owner_id,
          this.addObj.owner_wallet_id,
          this.addObj.init_mint_wallet,
          this.addObj.init_owner_wallet,
          this.addObj.token_id,
          this.addObj.metadata_version,
          this.addObj.metadata,
          this.addObj.metadata_hist_id,
          this.addObj.metadata_url
        )
          .then((res) => {
            console.log();
            resolve(res);
          })
          .catch((error) => {
            Notify.error(error.name, error.message);
            this.loading = false;
          });
      });

      // //token_id는 인서트할때는 랜덤한정수, 토큰발행후 업데이트에서 state 1로 업데이트 하면서 token_id 넣어줌
      // this.addObj.token_id = this.getRandomInt(99000000, 99999999);
      // console.log(" this.addObj ==> ", this.addObj);
      // console.log(" this.addObj.token_id ==> ", this.addObj.token_id);
      // // const self = this;
      // ProductService.insert(
      //   this.addObj.name,
      //   this.addObj.description,
      //   this.addObj.amount,
      //   this.addObj.royalties,
      //   this.addObj.image,
      //   this.addObj.thumbnail,
      //   this.addObj.main_content_id,
      //   this.addObj.main_content_type,
      //   this.addObj.sub_content_id,
      //   this.addObj.sub_content_type,
      //   this.addObj.asset_id,
      //   this.addObj.collection_id,
      //   this.addObj.contract_type,
      //   this.addObj.state,
      //   this.addObj.creator_id,
      //   this.addObj.owner_id,
      //   this.addObj.owner_wallet_id,
      //   this.addObj.init_mint_wallet,
      //   this.addObj.init_owner_wallet,
      //   this.addObj.token_id,
      //   this.addObj.metadata_version,
      //   this.addObj.metadata,
      //   this.addObj.metadata_hist_id,
      //   this.addObj.metadata_url
      // )
      //   .then((res) => {
      //     console.log("Res: ==> ", res);
      //     console.log("res.config.data ==> ", res.config.data);
      //     this.$emit("nonViewPop");
      //     this.$emit("DoRefresh");
      //     this.resetValues();
      //     this.loading = false;
      //     Notify.success("saved");
      //   })
      //   .catch((err) => {
      //     Notify.error(err);
      //     this.loading = false;
      //   });
    },

    updateState: function(id, state, token_id) {
      console.log("id ==> ", id);
      return new Promise((resolve, reject) => {
        productService
          .updateState(id, state, token_id)
          .then((res) => {
            this.resetValues();
            console.log("updateState res ==> ", res);
            resolve(res);
          })
          .catch((error) => {
            Notify.error(error.name, error.message);
            this.loading = false;
          });
      });
    },

    resetValues() {
      this.addObj = {
        // valdation check를 위해 type이 Number라도 init은 ""으로 설정. (서민혁)
        title: "",
        description: "",
        network_id: "", // number, init: ""
        contract_type: "",
        asset_id: "", // number, init: ""
        amount: "", // number, init: ""
        royalties: "", // number, init: ""

        image: "",
        thumbnail: "",
        main_content_id: 0,
        main_content_type: "",
        sub_content_id: 0,
        sub_content_type: "",

        collection_id: 0,

        state: 0,
        creator_id: 0,
        owner_id: 0,
        owner_wallet_id: 0,
        init_mint_wallet: "",
        init_owner_wallet: "",
        token_id: "",
        metadata_version: "3",
        metadata:
          "aed7c0f90ce9e85d0c237083369c4be059a04c8799811e576f159370f584401e70585090777257624f0533bd1256c7f7ba743779806b964795ae22a7880d963f1b",
        metadata_hist_id: "222",
        metadata_url: "222",
        content_media_id: 0,
        // creatorInfo: [],
      };
      this.selected_artist = {
        name: "",
        pen_name: "",
      };
      this.selected_owner = {
        name: "",
        nickname: "",
      };
    },
  },
};
</script>
