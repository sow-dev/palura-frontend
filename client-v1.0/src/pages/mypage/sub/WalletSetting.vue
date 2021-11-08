<template>
<TransitionRoot as="template" :show="open">
<Dialog as="div" class="fixed inset-0 overflow-hidden z-50" @close="open = false">
    <div class="absolute inset-0 overflow-hidden">
    <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </TransitionChild>
    <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
        <div class="relative w-screen max-w-md">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
            <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                <span class="sr-only">Close panel</span>
                <div class="h-6 w-6" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd" />
                    </svg>
                </div>
                </button>
            </div>
            </TransitionChild>
            <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
            <div class="px-4 sm:px-6">
                <DialogTitle class="text-lg font-medium text-gray-900">
                WALLET SETTING
                </DialogTitle>
            </div>
            <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <div v-if="addData.status=='none'" class="mt-3 w-full flex bg-white shadow-lg">
                    <input v-model="target_wallet"
                        class="w-full rounded-l-sm p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                        placeholder="0x" />
                    <button @click="onAddWallet()"
                        class="px-8 rounded-r-sm bg-gray-800  text-white font-bold p-2 uppercase border-gray-800 border-t border-b border-r">add</button>
                </div>

                <!--
                    //none wait signed wait
                    addData
                status:false,
                signer:'0x',
                signed:'signed',
                raw_data:'raw_data -->
                <div v-else-if="addData.status== 'signed'" class="mt-3 p-2 w-full flex flex-col bg-white shadow-lg space-y-2">
                    <div class="">
                        <label class="block text-xs text-parula-gray-1">Signer</label>
                        <div class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                            <span class="text-sm">{{addData.signer}}</span>
                        </div>
                    </div>
                    <div class="">
                        <label class="block text-xs text-parula-gray-1">Raw data</label>
                        <div class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                            <span class="text-sm">{{addData.raw_data}}</span>
                        </div>
                    </div>
                    <div class="">
                        <label class="block text-xs text-parula-gray-1">Signed data</label>
                        <div class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                            <p class="text-sm break-all">{{addData.signed}}</p>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button @click="onVerifyWallet()"
                            class="px-8 rounded-r-sm bg-gray-800  text-white font-bold p-2 uppercase border-gray-800 border-t border-b border-r">
                            Verify Address
                        </button>
                    </div>
                </div>

                <div v-else-if="addData.status=='loading'" class="mt-3 p-2 w-full flex flex-col bg-white shadow-lg space-y-3">
                    <div class="h-2 w-10  bg-parula-gray-2 animate-pulse rounded-lg"></div>
                    <div class="w-full h-8 py-1 animate-pulse bg-parula-gray-2 rounded"></div>
                    <div class="h-2 w-10  bg-parula-gray-2 animate-pulse rounded-lg"></div>
                    <div class="w-full h-8 py-1 animate-pulse bg-parula-gray-2 rounded"></div>
                    <div class="h-2 w-10  bg-parula-gray-2 animate-pulse rounded-lg"></div>
                    <div class="w-full h-8 py-1 animate-pulse bg-parula-gray-2 rounded"></div>

                    <div class="flex justify-end">

                        <div class="w-20 h-5 rounded-xl bg-parula-gray-2  animate-pulse">
                        </div>
                    </div>
                </div>
                <h1 class="mt-5 underline text-gray-600 font-light text-sm">Wallet list</h1>
                <div class="w-full flex justify-center">
                    <div class="bg-white shadow-lg rounded-sm w-full">
                        <ul class="divide-y divide-gray-300">
                            <li v-for="i in ds" v-bind:key="i.account" class="p-4 hover:bg-gray-50 cursor-pointer">
                                <div class="flex flex-row justify-between">
                                    <div class="flex flex-col text-xs">
                                        <span>{{i.alias1}}</span>
                                        <span>{{i.account}}</span>
                                    </div>
                                    <div class="flex flex-row text-xs ">
                                        <div @click="onClipboard(i.account)" class="text-gray-500 hover:text-black">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                            </svg>
                                        </div>
                                        <!-- <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div> -->
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>



            </div>
        </div>
        </TransitionChild>
    </div>
    </div>
</Dialog>
</TransitionRoot>
</template>

<script>

import Web3 from "web3";
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

