import axios from "axios";

export default {
  searchString: "",

  //post 여기선 사용안함
  create(
    user_id,
    image,
    image_min,
    sequence,
    title,
    description,
    masterpiece,
    comment
  ) {
    const param = {
      user_id: user_id,
      sequence: sequence,
      masterpiece: masterpiece,
      image: image,
      image_min: image_min,
      title: title,
      description: description,
      comment: comment,
    };
    console.log("param:", param);
    return this.api().post("", param);
  },

  list(page, pageSize, user_id) {
    return this.api().get(`/portfolio/list/${user_id}?page=${page}&pageSize=${pageSize}`);
  },

  update(
    user_id,
    image,
    image_min,
    sequence,
    title,
    description,
    masterpiece,
    comment
  ) {
    const param = {
      sequence: sequence,
      masterpiece: masterpiece,
      image: image,
      image_min: image_min,
      title: title,
      description: description,
      comment: comment,
    };
    console.log("param:", param);
    return this.api().put(`/portfolio/${user_id}`, param);
  },

  delete(id) {
    return this.api().delete(`/portfolio/${id}`);
  },

  //api()
  api() {
    return axios.create({
      // baseURL: `https://umnx77e5m5.execute-api.ap-northeast-2.amazonaws.com/dev/v1/user`,
      baseURL: process.env.VUE_APP_PORTFOLIO_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
};
