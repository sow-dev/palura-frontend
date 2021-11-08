<template>
  <div class="w-full">
    <div class="p-10">
      <div class="h-1/2 block"></div>
      <div class="text-lg">
        <a href="#" class="underline  mr-3 font-semibold">LOG IN</a>
        <!-- <a href="#" class="no-underline hover:underline ">LOGIN</a> -->
      </div>
      <div class="my-5 flex flex-col gap-2 text-sm">
        <p
          class="w-full text-center  py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-900 hover:text-white"
          :class="[
            target == 'metamask'
              ? 'bg-black text-white'
              : 'bg-white text-black',
          ]"
          @click="
            target = 'metamask';
            mMetamask();
          "
        >
          Metamask
        </p>
        <p
          class="w-full text-center  py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-400 hover:text-white"
          :class="[
            target == 'walletconnect'
              ? 'bg-gray-500 text-white'
              : 'bg-white text-black',
          ]"
          @click="target = 'walletconnect'"
        >
          Wallet Connect
        </p>
        <p
          class="w-full text-center  py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-400 hover:text-white"
          :class="[
            target == 'walletlink'
              ? 'bg-gray-500 text-white'
              : 'bg-white text-black',
          ]"
          @click="target = 'walletlink'"
        >
          Wallet Link
        </p>
        <p
          class="w-full text-center  py-1.5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-gray-400 hover:text-white"
          :class="[
            target == 'Kaikas'
              ? 'bg-gray-500 text-white'
              : 'bg-white text-black',
          ]"
          @click="target = 'Kaikas'"
        >
          Kaikas
        </p>
      </div>

      <div>
        <a href="./" class="home text-sm font-semibold"
          ><span class="mr-2">&#60;</span> Back to Home</a
        >
      </div>

      <div class="mt-16 home text-sm font-extralight">
        No Accounts?<a
          href="./login.html?mode=signup"
          class="pl-3 font-semibold hover:underline hover:text-black"
          >Sign Up</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletService from "../services/wallet.service";
import SessionService from "../services/session.service.js";

