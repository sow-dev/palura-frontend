import axios from "axios";

export default {
  //post
  create(
    blockchain_id,
    address,
    type,
    symbol,
    img,
    thumbnail,
    decimals,
    enable
  ) {
    return this.api().post(`/asset`, {
      blockchain_id, address, type, symbol, img,
      thumbnail, decimals, enable,
    });
  },

  list() {
    return this.api().get(`/asset/list`);
  },
  listByCategory(network, category) {
    return this.api().get(`/asset/listbyc/${network}/${category}`);
  },
  listByType(network, type) {
    return this.api().get(`/asset/listbyt/${network}/${type}`);
  },
  get(id) {
    return this.api().get(`/${id}`);
  },
  update(
    symbol,
    img,
    thumbnail,
    decimals,
    enable,
    id
  ) {
    console.log(
      "update:::", {symbol, img, thumbnail, decimals, enable}, id
    );
    return this.api().put(`/asset/${id}`, {
      symbol, img, thumbnail, decimals, enable,
    });
  },
  enable(id, enable) {
    return this.api().put(`/asset/${id}/enable/${enable}`);
  },
  delete(asset_id) {
    return this.api().delete(`/asset/${asset_id}`);
  },
  //api()
  api() {
    return axios.create({
      // baseURL: `https://qnfai5cxwh.execute-api.ap-northeast-2.amazonaws.com/dev/v1/asset`,
      baseURL: process.env.VUE_APP_ASSET_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
};
