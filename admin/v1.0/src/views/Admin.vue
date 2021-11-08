<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">admin</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <a
          href="javascript:;"
          data-toggle="modal"
          data-target="#admin-add-modal"
          class="btn btn-primary shadow-md mr-2"
          >Add New Amin</a
        >
        <div class="hidden md:block mx-auto text-gray-600"></div>
        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
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
        </div>
      </div>
    </div>

    <AdminList
      :creatorInfo="ds"
      v-on:onDelete="onDeleteConfirm"
      v-on:onEdit="onEditModal"
    />

    <!-- BEGIN: Add Modal Content -->
    <div
      id="admin-add-modal"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      ref="adminModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Create New Amin
            </h2>
            <a href="javascript:;" data-dismiss="modal"
              ><XIcon class="w-4 h-4 mr-2"
            /></a>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body ">
            <AdminForm :ds="addObj" />
          </div>
          <!-- END: Modal Body -->
          <!-- BEGIN: Modal Footer -->
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary w-20" @click="onAdd">
              Create
            </button>
          </div>
          <!-- END: Modal Footer -->
        </div>
      </div>
    </div>
    <!-- END: Add Modal Content -->

    <!-- BEGIN: Edit Modal Content -->
    <div
      id="admin-edit-modal"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      ref="adminModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- BEGIN: Modal Header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Edit Admin
            </h2>
            <a href="javascript:;" data-dismiss="modal"
              ><XIcon class="w-4 h-4 mr-2"
            /></a>
          </div>
          <!-- END: Modal Header -->
          <!-- BEGIN: Modal Body -->
          <div class="modal-body ">
            <AdminForm :ds="editObj" />
          </div>
          <!-- END: Modal Body -->
          <!-- BEGIN: Modal Footer -->
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
          <!-- END: Modal Footer -->
        </div>
      </div>
    </div>
    <!-- END: Add Modal Content -->

    <!-- BEGIN: Delete Confirm Modal Content -->
    <div id="admin-del-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these admin? <br />This process
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
    </div>
    <!-- END: Modal Content -->
  </div>
</template>

<script>
import CreatorService from "../services/creator.service.js";
import Delete from "../custom-components/Delete.vue";
import AdminForm from "../custom-components/admin/adminForm.vue";
import AdminList from "../custom-components/admin/adminList.vue";
import { Parula } from "../parula-js/src/parula.js";
import Notify from "../services/notification.service";

