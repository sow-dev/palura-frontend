<template>
  <CKEditor
    v-model="modelValue"
    :editor="classicEditor"
    :config="simpleEditorConfig"
    @input="onChanged"
    @focus="onChanged"
    @blur="onChanged"
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import InlineEditor from "@ckeditor/ckeditor5-editor-inline/src/inlineeditor";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import DocumentEditor from "@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import UnderlinePlugin from "@ckeditor/ckeditor5-basic-styles/src/underline";
import StrikethroughPlugin from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import CodePlugin from "@ckeditor/ckeditor5-basic-styles/src/code";
import SubscriptPlugin from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import SuperscriptPlugin from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import EasyImagePlugin from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import ImagePlugin from "@ckeditor/ckeditor5-image/src/image";
import ImageUploadPlugin from "@ckeditor/ckeditor5-image/src/imageupload";
import CloudServicesPlugin from "@ckeditor/ckeditor5-cloud-services/src/cloudservices";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import HeadingButtonsUI from "@ckeditor/ckeditor5-heading/src/headingbuttonsui";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import UndoPlugin from "@ckeditor/ckeditor5-undo/src/undo";
import Enter from "@ckeditor/ckeditor5-enter/src/enter";

export default {
  setup() {
    const date = ref("");
    const classicEditor = ClassicEditor;
    const inlineEditor = InlineEditor;
    const balloonEditor = BalloonEditor;
    const documentEditor = DocumentEditor;
    const simpleEditorConfig = {
      plugins: [
        ParagraphPlugin,
        BoldPlugin,
        UnderlinePlugin,
        ItalicPlugin,
        LinkPlugin,
        UndoPlugin,
        Enter,
      ],
      toolbar: {
        items: ["bold", "italic", "underline", "link"],
      },
    };
    const editorConfig = {
      cloudServices: {
        tokenUrl: "",
        uploadUrl: "",
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
        Highlight,
      ],
      toolbar: {
        items: [
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
          "subscript",
          "superscript",
          "link",
          "undo",
          "redo",
          "imageUpload",
          "highlight",
        ],
      },
    };
    const editorData = ref("<p>Content of the editor.</p>");
    const initDocumentEditor = (editor) => {
      const toolbarContainer = document.querySelector(
        ".document-editor__toolbar"
      );
      toolbarContainer?.appendChild(editor.ui.view.toolbar.element);
      const win = window;
      win.editor = editor;
      this.editor = editor;
      console.log("###editor::", editor);
      editor.model.document.on("change:data", () => {
        console.log("The data has changed!");
      });
    };

    return {
      date,
      classicEditor,
      inlineEditor,
      balloonEditor,
      documentEditor,
      simpleEditorConfig,
      editorConfig,
      editorData,
      initDocumentEditor,
    };
  },
  components: {},
  created: function() {
    // const ckeditor =this.$refs.ckeditor;
    console.log("ckeditor:::", this.editor);
  },
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
  mounted: function() {
    // this.classicEditor.create(document.querySelector("#editor"), editorConfig).then(
    //   editor => {
    //     // this.editor = editor;
    //     this.editor.model.document.on("change", () => {
    //       this.updateContent(this.editor.getData());
    //       console.log("@@@", this.editor.getData())
    //     });
    //   }
    // );
  },
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data: function() {
    return {
      creatorList: [],
      editor: ClassicEditor,
    };
  },
  methods: {
    onChanged() {
      // console.log(this.modelValue)
      this.$emit("update:modelValue", this.modelValue);
    },
  },
};
</script>
