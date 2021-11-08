<template>
<div>
<div class="container my-5"></div>
<div class="container ">
  
  <div class="row">
    <div class="offset-md-4 col-md-4 offset-sm-4 col-sm-8">
      <div class="textClipOne ">
      <div class="title h-3">GSAP</div>
      </div>
      <div class="textClipTwo">
      <div class="title h-3">Animation</div>
      </div>
    </div>
  </div>
  

</div>
</div>
</template>

<script>

var topElements = new TimelineMax({delay:.3, yoyo:true, repeat:-1});

topElements.staggerFrom('.phFrame', .5, {opacity:0, y:-33},.24)
  .staggerFrom('.phScreen', .5, {opacity:0},.1)
  .staggerFrom('.topElements', .5, {opacity:0, x:20, y:13},.1)
  .to({},2,{});

var counter = 1;

function looper(){
  
  if (counter == 0){
    $('.textClipOne .h-3').text('GSAP')
    $('.textClipTwo .h-3').text('Animation')
  }
  
  if(counter == 1){
    $('.textClipOne .h-3').text('iPhone X')
    $('.textClipTwo .h-3').text('Illustration')
  }
  
  if(counter == 2){
    $('.textClipOne .h-3').text('Inline')
    $('.textClipTwo .h-3').text('SVG')
    counter = -1;
  }
  
  counter += 1;
  // if(counter == 3){
  //   counter = 0;
  // }
}

TweenMax.from('.h-3',2,{y:20,opacity:0,ease: Power4.easeOut},.2);

var aCounter=1;

var displayAnim = new TimelineMax({delay:.1, repeat:-1});

displayAnim.eventCallback("onRepeat", looper, ["aCounter"]);

displayAnim.staggerFromTo('.h-3',1, {y:200,ease: Power4.easeOut},{y:0},.2)
  
  .to({},2,{})
  .staggerTo('.h-3',1.2, {y:-60,opacity:0,ease: Power4.easeIn},.2,"-=1.2");

export default {

    setup() {
        
    },
    created:function(){
    },
    methods:{

        }
}
</script>

<style scoped>
.textClipOne, .textClipTwo{
  overflow:hidden;
}

.container, .row, .col-md-12{
  overflow:visible !important;
}

.h-3{
  color:#c11f1f;
  font-size:50px;
  line-height: 1;
  margin:0 !important;
  padding:0 !important;
  font-weight:100;
}

.topElements{
  fill:#c11f1f !important;
}



.phScreen{
  overflow:hidden;
}

.phFrame{
  //box-shadow:0 0 200px 20px rgba(0,0,0,.2);
}

.overflowv{
  overflow:visible !important;
}

.topFrame{
  fill:#bec8d2 !important;
}

.roundB{
  fill:#c11f1f !important;
}

.sg{
  color:#cecece;
  font-weight:200 !important;
}
</style>