export default {
  setup() {},
  components: {
    Delete,
    AdminForm,
    AdminList,
  },
  data: function() {
    return {
      ds: [],
      delIdx: 0,
      addObj: {
        id: "",
        uid: "",
        public_id: "",
        public_name: "",
        name: "",
        name_eng: "",
        description: "",
        avata_1: "",
        avata_1_min: "",
        avata_1_id: "",
        role: "",
        profile_id: "",
        masterpiece: "",
        updated_at: "",
        created_at: "",
        source: {
          done: false,
          img: "",
        },
        source2: {
          done: false,
          img: "",
        },
        bshows: true,
        selectedCreator: "",
      },
      editObj: {
        id: "",
        uid: "",
        public_id: "",
        public_name: "",
        name: "",
        name_eng: "",
        description: "",
        avata_1: "",
        avata_1_min: "",
        avata_1_id: "",
        role: "",
        profile_id: "",
        masterpiece: "",
        updated_at: "",
        created_at: "",
        source: {
          done: false,
          img: "",
        },
        source2: {
          done: false,
          img: "",
        },
        bshows: true,
        selectedCreator: "",
      },
    };
  },
  created: function() {
    this.onReload();
  },
  props: ["isHiddens", "isRefreshes"],
  methods: {
    onReload() {
      CreatorService.listPaging(1, 100).then((res) => {
        console.log("ResInfo:", res);
        this.ds = res.data;
      });
    },
    resetValues() {
      this.addObj.id = "";
      this.addObj.user_id = "";
      this.addObj.public_id = "";
      this.addObj.public_name = "";
      this.addObj.name = "";
      this.addObj.name_eng = "";
      this.addObj.description = "";
      this.addObj.avata_1 = "";
      this.addObj.avata_1_min = "";
      this.addObj.avata_1_id = "";
      this.addObj.role = "";
      this.addObj.profile_id = "";
      this.addObj.masterpiece = "";
      this.addObj.updated_at = "";
      this.addObj.created_at = "";
    },
    onAdd: async function() {
      //기존 데이터 보내는 방식으로 넣을것.
      var user_id = this.addObj.user_id;
      var public_id = this.addObj.public_id;
      var public_name = this.addObj.public_name;
      var name = this.addObj.name;
      var name_eng = this.addObj.name_eng;
      var description = this.addObj.description;
      var avata_1 = this.addObj.avata_1;
      var avata_1_min = this.addObj.avata_1_min;
      var avata_1_id = this.addObj.avata_1_id;
      var role = this.addObj.role;
      var profile_id = this.addObj.profile_id;
      var masterpiece = this.addObj.masterpiece;
      var updated_at = this.addObj.updated_at;
      var created_at = this.addObj.created_at;

      CreatorService.create(
        user_id,
        public_id,
        public_name,
        name,
        name_eng,
        description,
        avata_1,
        avata_1_min,
        avata_1_id,
        role,
        profile_id,
        masterpiece,
        updated_at,
        created_at
      ).then((res) => {
        console.log("Resssss:", res);
        console.log("url", avata_1);
        this.addObj.id = "";
        this.addObj.user_id = "";
        this.addObj.public_id = "";
        ``;
        this.addObj.public_name = "";
        this.addObj.name = "";
        this.addObj.name_eng = "";
        this.addObj.description = "";
        this.addObj.avata_1 = "";
        this.addObj.avata_1_min = "";
        this.addObj.avata_1_id = "";
        this.addObj.role = "";
        this.addObj.profile_id = "";
        this.addObj.masterpiece = "";
        this.addObj.updated_at = "";
        this.addObj.created_at = "";
        this.$emit("nonViewPop");
        this.$emit("DoRefresh");
        this.resetValues();
        this.onReload();
      });
      cash("#admin-add-modal").modal("hide");
    },
    onEditModal(at) {
      console.log("onEditModal::", at);
      (this.editObj.id = at.id),
        (this.editObj.user_id = at.user_id),
        (this.editObj.public_id = at.public_id),
        (this.editObj.public_name = at.public_name),
        (this.editObj.name = at.name),
        (this.editObj.name_eng = at.name_eng),
        (this.editObj.description = at.description),
        (this.editObj.avata_1 = at.avata_1),
        (this.editObj.avata_1_min = at.avata_1_min),
        (this.editObj.avata_1_id = at.avata_1_id),
        (this.editObj.role = at.role),
        (this.editObj.profile_id = at.profile_id),
        (this.editObj.masterpiece = at.masterpiece),
        (this.editObj.updated_at = at.updated_at),
        (this.editObj.created_at = at.created_at),
        cash("#admin-edit-modal").modal("show");
    },
    onEdit() {
      console.log("onEdit:::", this.editObj);
      CreatorService.update(
        (this.editObj.id = ""),
        (this.editObj.user_id = ""),
        (this.editObj.public_id = ""),
        (this.editObj.public_name = ""),
        (this.editObj.name = ""),
        (this.editObj.name_eng = ""),
        (this.editObj.description = ""),
        (this.editObj.avata_1 = ""),
        (this.editObj.avata_1_min = ""),
        (this.editObj.avata_1_id = ""),
        (this.editObj.role = ""),
        (this.editObj.profile_id = ""),
        (this.editObj.masterpiece = ""),
        (this.editObj.updated_at = ""),
        (this.editObj.created_at = "")
      )
        .then((res) => {
          console.log("contract :", res);
          this.Notify.success("saved!!");
          this.onReload();
        })
        .catch((err) => {
          // alert(err)
          this.Notify.error(err);
        });
      cash("#admin-edit-modal").modal("hide");
    },
    onDeleteConfirm(id) {
      this.delIdx = id;
      cash("#admin-del-modal").modal("show");
    },
    onDeleteProduct() {
      CreatorService.deleteCreator(this.delIdx)
        .then((res) => {
          console.log("ResInfo:", res);
          this.onReload();
          cash("#admin-del-modal").modal("hide");
        })
        .catch((error) => {
          //alert(error)
          cash("#admin-del-modal").modal("hide");
        });
    },
  },
};
</script>
