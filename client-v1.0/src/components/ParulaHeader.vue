<template>
  <div class="mx-5 pt-3 mt-6">
    <div class="flex justify-between items-center z-30">
      <div class="flex content-center z-30">
        <a href="/"><img class="w-10" src="../assets/img/logo.png"/></a>
        <a href="/">
          <img
            class="w-0 md:w-24 hidden invisible md:visible"
            id="logo-other"
            src="../assets/img/parula.png"
          />
          <img
            class="w-0 md:w-24 hidden invisible md:visible"
            id="logo-main"
            src="../assets/img/parula_text_w.png"
          />
        </a>
      </div>

      <div class="flex flex-row gap-x-5 md:gap-x-16 items-center">
        <div>
          <a href="/market.html"
            ><span class="text-base hover:underline font-sans font-semibold"
              >Market</span
            ></a
          >
        </div>
        <div>
          <a href="/activity.html"
            ><span class="text-base hover:underline font-sans font-semibold"
              >Activity</span
            ></a
          >
        </div>
      </div>
      <div class="flex pr-0 dm:pr-5 z-30">
        <!-- <button
          id="install"
          class=""
          v-if="loginStatus === 'notinstalled'"
          v-on:click="checkLogin()"
        >
          <span class="w-20 underline font-sans text-sm">Install Wallet</span>
        </button> -->
        <button
          id="install"
          class=""
          v-if="loginStatus === 'notinstalled'"
          v-on:click="openInstallWallet()"
        >
          <span class="w-20 underline font-sans text-sm">Install Wallet</span>
        </button>

        <div v-if="installWallet == true" class="flex">
          <div class="relative">
            <div
              class="absolute right-0 mt-4 bg-white rounded-md shadow-lg overflow-hidden z-30"
              style="width:15rem;"
            >
              <a
                href="#"
                class="block bg-gray-800 text-white text-center font-bold py-2"
                >Install Wallet</a
              >
              <div class="py-2">
                <a
                  href="https://metamask.io/download.html"
                  target="_blank"
                  class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                  @click="closeInstallWallet"
                >
                  <img class="h-8 w-8  mx-1" src="../assets/img/metamask.png" />
                  <p class="text-gray-600 text-sm mx-2">
                    <span class="font-bold"> Metamask </span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <a
          id="install"
          href="./login.html?mode=login"
          class=""
          v-if="loginStatus === 'unauthorized'"
        >
          <span
            class="w-20 underline font-sans font-semibold text-xs sm:text-base"
            >Connect Wallet</span
          >
        </a>
        <!-- <button id="" class="" v-if="loginStatus ==='unauthorized'" v-on:click="checkLogin()">
                <span class="w-20">로그인</span>
            </button> -->
        <button
          id="anonymous"
          class="header-user"
          v-if="loginStatus === 'anonymous'"
          v-on:click="clickLogin"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect
              width="32"
              height="32"
              fill="url(#pattern0)"
              fill-opacity="0.3"
            />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlink:href="#image0" transform="scale(0.00390625)" />
              </pattern>
              <image
                id="image0"
                width="256"
                height="256"
                xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </button>

        <div
          v-if="loginStatus === 'authorized'"
          class=" relative inline-block text-left dropdown"
        >
          <button
            class="inline-flex justify-center w-full sm:px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="login-dropdown-ctrl"
          >
            <img
              v-if="session.avatar"
              class="rounded-full shadow-xl border border-gray-300 px-0 py-0  h-10"
              :src="session.avatar"
              alt="login"
            />
            <img
              v-else
              class="rounded-full shadow-xl border bg-gray-500 px-0 py-0  h-10"
              :src="pic"
              alt="login"
            />
            <!-- <svg
              v-else
              width="32"
              height="32"
              fill="#262626"
              x="0px"
              y="0px"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  d="M22.3,15.2c-0.1-0.1-0.2-0.2-0.3-0.2c-0.1,0-0.2-0.1-0.4-0.1c-0.1,0-0.2,0-0.4,0.1c-0.1,0-0.2,0.1-0.3,0.2
                                c-0.1,0.1-0.2,0.2-0.2,0.3c0,0.1-0.1,0.2-0.1,0.4s0,0.2,0.1,0.4c0,0.1,0.1,0.2,0.2,0.3c0.8,0.8,1.4,1.7,1.9,2.7
                                c0.4,1,0.6,2.1,0.6,3.3c0,1.1-3.3,2.8-8.4,2.8c-5.2,0-8.4-1.7-8.4-2.8c0-1.1,0.2-2.2,0.6-3.2c0.4-1,1-2,1.8-2.7
                                c0.1-0.1,0.2-0.2,0.2-0.3c0-0.1,0.1-0.2,0.1-0.4c0-0.1,0-0.2-0.1-0.4c0-0.1-0.1-0.2-0.2-0.3C9,15.1,8.8,15,8.7,15
                                c-0.1,0-0.2-0.1-0.4-0.1c-0.1,0-0.2,0-0.4,0.1c-0.1,0-0.2,0.1-0.3,0.2c-1,1-1.7,2.1-2.2,3.3c-0.5,1.3-0.8,2.6-0.8,3.9
                                c0,3,5.3,4.7,10.3,4.7c5,0,10.3-1.6,10.3-4.7c0-1.4-0.3-2.7-0.8-4C24,17.3,23.2,16.1,22.3,15.2z"
                />
                <path
                  d="M15,15.9c1.3,0,2.6-0.4,3.6-1.1c1.1-0.7,1.9-1.7,2.4-2.9c0.5-1.2,0.6-2.5,0.4-3.8c-0.3-1.3-0.9-2.4-1.8-3.4
                                c-0.9-0.9-2.1-1.5-3.4-1.8c-1.3-0.3-2.6-0.1-3.8,0.4c-1.2,0.5-2.2,1.3-2.9,2.4C8.8,6.8,8.4,8.1,8.4,9.4c0,1.7,0.7,3.4,1.9,4.6
                                C11.6,15.2,13.3,15.9,15,15.9z M15,4.7c0.9,0,1.8,0.3,2.6,0.8C18.4,6,19,6.7,19.3,7.6s0.4,1.8,0.3,2.7c-0.2,0.9-0.6,1.7-1.3,2.4
                                c-0.7,0.7-1.5,1.1-2.4,1.3c-0.9,0.2-1.9,0.1-2.7-0.3c-0.9-0.4-1.6-1-2.1-1.7c-0.5-0.8-0.8-1.7-0.8-2.6c0-1.2,0.5-2.4,1.4-3.3
                                C12.6,5.2,13.8,4.7,15,4.7z"
                />
              </g>
            </svg> -->
          </button>
          <div
            class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 z-30"
          >
            <div
              class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              aria-labelledby="headlessui-menu-button-1"
              id="login-dropdown-ctrl"
              role="menu"
            >
              <div class="px-4 py-3 ">
                <p class="text-sm leading-5 z-50 text-gray-900">Signed in as</p>
                <p class="text-sm font-medium leading-5 text-gray-900 truncate">
                  {{ session.wallet }}
                </p>
              </div>
              <div class="py-1">
                <a
                  href="javascript:;"
                  @click="goMypage"
                  tabindex="0"
                  class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                  role="menuitem"
                  >My Page</a
                >
                <!-- <a href="javascript:void(0)" tabindex="1" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Wallet List</a>
                    <span role="menuitem" tabindex="-1" class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50" aria-disabled="true">New feature (soon)</span>
                    <a href="javascript:void(0)" tabindex="2" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Edit Profile</a></div> -->
                <div class="py-1">
                  <a
                    href="javascript:void(0)"
                    @click="onSignOut"
                    tabindex="3"
                    class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                    >Sign out</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- addr:{{addr}}
