<template>
  <!-- BEGIN: Success Modal Content -->
  <div id="SuccessModal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <CheckCircleIcon class="w-16 h-16 text-theme-20 mx-auto mt-3" />
            <div class="text-2xl mt-5" v-html="title" />
            <div class="text-gray-600 mt-2" v-html="message" />
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-primary w-24"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Success Modal Content -->

  <!-- BEGIN: Edit Modal Content -->
  <div id="EditModal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <Edit3Icon class="w-16 h-16 text-theme-15 mx-auto mt-3" />
            <div class="text-2xl mt-5" v-html="title" />
            <div class="text-gray-600 mt-2" v-html="message" />
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-warning w-24" @click="onEdit">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Edit Modal Content -->

  <!-- BEGIN: Delete Modal Content -->
  <div id="DeleteModal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <Trash2Icon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
            <div class="text-2xl mt-5" v-html="title" />
            <div class="text-gray-600 mt-2" v-html="message" />
          </div>
          <div class="px-5 pb-8 text-center">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300 mr-1"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-danger w-24" @click="onDelete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END: Delete Modal Content -->
</template>

<script>
export default {
  props: {
    // title: String,
    // message: String,
    // edit: Function,
    // delete: Function,
    // delete_key: Number,
  },

  data: function() {
    return {
      title: "",
      message: "",
    };
  },

  methods: {
    onSuccessModal: function(title, message) {
      this.title = title;
      this.message = message;

      cash("#SuccessModal").modal("show");
    },

    onEditModal: function(title, message) {
      this.title = title;
      this.message = message;
      cash("#EditModal").modal("show");
    },

    onEdit: function() {
      this.$emit("editExec");
      cash("#EditModal").modal("hide");
    },

    onDeleteModal: function(title, message) {
      this.title = title;
      this.message = message;
      cash("#DeleteModal").modal("show");
    },

    onDelete: function() {
      // this.delete(this.delete_key);
      this.$emit("deleteExec");
      cash("#DeleteModal").modal("hide");
    },
  },
};
</script>

<style></style>
