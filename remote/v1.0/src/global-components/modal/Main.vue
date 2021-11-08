<template>
  <!-- BEGIN: Warning Modal Content -->
  <div id="deleteModal" class="modal" tabindex="-1" aria-hidden="true">
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
              @click="onCancel"
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
  <!-- END: Warning Modal Content -->
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
  },

  data: function() {
    return {};
  },

  methods: {
    onDeleteModal: function() {
      console.log("props ::::", this.message);
      cash("#deleteModal").modal("show");
    },

    onCancel: function() {
      cash("#deleteModal").modal("hide");
    },

    onDelete: function() {
      cash("#deleteModal").modal("hide");
    },
  },
};
</script>

<style></style>