session: {{ session }} -->
    </div>
    <!-- <button @click="test()" >test</button>  -->
    <!-- <ParulaWallet v-bind:isHiddens="isHidden" /> -->
    <!-- <ParulaSignup /> -->
    <!-- <ParulaWallet /> -->
    <!-- <TermsOfService /> -->
    <!-- <WalletSignup
      v-bind:isHiddens="hideSignup"
      v-bind:isLogins="isLogin"
      v-on:changeHidden="onSignupColse" 
    />-->
    <!-- <WalletLogin  v-bind:isLogins="isLogin" v-on:changeHidden="onSignupColse"/> -->
  </div>
</template>
<script>
import detectEthereumProvider from "@metamask/detect-provider";

import ParulaLogin from "./ParulaLogin.vue";
import ParulaSignup from "./ParulaSignup.vue";
import ParulaWallet from "./market/ParulaWallet.vue";
// import TermsOfService from "./TermsOfService.vue"
// import Profile from "./Profile.vue"
// import ResetPassword from "./ResetPassword.vue"
// import WalletSignup from "../pages/authority/sub/WalletSignup.vue";
// import WalletLogin from "../pages/authority/subs/WalletLoginForm.vue";
import Web3 from "web3";
import UserService from "../services/user.service.js";
import WalletService from "../services/wallet.service.js";

