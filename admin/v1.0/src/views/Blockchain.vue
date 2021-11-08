<template>
<div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Blockchain</h2>
      
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <a href="javascript:;" data-toggle="modal" data-target="#blockchain-add-modal" class="btn btn-primary shadow-md mr-2">Add New Blockchain</a>
      </div>
    </div>

<!-- END: Modal Toggle -->

<div>
    <BlockChainList :idsl="ds"  v-on:onDelete="onDeleteConfirm" v-on:onEdit="onEditModal" />
</div>

<!-- BEGIN: Add Modal Content -->
<div id="blockchain-add-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true"  ref="assetModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
                <h2 class="font-medium text-base mr-auto">
                   Create New Blockchain Nework
                </h2>
                <a href="javascript:;" data-dismiss="modal"  ><XIcon class="w-4 h-4 mr-2" /></a>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body ">
                <BlockChainForm :ds="addObj" />
            </div>
            <!-- END: Modal Body -->
            <!-- BEGIN: Modal Footer -->
            <div class="modal-footer text-right">
                <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                    Cancel
                </button>
                <button type="button" class="btn btn-primary w-20" @click="onAdd" >
                    Create
                </button>
            </div>
            <!-- END: Modal Footer -->
        </div>
    </div>
</div>
<!-- END: Add Modal Content -->


<!-- BEGIN: Edit Modal Content -->
<div id="blockchain-edit-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true"  ref="assetModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
                <h2 class="font-medium text-base mr-auto">
                    Edit Asset
                </h2>
                <a href="javascript:;" data-dismiss="modal"  ><XIcon class="w-4 h-4 mr-2" /></a>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body ">
                <BlockChainForm :ds="editObj" />
            </div>
            <!-- END: Modal Body -->
            <!-- BEGIN: Modal Footer -->
            <div class="modal-footer text-right">
                <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                    Cancel
                </button>
                <button type="button" class="btn btn-primary w-20" @click="onEdit" >
                    Save
                </button>
            </div>
            <!-- END: Modal Footer -->
        </div>
    </div>
</div>
<!-- END: Add Modal Content -->

<!-- BEGIN: Delete Confirm Modal Content -->
<div id="blockchain-del-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body p-0">
                <div class="p-5 text-center">
                    <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
                    <div class="text-3xl mt-5">Are you sure?</div>
                    <div class="text-gray-600 mt-2">
                        Do you really want to delete these asset? <br />This
                        process cannot be undone.
                    </div>
                </div>
                <div class="px-5 pb-8 text-center">
                    <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-danger w-24" @click="onDeleteAsset">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- END: Modal Content -->

</div>
   
</template>

<script>
import BlockChainList from "../custom-components/blockchain/blockchainList.vue"
import BlockChainForm from "../custom-components/blockchain/blockchainForm.vue"
import AssetService from '../services/asset.service.js'
import BlockchainService from '../services/blockchain.service';
import Notify from "../services/notification.service"


export default {
    setup() {
    },
    components: {
        BlockChainForm,
        BlockChainList,
    },
    data: function(){
        return {
            ds:[],
            delIdx:0,
            addObj:{
                name:"ether", 
                short_name:"eth", 
                chain:'ethereum', 
                network:'rinkeby',
                chain_id:4, 
                network_id:4, 

                currency_name:"ether", 
                currency_symbol:"eth", 
                currency_decimals:18,

                icon_thumbnail:"", 
                explorer_url:"", 
                info_url:"", 
                enable:false
            },
            editObj:{
                name:"ether", 
                short_name:"eth", 
                chain:'ethereum', 
                network:'rinkeby',
                chain_id:4, 
                network_id:4,

                currency_name:"ether", 
                currency_symbol:"eth", 
                currency_decimals:18,

                icon_thumbnail:"", 
                explorer_url:"", 
                info_url:"", 
                enable:false, 
                
                id:0 
            },
        }
    },
     created: function() {
        this.onReload()
    },
    props:[],
    methods: {
        onReload(){
            BlockchainService.list().then(
                res=>{
                    console.log("ResInfo:", res)
                    this.ds = res.data;
                })
        },
        onAdd(){
            console.log("addObj:::", this.addObj)
            BlockchainService.create(this.addObj.chain_id, this.addObj.name, this.addObj.short_name, this.addObj.chain, this.addObj.network_id, this.addObj.network, this.addObj.currency_name,
            this.addObj.currency_symbol, this.addObj.currency_decimals, this.addObj.icon_thumbnail, this.addObj.explorer_url, this.addObj.info_url, this.addObj.enable).then(res=>{
                console.log("result:", res)
                this.onReload();
                Notify.success('saved !!')
            }).catch(err=>{
                // alert(err)
                Notify.error(err)
            })

            cash("#blockchain-add-modal").modal("hide")
        },
        onEditModal(at){
            console.log("onEditModal::", JSON.stringify(at))
            //chain_id:0, name:"", short_name:"", chain:1, network_id:1, network:1, currency_name:"", currency_symbol:"", currency_decimals:18, icon_thumbnail:"", explorer_url:"",
            // info_url:"url", enable:false, id:0 
            this.editObj.chain_id = at.chain_id;
            this.editObj.name = at.name;
            this.editObj.short_name = at.short_name;
            this.editObj.network_id = at.network_id;
            this.editObj.network = at.network;
            this.editObj.currency_name = at.currency_name
            this.editObj.currency_symbol = at.currency_symbol
            this.editObj.currency_decimals = at.currency_decimals
            this.editObj.icon_thumbnail = at.icon_thumbnail;

            this.editObj.explorer_url = at.explorer_url;
            this.editObj.info_url = at.info_url;
            if(at.enable===1){
                this.editObj.enable =true;
            }else{
                this.editObj.enable = false;
            }
            
            this.editObj.id = at.id;
            cash("#blockchain-edit-modal").modal("show")
        },
        onEdit(){
            console.log("onEdit:::", this.editObj)
            BlockchainService.update(this.editObj.chain_id, this.editObj.name, this.editObj.short_name, this.editObj.chain, this.editObj.network_id, this.editObj.network, this.editObj.currency_name,
            this.editObj.currency_symbol, this.editObj.currency_decimals, this.editObj.icon_thumbnail, this.editObj.explorer_url, this.editObj.info_url, this.editObj.enable, this.editObj.id).then(res=>{
                console.log("blockchain service:", res)
                cash("#blockchain-edit-modal").modal("hide")
                this.onReload();
                Notify.success('Edited completed!!')
            }).catch(err=>{
                // alert(err)
                cash("#blockchain-edit-modal").modal("hide");
                Notify.error(err)
            })
            cash("#blockchain-edit-modal").modal("hide");
        },
        onDeleteConfirm(id){
            this.delIdx = id;
            cash("#blockchain-del-modal").modal("show")
        },
        onDeleteAsset(){
            BlockchainService.delete(this.delIdx).then(
              res=>{
                  console.log("ResInfo:", res)
                  this.onReload();
                cash("#blockchain-del-modal").modal("hide")
                Notify.success('deleted !!')
              }).catch(err => {
                //alert(error)
                cash("#blockchain-del-modal").modal("hide")
                Notify.error(err)
              });
        }
    }
}
</script>
