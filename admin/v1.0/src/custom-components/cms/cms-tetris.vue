<template>
<div>
<div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Slide CMS</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary shadow-md mr-2" @click="onSave"> Save </button>
    </div>
</div>
<div class="grid grid-cols-8 gap-6 mt-5">
    <div class="intro-y col-span-8 lg:col-span-6">
        <!-- BEGIN: Transition Form -->
        <div class="intro-y box mt-5">
            <div class="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 dark:border-dark-5">
                <h2 class="font-medium text-base mr-auto">Setting</h2>
            </div>
            <div id="transition-form" class="p-5">
                <div class="form-inline mt-3">
                    <label for="enable" class="form-label sm:w-20">navigator :</label>
                    <input id="enable" class="form-check-switch" type="checkbox" v-model="ds.navigator" />
                </div>
                <div class="form-inline mt-3">
                    <label for="opacity" class="form-label sm:w-20">opacity :</label>
                    <input id="opacity" type="number" class="form-control" min="1" step="5"
                         v-model="ds.opacity" />
                </div>
                <div class="form-inline mt-3">
                    <label for="scale" class="form-label sm:w-20">scale :</label>
                    <input id="scale" type="number" class="form-control" min="1" step="5"
                         v-model="ds.scale" />
                </div>
                <div class="form-inline mt-3">
                    <label for="duration" class="form-label sm:w-20">duration :</label>
                    <input id="duration" type="number" class="form-control" min="1" step="100"
                         v-model="ds.duration" />
                </div>
            </div>
        </div>
    </div>
    <div class="intro-y col-span-16 lg:col-span-6">
    <!-- END: Form -->
    </div>
</div>
<SlideItems v-model="ds.items" />
</div>


<!-- https://nykim.work/86 -->
</template>


<script >

import ContractSelector from '../contract/contractSelector'
import ImageUploader from '../imageUploader'
import UploadService from '../../services/upload.service.js'
import CreatorService from '../../services/creator.service'
import ProductService from '../../services/product.service'
import SlideItems from './cms-slide-items.vue'
import ProductChoice from '../product/productChoice'
import CmsService from '../../services/cms.service'
import Notify from '../../services/notification.service.js'
import cmsService from '../../services/cms.service'

export default {
    setup() {

    },
    components: {
        ContractSelector,
        ImageUploader,
        ProductChoice,
        SlideItems
    },
    created: function () {
        this.loadData()
    },
    mounted: function () {

    },
    props: {},
    data: function () {
        return {
            ds: {
                // type: 'tetris',
                // items: [{
                //     idx: 0,
                //     img: "https://fakeimg.pl/200",
                //     artist:"james",
                //     title:"sweet and fine day !!",
                //     description:"",
                //     connect:true,
                //     style:1,
                //     fit:"cover",
                //     md:0
                // }],
                // init: {},
                // navigator: true,
                // duration: 500,
                // opacity: 10,
                // scale: 10
            }
        }
    },
    methods: {
        loadData() {
            cmsService.getTypeNcode("main", "tetris").then(res => {
                console.log(res)
                this.ds = res.data.content;
            }).catch(err => {
                Notify.error(err)
            })
        },
        onSave() {
            const content = JSON.stringify(this.ds)
            console.log("content::", content)
            CmsService.create("main", "tetris", content).then(res => {
                Notify.success('saved !!')
            }).catch(
                err => {
                    console.log("err:", err)
                    Notify.error(err)
                });
        }
    }
}
</script>

