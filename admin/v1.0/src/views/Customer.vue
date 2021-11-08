<template>
  <div>
    <h2 class="text-lg font-medium mt-10">Customer</h2>

    <!-- <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              placeholder="Search..."
            />
            <SearchIcon
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            />
          </div>
        </div> -->

    <CustomerList />

    <!-- <CustomerList
      :creatorInfo="ds"
      v-on:onDelete="onDeleteConfirm"
      v-on:onEdit="onEditModal"
    /> -->

    <!-- BEGIN: Edit Modal Content -->
    <!-- <div
      id="artist-edit-modal"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      ref="artistModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Edit Artist
            </h2>
            <a href="javascript:;" data-dismiss="modal">
              <XIcon class="w-4 h-4 mr-2"
            /></a>
          </div>
          <div class="modal-body ">
            <CustomerForm :ds="editObj" />
          </div>
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary w-20" @click="onEdit">
              Save
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- END: Add Modal Content -->

    <!-- BEGIN: Delete Confirm Modal Content -->
    <!-- <div id="artist-del-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these Artist? <br />This process
                cannot be undone.
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger w-24"
                @click="onDeleteProduct"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- END: Modal Content -->
  </div>
</template>

<script>
// import UserService from "../services/user.service.js";
// import Delete from "../custom-components/Delete.vue";
// import CustomerForm from "../custom-components/customer/customerForm.vue";
import CustomerList from "../custom-components/customer/customerList.vue";

export default {
  components: {
    CustomerList,
    // Delete,
    // CustomerForm,
  },

  data: function() {
    return {
      ds: [],

      // delIdx: 0,
      // addObj: {
      //   nickname: "",
      //   name: "",
      //   avata: "",
      //   mail: "",
      //   mail_1: "",
      //   kyc: "",
      //   aml: "",
      //   properties: "",
      //   reg_at: "",
      //   terms_at: "",
      //   updated_at: "",
      //   source: {
      //     done: false,
      //     img: "",
      //   },
      //   source2: {
      //     done: false,
      //     img: "",
      //   },
      //   bshows: true,
      //   selectedCreator: "",
      // },
      // editObj: {
      //   id: "",
      //   nickname: "",
      //   name: "",
      //   avata: "",
      //   mail: "",
      //   mail_1: "",
      //   kyc: "",
      //   aml: "",
      //   properties: "",
      //   reg_at: "",
      //   terms_at: "",
      //   updated_at: "",
      //   source: {
      //     done: false,
      //     img: "",
      //   },
      //   source2: {
      //     done: false,
      //     img: "",
      //   },
      //   bshows: true,
      //   selectedCreator: "",
      // },
    };
  },

  methods: {
    // onReload() {
    //     UserService.list().then((res) => {
    //       console.log("ResInfo:", res);
    //       this.ds = res.data;
    //     });
    // },
    // resetValues() {
    //   this.addObj.id = "";
    //   this.addObj.nickname = "";
    //   this.addObj.name = "";
    //   this.addObj.avata = "";
    //   this.addObj.mail = "";
    //   this.addObj.mail_1 = "";
    //   this.addObj.kyc = "";
    //   this.addObj.aml = "";
    //   this.addObj.properties = "";
    //   this.addObj.reg_at = "";
    //   this.addObj.terms_at = "";
    //   this.addObj.updated_at = "";
    // },
    // onAdd: async function() {
    //   //기존 데이터 보내는 방식으로 넣을것.
    //   var id = this.addObj.id;
    //   var nickname = this.addObj.nickname;
    //   var name = this.addObj.name;
    //   var avata = this.addObj.avata;
    //   var mail = this.addObj.mail;
    //   var mail_1 = this.addObj.mail_1;
    //   var kyc = this.addObj.kyc;
    //   var aml = this.addObj.aml;
    //   var properties = this.addObj.properties;
    //   var reg_at = this.addObj.reg_at;
    //   var terms_at = this.addObj.terms_at;
    //   var updated_at = this.addObj.updated_at;
    //   UserService.create(
    //     id,
    //     nickname,
    //     name,
    //     avata,
    //     mail,
    //     mail_1,
    //     kyc,
    //     aml,
    //     properties,
    //     reg_at,
    //     terms_at,
    //     updated_at
    //   ).then((res) => {
    //     console.log("Resssss:", res);
    //     console.log("url", avata);
    //     this.addObj.id = "";
    //     this.addObj.nickname = "";
    //     this.addObj.name = "";
    //     this.addObj.avata = "";
    //     this.addObj.mail = "";
    //     this.addObj.mail_1 = "";
    //     this.addObj.kyc = "";
    //     this.addObj.aml = "";
    //     this.addObj.properties = "";
    //     this.addObj.reg_at = "";
    //     this.addObj.terms_at = "";
    //     this.addObj.updated_at = "";
    //     this.$emit("nonViewPop");
    //     this.$emit("DoRefresh");
    //     this.resetValues();
    //     this.onReload();
    //   });
    //   cash("#artist-add-modal").modal("hide");
    // },
    // onEditModal(at) {
    //   console.log("onEditModal::", at);
    //   (this.editObj.id = at.id),
    //     (this.editObj.public_id = at.publick_id),
    //     (this.editObj.public_name = at.public_name),
    //     (this.editObj.name = at.name),
    //     (this.editObj.name_eng = at.name_eng),
    //     (this.editObj.description = at.description),
    //     (this.editObj.avata_1 = at.avata_1),
    //     (this.editObj.avata_1_min = at.avata_1_min),
    //     (this.editObj.avata_1_id = at.avata_1_id),
    //     (this.editObj.role = at.role),
    //     (this.editObj.profile_id = at.profile_id),
    //     (this.editObj.masterpiece = at.masterpiece),
    //     (this.editObj.updated_at = at.updated_at),
    //     (this.editObj.created_at = at.created_at),
    //     cash("#artist-edit-modal").modal("show");
    // },
    // onEdit() {
    //   console.log("onEdit:::", this.editObj);
    //   UserService.update(
    //     (this.editObj.id = ""),
    //     (this.editObj.public_id = ""),
    //     (this.editObj.public_name = ""),
    //     (this.editObj.name = ""),
    //     (this.editObj.name_eng = ""),
    //     (this.editObj.description = ""),
    //     (this.editObj.avata_1 = ""),
    //     (this.editObj.avata_1_min = ""),
    //     (this.editObj.avata_1_id = ""),
    //     (this.editObj.role = ""),
    //     (this.editObj.profile_id = ""),
    //     (this.editObj.masterpiece = ""),
    //     (this.editObj.updated_at = ""),
    //     (this.editObj.created_at = "")
    //   )
    //     .then((res) => {
    //       console.log("contract :", res);
    //       this.Notify.success("saved !!");
    //       this.onReload();
    //     })
    //     .catch((err) => {
    //       // alert(err)
    //       this.Notify.error(err);
    //     });
    //   cash("#artist-edit-modal").modal("hide");
    // },
    // onDeleteConfirm(id) {
    //   this.delIdx = id;
    //   cash("#artist-del-modal").modal("show");
    // },
    // onDeleteProduct() {
    //   UserService.delete(this.delIdx)
    //     .then((res) => {
    //       console.log("ResInfo:", res);
    //       this.onReload();
    //       cash("#artist-del-modal").modal("hide");
    //     })
    //     .catch((error) => {
    //       //alert(error)
    //       console.log("delete error", error);
    //       cash("#artist-del-modal").modal("hide");
    //     });
    // },
  },
};
</script>
