import axios from "axios";
// import { metadata } from 'core-js/fn/reflect'

export default {
  //post

  insert(
    name,
    description,
    amount,
    royalties,
    image,
    thumbnail,
    main_content_id,
    main_content_type,
    sub_content_id,
    sub_content_type,
    asset_id,
    collection_id,
    contract_type,
    state,
    creator_id,
    owner_id,
    owner_wallet_id,
    init_mint_wallet,
    init_owner_wallet,
    token_id,
    metadata_version,
    metadata,
    metadata_hist_id,
    metadata_url
  ) {
    const self = this;
    return new Promise((resolve, reject) => {
      self
        .api()
        .post("/product", {
          name: name,
          description: description,
          amount: amount,
          royalties: royalties,
          image: image,
          thumbnail: thumbnail,
          main_content_id: main_content_id,
          main_content_type: main_content_type,
          sub_content_id: sub_content_id,
          sub_content_type: sub_content_type,
          asset_id: asset_id,
          collection_id: collection_id,
          contract_type: contract_type,
          state: state,
          creator_id: creator_id,
          owner_id: owner_id,
          owner_wallet_id: owner_wallet_id,
          init_mint_wallet: init_mint_wallet,
          init_owner_wallet: init_owner_wallet,
          token_id: token_id,
          metadata_version: metadata_version,
          metadata: metadata,
          metadata_hist_id: metadata_hist_id,
          metadata_url: metadata_url,
        })
        .then((res) => {
          console.log("res ==> ", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("err ==>", err);
          reject(err);
        });
    });
  },

  updateState(id, state, token_id) {
    return this.api().put(`/product/state/${id}`, { state: state, token_id: token_id });
  },

  fixOwnerWallet(id, real_owner_wallet, msg, sig) {
    return this.api().put(`/product/${id}/ownerWallet`, {
      id,
      real_owner_wallet,
      msg,
      sig,
    });
  },

  update(id, name, description) {
    return this.api().put(`/${id}`, {
      name: name,
      description: description,
    });
  },

  list(page, pageSize) {
    return this.api().get(`/product/search?page=${page}&pageSize=${pageSize}`);
  },

  listSearch(
    page = 1,
    pageSize = 20,
    key,
    value,
    state,
    startDate,
    endDate,
    ownerAddressBy
  ) {
    return this.api().get(`/product/search`, {
      params: {
        page,
        pageSize,
        key,
        value,
        state,
        startDate,
        endDate,
        ownerAddressBy,
      },
    });
  },

  getId(id) {
    return this.api().get(`/product/${id}`);
  },
  productJoinAsset(id) {
    return this.api().get(`/product/${id}/asset`);
  },
  productJoinCreator(id) {
    return this.api().get(`/product/creatorById/${id}`);
  },
  delbyid(id) {
    return this.api().delete(`/product/${id}`);
  },

  //api()
  api() {
    return axios.create({
      // baseURL: `https://7e2sp62vm8.execute-api.ap-northeast-2.amazonaws.com/dev/v1/product`,
      baseURL: process.env.VUE_APP_PRODUCT_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': 'http://localhost:8080'
      },
    });
  },
};
