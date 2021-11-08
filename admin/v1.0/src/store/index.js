// import Vue from 'vue'
import { createStore } from 'vuex'
import { Counter } from "@/store/modules/Counter";
import { moduleA } from "@/store/modules/moduleA";

import main from './main'
import sideMenu from './side-menu'
import simpleMenu from './simple-menu'
import topMenu from './top-menu'



// import web3 from 'vuex-web3';
// import state from './state';
// import getWeb3 from '../util/getWeb3';
// Vue.use(Vuex)

// let getWeb3 = new Promise((resolve, reject) => {
//   var web3js = window.web3;
//   if(typeof web3js !== 'undefined') {
//     let web3 = new Web3(web3js.currentProvider);
//     resolve({
//       // injectedWeb3: web3.isConnected(),
//       injectedWeb3: web3.eth.getAccounts(),
//       web3 () {
//         console.log("web33"+web3);
//         return web3;
//       }
//     });
//     // console.log("web33"+web3);/////////
//     // return web3
//   } else {
//     // reject(new Error('Unable to connect to Metamask'));
//     console.log("web3js"+web3js);
//      return web3js
//   }
// }).then(result => {
//   return new Promise((resolve, reject) => {
//     console.log("현종")
//     result.web3().version.getNetwork((err, networkId) => {
//       if(err) {
//         reject(new Error('Unable to retrieve network ID'));
//         console.log("현종1")
//       } else {
//         result = Object.assign({}, result, { networkId });
//         resolve(result);
//         console.log("현종2")
//       }
//     });
//   });
// }).then(result => {
//   return new Promise((resolve, reject) => {
//     result.web3().eth.getCoinbase((err, coinbase) => {
//       if(err) {
//         console.log("현종3")
//         reject(new Error('Unable to retrieve coinbase'));
//       } else {
//         result = Object.assign({}, result, { coinbase });
//         resolve(result);
//         console.log("현종4")
//       }
//     });
//   });
// }).then(result => {
//   return new Promise((resolve, reject) => {
//     result.web3().eth.getBalance(result.coinbase, (err, balance) => {
//       if(err) {
//         reject(new Error(`Unable to retrieve balance for addres: ${result.coinbase}`))
//       } else {
//         result = Object.assign({}, result, { balance });
//         resolve(result);
//       }
//     });
//   });
// });

export const store = createStore({
  // state:{
  //   web3: {
  //     isInjected: false,
  //     web3Instance: null,
  //     networkId: null,
  //     coinbase: null,
  //     balance: null,
  //     error: null,
  //   },
  //   contractInstance: null,
  //   aa:'1'
  // },

  // state: {
  //   counter: 10
  // },

  // getters: {
  //   time2(state) {
  //     return state.counter * 2;
  //   }
  // },
  
  // modules: {
  //   web3
  // },
  modules: { 
    Counter, 
    moduleA,
    main,
    sideMenu,
    simpleMenu,
    topMenu
  },
  mutations: {

     setCounter(state, value) {
      state.counter = value;
    },


     increment (state) {
      state.count++
    },
  //   registerWeb3Insctance (state, payload) {
  //   console.log('0000')
  //    console.log('registerWeb3instance Mutation being executed', payload);
  //    let result = payload;
  //    console.log('1')
  //    let web3Copy = state.web3;
  //    web3Copy.coinbase = result.coinbase;
  //    web3Copy.networkId = result.networkId;
  //    web3Copy.balance = parseInt(result.balance, 10);
  //    web3Copy.isInjected = result.injectedWeb3;
  //    web3Copy.web3Instance = result.web3;
  //    state.web3 = web3Copy;
  //  }
  },
  actions: {
  //    async registerWeb3 ({ commit }) {
  //    console.log('registerWeb3 Action being executed');
  //    try {
  //     //  console.log('3333')
  //      let result = await getWeb3;
  //      console.log("result "+result)
  //      console.log('registerWeb3Insctance', result);
  //      commit('registerWeb3Insctance', result);
  //       console.log('1111')
  //    } catch (err) {
  //      console.log('error in action registerWeb3', err);
  //    }
  //  },
    // globalAction: {
    //   handler({ commit }) {
    //     commit("setCounter", 199);
    //   }
    // }   
  },
})

export function useStore() {
  return store
}

export default store