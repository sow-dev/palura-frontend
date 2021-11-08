<template>
    <p>
        <span class="text__first">
            <span class="text__word">Hello</span>
            <span class="text__first-bg"></span>
        </span>
        <br />
          <span class="text__second">
            <span class="text__word">World</span>
            <span class="text__second-bg"></span>
        </span>

        <button @click="onTextEffect">restart </button>
    </p>

</template>

<script>
// envelope animation
import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";



export default {
    setup() {
        
    },
     created: function() {
        //this.onTextEffect()
    },
    methods:{
        onTextEffect(){
            //var tl = new gsap({delay: 1}),
            let firstBg = document.querySelectorAll('.text__first-bg'),
            secBg = document.querySelectorAll('.text__second-bg'),
            word  = document.querySelectorAll('.text__word');
            
            gsap.to(firstBg, {duration:0.2, scaleX:1})
            gsap.to(secBg, {duration:0.2, scaleX:1})
            gsap.to(word, {duration:0.1, opacity:1})  
            gsap.to(firstBg, {duration:0.2, scaleX:0})
            gsap.to(secBg, {duration:0.2, scaleX:0});
            }
        }
}
</script>

<style scoped>

.text{
  display: inline-block;
  font-size: 15vmin;
  line-height: 1.205;
}

.text__first, .text__second{
  position: relative;
}

.text__word{
  opacity: 0;
}

.text__first-bg, .text__second-bg{
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  transform-origin: left;
  transform: scaleX(0);
}

.text__first-bg{
  background-color: #5fbff9;
}

.text__second-bg{
  background-color: #f06543;
}

.text__second{
  margin-left: 15vmin;
}

.restart{
  position: absolute;
  font-size: 12px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border: none;
  border-bottom: 1px dotted grey;
  padding: 0;
  margin: 0 auto 2%;
  cursor: pointer;
  color: grey;
}
</style>