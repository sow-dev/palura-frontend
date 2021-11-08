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
                <label class="form-label w-full flex flex-col sm:flex-row">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  class="form-control w-full"
                  v-model="user.name"
                  placeholder=""
                />
                <template v-if="v$.user.name.$silentErrors">
                  <p
                    v-for="error of v$.user.name.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
              <div class="mt-3">
                <div>
                  <label class="form-label w-full flex flex-col sm:flex-row">
                    Nickname
                  </label>
                  <div class="flex gap-2">
                    <input
                      id="nickname"
                      type="text"
                      class="form-control w-full"
                      v-model="user.nickname"
                      placeholder=""
                      :disabled="readOnly"
                    />

                    <button
                      v-if="read_only === 0"
                      class="btn btn-outline-secondary shadow-md"
                      @click="doubleCheck(user.nickname)"
                    >
                      Check
                    </button>
                    <button
                      v-else-if="read_only === 1"
                      class="btn btn-outline-secondary shadow-md"
                      @click="changeNickname(user.nickname)"
                      :disabled="eidt_mode"
                    >
                      Change
                    </button>
                  </div>
                  <template v-if="v$.user.nickname.$silentErrors">
                    <p
                      v-for="error of v$.user.nickname.$silentErrors"
                      :key="error.$uid"
                    >
                      <sub class="text-red-500">{{ error.$message }}</sub>
                    </p>
                  </template>
                </div>
                <!-- <div v-if="duplicate == 0" class="text-red-400 mt-2">
                  Nickname is duplicated.
                </div>
                <div v-if="duplicate == 1" class="text-blue-500 mt-2">
                  Nickname is not duplicated.
                </div> -->
              </div>
              <div class="mt-3">
                <label class="form-label w-full flex flex-col sm:flex-row">
                  Pen Name
                </label>
                <input
                  id="pen_name"
                  type="text"
                  class="form-control w-full"
                  v-model="user.pen_name"
                  placeholder=""
                />
                <template v-if="v$.user.pen_name.$silentErrors">
                  <p
                    v-for="error of v$.user.pen_name.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
              </div>
              <div class="mt-3">
                <label class="form-label w-full flex flex-col sm:flex-row">
                  Email
                </label>
                <input
                  id="mail"
                  type="text"
                  class="form-control w-full"
                  v-model="user.mail"
                  placeholder=""
                />
                <template v-if="v$.user.mail.$errors">
                  <p
                    v-for="error of v$.user.mail.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
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
                <label class="form-label w-full flex flex-col sm:flex-row">
                  Sub Email
                </label>
                <input
                  id="name"
                  type="text"
                  class="form-control w-full"
                  v-model="user.mail_1"
                  placeholder=""
                />
                <template v-if="v$.user.mail_1.$silentErrors">
                  <p
                    v-for="error of v$.user.mail_1.$silentErrors"
                    :key="error.$uid"
                  >
                    <sub class="text-red-500">{{ error.$message }}</sub>
                  </p>
                </template>
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
                <label class="form-label w-full flex flex-col sm:flex-row">
                  Avatar Registration
                </label>

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
              <template v-if="v$.user.avatar.$silentErrors">
                <p
                  v-for="error of v$.user.avatar.$silentErrors"
                  :key="error.$uid"
                >
                  <sub class="text-red-500">{{ error.$message }}</sub>
                </p>
              </template>

              <div class="mt-3">
                <!-- <label for="thumbnail" class="form-label">작품 썸네일 등록</label> -->
                <label class="form-label w-full flex flex-col sm:flex-row">
                  Small Avatar Registration
                </label>

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
              <template v-if="v$.user.avatar_min.$silentErrors">
                <p
                  v-for="error of v$.user.avatar_min.$silentErrors"
                  :key="error.$uid"
                >
                  <sub class="text-red-500">{{ error.$message }}</sub>
                </p>
              </template>
            </div>
            <!-- END: Form Layout -->
          </div>
        </div>
        <div class="flex flex-row-reverse">
          <button class="btn btn-primary shadow-md mt-5 mr-2" @click="save">
            Save
          </button>
          <button
            class="btn btn-outline-secondary shadow-md mt-5 mr-2"
            @click="cancel"
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

