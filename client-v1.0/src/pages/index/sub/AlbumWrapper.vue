<template>
         <div class="album-wrapper w-full h-full mx-auto mt-12 mb-12">
                <h1>입점 예정</h1>
                <p>작가와 작품을 소개합니다.</p>
                <div class="album-main trigger mt-12 w-full h-full flex justify-center" id="trigger1">
                    <div class="albumtile albumtile1 animation1 box inline-block">
                        <div></div>
                        <h1>08AM</h1>
                        <p>대표작품명</p>
                    </div>
                    <div class="albumtile albumtile2 animation1 box inline-block">
                        <h1>잠산</h1>
                        <p>대표작품명</p>
                        <div></div>
                    </div>
                    <div class="albumtile albumtile3 animation1 box inline-block">
                        <div></div>
                        <h1>SANTA</h1>
                        <p>대표작품명</p>
                    </div>
                    <div class="albumtile albumtile4 animation1 box inline-block">
                        <h1>조세민</h1>
                        <p>대표작품명</p>
                        <div></div>
                    </div>
                    <div class="albumtile albumtile5 animation1 box inline-block">
                        <div></div>
                        <h1>윤서희</h1>
                        <p>대표작품명</p>
                    </div>
                </div>
            </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.album-wrapper > h1 {
    font-size: 25px;
    font-weight: 600;
}
.album-main{
    /* width:100%;
    height:100%;
    display: flex;
    justify-content: center;  */
    /* margin-top:1%; */
}
.albumtile{
    width:12%;
    height:100%;
    margin-right:3%;
    

}
.albumtile > div {
    background:#ccc;
    width:100%;
    height:75vh;
    /* height:50vw; */
    /* height:35vw; */
    background-size:cover;
}
.albumtile:nth-child(odd) > div:hover {
    transform: scale(1.1);
    margin-bottom: 40%;
}
.albumtile:nth-child(even) > div:hover {
    transform: scale(1.1);
    margin-top: 40%;
}
.albumtile >h1 {
    margin-top: 10%;
    font-size: 25px;
    font-weight: 600;
}
.albumtile > p {
    margin-bottom: 10%;
    font-size: 13px;
}
.animation1.box {
    transform: translateX(-30px);
    opacity: 0;
    transition: all 0.5s;
    display:block;
}
.animation1.visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 1.1s;
}
.animation1.box:nth-child(2) {
       transition: all 1s;
    }
.animation1.box:nth-child(3) {
       transition: all 1.5s;
    }
.animation1.box:nth-child(4) {
       transition: all 2s;
    }
.animation1.box:nth-child(5) {
       transition: all 2.5s; 
    }


.animation1.visible {
    opacity: 1;
    transform: translateX(0);
    /* transition: all 0.5s; */
  }


</style>