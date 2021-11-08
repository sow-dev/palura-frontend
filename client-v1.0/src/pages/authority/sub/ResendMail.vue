<template>
    <div class="w-full h-full">
        <div class="w-full items-center">
        <div class="px-5">
            <div class="underline mr-3 font-semibold text-lg">UNCONFIRMED ACCOUNT</div>
            <div class=" mt-5">
               <p class="text-sm Break All">Please check your email
                   If you do not receive an account confirmation email, please check your spam email or resend it.
                </p>
                
            </div>
            <p class="text-red-600 font-light text-sm my-5 transition duration-150 ease-in-out  ">{{error_msg}}</p>
            <div class="w-full flex justify-end my-5">
                <button class="text-center py-1 px-5 text-black transition-colors duration-150 border border-black focus:shadow-outline hover:bg-black hover:text-white" v-on:click="onResend">Resend Mail</button>
            </div>
            <br>
            <a href="javascript:;" @click="onExit" class="text-sm font-semibold">&#60; back</a>
        </div>
         
         </div>
    </div> 
</template>

<script>
import Web3 from "web3";
import WalletService from "../../../services/wallet.service";
export default {
    data: function() {
        return {
            error_msg:"",
        }
    },
     props: {
    },
    components: {
    },
    methods: {
        onExit(){
            this.$emit('onExit')
        },
        async onResend() {
            const permissions = await ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {}
                }],
            })
            console.log('permissions::', permissions)

            const accountsPermission = await permissions.find((permission) => permission.parentCapability === 'eth_accounts');
            console.log("accountsPermission", accountsPermission)
            if (!accountsPermission) {
                console.log('eth_accounts permission successfully requested!');
            }

            let web3 = new Web3(window.web3.currentProvider)
            let from = await web3.eth.getAccounts();
            const login_wallet = from[0]
            console.log("login_wallet::", login_wallet)

            var expireDate = new Date();
            // expire date add 1day
            expireDate.setDate(expireDate.getDate() + 1);
            const msgParams = `resend_confirm_mail ${login_wallet} ${ Date.parse(expireDate) }`

            let strMethod = 'personal_sign'

            let paramVals = [msgParams, login_wallet]
            console.log('params:', strMethod, paramVals, login_wallet)

            const res = await web3.currentProvider.send(strMethod, paramVals);
            const signature = res.result;
            
            WalletService.resendMail(login_wallet, msgParams, res.result).then(res=>{
                console.log('res::', res)
                this.error_msg = '';
                alert('resend mail complete')
                location.href = "/";


            }).catch(error=>{
                this.error_msg = error
                if(error.response && error.response.data)
                    this.error_msg = error.response.data
            })


            // if(this.checkedNames.length == 2) {
            //     console.log('this.checkedNames.length '+this.checkedNames.length)
            //     this.$emit('onNext')
            //     return 
            // } else {
            //     this.error_msg = "*Required consent is required to continue."
            // }
        },
    }
}
</script>
<style scoped>
</style>