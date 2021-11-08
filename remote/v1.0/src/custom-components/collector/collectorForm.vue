<template>
  <div class="flex ...">
    <div class="flex-grow w-16 h-16 ...">
      <!-- This item will grow or shrink as needed -->
    </div>
    <div class="flex-shrink w-3/5">
      <div>
        <div class="grid ">
          <div class="intro-y col-span-12 lg:col-span-6">
            <div class="intro-y box p-5">
              <div class="mt-3">
                <label for="name" class="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  class="form-control w-full"
                  v-model="user.name"
                  placeholder=""
                />
              </div>
              <div class="mt-3">
                <div>
                  <label for="nickname" class="form-label">Nickname</label>
                  <div class="flex gap-2">
                    <input
                      id="nickname"
                      type="text"
                      class="form-control w-full"
                      v-model="user.nickname"
                      placeholder=""
                    />
                    <button
                      class="btn btn-outline-secondary shadow-md"
                      @click="doubleCheck(user.nickname)"
                    >
                      Check
                    </button>
                  </div>
                </div>
                <div v-if="nickname_dup_check == 0" class="text-red-400 mt-2">
                  Nickname is duplicated.
                </div>
                <div v-if="nickname_dup_check == 1" class="text-blue-500 mt-2">
                  Nickname is not duplicated.
                </div>
              </div>
              <div class="mt-3">
                <label for="pen_name" class="form-label">Pen name</label>
                <input
                  id="pen_name"
                  type="text"
                  class="form-control w-full"
                  v-model="user.pen_name"
                  placeholder=""
                />
              </div>
              <div class="mt-3">
                <label for="mail" class="form-label">mail</label>
                <input
                  id="mail"
                  type="text"
                  class="form-control w-full"
                  v-model="user.mail"
                  placeholder=""
                />
              </div>
              <!-- <div class="mt-3">
            <label for="name" class="form-label">영문 이름</label>
            <input
              id="name"
              type="text"
              class="form-control w-full"
              v-model="ds.name_eng"
              placeholder=""
            />
          </div> -->

              <div class="mt-3">
                <label for="name" class="form-label">Sub mail</label>
                <input
                  id="name"
                  type="text"
                  class="form-control w-full"
                  v-model="user.mail_1"
                  placeholder=""
                />
              </div>

              <div class="flex flex-col sm:flex-row mt-5 gap-5">
                <div class="input-group w-full">
                  <div
                    id="input-group-3"
                    class="items-center input-group-text w-1/4"
                  >
                    <label class="flex justify-center">kyc</label>
                  </div>

                  <ul
                    id="state"
                    class="form-control flex flex-col sm:flex-row justify-between items-center"
                  >
                    <li class="flex justify-between	 items-center">
                      <input
                        type="radio"
                        id="kyc-no"
                        class="mr-1"
                        value="0"
                        v-model="user.kyc"
                      />
                      <label for="provisional">No</label>
                    </li>
                    <li class="flex justify-between	 items-center">
                      <input
                        type="radio"
                        id="kyc-yes"
                        class="mr-1"
                        value="1"
                        v-model="user.kyc"
                      />
                      <label for="issued">Yes</label>
                    </li>
                  </ul>
                </div>
                <div class="input-group w-full">
                  <div
                    id="input-group-3"
                    class="items-center input-group-text w-1/4"
                  >
                    <label class="flex justify-center">aml</label>
                  </div>

                  <ul
                    id="state"
                    class="form-control flex flex-col sm:flex-row justify-between items-center"
                  >
                    <li class="flex justify-between	 items-center">
                      <input
                        type="radio"
                        id="aml-no"
                        class="mr-1"
                        value="0"
                        v-model="user.aml"
                      />
                      <label for="provisional">No</label>
                    </li>
                    <li class="flex justify-between	 items-center">
                      <input
                        type="radio"
                        id="aml-yes"
                        class="mr-1"
                        value="1"
                        v-model="user.aml"
                      />
                      <label for="issued">Yes</label>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- <div class="mt-3">
                <label for="avatar" class="form-label">Avatar</label>
                <div v-if="user.avatar">
                  <img :src="user.avatar" class="form-control w-full" />
                </div>
                <div v-else>
                  <ImageUploader id="avatar" v-model="user.avatar" />
                </div>
              </div>

              <div class="mt-3">
                <label for="avatar_min" class="form-label">Small Avatar</label>
                <div v-if="user.avatar_min">
                  <img :src="user.avatar_min" class="form-control w-full" />
                </div>
                <div v-else>
                  <ImageUploader id="avatar_min" v-model="user.avatar_min" />
                </div>
              </div> -->

              <div class="mt-3">
                <!-- <label for="addObj.image" class="form-label"
              >작품 이미지 등록</label -->
                <label for="avatar" class="form-label"
                  >Avatar registration</label
                >
                <div v-if="user.avatar" class="relative">
                  <Tippy
                    tag="div"
                    content="Remove this image?"
                    @click="onRemoveItem('image')"
                    class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2"
                  >
                    <xIcon class="w-4 h-4" />
                  </Tippy>
                  <div v-if="file_type === 'MP4'">
                    <video
                      :src="user.avatar"
                      class="form-control w-full"
                      controls
                      autoplay
                    ></video>
                  </div>
                  <div v-else>
                    <img :src="user.avatar" class="form-control w-full" />
                  </div>
                </div>
                <div v-else>
                  <ImageUploader
                    id="avatar"
                    v-model="user.avatar"
                    :owner_nickname="user.nickname"
                    :sub_bucket="sub_bucket"
                    v-on:uploaded="imageUploaded"
                  />
                </div>
              </div>

              <div class="mt-3">
                <!-- <label for="thumbnail" class="form-label">작품 썸네일 등록</label> -->
                <label for="avatar_min" class="form-label"
                  >Small avatar registration</label
                >
                <div v-if="user.avatar_min" class="relative">
                  <Tippy
                    tag="div"
                    content="Remove this image?"
                    @click="onRemoveItem('thumbnail')"
                    class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2"
                  >
                    <xIcon class="w-4 h-4" />
                  </Tippy>
                  <div v-if="thumbnail_type === 'MP4'">
                    <video
                      :src="user.avatar_min"
                      class="form-control w-full"
                      controls
                      autoplay
                    ></video>
                  </div>
                  <div v-else>
                    <img :src="user.avatar_min" class="form-control w-full" />
                  </div>
                </div>
                <div v-else>
                  <ImageUploader
                    id="avatar_min"
                    v-model="user.avatar_min"
                    :owner_nickname="user.nickname"
                    :sub_bucket="sub_bucket"
                    v-on:uploaded="thumbnailUploaded"
                  />
                </div>
              </div>
            </div>
            <!-- END: Form Layout -->
          </div>
        </div>
        <div class="flex flex-row-reverse">
          <button
            class="btn btn-primary shadow-md mt-5 mr-2"
            @click="onClickSave"
          >
            Save
          </button>
          <button
            class="btn btn-outline-secondary shadow-md mt-5 mr-2"
            @click="onClickCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div class="flex-grow w-16 h-16 ...">
      <!-- This item will grow or shrink as needed -->
    </div>
  </div>
