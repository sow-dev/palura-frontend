<template>
<div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 class="text-lg font-medium mr-auto">Image items</h2>
        
        <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
            <div class="dropdown ml-auto sm:ml-0">
                <button class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300" aria-expanded="false">
                    <span class="w-5 h-5 flex items-center justify-center">
                        <PlusIcon class="w-4 h-4" />
                    </span>
                </button>
                <div class="dropdown-menu w-40">
                    <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <!-- data-toggle="modal" data-target="#product-choice-modal" -->
                        <a href="javascript:;" v-on:click="onModalProduct()"
                            class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                            <BoxIcon class="w-4 h-4 mr-2" /> Choice Product
                        </a>
                        <a href="javascript:;" @click="addItem"
                            class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                            <ImageIcon class="w-4 h-4 mr-2" /> Image
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pos intro-y grid grid-cols-24">
        <!-- BEGIN: Item List -->
        <div class="intro-y col-span-12 lg:col-span-8">

            <div v-if="items &&items.length" class="grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-31">
                <div v-for="(item, idx) in items" :key="idx"
                    class="intro-y block col-span-12 sm:col-span-3 xxl:col-span-2 cursor-move">
                    <div id="image">
                        <div v-if="item.img.length > 0" class="box rounded-md p-3 relative zoom-in">
                        <Tippy tag="div" content="Remove this image?" @click="onRemoveItem(idx)"
                            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2">
                            <xIcon class="w-4 h-4" />
                        </Tippy>
                        <div class="flex-none pos-image relative block">
                            <div class="pos-image__preview image-fit">
                                <img alt="image" :src="item.img" />
                            </div>
                        </div>
                        <div class="block font-medium text-center truncate mt-3">
                            <a href="javascript:;" data-toggle="modal" data-target="#add-item-modal">
                                {{ idx }}
                            </a>
                        </div>
                    </div>
                    <div v-else class="box rounded-md p-3 relative zoom-in">
                        <ImageUploader v-model="item.img" :address="''" />
                    </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- END: Item List -->

    </div>

    <!-- BEGIN: product choice Modal Content -->
    <div id="product-choice-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true"
        ref="assetModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="font-medium text-base mr-auto">
                        Product list
                    </h2>
                    <a href="javascript:;" data-dismiss="modal">
                        <XIcon class="w-4 h-4 mr-2" /></a>
                </div>
                <!-- END: Modal Header -->
                <!-- BEGIN: Modal Body -->
                <div class="modal-body h-4/6">
                    <ProductChoice :idsl="product_list" v-on:onSelected="onSelectProduct" />
                </div>
                <!-- END: Modal Body -->
                <!-- BEGIN: Modal Footer -->
                <div class="modal-footer text-right">
                    <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                        Cancel
                    </button>
                </div>
                <!-- END: Modal Footer -->
            </div>
        </div>
    </div>
    <!-- END: Product choice Modal-->
</div>

</template>

<script >

import ContractSelector from '../contract/contractSelector'
import ImageUploader from '../imageUploader'
import ProductService from '../../services/product.service'
import ProductChoice from '../product/productChoice'
import UploadService from '../../services/upload.service.js'
import CreatorService from '../../services/creator.service'

export default {
    setup() {
    
  },
    components: {
        ContractSelector,
        ImageUploader
    },
    created: function () {

    },
    props: ["modelValue"],
    emits:['update:modelValue'],
    computed: {
        items: {
            get() {
                //console.log('this.modelValue',this.modelValue)
                return this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            }
        }
    },
    data: function () {
        return {
             product_list:[]
        }
    },
    methods: {
        loadProduct() {
            ProductService.listPaging(0, 10).then(
                res => {
                    console.log("ResInfo11:", res)
                    console.log(res.data.image)
                    this.product_list = res.data

                })
        },
        onModalProduct:function(){
            this.loadProduct();
            cash("#product-choice-modal").modal("show");
        },
        onSelectProduct(selected) {
            //this.product_list
            console.log('item::::',selected.image)
            this.ds.push({
                idx: this.items.length,
                img: selected.image
            })
            cash("#product-choice-modal").modal("hide");
        },
        addItem() {
            console.log("item:", this.items)
            this.items.push({
                idx: this.items.length,
                img: ""
            })
        },
        onRemoveItem(idx){
            this.items.splice(idx, 1)
        }
    }
}
</script>