<template>
  <div>
    <div>
      <h1 class="text-lg font-medium mt-10">Detail Page</h1>
    </div>

    <div class="box px-5 pt-5 mt-5">
      <div
        class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5"
      >
        <div class="flex flex-1 px-5 items-center lg:justify-start">
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 mr-3 ml-5 flex-none lg:w-32 lg:h-32 image-fit relative"
          >
            <img alt="Avatar" class="rounded-full" :src="this.user.avatar" />
          </div>
          <div class="ml-5">
            <div
              class="sm:w-full truncate sm:whitespace-normal font-medium text-lg"
            >
              {{ user.nickname }}
            </div>
            <div class="text-gray-600">{{ this.user.pen_name }}</div>
          </div>
        </div>
      </div>

      <div
        class="nav nav-tabs flex-col sm:flex-row lg:justify-start ml-5"
        role="tablist"
      >
        <button
          id="profile"
          class="py-4 sm:mr-8 flex items-center active"
          @click="changeTab(0)"
        >
          <UserIcon class="w-4 h-4 mr-2" /> Profile
        </button>

        <button
          id="wallets"
          class="py-4 sm:mr-8 flex items-center"
          @click="changeTab(1)"
        >
          <ShieldIcon class="w-4 h-4 mr-2" /> Wallets
        </button>

        <button
          id="artworks"
          class="py-4 sm:mr-8 flex items-center"
          @click="changeTab(2)"
        >
          <ImageIcon class="w-4 h-4 mr-2" /> Artworks
        </button>
      </div>
    </div>

    <div v-if="tab === 0">
      <Profile :nickname="nickname" />
    </div>

    <div v-else-if="tab === 1">
      <Wallets ref="wallets_tab" :nickname="nickname" />
    </div>

    <div v-else-if="tab === 2">
      <Artworks ref="artworks_tab" :user_id="user.id" :nickname="nickname" />
    </div>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import Artworks from "../../custom-components/user/artworks";
import Profile from "../../custom-components/user/profile.vue";
import Wallets from "../../custom-components/user/wallets.vue";

export default {
  components: {
    Profile,
    Wallets,
    Artworks,
  },

  data: function() {
    return {
      tab: 0,
      nickname: "",
      user: {},
    };
  },

  created: function() {
    this.nickname = this.$route.params.nickname;
    this.getUserInfo(this.nickname);
  },

  mounted: function() {},

  methods: {
    getUserInfo: function(nickname) {
      UserService.getNickname(nickname).then((res) => {
        this.user = res.data;
      });
    },

    changeTab: function(num) {
      this.tab = num;
      this.tabClassInit();

      if (this.tab === 0) {
        document.querySelector("#profile").classList.add("active");
      } else if (this.tab === 1) {
        document.querySelector("#wallets").classList.add("active");
      } else if (this.tab === 2) {
        document.querySelector("#artworks").classList.add("active");
      }
    },

    tabClassInit: function() {
      document.querySelector("#profile").classList.remove("active");
      document.querySelector("#wallets").classList.remove("active");
      document.querySelector("#artworks").classList.remove("active");
    },

    onWallet: function() {
      //this.$refs.artworks_tab.load();
    },

    onArtworks: function() {
      //this.$refs.artworks_tab.load();
    },
  },
};
</script>
