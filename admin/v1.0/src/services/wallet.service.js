import axios from "axios";

export default {
  //get
  get(user_id) {
    return this.api().get(`/wallet/${user_id}/wallets`);
  },
  check() {
    return this.api().get(`/wallet/list/${addr}`);
  },
  walletUpdate(
    platform,
    account,
    user_id,
    alias,
    tag,
    msg,
    sig
  ) {
    return this.api().put(`/wallet/update/${id}`, {
      platform: platform,
      account: account,
      user_id: user_id,
      alias: alias,
      tag: tag,
      auth:{
        signer:account,
        msg: msg,
        sig: sig
      }
      
    });
  },

  walletDelete() {
    return this.api().delete(`/wallet/delete/${id}/${account}/${msg}/${sig}`);
  },

  //api()
  api() {
    return axios.create({
      // baseURL: `https://lakjhu8f9j.execute-api.ap-northeast-2.amazonaws.com/dev/v1/wallet`,
      baseURL: process.env.VUE_APP_WALLET_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
};