import SessionService from "../services/session.service.js";
import pic from '@/assets/img/mymape_user.png'

$(function() {
  var burger = $(".menu-trigger");

  burger.each(function(index) {
    var $this = $(this);

    $this.on("click", function(e) {
      e.preventDefault();
      $(this).toggleClass("active-" + (index + 1));
      $(".header-navi").toggleClass("active-" + (index + 2));
    });
  });
});

export default {
  computed: {
    web3() {
      // return this.$store.state.web3
      //
      let web3 = new Web3(window.web3.currentProvider);
      return web3;
    },
  },
  //  created: function() {
  //     UserService.list().then(
  //         res=>{
  //             console.log("resinfo", res)
  //             console.log("resinfo", res.data)
  //             // console.log(itemlist)
  //         }
  //     )
  // },
  // created:function() {
  //     this.isLogin = localStorage.getItem('isLogin');
  //     console.log('this.isLogin',this.isLogin)
  //     this.addr = web3.currentProvider.selectedAddress //로그인 할 주소
  //     console.log('addr::'+this.addr)
  //     WalletService.walletCheck(this.addr).then(res=>{//해당주소 가입여부 확인
  //     console.log('checkLogin 결과:',res)
  //     const account= res.data[0].account //res결과의 주소 null아니면 가입되어있다.
  //     //가입여부 확인
  //     if(account==null) {
  //         console.log('미가입지갑주소')
  //         this.isSigned = false //미가입 아이디
  //         this.isLogin= false
  //         this.addIsLogin()
  //     }else{
  //         console.log('가입지갑주소')
  //         this.isSigned = true // 가입한 아이디
  //     }
  //     console.log('account::'+account)

  //     //로그인 여부 확인
  //      if(this.addr==account && this.isSigned ==true) {
  //           console.log('실행1')
  //           this.isLogin=true //로그인글이 안보이고 로그인 상태로 변경
  //         //  this.saveAddr(account)
  //           this.addIsLogin()
  //          }else {
  //           console.log('실행2')
  //           console.log('isLogin::'+this.isLogin)
  //           this.isLogin=false //미로그인상태
  //           console.log('isLogin::'+this.isLogin)
  //           this.addIsLogin()
  //         }
  //     console.log('created  끝::')
  // })},
  created: function() {},
  mounted: function() {
    this.startLogin();
  },
  components: {
    ParulaLogin,
    ParulaSignup,
    ParulaWallet,
    // TermsOfService,
    // WalletSignup,
    // WalletLogin,
  },
  data: function() {
    return {
      installWallet: false,
      addr: "",
      providerAddr: "",
      selectedChainId: 0x00,
      hideSignup: true,
      isLogin: false, //로그인 여부 확인값
      loginStatus: "notinstalled",
      isSigned: false, // 미가입
      metaConnected: false,
      session: {
        lastTime: null,
        address: null,
        name: null,
        avata: null,
      },
      pic : pic
    };
  },
  props: {
    isChoicedMarketIds: String,
    isHiddens: String,
    LoginAddrs: String,
  },

  methods: {
    openInstallWallet() {
      this.installWallet = !this.installWallet;
      //   console.log("this.installWallet ==> ", this.installWallet);
    },

    closeInstallWallet() {
      this.installWallet = false;
      //   console.log("this.installWallet ==> ", this.installWallet);
    },
    goMypage() {
      location.href = window.origin + "/mypage.html";
    },
    test() {
      const session = SessionService.loadSession();
      console.log("session:::", session);
    },
    handleChainChainged: function(_chainId) {
      this.selectedChainId = _chainId;
      console.log("handleChainChainged::", _chainId);
    },
    handleAccountsChanged: function(accounts) {
      console.log("handleAccountsChanged::", accounts);
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== this.providerAddr) {
        this.providerAddr = accounts[0];
        // Do any other work!
      }
    },
    testWorks: async function() {
      const provider = await detectEthereumProvider();
      console.log("provider", provider);
    },
    onSignOut: function() {
      SessionService.logout();
      setTimeout(function() {
        location.reload();
      }, 300);
      
      document.location.href = "/";
    },
    startLogin: async function() {
      const provider = await detectEthereumProvider();
      // console.log("provider::", provider)
      if (provider === null) {
        this.loginStatus = "notinstalled";
        // this.loginStatus = 'authorized';
        // var res = confirm("MetaMask is not installed! \nWould you like to install matamask?");
        //     if(res){
        //         // window.location.href ='https://metamask.io/download.html'
        //         window.open('https://metamask.io/download.html', '_blank')
        //     }
        console.log("not installed");
        return;
      }

      this.session = SessionService.loadSession();
      console.log("header session:::", this.session);

      if (Object.keys(this.session).length < 1) {
        console.log("비로그인");
        this.loginStatus = "unauthorized";
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        //this.addr = web3.currentProvider.selectedAddress //로그인 할 주소
        this.addr = accounts[0];
        if (SessionService.valid(this.addr)) {
          console.log("로그인 상태");
          this.loginStatus = "authorized";
          console.log("로그인 상태this.addr", this.addr);
          this.saveAddr(this.addr);
        } else {
          console.log("로그아웃 상태");
          this.loginStatus = "unauthorized";
        }
      }
      // 체인변경이벤트 등록
      ethereum.on("chainChanged", this.handleChainChainged);
      ethereum.on("accountsChanged", this.handleAccountsChanged);

      return;
    },
    caseNotRegistered: function() {
      var res = confirm(`${this.addr} \n is not registered! Would you like to sign up? \n\n\
If you have a registered account, please change the provider's wallet`);
      if (res) {
        this.isLogin = false;
        this.hideSignup = false;
      }
    },
    caseExpired: function(acc) {
      var res = confirm(`${this.addr} \n is expired \nWold you like to login`);
      if (res) {
        this.caseConnectWallet(acc);
      }
    },
    caseNotMatchAddr: function(acc) {
      var res = confirm(`session is expired \nWold you like to login`);
      if (res) {
        // this.isLogin = false;
        // this.hideSignup = false;
        this.caseConnectWallet(acc);
      }
    },
    caseConnectWallet: async function(acc) {
      console.log("caseConnectWallet!!!!");
      if (typeof window.ethereum !== "undefined") {
        ethereum.eth_requestAccounts;
        const connetWallet = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("connect 111", connetWallet);
        //    console.log('this.isLogin', this.isLogin)
        console.log("this.isLogin", this.isLogin); //로그인완료 알림창 필요
        this.metaConnected = true;
        this.isLogin = true;

        //세션정보 저장
        SessionService.setItems({
          platform: this.selectedChainId,
          wallet: connetWallet[0],
          nickname: acc.nickname,
          avatar: acc.avatar
        });
        // this.addIsLogin()
        //nextLogic();
        // window.location.href ='../'
        document.location.href = "/";
        return connetWallet;
      }
    },
    caseLogined() {
      this.isLogin = true;
      this.hideSignup = true;
    },
    caseLoginedAndClick: function() {
      this.isLogin = true;
      this.hideSignup = true;
      // this.addIsLogin()
      console.log(" this.addIsLogin()");
      location.href = "/mypage.html";
    },
    clickLogin: function() {
      WalletService.walletCheck(this.addr).then((hasAddr) => {
        //해당주소 가입여부 확인
        // console.log('checked 결과:',hasAddr)
        const account = hasAddr.data[0].account;
        console.log("account:", account);
        if (account === null) {
          console.log("등록된 계정이 없음");
          this.caseNotRegistered();
        } else {
          if (this.session.address === account) {
            if (SessionService.isExpired(this.session.lastTime)) {
              console.log("유효기간이 만료됨");
              this.caseExpired(hasAddr.data[0]);
            } else {
              console.log("로그인된 고객");
              this.caseLoginedAndClick();
            }
          } else {
            console.log("계정정보가 맞지 않음");
            this.caseNotMatchAddr(hasAddr.data[0]);
          }
        }
      });

      return;
      console.log("this.isHidden", this.isHidden);
      // this.isHidden= !this.isHidden;
      if (this.hideSignup == true) {
        //가입된 사람
        //  this.hideSignup = true
        this.isLogin = true;
        this.addIsLogin();
        console.log(" this.addIsLogin()");
        location.href = "/mypage.html";
      } else {
        this.hideSignup = false;
      }

      //여기서 if문으로 데이터
    },
    saveAddr: function(addr) {
      console.log("addr222::", addr);
      this.$emit("saveAddr", addr);
    },
    onSignupColse: function() {
      this.hideSignup = true;
    },

    // 사용하지 않는것으로 판단하여 주석처리 210917 전진형
    // checkLogin: function() {
    //   console.log("checkLogin시작");
    //   // this.isHidden= !this.isHidden;
    //   this.addr = web3.currentProvider.selectedAddress; //로그인 할 주소
    //   console.log("addr::" + this.addr);

    //   const self = this;
    //   WalletService.walletCheck(this.addr)
    //     .then((hasAddr) => {
    //       //해당주소 가입여부 확인
    //       console.log("checkLogin 결과:", hasAddr);
    //       const account = hasAddr.data[0].account; //res결과의 주소 null아니면 가입되어있다.
    //       console.log("account::" + account);

    //       if (this.addr == account) {
    //         console.log("연결주소와 가입주소가 같을경우 =>바로 로그인");

    //         if (this.session.address === account) {
    //           if (SessionService.isExpired(this.session.lastTime)) {
    //             console.log("유효기간이 만료됨");
    //             this.caseExpired(hasAddr.data[0]);
    //             // this.caseConnectWallet(hasAddr.data[0])
    //           } else {
    //             console.log("로그인된 고객");
    //             this.caseLogined();
    //           }
    //         } else {
    //           console.log("계정정보가 맞지 않음");
    //           this.caseNotMatchAddr(hasAddr.data[0]);
    //           // this.caseConnectWallet(hasAddr.data[0])
    //         }

    //         //     return new Promise(function(resolve, reject){//가입되었으면 메타마스크 연결(미연결시에만)
    //         //     if (typeof window.ethereum !== 'undefined') {
    //         //     ethereum.eth_requestAccounts
    //         //     const connetWallet = window.ethereum.request({
    //         //       method: 'eth_requestAccounts'
    //         //     })
    //         //     console.log("connect 111")
    //         // //    console.log('this.isLogin', this.isLogin)
    //         //    console.log('self.isLogin', self.isLogin) //로그인완료 알림창 필요
    //         //    self.metaConnected = true
    //         //    self.isLogin=true
    //         //    self.addIsLogin()
    //         //    //nextLogic();
    //         //    resolve(connetWallet)

    //         // }})
    //       } else {
    //         //
    //         // console.log(this.hideSignup);
    //         // this.hideSignup= false;
    //         console.log("다를 경우 가입진행");
    //         this.caseNotRegistered();
    //       }
    //       console.log("account::" + account);
    //       console.log("this.metaConnected::" + this.metaConnected);
    //       console.log("this.isLogin::" + this.isLogin);
    //       // this.isLogin=true
    //       if (this.metaConnected == true && this.isLogin == true) {
    //         console.log(res);
    //         window.location.reload();
    //       }
    //     })
    //     .then((res) => {
    //       //로그인후 리로드
    //     })
    //     .catch((e) => {
    //       // alert('error')
    //     });
    //   console.log("checkLogin끝");
    // },

    // addIsLogin(addr, name, avata) {
    //   localStorage.setItem("isLogin", this.isLogin);
    //   console.log("addIsLogin실행");
    //   // SessionService.setItem(addr, name, 'https://i.pravatar.cc/300?img=19')
    // },

    //   nonShow:function() {
    //     this.isHidden= true;
    //   }
  },
};
</script>
<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}