export default {
  name: "login",
  created: function() {
    this.mode = new URL(location.href).searchParams.get("mode");
  },
  computed: {
    web3() {
      // return this.$store.state.web3
      //
      let web3 = new Web3(window.web3.currentProvider);
      return web3;
    },
  },
  components: {},
  data: function() {
    return {
      target: "",
      mode: "login",
      checkSign: false, //가입여부 확인 데이터(API확인후 반영)
      session: {
        lastTime: null,
        address: null,
        name: null,
        avatar: null,
      },
    };
  },
  props: {},

  methods: {
    close: function() {
      this.$emit("changeHidden");
    },
    next: function() {
      if (this.isMetamask === 1) {
        this.onConnect();
      }
    },
    mMetamask: async function() {
      const provider = await detectEthereumProvider();

      if (provider === null) {
        console.log("not installed");
        return;
      }
      this.session = SessionService.loadSession();
      if (Object.keys(this.session).length < 1){
        console.log("세션정보 없음 -> go signup");

        // method: "eth_accounts" 윈도우에서는 정상작동 하지만, 맥에서 오류 발생함
        // method: "eth_requestAccounts" 윈도우, 맥 둘다 정상 작동함

        // const accounts = await ethereum.request({ method: "eth_accounts" });
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        this.session = {
          lastTime: null,
          address: null,
          name: null,
          avatar: null,
        };
        console.log("this.session:::", this.session);
        this.session.address = accounts[0];
      }
      console.log(" this.session.address:::", this.session.address);
      WalletService.walletCheck(this.session.address).then((hasAddr) => {
        //해당주소 가입여부 확인
        // console.log('checked 결과:',hasAddr)
        const account = hasAddr.data[0].account;
        console.log("account:", account);
        if (account === null) {
          console.log("등록된 계정이 없음--> go signup");
        } else {
          if (this.session.address === account) {
            if (SessionService.isExpired(this.session.lastTime)) {
              console.log("유효기간이 만료됨");
              // this.caseExpired(hasAddr.data[0])
              this.caseConnectWallet(hasAddr.data[0]);
            } else {
              console.log("로그인된 고객");
              // this.caseLoginedAndClick()
              this.caseConnectWallet(hasAddr.data[0]);
            }
          } else {
            console.log("계정정보가 null --> 나올수 있는 경우의 수가 없음");
            //this.caseNotMatchAddr(hasAddr.data[0])
          }
        }
      });
    },
    caseConnectWallet: async function(acc) {
      console.log("caseConnectWallet!!!!");
      if (typeof window.ethereum !== "undefined") {
        ethereum.eth_requestAccounts;
        const connetWallet = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        ethereum.request({ method: "eth_chainId" });
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        //세션정보 저장
        console.log("세션정보 저장");
        SessionService.setItems({
          platform: chainId,
          wallet: connetWallet[0],
          nickname: acc.nickname,
          avatar: acc.avatar,
          userId: acc.user_id
        });

        location.href = "/";
        return connetWallet;
      }
    },
    onConnect: function(event) {
      //1. 지갑주소가 가입되었는지 여부 확인
      //2-1. 가입되어있을때 바로 메타마스크 연결
      //2-2. 가입 안되어있을때
      //3. 프로필 입력컴포넌트

      if (this.checkSign === false) {
        //가입안되었을때
        console.log("this.checkSign" + this.checkSign);

        return;
      } else {
        const msgParams = "hello";
        return new Promise(function(resolve, reject) {
          if (typeof window.ethereum !== "undefined") {
            ethereum.eth_requestAccounts;
            const connetWallet = window.ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log("연결완료");
            resolve(connetWallet);
          }
        })
          .then(async function(connetWallet) {
            // event.preventDefault()
            console.log("연결지갑주소" + connetWallet);
            // const msgParams ='hello'

            let web3 = new Web3(window.web3.currentProvider);
            let strMethod = "personal_sign";
            let from = await web3.eth.getAccounts();
            if (!from[0]) return this.onConnect();

            let paramVals = [msgParams, from[0]];
            console.log("params:", strMethod, paramVals, from[0]);

            // this.web3.currentProvider.sendAsync(method, params, from, function (err, result) {
            //   console.log('result:', result)
            // })

            let res = await web3.currentProvider.send(strMethod, paramVals);

            // let res = await ethereum.request({ method: strMethod , params: paramVals})

            console.log("서명결과:", res);
            res.address = connetWallet;
            return res;
          })
          .then(function(res) {
            console.log("연결지갑주소2" + res);
            let a = JSON.stringify(res);
            console.log(res.address.toString());
            let addr = res.address.toString();
            console.log("a" + a);
            // const paramApi = {
            //   "network":"network",
            //   // "account":res.address,
            //   "account": "0x122feb0fc838540a278ad23a8a5b3b232d476087",
            //   "user_id":"user_id",
            //   "chainid":"chainid",
            //   "alias1":"alias1",
            //   "alias2":"alias2",
            //   "avata":"avata.jpg",
            //   "msg":msgParams,
            //   "sig":res.result,
            //   "tag":"tag"
            // }
            console.log("addr" + addr);
            console.log("res.result.toString()" + res.result.toString());
            // console.log(msgParams[0].name)

            //    //지갑 주소 존재여부확인 없으면 가입해야함
            //     WalletServices.check(addr).then(res=>{
            //       console.log('결과값111:',res)
            //         }).catch(e=>{
            //           alert('error')
            //         })
            //     //지갑정보 insert 회원정보 입력하는 api 이게 입력 되면 check가 값 addr이 null이 아님
            //     WalletServices.insert('network', addr, 'user_id', 'chainid', 'alias1', 'alias2', 'avata.jpg', msgParams, res.result.toString(),'tag').then(res=>{
            //     console.log('결과값:',res)
            //       }).catch(e=>{
            //         alert('error')
            //       })
          });
      }
    },
  },
};
</script>
<style scoped>
.home {
  color: #8a8a8a;
}
</style>
