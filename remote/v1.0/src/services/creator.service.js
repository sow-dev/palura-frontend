import axios from "axios";

export default {
  //post
  create(
    user_id,
    public_id,
    public_name,
    name,
    name_eng,
    description,
    avata_1,
    avata_1_min,
    avata_1_id,
    role,
    profile_id
  ) {
    return this.api().post(`/user/create`, {
      user_id: user_id,
      public_id: public_id,
      public_name: public_name,
      name: name,
      name_eng: name_eng,
      description: description,
      avata_1: avata_1,
      avata_1_min: avata_1_min,
      avata_1_id: avata_1_id,
      role: role,
      profile_id: profile_id,
    });
  },

  listPaging(page, pageSize) {
    return this.api().get(
      `/user?page=${page}&pageSize=${pageSize}&creatorOnly=true`
    );
  },

  //delete

  deleteCreator(id) {
    return this.api().delete(`/user/deleteCreator/${id}`);
  },

  getByName(public_name) {
    return this.api().get(`/user/getByName/${public_name}`);
  },

  getById(public_id) {
    return this.api().get(`/user/getById/${public_id}`);
  },

  //api()
  api() {
    return axios.create({
      // baseURL: `https://umnx77e5m5.execute-api.ap-northeast-2.amazonaws.com/dev/v1/user`,
      baseURL: process.env.VUE_APP_CREATOR_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
};
