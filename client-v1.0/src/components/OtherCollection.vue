<template>
  <div class="collection-main">
      <div class="collection-header">
          <h1>Collector’s Collection</h1>
          <div class="header-right">
             <div class="menu">
<!--Style 1-->
                <div class="scroll">
                    FILTER BY
                    <select class="chosen-select" placeholder="Has List Price">
                        <option>Has List Price</option>
                        <option>Consectetur adipiscing</option>
                        <option>Sed do eiusmod tempor</option>
                        <option>Incididunt ut labore</option>
                        <option>Voluptatem accusantium</option>
                        <option>Duis aute irure dolor </option>
                        <option>Nemo enim</option>
                        <option>Consectetur adipiscing</option>
                        <option>Sed do eiusmod tempor</option>
                        <option>Incididunt ut labore</option>
                        <option>Voluptatem accusantium</option>
                        <option>Duis aute irure dolor </option>
                        <option>Nemo enim</option>
                        <option>Consectetur adipiscing</option>
                        <option>Sed do eiusmod tempor</option>
                        <option>Incididunt ut labore</option>
                        <option>Voluptatem accusantium</option>
                        <option>Duis aute irure dolor </option>
                        <option>Nemo enim</option>
                    </select>
                </div>

<!--Style 2-->
                <div class="scroll">
                    SORT BY
                <select class="chosen-select" placeholder="Newest">
                    <option>Newest</option>
                    <option>Consectetur adipiscing</option>
                    <option>Sed do eiusmod tempor</option>
                    <option>Incididunt ut labore</option>
                    <option>Voluptatem accusantium</option>
                    <option>Duis aute irure dolor </option>
                    <option>Nemo enim</option>
                    <option>Consectetur adipiscing</option>
                    <option>Sed do eiusmod tempor</option>
                    <option>Incididunt ut labore</option>
                    <option>Voluptatem accusantium</option>
                    <option>Duis aute irure dolor </option>
                    <option>Nemo enim</option>
                    <option>Consectetur adipiscing</option>
                    <option>Sed do eiusmod tempor</option>
                    <option>Incididunt ut labore</option>
                    <option>Voluptatem accusantium</option>
                    <option>Duis aute irure dolor </option>
                    <option>Nemo enim</option>
                </select>
                </div>
             </div>
          </div>
          <div class="collection-wrapper">
              <div class="collection1"></div>
              <div class="collection2"></div>
              <div class="collection3"></div>
              <div class="collection4"></div>
              <div class="collection1"></div>
              <div class="collection2"></div>
              <div class="collection3"></div>
              <div class="collection4"></div>
          </div>
          <div class="collection-wrapper2">
              <div class="collection3"></div>
              <div class="collection4"></div>
              <div class="collection1"></div>
              <div class="collection2"></div>
              <div class="collection1"></div>
              <div class="collection2"></div>
              <div class="collection3"></div>
              <div class="collection4"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.collection-main {
    width: 90%;
    height:100%;
    margin:0 auto;
    background: #fff;
    padding-top:5%;
}
.collection-header {
    /* display: flex; */
}
.collection-header > h1 {
    font-size:28px;
    font-weight: 700;
    color:#262626;
    width:200px;
    display:contents;
    overflow: hidden;
}
.header-right{
    float: right;
    
}
.menu {
    display: flex;
}
.menu > div {
    margin-right:5%;
}
.scroll {
    font-size:12px;
    color:#8a8a8a;
    line-height:25px;
}
.chosen-select {
    border-bottom: 1px solid #8a8a8a;
    font-size:18px;
    color:#8a8a8a;
    font-weight:500;
}
.collection-wrapper, .collection-wrapper2 {
    width:100%;
    height:100%;
    overflow: scroll;
    margin-top: 5%;
    display: -webkit-inline-box;
}
.collection-wrapper > div, .collection-wrapper2 > div {
    margin-right: 5%;
}
.collection-wrapper2 {
    margin-bottom: 15%;
}
.collection1 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
}
.collection2 {
    width: 218px;
    height: 273px;
    background: #f7f7f7;
}
.collection3 {
    width: 219px;
    height: 408px;
    background: #f7f7f7;
}
.collection4 {
    width: 672px;
    height: 448px;
    background: #f7f7f7;
}
</style>
