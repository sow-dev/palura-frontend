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
                    <div id="add-item-menu" class="dropdown-menu__content box dark:bg-dark-1 p-2">
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
                <div v-for="(i, idx) in items" :key="idx"
                    class="intro-y block col-span-12 sm:col-span-4 xxl:col-span-2 cursor-move">
                    <div v-if="i.img!=''" class="intro-y blog col-span-12 md:col-span-6 box">
                        <div class="blog__preview image-fit">
                            <img alt="image" class="rounded-t-md"
                                :src="i.img" />
                            <div class="absolute w-full flex items-center px-5 pt-6 z-10">
                                <!-- <div class="w-10 h-10 flex-none image-fit">
                                    <img alt="image" class="rounded-full"
                                        :src="'https://fakeimg.pl/200'" />
                                </div> -->
                                <div class="ml-3 text-white mr-auto">
                                    <a href="" class="font-medium">{{i.title}}</a>
                                    <div class="text-xs mt-0.5">{{i.artist}}</div>
                                </div>
                                <div class="dropdown ml-3">
                                    <a href="javascript:;"
                                        class="blog__action dropdown-toggle w-8 h-8 flex items-center justify-center rounded-full"
                                        aria-expanded="false">
                                        <MoreVerticalIcon class="w-4 h-4 text-white" />
                                    </a>
                                    <div id="config-item" class="dropdown-menu w-40">
                                        <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                                            <a href="javascript:;" @click="onEdit(i)"
                                                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                                                <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                                            </a>
                                            <a href="javascript:;" @click="onRemoveItem(idx)"
                                                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md">
                                                <TrashIcon class="w-4 h-4 mr-2" /> Delete
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                                <span v-if="i.style==0" class="blog__category px-2 py-1 rounded">BG image style</span>
                                <span v-if="i.style==1" class="blog__category px-2 py-1 rounded">Lable style</span>
                            </div>
                        </div>
                        <!-- <div class="p-5 text-gray-700 dark:text-gray-600">
                        </div>
                        <div class="px-5 py-3 border-t border-gray-200 dark:border-dark-5">
                        </div>
                        <div class="px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">                            
                        </div> -->
                        <div id="transition-form" class="p-5">
                            <!-- <div class="px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">
                                <label for="connect" class="form-label sm:w-20">connect</label>
                                <input id="connect" class="form-check-switch form-control-sm " type="checkbox" v-model="i.connect" />
                            </div> -->
                           
                            <div class="px-5 pt-3 pb-0d border-t border-gray-200 dark:border-dark-5">
                                 <span v-if="i.connect==0" class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer" >connected</span>
                                  <span v-if="i.connect==1" class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer" >disconnected</span>
                                <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                                    {{i.fit}}
                                </div>
                            </div>
                           
                            <div class="px-5 pt-3 pb-5 border-t border-gray-200 dark:border-dark-5">
                                <!-- <label for="description" class="form-label sm:w-20">description :</label>
                                <input id="description" type="textbox" class="form-control form-control-sm" v-model="i.description" /> -->
                                <div class="p-5 text-gray-700 dark:text-gray-600 line-clamp-5">
                                    {{i.description}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="box rounded-md p-3 relative zoom-in">
                        <Tippy tag="div" content="Remove this image?" @click="onRemoveItem(idx)"
                            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2">
                            <xIcon class="w-4 h-4" />
                        </Tippy>
                        <ImageUploader v-model="i.img" :address="''" />
                    </div>
                    <!-- <div v-if="i.md==0" id="image">
                        <div v-if="i.img.length > 0" class="box rounded-md p-3 relative zoom-in">
                        <Tippy tag="div" content="Remove this image?" @click="onRemoveItem(idx)"
                            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-21 right-0 top-0 -mr-2 -mt-2">
                            <xIcon class="w-4 h-4" />
                        </Tippy>
                        <div class="flex-none pos-image relative block">
                            <div class="pos-image__preview image-fit">
                                <img alt="image" :src="i.img" />
                            </div>
                        </div>
                        <div class="block font-medium text-center truncate mt-3">
                            <a href="javascript:;" data-toggle="modal" data-target="#add-item-modal">
                                {{ idx }}
                            </a>
                        </div>
                    </div>
                    <div v-else class="box rounded-md p-3 relative zoom-in">
                        <ImageUploader v-model="i.img" :address="''" />
                    </div>
                    </div> -->
                </div>

            </div>
        </div>
        <!-- END: Item List -->

    </div>


 <!-- BEGIN: edit Modal Content -->
    <div id="edit-modal" class="modal" data-backdrop="static" tabindex="-1" aria-hidden="true" >
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="font-medium text-base mr-auto">
                        Edit
                    </h2>
                    <a href="javascript:;" data-dismiss="modal">
                        <XIcon class="w-4 h-4 mr-2" /></a>
                </div>
                <!-- END: Modal Header -->
                <!-- BEGIN: Modal Body -->
                <div class="modal-body h-4/6">
                  
                        <div id="transition-form" class="p-5">
                            <div class=" mt-3">
                                <label for="title" class="form-label sm:w-20">Title :</label>
                                <input id="title" type="text" class="form-control form-control-sm" v-model="selected.title" />
                            </div>
                            <div class="form-inline mt-3">
                                <label for="connect" class="form-label sm:w-20">Connect :</label>
                                <input id="connect" class="form-check-switch form-control-sm " type="checkbox" v-model="selected.connect" />
                            </div>
                            <div class="mt-3">
                                <label for="fit" class="form-label sm:w-20">Object Fit :</label>
                                <select id="fit" class="form-select form-select-sm m-2 sm:mr-2 form-control-sm " v-model="selected.fit">
                                    <option value="cover">Cover</option>
                                    <option value="fill">Fill</option>
                                    <option value="none">None</option>
                                    <option value="scale-down">Scale-down</option>
                                </select>
                            </div>
                            <div class=" mt-3">
                                <label for="artist" class="form-label sm:w-20">Artist :</label>
                                <input id="artist" type="text" class="form-control form-control-sm" v-model="selected.artist" />
                            </div>
                            <div class=" mt-3">
                                <label for="style" class="form-label sm:w-20">Style :</label>
                                <div class="flex flex-col sm:flex-row mt-2">
                                    <div class="form-check mr-2">
                                        <input id="radio-switch-4" class="form-check-input" type="radio" v-model="selected.style"
                                            name="horizontal_radio_button" value="0" />
                                        <label class="form-check-label" for="radio-switch-4">Bg Image</label>
                                    </div>
                                    <div class="form-check mr-2 mt-2 sm:mt-0">
                                        <input id="radio-switch-5" class="form-check-input" type="radio" v-model="selected.style"
                                            name="horizontal_radio_button" value="1" />
                                        <label class="form-check-label" for="radio-switch-5">Lable</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <label for="description" class="form-label sm:w-20">description :</label>
                                <input id="description" type="textbox" class="form-control form-control-sm" v-model="selected.description" />
                            </div>

                    </div>

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
        ImageUploader,
        ProductChoice
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
             product_list:[],
             selected:{},
        }
    },
    methods: {
        loadProduct() {
            ProductService.listPaging(0, 10).then(
                res => {
                    // console.log("ResInfo11:", res.data)
                    console.log(res.data)
                    this.product_list = res.data;

                })
        },
        onModalProduct:function(){
            this.loadProduct();
            cash("#add-item-menu").dropdown('hide')
            cash("#product-choice-modal").modal("show");
        },
        onSelectProduct(obj) {
            //this.product_list
            console.log('item::::',JSON.stringify(obj))

            ProductService.productJoinCreator(obj.id).then(res=>{
                console.log("[productJoinCreator res]:", res.data[0])
                this.items.push({
                idx: this.items.length,
                img: obj.image,
                artist: res.data[0].public_name,
                title:obj.name,
                description:obj.description,
                connect:true,
                style:1,
                fit:"cover",
                md:0
            })
            })
            
            cash("#product-choice-modal").modal("hide");
        },
        addItem() {
            console.log("item:", this.items)
            this.items.push({
                idx: this.items.length,
                img: "",
                artist:"",
                title:"",
                description:"",
                connect:false,
                style:0,
                fit:"cover",
                md:1
            })
            cash("#add-item-menu").dropdown('hide')
        },
        onEdit(obj){
            this.selected = obj;
            cash('#config-item').modal("hide")
            cash("#edit-modal").modal("show");
        },
        onRemoveItem(idx){
            this.items.splice(idx, 1)
            cash('#config-item').modal("hide")
            cash("#add-item-menu").dropdown('hide')
        }
    }
}
</script>