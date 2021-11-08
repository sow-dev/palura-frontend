<template>
<div>
    <div class="grid ">
        <div class="intro-y col-span-12 lg:col-span-6">
            <!-- BEGIN: Form Layout -->
            <div class="intro-y box p-5">
                <div class="mt-3">
                    <label for="name" class="form-label">Name</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.name" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="type" class="form-label">Type</label>
                    <!-- <input id="type" type="text" class="form-control w-full" v-model="ds.type"
                        placeholder="" /> -->

                    <select name="type"  class="form-control w-full" v-model="ds.type">
                        <option value="nft">NFT</option>
                        <option value="nft_exchange">Exchange</option>
                        <option value="asset">Asset</option>
                    </select>
                </div>
                 <div class="mt-3">
                    <label for="network_id" class="form-label">Blockchain</label>
                    <BlockchainSelector id="network_id" class="form-control" v-model="ds.blockchain_id"  />
                </div>
                <div class="mt-3">
                    <label class="form-label"></label>
                    <div class="sm:grid grid-cols-2 gap-2">
                        <!-- <div class="input-group">
                            <div id="input-group-3" class="input-group-text">blockchain_id</div>
                            <input type="text" class="form-control" v-model="ds.blockchain_id" placeholder=""
                                aria-describedby="input-group-3" />
                        </div> -->
                        <div class="input-group">
                            <div id="input-group-3" class="input-group-text">version</div>
                            <input type="text" v-model="ds.version" class="form-control" placeholder=""
                                aria-describedby="input-group-3" />
                        </div>
                    </div>
                </div>
                
                <div class="mt-3">
                    <label for="address" class="form-label">address</label>
                    <input id="address" type="text" class="form-control w-full" v-model="ds.address"
                        placeholder="" />
                </div>
               
                <div class="mt-3">
                    <label for="options" class="form-label">options</label>
                    <input id="options" type="text" class="form-control w-full" v-model="ds.options"
                        placeholder="0x" />
                </div>
                <div class="mt-3">
                    <label>Enable</label>
                    <div class="mt-2">
                        <input type="checkbox" class="form-check-switch" v-model="ds.enable" />
                    </div>
                </div>
                <!-- <div class="mt-3">
                    <label>Description</label>
                    <div class="mt-2">
                        <CKEditor v-model="ds.description" :editor="classicEditor" :config="simpleEditorConfig" />
                    </div>
                </div> -->
            </div>
            <!-- END: Form Layout -->
        </div>
    </div>
</div>
</template>

<script >
import BlockchainSelector from '../blockchain/BlockchainSelector.vue'
export default {
    components:{
        BlockchainSelector
    },
    props: {
        ds: {
            blockchain_id:Number, type:String, name:String, symbol:String, address:String, fee:Number, version:Number, options:String, enable:Boolean
        },
    },
    methods: {}
}
</script>
