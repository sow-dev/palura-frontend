<template>
  <div class="flex flex-row-reverse items-center mt-5">
    <button
      class="btn btn-primary shadow-md w-24 px-2"
      @click="activeEditMode()"
    >
      <span class="h-5 flex items-center justify-center">
        Edit
      </span>
    </button>
  </div>

  <div>
    <label class="font-medium text-base">Info</label>
  </div>

  <div class="box mt-5 py-5 px-10">
    <div class="mt-5">
      <label for="name" class="form-label">Job</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-1/3"
          v-model="profile.job"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Bio</label>
      <div>
        <textarea
          id="name"
          class="form-control w-full"
          v-model="profile.bio"
          :disabled="readOnly"
        />
        <!-- <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.bio"
          placeholder=""
          :disabled="readOnly"
        /> -->
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Nation</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-1/3"
          v-model="profile.nation"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Address</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.address1"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Sub Address</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.address2"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Year of Birth</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-1/4"
          v-model="profile.birth_year"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>

    <div class="mt-5">
      <label for="name" class="form-label">Year of Death</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-1/4"
          v-model="profile.death_year"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
  </div>

  <div class="mt-5">
    <label class="font-medium text-base">SNS</label>
  </div>

  <div class="box mt-5 p-5">
    <div class="mt-5">
      <label for="name" class="form-label">Homepage</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.homepage"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Blog</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.blog"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Instagram</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.instagram"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Facebook</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.facebook"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">Twitter</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.twitter"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
    <div class="mt-5">
      <label for="name" class="form-label">LinkedIn</label>
      <div>
        <input
          id="name"
          type="text"
          class="form-control w-full"
          v-model="profile.linkedin"
          placeholder=""
          :disabled="readOnly"
        />
      </div>
    </div>
  </div>

  <div v-if="read_only === 0" class="flex flex-row-reverse">
    <button class="btn btn-primary shadow-md mt-5 mr-2" @click="updateProfile">
      Save
    </button>
    <button
      class="btn btn-outline-secondary shadow-md mt-5 mr-2"
      @click="cancel"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import Notify from "../../services/notification.service";

export default {
  name: "profile",

  props: { nickname: String },

  data() {
    return {
      read_only: 1,

      profile: {
        job: "",
        bio: "",
        nation: "",
        address1: "",
        address2: "",
        birth_year: "",
        death_year: "",
        homepage: "",
        blog: "",
        instagram: "",
        facebook: "",
        twitter: "",
        linkedin: "",
      },
    };
  },

  mounted: function() {
    this.load();
  },

  computed: {
    readOnly: function() {
      return this.read_only === 1 ? true : false;
    },
  },

  methods: {
    load: function() {
      UserService.getProfile(this.nickname)
        .then((res) => {
          this.profile = res.data[0];
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    updateProfile: function() {
      UserService.updateProfile(
        this.nickname,
        this.profile.job,
        this.profile.bio,
        this.profile.nation,
        this.profile.instagram,
        this.profile.facebook,
        this.profile.twitter,
        this.profile.linkedin,
        this.profile.address1,
        this.profile.address2,
        this.profile.homepage,
        this.profile.blog,
        this.profile.birth_year,
        this.profile.death_year
      )
        .then(() => {
          Notify.success("Success", "The Profile is Edited.");
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });

      this.read_only = 1;
    },

    cancel: function() {
      this.load();
      this.read_only = 1;
    },

    activeEditMode: function() {
      this.read_only = 0;
    },
  },
};
</script>
