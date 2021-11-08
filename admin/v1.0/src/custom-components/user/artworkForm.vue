<template>
  <div class="intro-y col-span-12 lg:col-span-6">
    <!-- BEGIN: Form Layout -->
    <div class="intro-y box p-5">
      <!-- <div class="mt-3">
        <label for="image" class="form-label">Main Image</label>
        <div v-if="artwork.image">
          <img :src="artwork.image" class="form-control w-full" />
        </div>
        <div v-else>
          <ImageUploader id="image" v-model="artwork.image" />
        </div>
      </div> -->

      <div class="mt-3">
        <label for="image" class="form-label">Main Image</label>
        <div v-if="artwork.image" class="relative">
          <Tippy
            tag="div"
            content="Remove this image?"
            @click="onRemoveItem('image')"
            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2"
          >
            <xIcon class="w-4 h-4" />
          </Tippy>
          <div v-if="image_type === 'MP4'">
            <video
              :src="artwork.image"
              class="form-control w-full"
              controls
              autoplay
            ></video>
          </div>
          <div v-else>
            <img :src="artwork.image" class="form-control w-full" />
          </div>
        </div>
        <div v-else>
          <ImageUploader
            id="image"
            v-model="artwork.image"
            :owner_nickname="nickname"
            :sub_bucket="sub_bucket"
            v-on:uploaded="imageUploaded"
          />
        </div>
        <template v-if="v$.artwork.image.$silentErrors">
          <p v-for="error of v$.artwork.image.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>
      </div>

      <!-- <div class="mt-3">
        <label for="image_min" class="form-label">Thumbnail</label>
        <div v-if="artwork.image_min">
          <img :src="artwork.image_min" class="form-control w-full" />
        </div>
        <div v-else>
          <ImageUploader id="image_min" v-model="artwork.image_min" />
        </div>
      </div> -->

      <div class="mt-3">
        <label for="image_min" class="form-label">Thumbnail</label>
        <div v-if="artwork.image_min" class="relative">
          <Tippy
            tag="div"
            content="Remove this image?"
            @click="onRemoveItem('thumbnail')"
            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2"
          >
            <xIcon class="w-4 h-4" />
          </Tippy>
          <div v-if="thumbnail_type === 'MP4'">
            <video
              :src="artwork.image_min"
              class="form-control w-full"
              controls
              autoplay
            ></video>
          </div>
          <div v-else>
            <img :src="artwork.image_min" class="form-control w-full" />
          </div>
        </div>
        <div v-else>
          <ImageUploader
            id="avatar_min"
            v-model="artwork.image_min"
            :owner_nickname="nickname"
            :sub_bucket="sub_bucket"
            v-on:uploaded="thumbnailUploaded"
          />
        </div>
        <template v-if="v$.artwork.image_min.$silentErrors">
          <p
            v-for="error of v$.artwork.image_min.$silentErrors"
            :key="error.$uid"
          >
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>
      </div>

      <div class="mt-3">
        <label for="title" class="form-label">Title</label>
        <input
          id="title"
          type="text"
          class="form-control w-full"
          v-model="artwork.title"
          placeholder=""
        />
        <template v-if="v$.artwork.title.$silentErrors">
          <p v-for="error of v$.artwork.title.$silentErrors" :key="error.$uid">
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>
      </div>

      <div class="mt-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          class="form-control w-full"
          v-model="artwork.description"
        />
        <template v-if="v$.artwork.description.$silentErrors">
          <p
            v-for="error of v$.artwork.description.$silentErrors"
            :key="error.$uid"
          >
            <sub class="text-red-500">{{ error.$message }}</sub>
          </p>
        </template>

        <!-- <input
          id="description"
          type="text"
          class="form-control w-full"
          v-model="artwork.description"
          placeholder="description"
        /> -->
      </div>

      <div class="mt-3">
        <label for="sequence" class="form-label">Sequence</label>
        <input
          id="sequence"
          type="number"
          class="form-control w-full"
          v-model="artwork.sequence"
          placeholder=""
        />
      </div>

      <div class="mt-3">
        <label>Masterpiece</label>
        <div class="mt-2">
          <input
            type="checkbox"
            class="form-check-switch"
            true-value="1"
            false-value="0"
            v-model="artwork.masterpiece"
          />
        </div>
      </div>
      <div class="mt-3">
        <label for="comment" class="form-label">Comment</label>
        <input
          id="comment"
          type="text"
          class="form-control w-full"
          v-model="artwork.comment"
          placeholder="comment"
        />
      </div>
      <div class="flex flex-row-reverse gap-2 mt-5">
        <button type="button" class="btn btn-primary w-20" @click="save">
          save
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary w-20"
          @click="cancel"
        >
          Cancel
        </button>
      </div>
    </div>
    <!-- END: Form Layout -->
  </div>
</template>

<script>
import ImageUploader from "../imageUploader.vue";
import Notify from "../../services/notification.service";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  validations() {
    return {
      artwork: {
        image: {
          required,
        },
        image_min: {
          required,
        },
        title: {
          required,
        },
        description: {
          required,
        },
      },
    };
  },

  components: {
    ImageUploader,
  },

  props: {
    edit_object: Object,
    nickname: String,
  },

  data: function() {
    return {
      artwork: {
        artwork_id: 0,
        image: "",
        image_min: "",
        sequence: 0,
        title: "",
        description: "",
        masterpiece: 0,
        comment: "",
      },
      image_type: "",
      thumbnail_type: "",
      sub_bucket: "artworks",
    };
  },

  // setup: () => ({ v$: useVuelidate() }),

  // validations() {
  //   return {
  //     artwork: {
  //       image: { required },
  //       image_min: { required },
  //       title: { required },
  //     },
  //   };
  // },

  mounted() {
    if (this.edit_object !== undefined) {
      this.artwork.artwork_id = this.edit_object.id;
      this.artwork.image = this.edit_object.image;
      this.artwork.image_min = this.edit_object.image_min;
      this.artwork.sequence = this.edit_object.sequence;
      this.artwork.title = this.edit_object.title;
      this.artwork.description = this.edit_object.description;
      this.artwork.masterpiece = this.edit_object.masterpiece;
      this.artwork.comment = this.edit_object.comment;
    }
  },

  methods: {
    onRemoveItem: function(key) {
      if (key === "image") {
        this.artwork.image = "";
      } else if (key === "thumbnail") {
        this.artwork.image_min = "";
      }
    },

    imageUploaded(param) {
      console.log("imageUploaded ==> ", param);
      this.image_type = param.type;
    },
    thumbnailUploaded(param) {
      console.log("thumbnailUploaded ==> ", param);
      this.thumbnail_type = param.type;
    },

    save: function() {
      if (this.v$.$silentErrors.length !== 0) {
        Notify.error("Validation Error", "Please, Check the Validation.");
      } else {
        if (this.edit_object !== undefined) {
          // 구문 유효성 검사 필요.
          this.editArtwork();
          console.log("editArtwork 실행");
        } else {
          this.addArtwork();
          console.log("addArtwork 실행");
        }
      }
    },

    addArtwork: function() {
      const display_mode = "list";

      this.$emit("addArtwork", this.artwork);
      this.$emit("hideModal", display_mode);
    },

    editArtwork: function() {
      const display_mode = "list";

      this.$emit("editArtwork", this.artwork);
      this.$emit("hideModal", display_mode);
    },

    cancel: function() {
      const display_mode = "list";
      this.$emit("hideModal", display_mode);
    },
  },
};
</script>
