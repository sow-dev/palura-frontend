<template>
<div>
  <div class="grid ">
    <div class="intro-y col-span-12 lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <div class="intro-y box p-5">
        <div class="mt-3" v-if="assetBinder.mode=='add'">
          <label for="blockchain_id" class="form-label">Network</label>
          <BlockchainSelector id="blockchain_id" class="form-control" v-model="assetBinder.blockchain_id"  />
        </div>

        <div class="mt-3" v-if="assetBinder.mode=='add'">
          <label for="asset-address" class="form-label">Address</label>
          <input id="asset-address" type="text" class="form-control w-full" v-model="assetBinder.address"
            placeholder="0x" />
        </div>

        <div class="mt-3" v-if="assetBinder.mode=='add'">
          <label for="type" class="form-label">Asset Type</label>
          <select class="form-select form-select sm:mt-2 sm:mr-2" aria-label=".form-select type" v-model="assetBinder.type">
            <option value="coin">coin</option>
            <option value="erc20">erc20</option>
            <option value="erc721">erc721</option>
            <option value="erc1155">erc1155</option>
          </select>
        </div>

        <div class="mt-3">
          <label for="symbol" class="form-label">Symbol</label>
          <input id="symbol" type="text" class="form-control w-full" v-model="assetBinder.symbol"
            placeholder="Symbol" />
        </div>

        <div class="mt-3">
          <label for="asset-address" class="form-label">Logo Image</label>
          <input id="asset-address" type="text" class="form-control w-full" v-model="assetBinder.img"
            placeholder="logo url" />
        </div>

        <div class="mt-3">
          <label for="asset-address" class="form-label">Logo Thumbnail</label>
          <input id="asset-address" type="text" class="form-control w-full" v-model="assetBinder.thumbnail"
            placeholder="image url" />
        </div>

        <div class="mt-3">
          <div class="mt-2">
            <label for="asset-decimals" class="form-label">Decimals</label>
            <input id="asset-decimals" type="number" step=1 
              class="form-control w-full" v-model="assetBinder.decimals"
              onchange="this.value=parseInt(this.value); if(this.value>18)this.value=18; if(this.value<0)this.value=0;" 
              placeholder="0" />
          </div>
        </div>


        <div class="mt-3">
          <label>Enable</label>
          <div class="mt-2">
            <input type="checkbox" class="form-check-switch" v-model="assetBinder.enable" />
          </div>
        </div>
        <!-- <div class="mt-3">
          <label>Description</label>
          <div class="mt-2">
            <TextEditor v-model="assetBinder.description" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</div>

</template>


<script>
import TextEditor from '../TextEditor'
import BlockchainSelector from '../blockchain/BlockchainSelector'

export default {
    components: {
        TextEditor,
        BlockchainSelector,
    },
    data: function(){ 
        return {
            
        }
    },
     created: function() {
      
    },
    props:{
      assetBinder: { mode:String, blockchain_id: Number, address: String, type:String, symbol:String, img:String, thumbnail:String, decimals:Number, enable:Boolean },
    },
    methods: {}
}
</script>