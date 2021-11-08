import axios from "axios";

export default {
  //post
  insert(
    content_type,
    content_id,
    title,
    description,
    image,
    thumbnail,
    tag,
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
    fee_creator,
    order_state,
    seller
  ) {
    var param = {
      // "product_id":product_id,
      content_type: content_type,
      content_id: content_id,
      title: title,
      description: description,
      image: image,
      thumbnail: thumbnail,
      tag: tag,
      chain_id: chain_id,
      asset_id: asset_id,
      order_rawdata: order_rawdata,
      order_signature: order_signature,
      order_wallet: order_wallet,
      contract_id: contract_id,
      order_type: order_type,
      price_fixed: price_fixed,
      price_begin: price_begin,
      immediate_buyable: immediate_buyable,
      immediate_price: immediate_price,
      is_reserve: is_reserve,
      begin_at: begin_at,
      end_at: end_at,
      reserve_price: reserve_price,
      has_tax: has_tax,
      tax_ratio: tax_ratio,
      has_donate: has_donate,
      donate_ratio: donate_ratio,
      fee_exchange: fee_exchange,
      fee_creator: fee_creator,
      order_state: order_state,
      seller: seller,
    };
    console.log("[Order insertParam]", JSON.stringify(param));
    return this.api().post("/order", param);
  },

  //get
  list() {
    return this.api().get(`/order/list`);
  },

  listPaging(page, pageSize) {
    return this.api().get(`/order/list?page=${page}&pageSize=${pageSize}`);
  },

  dsplist() {
    return this.api().get("/order/dsplist");
  },

  joinBidlist(page, pageSize, params) {
    return this.api().get("/order/joinbid/list", {
      page,
      pageSize,
      params,
    });
  },

  detail(id) {
    return this.api().get(`/order/${id}`);
  },

  delete(id) {
    return this.api().delete(`/order/${id}`);
  },

  update(id, params) {
    return this.api().put(`/order/${id}`, {
      title: params.title,
      description: params.description,
    });
  },

  updateState(id, state) {
    return this.api().put(`/order/${id}/state`, {
      order_state: state,
    });
  },
   orderSold(buyer_id, sold_price, sold_price_usd,sold_price_native, fromWallet, toWallet,id) {
    return this.api().put(`/order/${id}/sold`,{
      "buyer_id":buyer_id,
      "sold_price":sold_price,
      "sold_price_usd":sold_price_usd, 
      "sold_price_native":sold_price_native,
      "fromWallet":fromWallet,
      "toWallet":toWallet
    })
  },

  //api()
  api() {
    return axios.create({
      // baseURL: `https://7e2sp62vm8.execute-api.ap-northeast-2.amazonaws.com/dev/v1/order`,
      baseURL: process.env.VUE_APP_ORDER_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
};
