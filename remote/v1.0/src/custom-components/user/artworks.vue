<template>
  <div class="flex flex-col sm:flex-row items-center mt-5">
    <h2 class="text-lg font-medium mr-auto">
      <!-- Portfolio -->
    </h2>
    <div class="sm:w-auto flex mt-4 sm:mt-0">
      <button
        class="btn px-2 box mr-2 text-gray-700 dark:text-gray-300"
        @click="load"
      >
        <RefreshCwIcon class="w-4 h-4" />
      </button>
      <button class="btn btn-primary shadow-md px-2" @click="changeMode('add')">
        <span class="h-5 flex items-center justify-center">
          Add Artwork
        </span>
      </button>
    </div>
  </div>

  <!-- BEGIN: add artworks -->

  <!-- END: add artworks -->

  <div
    v-if="display_mode === 'loading'"
    class="w-screen  h-screen flex justify-center items-center"
  >
    <div class="mx-auto my-auto text-center gray-600">
      <LoadingIcon icon="three-dots" class="w-5 h-5 gray-600" />
      <div class="mt-3">
        <div class="text-gray-600 mt-10 animate-pulse">
          Loading data ...
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="display_mode === 'add'"
    class="intro-y box col-span-12 lg:col-span-6 m-10"
  >
    <div class="intro-y box col-span-12 lg:col-span-6">
      <div
        class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">New Artwork</h2>
      </div>
      <ArtworkForm
        :nickname="nickname"
        @addArtwork="addArtwork"
        @hideModal="changeMode"
      />
    </div>
  </div>

  <div
    v-else-if="display_mode === 'edit'"
    class="intro-y box col-span-12 lg:col-span-6 m-10"
  >
    <div class="intro-y box col-span-12 lg:col-span-6">
      <div
        class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5"
      >
        <h2 class="font-medium text-base mr-auto">Edit Artwork</h2>
      </div>
      <ArtworkForm
        :nickname="nickname"
        :edit_object="edit_object"
        @editArtwork="editArtwork"
        @hideModal="changeMode"
      />
    </div>
  </div>

  <div
    v-else-if="display_mode === 'list'"
    class="pos intro-y grid grid-cols-24 min-h-screen"
  >
    <!-- BEGIN: Item List -->
    <div class="intro-y col-span-12 lg:col-span-12">
      <div class="grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-31 ">
        <div
          v-for="(i, idx) in artwork_list"
          :key="idx"
          class="intro-y block col-span-12 sm:col-span-4 xxl:col-span-2 cursor-move"
        >
          <div
            v-if="i.image_min != ''"
            class="intro-y blog col-span-12 md:col-span-6 box"
          >
            <div class="blog__preview image-fit">
              <img alt="image" class="rounded-t-md" :src="i.image_min" />
              <div class="absolute w-full flex items-center px-5 pt-6 z-10">
                <div class="ml-3 text-white mr-auto">
                  <a href="" class="font-medium">{{ i.title }}</a>
                  <div class="text-xs mt-0.5">{{ i.comment }}</div>
                </div>
                <div class="dropdown ml-3">
                  <a
                    href="javascript:;"
                    class="blog__action dropdown-toggle w-8 h-8 flex items-center justify-center rounded-full"
                    aria-expanded="false"
                  >
                    <MoreVerticalIcon class="w-4 h-4 text-white" />
                  </a>
                  <div id="config-item" class="dropdown-menu w-40">
                    <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                      <a
                        href="javascript:;"
                        @click="onEdit(i)"
                        class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >
                        <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                      </a>
                      <a
                        href="javascript:;"
                        data-toggle="modal"
                        data-target="#artworks-del-modal"
                        @click="getDeleteKey(i.id)"
                        class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >
                        <TrashIcon class="w-4 h-4 mr-2" /> Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                <span
                  v-if="i.masterpiece == 1"
                  class="blog__category px-2 py-1 rounded"
                  >Masterpiece</span
                >
              </div>
            </div>
            <div class="p-5 text-gray-700 dark:text-gray-600 line-clamp-5">
              {{ i.description }}
            </div>
          </div>
          <div v-else class="box rounded-md p-3 relative zoom-in">
            <Tippy
              tag="div"
              content="Remove this image?"
              @click="onRemoveItem(idx)"
              class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2"
            >
              <xIcon class="w-4 h-4" />
            </Tippy>
            <ImageUploader v-model="i.img" :address="''" />
          </div>
        </div>
      </div>
    </div>
    <!-- END: Item List -->
  </div>

  <!-- BEGIN: edit Modal Content -->
  <!-- <div
      id="edit-modal"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Edit
            </h2>
            <a href="javascript:;" data-dismiss="modal">
              <XIcon class="w-4 h-4 mr-2"
            /></a>
          </div>
          <div class="modal-body h-4/6">
            <ArtworkForm
              :artwork_edit="artwork_edit"
              @hideEditModal="hideEditModal"
            />
          </div>
        </div>
      </div>
    </div> -->
  <!-- BEGIN: Delete Confirm Modal Content -->
  <div id="artworks-del-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-gray-600 mt-2">
              Do you really want to delete these Artworks? <br />This process
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
              @click.prevent="onDelete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Modal Content -->
    <!-- END: Product choice Modal-->
    <!-- BEGIN: product choice Modal Content -->
    <!-- <div
      id="product-choice-modal"
      class="modal"
      data-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      ref="assetModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Product list
            </h2>
            <a href="javascript:;" data-dismiss="modal">
              <XIcon class="w-4 h-4 mr-2"
            /></a>
          </div>
          <div class="modal-body h-4/6">
            <div v-if="product_list && product_list.length > 0">
              <ProductChoice
                :idsl="product_list"
                v-on:onSelected="onSelectProduct"
              />
            </div>
          </div>
          <div class="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import ArtworkForm from "./artworkForm";