/* #login{
    width:200px;
    height:100px;
    background: #ccc;
    line-height:100px;
    border-radius: 15px;
    font-size: 25px;
    position: absolute;
    right:0;
    top:0;
    z-index: 999999;
} */
/* .logo-title {
    display:-webkit-box;
    margin-top:25px;
}
.logo-title > img:nth-child(1) {
    width:50px;
    height:auto;
}
.logo-title > img:nth-child(2) {
    width:100px;
    height:auto;
} */
/* .header {
    width:100%;
    height: 100px;
    display:-webkit-box;
    justify-content: space-between;
    line-height:100px;
} */
/* .header > div {
    flex:auto;
    text-align: center;
} */
/* .header svg {
    margin: 0 auto;
} */
.header-user {
  margin-right: 2%;
  z-index: 999999;
}

/* .header-logo {
    height: 100%;
    margin-left:2%;
}


.header-navi{
    width: 30%;
    display: grid;
    grid-auto-flow: column;
    margin-left:23%;
}
.header-navi > a {
    text-align: center;
}
.header-navi a:last-child{
    margin-right:15%;
}

.header-navi > a:hover {
    color: blue;
    z-index: 99999999;
}


.header-navi {
  list-style: none;
  display: inline-block;
  display: grid;
  gap:10%;
}
.header-navi a {
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: 0.7s all;
  text-transform: uppercase;
} */
/* .header-navi a:before {
  content: '';
  width: 20px;
  position: absolute;
  border-bottom: 8px solid #313131;
  bottom: 0;
  right: 20vw;
  transition: 0.7s all;
}
.header-navi a:hover:before {
  right:0px;
} */
/* button > h1 {
    margin-right:1%;
} */
/* .header-navi > button {
    position:absolute;
    right:0;
}
 */

