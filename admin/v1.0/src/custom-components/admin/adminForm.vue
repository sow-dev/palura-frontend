<template>
<div>
    <div class="grid ">
        <div class="intro-y col-span-12 lg:col-span-6">

            <div class="intro-y box p-5">
                <div class="mt-3">
                    <label for="name" class="form-label">유 아이디(숫자)</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.user_id" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">퍼블릭 아이디</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.public_id" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">퍼블릭 이름</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.public_name" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">이름</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.name" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">영문 이름</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.name_eng" placeholder="" />
                </div>
                <div class="mt-3">
                    <label>상세 설명</label>
                    <div class="mt-2">
                        <CKEditor v-model="ds.description" :editor="classicEditor" :config="simpleEditorConfig" />
                    </div>
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">프로필 아이디</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.profile_id" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="image" class="form-label">이미지등록</label>
                    <!-- <input id="image" type="file" v-on:change="image" @change="handleChange"
                        placeholder="" /> -->
                    <ImageUploader id="image" v-model="ds.avata_1" :address="ds.selectedCreator" v-on:uploaded="imageUploaded" />
                </div>
                <div class="mt-3">
                    <label for="thumbnail" class="form-label">메인 이미지등록</label>
                    <ImageUploader id="thumbnail" v-model="ds.avata_1_min" :address="ds.selectedCreator" v-on:uploaded="thumbnailUploaded" />
                </div>
                <div class="mt-3">
                    <label for="thumbnail" class="form-label">섬네일이미지등록</label>
                    <ImageUploader id="thumbnail" v-model="ds.avata_1_id" :address="ds.selectedCreator" v-on:uploaded="thumbnailUploaded" />
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">role</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.role" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">대표작품명</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.masterpiece" placeholder="" />
                </div>
                
                


                <!-- <p><span> contract_id: </span></p><input type="text" id="contract_id" v-model="contract_id"> -->
                            

                <!-- <div class="mt-3">
                    <label>Ena1e</label>
                    <div class="mt-2">
                        <input type="checkbox" class="form-check-switch" v-model="ds.enable" />
                    </div>
                </div> -->
                
            </div>
            <!-- END: Form Layout -->
        </div>
    </div>
</div>
</template>

<script >

import ContractSelector from '../contract/contractSelector'
import ImageUploader from '../imageUploader'
import UploadService from '../../services/upload.service.js'
import CreatorService from '../../services/creator.service'

import { defineComponent, ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor'
import DocumentEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor'
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline'
import StrikethroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import CodePlugin from '@ckeditor/ckeditor5-basic-styles/src/code'
import SubscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/subscript'
import SuperscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/superscript'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import EasyImagePlugin from '@ckeditor/ckeditor5-easy-image/src/easyimage'
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image'
import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload'
import CloudServicesPlugin from '@ckeditor/ckeditor5-cloud-services/src/cloudservices'
import Font from '@ckeditor/ckeditor5-font/src/font'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'


export default {
    setup() {
    const date = ref('')
    const classicEditor = ClassicEditor
    const inlineEditor = InlineEditor
    const balloonEditor = BalloonEditor
    const documentEditor = DocumentEditor
    const simpleEditorConfig = {
      plugins: [
        ParagraphPlugin,
        BoldPlugin,
        UnderlinePlugin,
        ItalicPlugin,
        LinkPlugin
      ],
      toolbar: {
        items: ['bold', 'italic', 'underline', 'link']
      }
    }
    const editorConfig = {
      cloudServices: {
        tokenUrl: '',
        uploadUrl: ''
      },
      plugins: [
        Font,
        EssentialsPlugin,
        BoldPlugin,
        UnderlinePlugin,
        StrikethroughPlugin,
        ItalicPlugin,
        LinkPlugin,
        ParagraphPlugin,
        CodePlugin,
        SubscriptPlugin,
        SuperscriptPlugin,
        EasyImagePlugin,
        ImagePlugin,
        ImageUploadPlugin,
        CloudServicesPlugin,
        Heading,
        HeadingButtonsUI,
        Highlight
      ],
      toolbar: {
        items: [
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'code',
          'subscript',
          'superscript',
          'link',
          'undo',
          'redo',
          'imageUpload',
          'highlight'
        ]
      }
    }
    const editorData = ref('<p>Content of the editor.</p>')
    const initDocumentEditor = editor => {
      const toolbarContainer = document.querySelector(
        '.document-editor__toolbar'
      )
      toolbarContainer?.appendChild(editor.ui.view.toolbar.element)
      const win = window
      win.editor = editor
    }

    return {
      date,
      classicEditor,
      inlineEditor,
      balloonEditor,
      documentEditor,
      simpleEditorConfig,
      editorConfig,
      editorData,
      initDocumentEditor
    }
  },
    components: {
        ContractSelector,
        ImageUploader
    },
    created: function () {

    },
    props: {
        ds: {
           user_id:String, 
           public_id:String,
           public_name:String,
           name:String,
           name_eng:String,
           description:String,
           image:String,
           thumbnail:String,
           avata_1:String, 
           avata_1_min:String, 
           avata_1_id:String, 
           role:String, 
           profile_id:String,
            sourceImg:{
                done:Boolean,
                img:String
            },
            sourceMainImg:{
                done:Boolean,
                img:String
            },
            sourceThumnails:{
                done:Boolean,
                img:String
            },
            bshows: Boolean,
            selectedCreator:String,
            // name:String,
            // description:String,
            // sale:String,
            // price:String,
            // network_id:String,
            // purchased:String,
            // image:String,
            // thumbnail:String,
            // numberOfToken:Number,
            // royal:Number,
            // proper1:String,
            // proper2:String,
            // creator_id:String,
            // owner_id:String,
            // creatorInfo:Array,
            // selectToken:String,
            // source:{
            //     done:Boolean,
            //     img:String,
            // },
            // source2:{
            //     done:Boolean,
            //     img:String,
            // },
            // bshows: Boolean,
            // selectedCreator:String
        },
    },
    data: function () {
        return {
            creatorList:[]
        }
    },
    methods: {
        // loadCreator(){
        //     CreatorService.list().then(
        //         res => {
        //         this.creatorList = res.data
        //         console.log("creatorList:", res.data)
        //     })
        // },
        imageUploaded(param) {
            console.log("param:::", param)
        },
        thumbnailUploaded(param) {
            console.log("param:::", param)
        }

    }
}
</script>
