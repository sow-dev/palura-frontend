<template>
  <div class="flex w-full bg-grey-lighter">
    <div v-if="loading" class="form-control col-span-12 lg:col-span-6">
      <div
        class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center"
      >
        <LoadingIcon icon="tail-spin" class="w-8 h-8" />
      </div>
    </div>

    <div v-if="!loading" class="flex w-full bg-grey-lighter">
      <label
        class="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue-100 cursor-pointer hover:bg-blue-500 hover:text-white"
      >
        <svg
          class="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
          />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
        <!-- <input type="file" class="hidden" @change="onHandleChange" /> -->
        <input
          type="file"
          class="hidden"
          accept=".png, .jpeg, .jpg, .gif, .mp4"
          @input="onHandleChange"
        />
      </label>
    </div>
  </div>
  <!-- <div>
    <input type="file"  @change="onHandleChange" placeholder="" />
</div>     -->
</template>

<script>
import UploadService from "../services/upload.service.js";
import Notify from "../services/notification.service";

export default {
  data: function() {
    return {
      ds: [],
      loading: false,
    };
  },
  created: function() {},
  computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  props: {
    modelValue: String,
    owner_nickname: String,
    sub_bucket: String,
  },
  emits: ["update:modelValue", "options"],
  methods: {
    onHandleChange(event) {
      console.log("this.owner_nickname ==> ", this.owner_nickname);
      if (!this.owner_nickname) {
        Notify.error("Error", "owner_nickname is empty");
        //오너 아이디 입력 후 다시 같은 그림(value)를 입력할 수 있도록 하기 위해서 input이 value를 null 처리함.
        event.target.value = null;
      } else {
        console.log("event.target.files ==> ", event.target.files);
        console.log("MediaInfo ==> ", MediaInfo);
        const file = event.target.files[0];
        console.log("file received ==> ", file);
        this.loading = true;
        MediaInfo(
          {
            format: "JSON",
          },
          (mediaInfo) => {
            if (file) {
              const reader = new FileReader();
              const getSize = () => file.size;
              const readChunk = (chunkSize, offset) =>
                new Promise((resolve, reject) => {
                  reader.onload = (event) => {
                    if (event.target.error) {
                      reject(event.target.error);
                    }
                    resolve(new Uint8Array(event.target.result));
                  };
                  reader.readAsArrayBuffer(
                    file.slice(offset, offset + file.size)
                  );
                });

              mediaInfo
                .analyzeData(getSize, readChunk)
                .then((info) => {
                  // this.$refs.ta.value = JSON.stringify(result, null, 2);
                  console.log(
                    "JSON.stringify(file) ==> ",
                    JSON.stringify(file)
                  );
                  console.log("info ==> ", info);
                  console.log("owner_nickname ==> ", this.owner_nickname);
                  console.log(
                    "JSON.stringify(reader) ==> ",
                    JSON.stringify(reader)
                  );

                  UploadService.media(
                    file,
                    this.owner_nickname,
                    this.sub_bucket,
                    info,
                    reader
                  ).then((res) => {
                    this.loading = false;
                    console.log("uploaded ==> ", res);
                    const imgPath =
                      "https://parular-contents-way.s3.ap-northeast-2.amazonaws.com/" +
                      res.path;
                    this.inputVal = imgPath;
                    this.$emit("uploaded", {
                      id: res.id,
                      type: res.type,
                      name: res.name,
                      path: imgPath,
                      done: true,
                    });

                    //update state => 1
                    UploadService.updateSate(res.id).then((res2) => {
                      console.log("updateSteate res2 ==> ", res2);
                    });
                  });
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          }
        );
      }
    },
  },
};
</script>
