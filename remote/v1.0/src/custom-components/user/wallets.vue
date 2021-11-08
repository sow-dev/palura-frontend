<template>
  <div class="flex flex-row-reverse items-center mt-5">
    <button
      class="btn btn-primary shadow-md w-24 px-2"
      @click="changeMode('add')"
    >
      <span class="h-5 flex items-center justify-center">
        Send a Email
      </span>
    </button>
  </div>

  <div class="min-h-screen mt-5">
    <div class="box">
      <div v-for="wallet in wallets" :key="wallet.id">
        <div
          class="flex items-center border-b border-gray-200 dark:border-dark-5 p-5"
        >
          <div class="w-full">
            <label class="text-gray-600">{{ wallet.platform }}</label>
            <div class="mt-1 ml-5">{{ wallet.account }}</div>
          </div>
          <CopyIcon
            class="cursor-pointer text-gray-600 w-4 h-4 ml-auto"
            @click="copyAddress(wallet.account)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import Notify from "../../services/notification.service";

export default {
  name: "wallets",

  props: { nickname: String },

  data: function() {
    return {
      wallets: [],
    };
  },

  mounted: function() {
    this.load();
  },

  methods: {
    load: function() {
      UserService.getWallets(this.nickname).then((res) => {
        this.wallets = res.data.items;
      });
    },

    copyAddress: function(account) {
      this.$copyText(account);
      Notify.success("Copy", "Account is copied");
    },
  },
};
</script>
