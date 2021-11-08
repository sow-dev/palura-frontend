<template>

<div>
<div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Carousel CMS</h2>
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
            <div class="form-check">
                <input id="autoplay" class="form-check-switch" type="checkbox" v-model="ds.autoplay" />
                <label class="form-check-label" for="autoplay">auto play</label>
            </div>
            <div class="form-check mt-2">
                <input id="loop" class="form-check-switch" type="checkbox" v-model="ds.loop" />
                <label class="form-check-label" for="loop">loop</label>
            </div>
            <div class="form-check mt-2">
                <label class="form-check-label" for="timingFunc">Timing function</label>
                <div class="flex flex-col sm:flex-row items-center">
                
                <select id="timingFunc" class="form-select m-2 sm:mr-2" aria-label="Default select example">
                  <option>ease</option>
                  <option>ease-in</option>
                  <option>ease-out</option>
                  <option>ease-in-out</option>
                  <option>linear</option>
                  <option>cubic-bezier(0.1, 0.7, 1.0, 0.1)</option>
                  <option>step-start</option>
                  <option>step-end</option>
                  <option>steps(4, end)</option>
                  <option>ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1)</option>
                </select>
              </div>
            </div>
  
            <div class="mt-0">
                <label class="form-label"></label>
                <div class="sm:grid grid-cols-2 gap-2">
                    <div class="input-group">
                        <div id="lb_amount" class="input-group-text w-24">display amount</div>
                        <input type="number" class="form-control" id="amount" min="1" step="1" aria-describedby="input-group-3" v-model="ds.displayAmount"  />
                    </div>
             
                </div>
            </div>
            <div class="mt-0">
                <label class="form-label"></label>
                <div class="sm:grid grid-cols-2 gap-2">
                    <div class="input-group">
                        <div id="lb_amount" class="input-group-text w-24">Speed</div>
                        <input type="number" class="form-control" id="amount" min="1" step="1" aria-describedby="input-group-3" v-model="ds.speed"  />
                    </div>
                    <div class="input-group">
                        <div id="input-group-3" class="input-group-text w-24">interval</div>
                        <input id="royalties" type="number" class="form-control w-full" min="1" max="50" step="1" placeholder="" v-model="ds.interval"  />
                    </div>
                </div>
            </div>
            <div class="mt-0">
                <label class="form-label"></label>
                <div class="sm:grid grid-cols-2 gap-2">
                    <div class="input-group">
                        <div id="lb_amount" class="input-group-text w-24">Height</div>
                        <input type="number" class="form-control" id="amount" min="1" step="1" aria-describedby="input-group-3" v-model="ds.height" />
                    </div>
                    <div class="input-group">
                        <div id="input-group-3" class="input-group-text w-24">item width</div>
                        <input id="royalties" type="number" class="form-control w-full" min="1" max="50" step="1" placeholder="" v-model="ds.itemWidth" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="intro-y col-span-16 lg:col-span-6">
    <!-- END: Transition Form -->
   
    
    </div>
    </div>

<CmsItems v-model="ds.items" />


</div>

</template>


<script >

import ContractSelector from '../contract/contractSelector'
import ImageUploader from '../imageUploader'
import UploadService from '../../services/upload.service.js'
import CreatorService from '../../services/creator.service'
import ProductService from '../../services/product.service'
import CmsItems from './cms-items'
import ProductChoice from '../product/productChoice'
import CmsService from '../../services/cms.service'
import Notify from '../../services/notification.service.js'

export default {
    setup() {

    },
    components: {
        ContractSelector,
        ImageUploader,
        ProductChoice,
        CmsItems
    },
    created: function () {
        this.loadProduct()
        this.loadData()
    },
    mounted: function () {

    },
    props: {
        ds11: {
            type: String,
            items: Array,
            init_animation: Object,
            speed: Number,
            autoplay: Boolean,
            interval: Number,
            loop: Boolean,
            displayAmount: Number,
            itemWidth: Number,
            height: Number,
            timingFunction: String,
            pauseOnHover: Boolean,
            arrowVisible: String
        },
    },
    data: function () {
        return {
            ds: {
                type: 'album',
                items: [{
                    idx: 0,
                    img: "https://fakeimg.pl/300"
                }],
                init_animation: {},
                speed: 500,
                autoplay: true,
                interval: 3000,
                loop: true,
                displayAmount: 4,
                itemWidth: 120,
                height: 80,
                timingFunction: "ease",
                pauseOnHover: true,
                arrowVisible: "default"
            }
        }
    },
    methods: {
        loadData() {
            cmsService.getTypeNcode("main", "carousel").then(res => {
                console.log(res)
                // this.ds = res[0]
                this.ds = res.data.content
            }).catch(err => {
                Notify.error(err)
            })
        },
        onSave() {
            const content = JSON.stringify(this.ds)
            console.log("content::", content)
            console.log("this.CmsService", CmsService)
            CmsService.create("main", "carousel", content).then(res => {
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

