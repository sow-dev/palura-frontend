<template>
<!-- BEGIN: PAGE -->
<div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Contract</h2>
      
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <a href="javascript:;" data-toggle="modal" data-target="#contract-add-modal" class="btn btn-primary shadow-md mr-2">Add New Contract</a>
      </div>
    </div>


<div>
    <ContractList :idsl="ds"  v-on:onDelete="onDeleteConfirm" v-on:onEdit="onEditModal" />
</div>


<!-- END: PAGE -->

<!-- BEGIN: Add Modal Content -->
<div id="contract-add-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true"  ref="assetModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
                <h2 class="font-medium text-base mr-auto">
                   Create New Contract
                </h2>
                <a href="javascript:;" data-dismiss="modal"  ><XIcon class="w-4 h-4 mr-2" /></a>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body ">
                <ContractForm :ds="addObj" />
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
<div id="contract-edit-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true"  ref="assetModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- BEGIN: Modal Header -->
            <div class="modal-header">
                <h2 class="font-medium text-base mr-auto">
                    Edit Contract
                </h2>
                <a href="javascript:;" data-dismiss="modal"  ><XIcon class="w-4 h-4 mr-2" /></a>
            </div>
            <!-- END: Modal Header -->
            <!-- BEGIN: Modal Body -->
            <div class="modal-body ">
                <ContractForm :ds="editObj" />
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
import ContractList from "../custom-components/contract/contractList.vue"
import ContractForm from "../custom-components/contract/contractForm.vue"
import ContractService from '../services/contract.service'
import Notify from "../services/notification.service"


export default {
    setup() {
    },
    components: {
        ContractForm,
        ContractList,
    },
    data: function(){
        return {
            ds:[],
            delIdx:0,
            addObj:{blockchain_id:0, type:"erc20", name:"", symbol:"", address:"0x", fee:"", version:1, options:"", enable:1} ,
            editObj:{blockchain_id:0, type:"erc20", name:"", symbol:"", address:"0x", fee:"", version:1, options:"", enable:1} ,
        }
    },
     created: function() {
        this.onReload()
    },
    props:[],
    methods: {
        onReload(){
            ContractService.list().then(
                res=>{
                    console.log("ResInfo:", res)
                    this.ds = res.data;
                })
        },
        onAdd(){
            console.log("addObj:::", this.addObj)
            ContractService.create(this.addObj.blockchain_id, this.addObj.type, this.addObj.name, this.addObj.symbol, this.addObj.address, this.addObj.fee, this.addObj.options,this.addObj.enable).then(res=>{
                console.log("result:", res)
                this.onReload();
                Notify.success('added !!')
            }).catch(err=>{
                // alert(err)
                Notify.error(err)
            })
            cash("#contract-add-modal").modal("hide")
        },
        onEditModal(at){
            console.log("onEditModal::", at)
            
            this.editObj.blockchain_id = at.blockchain_id;
            this.editObj.type = at.type;
            this.editObj.name = at.name;
            this.editObj.symbol = at.symbol;
            this.editObj.address= at.address;
            this.editObj.fee = at.eff;
            this.editObj.version = at.version;
            this.editObj.options = at.options;
            this.editObj.enable = at.enable;
            this.editObj.id = at.id;
            cash("#contract-edit-modal").modal("show")
        },
        onEdit(){
            console.log("onEdit:::", JSON.stringify(this.editObj))
            ContractService.update(this.editObj.blockchain_id, this.editObj.type, this.editObj.name, this.editObj.symbol, this.editObj.address,
             this.editObj.fee, this.editObj.version, this.editObj.options,this.editObj.enable, this.editObj.id).then(res=>{
                console.log("contract :", res)
                this.onReload();
                Notify.success('edited !!')
                cash("#contract-edit-modal").modal("hide");
            }).catch(err=>{
                // alert(err)
                Notify.error(err)
            })
            cash("#contract-edit-modal").modal("hide");
        },
        onDeleteConfirm(id){
            this.delIdx = id;
            cash("#asset-del-modal").modal("show")
        },
        onDeleteAsset(){
            ContractService.delete(this.delIdx).then(
              res=>{
                  console.log("ResInfo:", res)
                  this.onReload();
                cash("#asset-del-modal").modal("hide")
                
              }).catch(err => {
                Notify.success('deleted !!')
                cash("#asset-del-modal").modal("hide")
                Notify.error(err)
              });
        }
    }
}
</script>