</template>

<script>
import ImageUploader from "../imageUploader.vue";
import UserService from "../../services/user.service";
import Notify from "../../services/notification.service";

export default {
  components: {
    ImageUploader,
  },

  data: function() {
    return {
      nickname_dup_check: 9,
      file_type: "",
      thumbnail_type: "",
      sub_bucket: "profile",

      user: {
        selectedCreator: "",

        nickname: "",
        pen_name: "",
        name: "",
        mail: "",
        mail_1: "",
        kyc: "0",
        aml: "0",
        avatar: "",
        avatar_min: "",
        // user type 정의
        is_creator: 0,
        is_customer: 0,
        is_collector: 1,
      },
    };
  },

  created() {
    const isEdit = this.$route.path.split("/");

    if (isEdit[2] === "edit" && this.$route.params.nickname) {
      // 해당 조건문의 유효성 검사
      this.user.nickname = this.$route.params.nickname;

      UserService.getNickname(this.user.nickname).then((res) => {
        this.user = res.data;
      });
    }
  },

  methods: {
    onRemoveItem: function(key) {
      if (key === "image") {
        this.user.avatar = "";
      } else if (key === "thumbnail") {
        this.user.avatar_min = "";
      }
    },

    imageUploaded(param) {
      console.log("imageUploaded ==> ", param);
      this.file_type = param.type;
    },
    thumbnailUploaded(param) {
      console.log("thumbnailUploaded ==> ", param);
      this.thumbnail_type = param.type;
    },

    createCollector: function() {
      this.user.is_creator = 0;
      this.user.is_customer = 0;
      this.user.is_collector = 1;

      if (this.nickname_dup_check === 1) {
        UserService.create(
          this.user.nickname,
          this.user.pen_name,
          this.user.name,
          this.user.avatar,
          this.user.avatar_min,
          this.user.mail,
          this.user.mail_1,
          this.user.kyc,
          this.user.aml,
          this.user.is_creator,
          this.user.is_collector,
          this.user.is_customer // 0
        ).then((res) => {
          console.log("collector is enrolled", res);
          this.$router.push("/collector");
        });

        // UserService.createProfile(this.user.nickname).then((res) => {
        //   console.log(res);
        // });
      } else if (this.nickname_dup_check === 0) {
        Notify.error("Double Check Error", "The nickname is duplicated.");
      } else {
        Notify.error("Double Check Error", "Please double check");
      }
    },

    updateCollector: function() {
      this.user.is_creator = 0;
      this.user.is_customer = 0;
      this.user.is_collector = 1;

      UserService.update(
        this.user.nickname,
        this.user.pen_name,
        this.user.name,
        this.user.avatar,
        this.user.avatar_min,
        this.user.mail,
        this.user.mail_1,
        this.user.kyc,
        this.user.aml,
        this.user.is_creator,
        this.user.is_collector,
        this.user.is_customer // 0
      ).then((res) => {
        console.log("collector is edited", res);
        this.$router.push("/collector");
      });
    },

    onClickSave: function() {
      const path = this.$route;

      this.user.selectedCreator = this.user.nickname;

      if (path.path === "/collector/enroll") {
        this.createCollector();
      } else {
        this.updateCollector();
      }
    },

    onClickCancel: function() {
      this.$router.push("/collector");
    },

    doubleCheck: function(nickname) {
      this.user.avatar = "";
      this.user.avatar_min = "";
      this.nickname_dup_check = 9;

      if (nickname) {
        UserService.getUserDupcheck(nickname).then((res) => {
          console.log("res.data.cnt ==> ", res.data.cnt);

          if (res.data.cnt === 0) {
            this.nickname_dup_check = 1;
          } else {
            this.nickname_dup_check = 0;
          }
        });
      }
    },
  },
};
</script>
