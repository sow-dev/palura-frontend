<template>
  <div class="works-main">
      <div class="works-header">
          <h1>Recommended Works</h1>
          <div class="works-wrapper">
              <div class="works1"></div>
              <div class="works2"></div>
              <div class="works3"></div>
              <div class="works4"></div>
              <div class="works1"></div>
              <div class="works2"></div>
              <div class="works3"></div>
              <div class="works4"></div>
          </div>
          <div class="works-wrapper2">
              <div class="works3"></div>
              <div class="works1"></div>
              <div class="works2"></div>
              <div class="works4"></div>
              <div class="works1"></div>
              <div class="works2"></div>
              <div class="works3"></div>
              <div class="works4"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.works-main {
    width: 90%;
    height:100%;
    margin:0 auto;
    background: #fff;
    padding-top:5%;
}
.works-header > h1 {
    font-size:28px;
    font-weight: 700;
    color:#262626;
    width:200px;
    display:contents;
    overflow: hidden;  
}

.works-wrapper,.works-wrapper2 {
    width:100%;
    height:100%;
    overflow: scroll;
    margin-top: 5%;
    display: -webkit-inline-box;
}
.works-wrapper > div,.works-wrapper2 > div {
    margin-right: 5%;
}
.works-wrapper2 {
    margin-bottom:10%;
}
.works1 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
}
.works2 {
    width: 218px;
    height: 273px;
    background: #f7f7f7;
}
.works3 {
    width: 219px;
    height: 408px;
    background: #f7f7f7;
}
.works4 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
}
</style>