import ImageUploader from "../imageUploader";
import PortfolioService from "../../services/portfolio.service.js";
import Notify from "../../services/notification.service";

export default {
  components: {
    ImageUploader,
    ArtworkForm,
  },

  props: {
    user_id: Number,
    nickname: String,
  },

  data: function() {
    return {
      artwork_list: [],
      edit_object: {},
      delete_key: 0,
      display_mode: "list",
    };
  },

  mounted: function() {
    this.load();
  },

  methods: {
    load: function() {
      this.display_mode = "loading";
      PortfolioService.list(1, 20, this.user_id)
        .then((res) => {
          this.display_mode = "list";
          this.artwork_list = res.data.items;
        })
        .catch((error) => {
          this.display_mode = "list";
          Notify.error(error.name, error.message);
        });
    },

    changeMode: function(_mode) {
      // console.log("mode is changed to", _mode);
      this.display_mode = _mode;
    },

    addArtwork: function(object) {
      // console.log("add object ::::", JSON.stringify(object));

      PortfolioService.create(
        this.user_id,
        object.image,
        object.image_min,
        object.sequence,
        object.title,
        object.description,
        object.masterpiece,
        object.comment
      )
        .then(() => {
          Notify.success("Success", "Artwork is added");
          this.load();
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    onEdit: function(sellected_artwork) {
      this.edit_object = sellected_artwork;
      this.display_mode = "edit";
      cash("#add-item-menu").dropdown("hide");
    },

    editArtwork: function(object) {
      PortfolioService.update(
        object.artwork_id,
        object.image,
        object.image_min,
        object.sequence,
        object.title,
        object.description,
        object.masterpiece,
        object.comment
      )
        .then(() => {
          this.load();
          Notify.success("Success", "Artwork is edited");
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });
    },

    getDeleteKey: function(delete_key) {
      this.delete_key = delete_key;
    },

    onDelete: function() {
      PortfolioService.delete(this.delete_key)
        .then(() => {
          Notify.success("Success", "Artwork is deleted");
          this.load();
        })
        .catch((error) => {
          Notify.error(error.name, error.message);
        });

      cash("#artworks-del-modal").modal("hide");
      cash("#add-item-menu").dropdown("hide");
    },
  },
};
</script>
