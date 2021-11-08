<template>
<div>
  <div class="modal" v-show="isOpen">
    <div class="modal-content relative">
      <slot>
      </slot>
      <div>
        <span class="close absoulte xl:top-2 xl:right-6 2xl:top-8 2xl:right-12" @click="hide">&times;</span>
          
      </div>
    </div>
  </div>
  <div class="modal3" v-show="isOpen3">

    <div class="modal-content3 relative">
      <slot>
      </slot>
      <div>
        <span class="close absoulte xl:top-2 xl:right-6 2xl:top-8 2xl:right-12" @click="hide">&times;</span>
          
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from "vue";


export default {

  setup() {
    const isOpen = ref(false);
    const isOpen3 = ref(false);
    const hide = () => {
      isOpen.value = false;
      isOpen3.value = false;
    };
    const show = () => {
      isOpen.value = true;
    };
    const show3 = () => {
      isOpen3.value = true;
    };
    return { isOpen, hide, show, show3, isOpen3 };
  },
};
</script>

<style>
.modal, .modal3 {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content , .modal-content3{
  background-color: #ffffff;
  margin: 10% auto;
  padding: 20px;
  /* width: 500px; */
  width:60%;
  height:60%;
  border: 1px solid #888;
  /* padding-top:12vh; */
  max-width:900px;
  max-height:550px;
}

.close {
  padding: 10px;
  cursor: pointer;
  color: #000;
  position:absolute;
  font-size: 28px;
  font-weight: bold;
}
</style>