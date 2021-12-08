<template>
  <div>
    <div class="intro-y grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Blog Layout -->
      <div
        v-for="(i, idx) in idsl"
        :key="idx"
        class="intro-y col-span-12 md:col-span-6 xl:col-span-4 box"
      >
        <div
          class="flex items-center border-b border-gray-200 dark:border-dark-5 px-5 py-4"
        >
          <div class="w-10 h-10 flex-none image-fit">
            <img
              v-if="i.thumbnail"
              alt="thumbnail"
              class="object-fill"
              :src="i.thumbnail"
            />
            <CircleIcon v-if="!i.thumbnail" />
          </div>
          <div class="ml-3 mr-auto">
            <a href="" class="font-medium">{{ i.symbol }} </a>
            <div class="flex text-gray-600 truncate text-xs mt-0.5">
              <a
                class="text-theme-25 dark:text-theme-22 inline-block truncate"
                href=""
                >{{ i.type }}</a
              >

              <!-- <span class="mx-1">•</span> {{ i.blockchain_id }} -->
            </div>
          </div>
          <div class="dropdown ml-3">
            <a
              href="javascript:;"
              class="dropdown-toggle w-5 h-5 text-gray-600 dark:text-gray-300"
              aria-expanded="false"
            >
              <MoreVerticalIcon class="w-5 h-5" />
            </a>
            <div class="dropdown-menu w-40">
              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                <button
                  v-on:click="onEdit(i)"
                  class="flex items-center block p-2 w-full transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                </button>
                <button
                  v-on:click="onDelete(i.id)"
                  class="flex items-center block p-2 w-full transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                >
                  <TrashIcon class="w-4 h-4 mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- <div>
          <img alt="logo image" :src="i.img"
            data-action="zoom" class="object-scale-down" />
        </div> -->

        <div class="divide-y-4 divide-y divide-fuchsia-300">
          <div class="flex justify-between px-10 py-2">
            <div class="block font-medium text-base">Type</div>
            <div class="text-gray-700 dark:text-gray-600 mt-2">
              {{ i.type }}
            </div>
          </div>

          <div class="flex justify-between px-10 py-5">
            <div class="block font-medium text-base">network</div>
            <div class="text-gray-700 dark:text-gray-600 mt-2">
              {{ i.chainName }}
            </div>
          </div>

          <div class="flex justify-between px-10 py-5">
            <div
              class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0"
            >
              <div href="" class="font-medium">Address</div>
              <div class="text-gray-600 text-xs mt-0.5">{{ i.address }}</div>
            </div>
          </div>

          <div class="flex justify-end p-5">
            <span
              v-if="i.enable==1"
              class="py-1 px-2 rounded-full text-xs bg-theme-6 dark:bg-theme-20 text-white cursor-pointer font-medium"
            >
              enable
            </span>
            <span
              v-if="!i.enable"
              class="py-1 px-2 rounded-full text-xs bg-theme-21 dark:bg-theme-20 text-white cursor-pointer font-medium"
            >
              disable
            </span>
          </div>
        </div>

        <!-- <div class="flex items-center justify-center lg:justify-start text-gray-600 mt-5"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail w-3 h-3 mr-2 w-3 h-3 mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> catherinezeta-jones@left4code.com</div> -->
      </div>
      <!-- END: Blog Layout -->
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  components: {},
  data: function() {
    return {};
  },
  created: function() {},
  props: ["idsl"],
  methods: {
    onEdit: function(obj) {
      this.$emit("onEdit", obj);
    },
    onDelete: function(id) {
      this.$emit("onDelete", id);
    },
  },
};
</script>
