<template>
  <div class="header">
      <router-link to="/artist">작가관리</router-link> 
      <router-link to="/product">상품관리</router-link> 
      <router-link to="/customer">고객관리</router-link> 
      <router-link to="/trade">거래관리</router-link> 
      <router-link to="/jobs">콘텐츠관리</router-link> 
      <router-link to="/product">기타설정</router-link> 
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .header {
    width:100%;
    height:50px;
    color:white;
    background-color: #ffffff;
    display:flex;
    padding:15px 0;
    justify-content:center;
  }
  .header .router-link-exact-active{
     color:#35495e
  }
  .header a {
    width:15%;
    height:100%;
    text-align: center;
    line-height:50px;
    color: black;
    font-size: 25px;
    border: 2px solid #000;
    text-decoration: none;
    margin: 0 5px;
  }
</style>