.mobile {
  display: none;
}
/* body {
	background-color: #333;
	width: 500px;
	margin: 30px auto;
} */
.menu-trigger {
  position: absolute;
  top: 10%;
  right: 5%;
  /* margin-right: 70px;
	margin-bottom: 50px; */
}
.menu-trigger,
.menu-trigger span {
  display: inline-block;
  transition: all 0.4s;
  box-sizing: border-box;
}

.menu-trigger {
  width: 20px;
  height: 20px;
}

.menu-trigger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #000;
  border-radius: 4px;
}

.menu-trigger span:nth-of-type(1) {
  top: 0;
}

.menu-trigger span:nth-of-type(2) {
  top: 8px;
}

.menu-trigger span:nth-of-type(3) {
  bottom: 0;
}

/* type-01 */
/* 중앙 라인이 고정된 자리에서 투명하게 사라지며 상하라인 회전하며 엑스자 만들기 */
.menu-trigger.active-1 span:nth-of-type(1) {
  -webkit-transform: translateY (10px) rotate (-45deg);
  transform: translateY(5px) rotate(-45deg);
}

.menu-trigger.active-1 span:nth-of-type(2) {
  opacity: 0;
}

.menu-trigger.active-1 span:nth-of-type(3) {
  -webkit-transform: translateY(-11px) rotate(45deg);
  transform: translateY(-11px) rotate(45deg);
}

@media screen and (max-width: 400px) {
  .header-logo {
    height: unset;
  }

  .header {
    display: block;
    height: 55px;
  }
  .logo-title {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 150px;
  }
  .header-navi {
    width: 100%;
    height: 0;
    background: #ccc;
    z-index: 999999;
    position: relative;
    display: inline-block;
    opacity: 0;
    top: 0;
    transition: all 0.6s ease-in-out;
  }
  .header-navi > a {
    margin-left: 5%;
    margin-right: 5%;
    width: 50px;
  }
  .header-user {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10%;
  }
  .header-navi a:before {
    display: none;
  }
  .active-2 {
    height: 150px;
    /* display: inline-block; */
    transition: all 0.6s ease-in-out;
    opacity: 1;
  }
}</style
>>
