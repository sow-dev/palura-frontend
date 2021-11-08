import axios from "axios";

export default {
  searchString: "",

  //post 여기선 사용안함
  create(
    nickname,
    pen_name,
    name,
    avatar,
    avatar_min,
    mail,
    mail_1,
    kyc,
    aml,
    is_creator,
    is_collector,
    is_customer
  ) {
    return this.api().post("/user", {
      nickname: nickname,
      pen_name: pen_name,
      name: name,
      avatar: avatar,
      avatar_min: avatar_min,
      mail: mail,
      mail_1: mail_1,
      kyc: kyc,
      aml: aml,
      is_creator: is_creator,
      is_collector: is_collector,
      is_customer: is_customer,
    });
  },

  update(
    nickname,
    pen_name,
    name,
    avatar,
    avatar_min,
    mail,
    mail_1,
    kyc,
    aml,
    is_creator,
    is_collector,
    is_customer
  ) {
    return this.api().put(`/user/${nickname}`, {
      nickname: nickname,
      pen_name: pen_name,
      name: name,
      avatar: avatar,
      avatar_min: avatar_min,
      mail: mail,
      mail_1: mail_1,
      kyc: kyc,
      aml: aml,
      is_creator: is_creator,
      is_collector: is_collector,
      is_customer: is_customer,
    });
  },

  getNickname(nickname) {
    return this.api().get(`/user/${nickname}`);
  },

  getUserDupCheck(nickname) {
    return this.api().get(`/user/dupcheck/${nickname}`);
  },

  getId(id) {
    return this.api().get(`/user/byid/${id}`);
  },

  getUserbyAddress(address) {
    return this.api().get(`/user?byAddress=${address}`)
  },

  list(
    page,
    pageSize,
    userType,
    searchParam,
    registeredAfter,
    registeredBefore
  ) {
    if (searchParam) {
      this.searchString = `&byName=${searchParam}`;
    } else {
      this.searchString = "";
    }

    return this.api().get(
      `/user?page=${page}&pageSize=${pageSize}&${userType}=true&registeredAfter=${registeredAfter}&registeredBefore=${registeredBefore}` +
        this.searchString
    );
  },

  listPaging(page, pageSize, userType) {
    return this.api().get(
      `/user?page=${page}&pageSize=${pageSize}&${userType}=true`
    );
  },

  getWallets(nickname) {
    return this.api().get(`/user/${nickname}/wallets`);
  },

  delete(nickname) {
    return this.api().delete(`/user/${nickname}`);
  },

  // profile
  createProfile(nickname) {
    return this.api().post(`/user/${nickname}/profile`, {
      job: "",
      bio: "",
      nation: "",
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      address1: "",
      address2: "",
      homepage: "",
      blog: "",
      birth_year: "",
      death_year: "",
    });
  },

  getProfile(nickname) {
    return this.api().get(`/user/${nickname}/profile`);
  },

  updateProfile(
    nickname,
    job,
    bio,
    nation,
    instagram,
    facebook,
    twitter,
    linkedin,
    address1,
    address2,
    homepage,
    blog,
    birth_year,
    death_year
  ) {
    return this.api().put(`/user/${nickname}/profile`, {
      job: job,
      bio: bio,
      nation: nation,
      instagram: instagram,
      facebook: facebook,
      twitter: twitter,
      linkedin: linkedin,
      address1: address1,
      address2: address2,
      homepage: homepage,
      blog: blog,
      birth_year: birth_year,
      death_year: death_year,
    });
  },

  //api()
  api() {
    return axios.create({
      // baseURL: `https://umnx77e5m5.execute-api.ap-northeast-2.amazonaws.com/dev/v1/user`,
      baseURL: process.env.VUE_APP_USER_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
};