import SessionService from '../../../services/session.service'
import WalletService  from '../../../services/wallet.service'
export default {
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    },
    setup() {
        const open = ref(false)
        return {
            open
        }
    },
    data: function () {
        return {
            ds: [],
            target_wallet: '',

            addData: {
                status: 'none',
                signer: '0x',
                signed: 'signed',
                raw_data: 'raw_data',
            }
        }
    },
    props: {
        userInfos: {}
    },
    methods: {
        show() {
            this.open = true;
            this.onLoad()
        },
        onLoad() {
            console.log(WalletService)
            WalletService.list(this.userInfos.id).then(res => {
                console.log(res)
                this.ds = res.data.items
            }).catch(
                err => {
                    // alert(err)
                })
        },
        onClipboard(_addr) {
            var tempElem = document.createElement('textarea');
            tempElem.value = _addr;
            document.body.appendChild(tempElem);

            tempElem.select();
            document.execCommand("copy");
            document.body.removeChild(tempElem);
        },
        onAddWallet() {
            this.addData.status = 'loading'
            if (this.target_wallet.length < 40) {
                alert('Invalid wallet address.')
                this.addData.status = 'none'
                return
            }
            //method account timestamp
            const login_wallet = SessionService.loginWallet();
            // alert('logined:'+login_wallet)
            
            const msgParams = `add_wallet ${this.target_wallet} ${ Date.parse(new Date()) }`

            if (typeof window.ethereum !== 'undefined') {
                ethereum.eth_requestAccounts
                const connetWallet = window.ethereum.request({
                    method: 'eth_requestAccounts'
                })
            }
            ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {login_wallet} }],
                })
                .then((permissions) => {
                    const accountsPermission = permissions.find(
                        (permission) => permission.parentCapability === 'eth_accounts'
                    );
                    if (accountsPermission) {
                        console.log('eth_accounts permission successfully requested!');
                    }
                })
                .catch((error) => {
                    if (error.code === 4001) {
                        console.log('Permissions needed to continue.');
                    } else {
                        console.error(error);
                    }
                });

            let web3 = new Web3(window.web3.currentProvider)
            let strMethod = 'personal_sign'

            let paramVals = [msgParams, login_wallet]
            console.log('params:', strMethod, paramVals, login_wallet)

            web3.currentProvider.send(strMethod, paramVals).then(res => {
                console.log('서명결과:', res)
                this.addData.signer = login_wallet
                this.addData.raw_data = msgParams
                this.addData.signed = res.result
                this.addData.status = 'signed'
            }).catch(e => {
                this.addData.status = 'none'
            })
        },
        onVerifyWallet() {
            this.addData.status = 'loading'
            if (this.target_wallet.length < 40) {
                alert('Invalid wallet address.')
                this.addData.status = 'none'
                return
            }

            if (typeof window.ethereum !== 'undefined') {
                ethereum.eth_requestAccounts
                const connetWallet = window.ethereum.request({
                    method: 'eth_requestAccounts'
                })
            }

            // ethereum.request({
            //         method: 'wallet_requestPermissions',
            //         params: [{ eth_accounts: {} }],
            //     })
            //     .then((permissions) => {
            //         const accountsPermission = permissions.find(
            //             (permission) => permission.parentCapability === 'eth_accounts'
            //         );
            //         if (accountsPermission) {
            //             console.log('eth_accounts permission successfully requested!');
            //         }
            //     })
            //     .catch((error) => {
            //         if (error.code === 4001) {
            //             console.log('Permissions needed to continue.');
            //         } else {
            //             console.error(error);
            //         }
            //     });
                
            
            // alert('logined:'+login_wallet)
            const msgParams = `verify_wallet ${this.target_wallet} ${Date.parse(new Date())}`

            if (typeof window.ethereum !== 'undefined') {
                ethereum.eth_requestAccounts
                const connetWallet = window.ethereum.request({
                    method: 'eth_requestAccounts'
                })
            }

            let web3 = new Web3(window.web3.currentProvider)
            let strMethod = 'personal_sign'
            
            let paramVals = [msgParams, this.target_wallet]
            console.log('params:', strMethod, paramVals, this.target_wallet)

            web3.currentProvider.send(strMethod, paramVals).then(res => {
                console.log('verify 서명결과:', res)
                // this.addData.signer = login_wallet
                // this.addData.raw_data = msgParams
                // this.addData.signed = res.result
                this.addData.status = 'none'

                const self = this;
                const networkId = web3.eth.net.getId();
                const chainid = web3.eth.getChainId()
                const userId = SessionService.getUserId();

                console.log(networkId,
                    this.target_wallet, userId,
                    chainid, 'alias1', 'alias2', 'avata', 'tag',
                    this.addData.signer, this.addData.raw_data, this.addData.signed,
                    msgParams, res.result)
                WalletService.walletSignedAdd(networkId,
                    self.target_wallet, userId,
                    chainid, 'alias1', 'alias2', 'avata', 'tag',
                    self.addData.signer, self.addData.raw_data, self.addData.signed,
                    msgParams, res.result).then(res=>{
                        self.onLoad();
                    }).catch(e=>{
                        this.addData.status = 'none'
                        alert(e)
                    })

                this.onLoad();
            }).catch(e => {
                this.addData.status = 'none'
            })
        }
    }
}
</script>

<style scoped>
</style>