import useVuelidate from "@vuelidate/core";
import { required, maxLength, alphaNum, email } from "@vuelidate/validators";

export default {
  components: {
    ImageUploader,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  computed: {
    readOnly: function() {
      return this.read_only === 1 ? true : false;
    },
  },

  validations() {
    return {
      user: {
        name: {
          required,
          maxLength: maxLength(20),
          alphaNum,
          $autoDirty: true,
        },
        nickname: {
          required,
          maxLength: maxLength(20),
          alphaNum,
          $autoDirty: true,
        },
        pen_name: {
          required,
          maxLength: maxLength(20),
          alphaNum,
          $autoDirty: true,
        },
        mail: {
          required,
          maxLength: maxLength(40),
          email,
        },
        mail_1: {
          maxLength: maxLength(40),
          email,
        },
        avatar: {
          required,
        },
        avatar_min: {
          required,
        },
      },
    };
  },

  data: function() {
    return {
      read_only: 0,
      eidt_mode: 0,
      duplicate: 9,
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
        is_collector: 0,
      },
    };
  },

  created() {
    const isEdit = this.$route.path.split("/");

    if (isEdit[2] === "edit" && this.$route.params.nickname) {
      // 해당 조건문의 유효성 검사
      this.eidt_mode = 1;
      this.read_only = 1;
      this.duplicate = 0;
      this.user.nickname = this.$route.params.nickname;

      UserService.getNickname(this.user.nickname)
        .then((res) => {
          this.user = res.data;
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
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

    createArtist: function() {
      this.user.is_creator = 1;
      this.user.is_customer = 0;
      this.user.is_collector = 0;

      if (this.duplicate === 0) {
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
        )
          .then((res) => {
            this.$router.push("/artist");

            UserService.createProfile(this.user.nickname)
              .then((res) => {
                Notify.success("Success", "The artist is registered.");
              })
              .catch((error) => {
                Notify.error(error.name, error.message);
              });
          })
          .catch((error) => {
            Notify.error(error.name, error.message);
          });
      } else if (this.duplicate === 1) {
        Notify.error("Double Check Error", "The nickname is duplicated.");
      } else {
        Notify.error("Double Check Error", "Please double check");
      }
    },

    updateArtist: function() {
      this.user.is_creator = 1;
      this.user.is_customer = 0;
      this.user.is_collector = 0;

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
      )
        .then((res) => {
          Notify.success("Success", "The artist is updated.");
          this.$router.push("/artist");
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    save: function() {
      const path = this.$route;

      this.user.selectedCreator = this.user.nickname;

      // 중복체크 눌러야 함. 유효성 검사 완료되어야 함.
      // console.log("this.v$.$errors", this.v$.$silentErrors);

      if (this.v$.$silentErrors.length !== 0) {
        Notify.error("Validation Error", "Please, Check the Validation.");
      } else if (this.duplicate === 9) {
        Notify.error("Double Check Error", "Please, Double check.");
      } else if (this.duplicate === 1) {
        // 중복검사 했으나, 중복임. => 이 경우는 생길 수가 없다. (중복이면 ""가 되므로.)
      } else {
        if (path.path === "/artist/enroll") {
          this.createArtist();
        } else {
          this.updateArtist();
        }
      }
    },

    cancel: function() {
      this.$router.push("/artist");
    },

    changeNickname: function() {
      this.nickname = "";
      this.read_only = 0;
      this.duplicate = 9;
    },

    doubleCheck: function(nickname) {
      this.duplicate = 9;

      // console.log("res ::::", this.v$.user.nickname.$silentErrors);

      if (this.v$.user.nickname.$silentErrors.length !== 0) {
        Notify.error("Validation Error", "Please, Check the Validation.");
      } else {
        if (nickname) {
          UserService.getUserDupCheck(nickname).then((res) => {
            console.log("res.data.cnt ==> ", res.data.cnt);

            if (res.data.cnt === 0) {
              this.duplicate = 0;
              Notify.success("Success", "The Nickname is available for use.");
              this.read_only = 1;
            } else {
              this.duplicate = 1;
              this.user.nickname = "";
              Notify.error("Double Check Error", "The nickname is duplicated.");
            }
          });
        }
      }
    },
  },
};
</script>
