<template>
<div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Asset</h2>
      
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <a href="javascript:;" data-toggle="modal" data-target="#asset-add-modal" class="btn btn-primary shadow-md mr-2">Add New Asset</a>
      </div>
    </div>

<!-- END: Modal Toggle -->

<div>
    <AssetList :idsl="ds"  v-on:onDelete="onDeleteConfirm" v-on:onEdit="onEditModal" />
</div>

<!-- BEGIN: Add Modal Content -->
<div id="asset-add-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true"  ref="assetModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
                <h2 class="font-medium text-base mr-auto">
                   Create New Asset
                </h2>
                <a href="javascript:;" data-dismiss="modal"  ><XIcon class="w-4 h-4 mr-2" /></a>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body ">
                <AssetForm :assetBinder="addObj" />
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
<div id="asset-edit-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true"  ref="assetModal">
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
                <AssetForm :assetBinder="editObj" />
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
<div id="asset-del-modal" class="modal" tabindex="-1" aria-hidden="true">
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
import AssetList from "../custom-components/asset/AssetList.vue"
import AssetForm from "../custom-components/asset/AssetForm.vue"
import AssetService from '../services/asset.service.js'
import Notify from "../services/notification.service"

import { Parula } from "../parula-js/src/parula"


export default {
    setup() {
    },
    components: {
        AssetList,
        AssetForm,
    },
    data: function(){
        return {
            ds:[],
            delIdx:0,
            addObj:{ mode:'add', blockchain_id: 0, address: "0x", type:"erc20", symbol:"symbol", img:"", thumbnail:"", decimals:0, enable:false },
            editObj:{ mode:'edit', symbol:"", img:"", thumbnail:"", decimals:0,  enable:false, id:0 },
        }
    },
     created: function() {
        this.onReload()
    },
    props:[],
    methods: {
        onReload(){
            AssetService.list().then(
                res=>{
                    console.log("ResInfo:", res)
                    this.ds = res.data
                    console.log('this.ds',this.ds)
                    
                })
        },
        async onAdd(){
            console.log("addObj:::", this.addObj)

            const parula = new Parula(window.ethereum)
            var _type = this.addObj.type.toUpperCase()

            let matched = true
            if (['ERC20', 'ERC721', 'ERC1155'].indexOf(_type) >= 0){ // 이 중에 속하지 않으면
                var erc_class = await parula.classify(this.addObj.address)
                if( (erc_class==9999) ||
                    (erc_class==20 && _type != 'ERC20') ||
                    (erc_class==721 && _type != 'ERC721') ||
                    (erc_class==1155 && _type != 'ERC1155')
                ){
                    console.error(`Type and contract address are missmatched ${this.addObj.type}!=${erc_class}, ${this.addObj.address}`)
                    Notify.error(`Type and contract address are missmatched ${this.addObj.type}!=${erc_class}, ${this.addObj.address}`)
                    matched = false
                }
            }
            if(matched){
                AssetService.create(this.addObj.blockchain_id, this.addObj.address, this.addObj.type, this.addObj.symbol, this.addObj.img, this.addObj.thumbnail, this.addObj.decimals, this.addObj.enable).then(res=>{
                    console.log("result:", res)
                    this.onReload();
                    Notify.success('added !!')
    
                    cash("#asset-add-modal").modal("hide")
                }).catch(err=>{
                    // alert(err)
                    Notify.error(err)
                })
            }

            

        },
        onEditModal(at){
            console.log("onEditModal::", at)
            this.editObj.symbol= at.symbol;
            this.editObj.img = at.img;
            this.editObj.thumbnail = at.thumbnail;
            this.editObj.decimals = at.decimals;
            if(at.enable ===1){
                this.editObj.enable = true;
            }else{
                this.editObj.enable = false;
            }
            
            this.editObj.id = at.id;

            cash("#asset-edit-modal").modal("show")
        },
        onEdit(){
            console.log("onEdit:::", this.editObj)
            AssetService.update(
                    this.editObj.symbol, 
                    this.editObj.img, 
                    this.editObj.thumbnail, 
                    this.editObj.decimals, 
                    this.editObj.enable, 
                    this.editObj.id
            ).then(res=>{
                console.log("result:", res)
                cash("#asset-edit-modal").modal("hide");
                this.onReload();
                Notify.success('edited !!')
            }).catch(err=>{
                // alert(err)
                cash("#asset-edit-modal").modal("hide");
                Notify.error(err)
            })
            
        },
        onDeleteConfirm(id){
            this.delIdx = id;
            cash("#asset-del-modal").modal("show")
        },
        onDeleteAsset(){
            AssetService.delete(this.delIdx).then(
              res=>{
                  console.log("ResInfo:", res)
                  this.onReload();
                cash("#asset-del-modal").modal("hide")
                Notify.success('deleted !!')
              }).catch(err => {
                //alert(err)
                cash("#asset-del-modal").modal("hide")
                Notify.error(err)
              });
        }   
    }
}
</script>
