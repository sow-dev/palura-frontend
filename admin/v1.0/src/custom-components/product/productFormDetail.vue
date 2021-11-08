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
            <!-- <label for="title" class="form-label">제목</label> -->
            <label for="title" class="form-label">Title</label>
            <input
              id="title"
              type="text"
              class="form-control w-full"
              v-model="addObj.name"
              placeholder="title"
            />
          </div>

          <div class="mt-3">
            <!-- <label for="title" class="form-label">내용</label> -->
            <label for="title" class="form-label">Description</label>
            <div class="mt-2">
              <TextEditor v-model="addObj.description" />
            </div>
          </div>
          <div class="mt-3">
            <!-- <label for="addObj.image" class="form-label"
              >작품 이미지 등록</label -->
            <label for="addObj.image" class="form-label"
              >Image registration</label
            >
            <div v-if="addObj.image">
              <!-- <img :src="addObj.image" class="form-control w-full" /> -->
              <ContentViwer v-model="addObj.image" :fileType="addObj.main_content_type" />
            </div>
            <div v-else>
              <ImageUploader
                id="image"
                v-model="addObj.image"
                :address="addObj.init_owner_wallet"
                v-on:uploaded="imageUploaded"
              />
            </div>
          </div>
          <div class="mt-3">
            <!-- <label for="thumbnail" class="form-label">작품 썸네일 등록</label> -->
            <label for="thumbnail" class="form-label"
              >Thumbnail registration</label
            >
            <div v-if="addObj.thumbnail">
              <img :src="addObj.thumbnail" class="form-control w-full" />
            </div>
            <div v-else>
              <ImageUploader
                id="thumbnail"
                v-model="addObj.thumbnail"
                :address="addObj.init_owner_wallet"
                v-on:uploaded="thumbnailUploaded"
              />
            </div>
          </div>
          <div class="mt-3">
            <!-- <label for="network_id" class="form-label">네트워크</label> -->
            <label for="network_id" class="form-label">Network</label>
            <BlockchainSelector
              id="network_id"
              class="form-control"
              v-model="addObj.network_id"
              @changed="onChangeAssetType"
            />
          </div>

          <div class="mt-3">
            <!-- <label for="contract_type" class="form-label">컨트랙트 종류</label> -->
            <label for="contract_type" class="form-label">Contract type</label>
            <select
              ref="assetType"
              v-model="addObj.contract_type"
              aria-describedby="input-group-3"
              class="form-control"
              @change="onChangeAssetType"
            >
              <option value="erc721">ERC 721</option>
              <option value="erc1155">ERC 1155</option>
            </select>
          </div>
          <div class="mt-3">
            <!-- <label for="asset_id" class="form-label">자산 종류</label> -->
            <label for="asset_id" class="form-label">Asset type</label>
            <AssetSelector
              id="asset_id"
              ref="assetSelector"
              v-model="addObj.asset_id"
              :blockchain="addObj.network_id"
              :tokenType="addObj.contract_type"
              @changed="onChangeAsset"
            />
          </div>
          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-2">
              <div class="input-group">
                <!-- <div id="lb_amount" class="input-group-text w-24">발행수</div> -->
                <div id="lb_amount" class="input-group-text w-24">
                  Number of issues
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="amount"
                  v-model="addObj.amount"
                  min="1"
                  step="1"
                  :disabled="amountLock"
                  aria-describedby="input-group-3"
                />
              </div>
              <div class="input-group">
                <!-- <div id="input-group-3" class="input-group-text w-24">
                  로얄티
                </div> -->
                <div id="input-group-3" class="input-group-text w-24">
                  Royalties
                </div>
                <input
                  id="royalties"
                  type="number"
                  class="form-control w-full"
                  v-model="addObj.royalties"
                  min="0.01"
                  max="5"
                  step="0.01"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-2">
              <div class="input-group">
                <!-- <div class="input-group-text w-24">작가</div> -->
                <div class="input-group-text w-24">Artist</div>
                <input
                  @click="onModalArtist"
                  id="creator-name"
                  type="text"
                  class="form-control"
                  placeholder="name"
                  v-model="selected_artist.name"
                />
              </div>
              <input type="hidden" v-model="addObj.creator_id" />

              <div class="input-group">
                <!-- <div class="input-group-text w-24">필명</div> -->
                <div class="input-group-text w-24">Penname</div>
                <input
                  @click="onModalArtist"
                  id="creator-penname"
                  type="text"
                  class="form-control"
                  placeholder="penname"
                  v-model="selected_artist.pen_name"
                />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div class="sm:grid grid-cols-2 gap-2">
              <div class="input-group">
                <!-- <div class="input-group-text w-24">소유주</div> -->
                <div class="input-group-text w-24">Owner</div>
                <input
                  @click="onModalOwner"
                  id="owner-name"
                  type="text"
                  class="form-control"
                  placeholder="name"
                  v-model="selected_owner.name"
                />
              </div>
              <input type="hidden" v-model="addObj.owner_id" />

              <div class="input-group">
                <!-- <div class="input-group-text w-24">닉네임</div> -->
                <div class="input-group-text w-24">Nickname</div>
                <input
                  @click="onModalOwner"
                  id="owner-nickname"
                  type="text"
                  class="form-control"
                  placeholder="nickname"
                  v-model="selected_owner.nickname"
                />
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div class="input-group">
              <!-- <div class="input-group-text w-36">소유주 지갑주소</div> -->
              <div class="input-group-text">Wallet address of owner</div>
              <input
                id="owner-account"
                type="text"
                class="form-control"
                placeholder="Wellet Address"
                v-model="addObj.init_owner_wallet"
              />
            </div>
          </div>
        </div>
        <!-- END: Form Layout -->
        <div class="mt-3 text-right">
          <button type="button" class="btn btn-primary w-24" @click="onAdd">
            NFT 발행
          </button>
        </div>
      </div>
    </div>

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
              @currentArtist="setArtist"
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
              @currentArtist="setOwner"
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
    <!-- <button @click="onValidation">validation test</button> -->
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
import ContentViwer from '../ContentViwer';

