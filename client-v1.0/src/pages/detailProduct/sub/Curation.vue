<template>
<div class="curation">
  <div class="curation-wrapper">
      <h1>큐레이션 영역</h1>
      <div class="curation-main">
          <div class="main-left">
              <div class="left-album"></div>
          </div>
          <div class="main-right">
              <div class="right-height"></div>
              <div class="right-text">
                  <h1>큐레이션 영역</h1>
                  <p>
                      작품과 작가에 대한 간략한 설명이 들어갑니다. 콜렉터들이 작가의 작품 세계가 향하는<br>
                       방향을 함께 바라보고 그려나갈 수 있는 설명이면 좋겠죠?! 작품과 작가에 대한<br>
                        간략한 설명이 들어갑니다. 콜렉터들이 작가의 작품 세계가 향하는 방향을 함께 바라보고<br>
                         그려나갈 수 있는 설명이면 좋겠죠?! 작품과 작가에 대한 간략한 설명이 들어갑니다.<br>
                          콜렉터들이 작가의 작품 세계가 향하는 방향을 함께 바라보고 그려나갈 수 있는 설명이면 좋겠죠?!
                  </p>
              </div>
          </div>
      </div>
  </div>
    
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.curation {
    width:100%;
    height:100%;
    margin: 0 auto;

}
.curation-wrapper {
    width:100%;
    margin: 0 auto;
    margin-top:20%;
}
.curation-wrapper > h1 {
    font-size:2vw;
    font-weight: 700;
    color: #262626;
}
.curation-main{
    width:100%;
    height: 100%;
    display:-webkit-box;
    margin:0 auto;
    margin-top:10%;
}
.main-left{
    width: 45%;
    height:100%;
}
.main-left2{
    width: 50%;
    height:100%;
}
.main-right2 {
    width:50%;
    height:100%;
}
.left-album {
    width:30vw;
    height:30vw;
    background: #ccc;
    border:1px solid #ccc;
}
.right-album {
    width: 600px;
    height:800px;
    background: #ccc;
    border:1px solid #ccc;
 }
.main-right {
    width:55%;
    position: relative;
}
.right-height{
    width:110%;
    position: relative;
    height:16.7vw;
    border-right:2px solid #000;
}
.right-text{
    width:100%;
    height:100%;
    margin-left:10%;
}
.left-text{
    width: 100%;
    height:100%;
   
}
.right-text > h1, .left-text > h1 {
    font-size: 2vw;
    font-weight: 700;
    color: #262626;
    margin-bottom:5%;
}
.right-text > p, .left-text > p {
    font-size: 1vw;
    font-weight: 500;
    color:#262626;
}
.left-text > p:nth-child(3){
    margin-top:5%;
}
.left-text > h1 {
    margin-top:15%;
    margin-bottom:10%;
}
.line {
    display:flex;
    flex-basis: 100%;
    align-items:center;
}
.line::after {
    content:"";
    flex-grow:1;
    height:1px;
    margin-left:10%;
    border:2px solid #000;
}
.main-left2 {
    width:55%;
}
.main-right2 {
    width:45%;
}
</style>