export default {
  components: {
    ArtistSearch,
    BlockchainSelector,
    ImageUploader,
    AssetSelector,
    TextEditor,
    ContentViwer,
  },
  created: function() {},

  data: function() {
    return {
      page_loding: false,
      selectContract: Object,
      // assetAddr: "",
      amountLock: false,
      getNetwork_id: "",
      selected_artist: {},
      selected_owner: {},

      addObj: {
        name: "",
        description: "",
        amount: 0,
        royalties: "",
        image: "",
        thumbnail: "",
        asset_id: 0,
        collection_id: 0,
        contract_type: "erc721",
        // state: "",
        creator_id: 0,
        owner_id: 0,
        owner_wallet_id: 0, //
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
        // network_id: 0,
      },
      loading: false,
    };
  },

  methods: {
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

    onAdd: async function() {
      this.loading = true;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // console.log("accounts ==> ", accounts);

      const adminAddress = accounts[0];
      console.log("$$$$$$", window.ethereum);
      console.log("window.ethereum.chainId " + window.ethereum.chainId);
      const chainId = window.ethereum.chainId;
      const parula = new Parula(window.ethereum, {}, (line) =>
        console.info("[*] ", line)
      );
      console.log("parula " + parula);

      /** 전자서명 생성 */
      // const signMessage = `mint ${adminAddress} ${Date.now()}`
      // console.log('signMessage:' , signMessage)
      // const sinedData = this.sign(parula.web3,adminAddress,'mint ')

      var metadata_url = "https://api.parula.io/asset/metadata/1";
      // var royaltiesTo = [[accounts[0], this.addObj.royalties * 100]];
      var royaltiesTo = [
        [this.addObj.init_owner_wallet, this.addObj.royalties * 100],
      ];
      console.log("royaltiesTo", royaltiesTo);
      const ret = await parula.createArtwork(
        adminAddress,
        // this.addObj.init_owner_wallet,
        metadata_url,
        royaltiesTo
      );

      if (typeof ret === "undefined") {
        Notify.error("reject");
        this.loading = false;
      } else {
        console.log("createArtwork ret ::", ret);
        console.log("createArtwork ret string::", JSON.stringify(ret));

        const retLast = await this.productInsertAPI(ret);
        console.log("retLast ==> " + retLast);
      }
    },

    onValidation() {
      // alert('check')
      // console.log(this.$v)
      // console.log(this.validations())
      // this.validate.value.$touc()h()
    },
    imageUploaded(param) {
      console.log("param:::", param);
    },
    thumbnailUploaded(param) {
      console.log("param:::", param);
    },
    // changedContract(param) {
    //   console.log("paramContract:::", param);
    //   this.selectContract = param;
    //   this.$emit("changedContract", param);
    // },
    onChangeAsset(param) {
      console.log("asset param:", param);
      //console.log("-=>", this.$refs.assetType);
      // this.assetAddr = param.address;
      // console.log("onChangeAsset.this.assetAddr ==>", this.assetAddr);
      // this.addObj.asset_id = param.id;
    },
    onChangeAssetType() {
      if (this.addObj.contract_type == "erc721") {
        this.addObj.amount = 1;
        this.amountLock = true;
      } else {
        this.addObj.amount = 0;
        this.amountLock = false;
      }
      console.log("&&&&&&", this.addObj.contract_type);
      this.$refs.assetSelector.load(
        this.addObj.network_id,
        this.addObj.contract_type
      );
    },
    async sign(web3, from, msgParams) {
      let strMethod = "personal_sign";
      // let from = await web3.eth.getAccounts();
      // if (!from[0]) return this.onConnect()
      let paramVals = [msgParams, from];
      console.log("sign params:", strMethod, paramVals);
      return await web3.currentProvider.send(strMethod, paramVals);
    },
    productInsertAPI(ret) {
      this.addObj.token_id = ret.tokenId;
      console.log(" this.addObj ==> ", this.addObj);
      console.log(" this.addObj.token_id ==> ", this.addObj.token_id);
      // const self = this;
      ProductService.insert(
        this.addObj.name,
        this.addObj.description,
        this.addObj.amount,
        this.addObj.royalties,
        this.addObj.image,
        this.addObj.thumbnail,
        this.addObj.asset_id,
        this.addObj.collection_id,
        this.addObj.contract_type,
        // this.addObj.state,
        this.addObj.creator_id,
        this.addObj.owner_id,
        this.addObj.owner_wallet_id,
        this.addObj.init_mint_wallet,
        this.addObj.init_owner_wallet,
        this.addObj.token_id, //
        this.addObj.content_media_id,
        this.addObj.metadata_version,
        this.addObj.metadata,
        this.addObj.metadata_hist_id,
        this.addObj.metadata_url,
        this.addObj.content_media_id
      )
        .then((res) => {
          console.log("Res: ==> ", res);
          console.log("res.config.data ==> ", res.config.data);
          this.$emit("nonViewPop");
          this.$emit("DoRefresh");
          this.resetValues();
          this.loading = false;
          Notify.success("saved");
        })
        .catch((err) => {
          Notify.error(err);
          this.loading = false;
        });
    },
    resetValues() {
      this.addObj = {};
      this.selected_artist = {};
      this.selected_owner = {};
    },
  },
};
</script>
