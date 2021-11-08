<template>
   <div class="new-wrapper">
      <div class="new-middle">
      <div class="new-left">
        
        <h1>작품명은 이곳에<br> 들어갑니다.</h1>
        <p>작품과 작가에 대한 간략한 설명이 들어갑니<br>다. 콜렉터들이 작가
        의 작품 세계가 향하는<br> 방향을 함께 바라보고 그려나갈 수 있는
        설명<br>이면 좋겠죠?! 작품에 대한 설명이 들어갑니<br>다.
        </p>
        <div class="new-navi">
            <svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 24.8047C14.7844 24.8053 14.0837 24.6003 13.4813 24.2141C11.7724 23.1155 8.48564 20.8611 5.70547 18.1082C2.29365 14.7272 0.563477 11.543 0.563477 8.64182C0.563477 6.6259 1.15957 4.77883 2.2875 3.3009C3.3571 1.89561 4.86801 0.890629 6.57753 0.447412C8.28705 0.00419517 10.0959 0.148468 11.7136 0.857053C13.1614 1.48186 14.4527 2.53527 15.5 3.93322C16.5473 2.53186 17.8386 1.47844 19.2864 0.857053C20.9041 0.148468 22.713 0.00419517 24.4225 0.447412C26.132 0.890629 27.6429 1.89561 28.7125 3.3009C29.8404 4.77883 30.4365 6.6259 30.4365 8.64182C30.4365 11.543 28.7063 14.7258 25.2945 18.1055C22.5144 20.8583 19.229 23.1128 17.5187 24.2113C16.9166 24.5986 16.2159 24.8045 15.5 24.8047ZM8.53828 1.90842C7.9976 1.90793 7.45924 1.97919 6.9373 2.12033C5.62729 2.47999 4.47116 3.2589 3.6458 4.33791C2.74756 5.51506 2.27246 7.00393 2.27246 8.64455C2.27246 11.0727 3.83174 13.8481 6.90791 16.8942C9.57393 19.5369 12.7506 21.7135 14.4049 22.7731C14.7315 22.9817 15.111 23.0926 15.4986 23.0926C15.8862 23.0926 16.2657 22.9817 16.5924 22.7731C18.2467 21.7108 21.4206 19.5342 24.0894 16.8942C27.1655 13.8481 28.7248 11.0727 28.7248 8.64455C28.7248 7.00393 28.2497 5.5178 27.3515 4.33791C26.5261 3.2589 25.37 2.47999 24.06 2.12033C21.7241 1.48596 18.4422 2.14904 16.2342 5.91291C16.1589 6.04154 16.0513 6.14822 15.922 6.22236C15.7927 6.2965 15.6463 6.3355 15.4973 6.3355C15.3482 6.3355 15.2018 6.2965 15.0725 6.22236C14.9432 6.14822 14.8356 6.04154 14.7604 5.91291C13.0254 2.95022 10.6219 1.90842 8.53828 1.90842Z" fill="#262626"/>
            </svg>
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
            <path d="M3.01349 17.1315C4.59042 17.1315 5.86877 15.8532 5.86877 14.2762C5.86877 12.6993 4.59042 11.421 3.01349 11.421C1.43656 11.421 0.158203 12.6993 0.158203 14.2762C0.158203 15.8532 1.43656 17.1315 3.01349 17.1315Z" fill="#262626"/>
            <path d="M14.4344 17.1315C16.0113 17.1315 17.2897 15.8532 17.2897 14.2762C17.2897 12.6993 16.0113 11.421 14.4344 11.421C12.8575 11.421 11.5791 12.6993 11.5791 14.2762C11.5791 15.8532 12.8575 17.1315 14.4344 17.1315Z" fill="#262626"/>
            <path d="M25.8555 17.1315C27.4325 17.1315 28.7108 15.8532 28.7108 14.2762C28.7108 12.6993 27.4325 11.421 25.8555 11.421C24.2786 11.421 23.0002 12.6993 23.0002 14.2762C23.0002 15.8532 24.2786 17.1315 25.8555 17.1315Z" fill="#262626"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="28.5526" height="28.5526" fill="white" transform="translate(0.158203)"/>
            </clipPath>
            </defs>
            </svg>
        </div>
        <div class="new-price">
            <p>Price</p>
            <h1>0.02 <span>ETH</span></h1>
            <h3>10% of sales will go to creator</h3>
            <button>Buy Now</button>
        </div>
      </div>
      <div class="new-right">
          <div>1</div>
          <div>1</div>
          <div>1</div>

      </div>
      </div>
      </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.new-wrapper {
    width:100%;
    height: 90vh;
    margin:0 auto;
    margin-top:10%;
}
.new-middle {
    width: 100%;
    height:100%;
    margin: 0 auto;
    display: -webkit-box;
}
.new-navi {
    display: -webkit-box;
    position:absolute;
    right:25%;
    top:32%;
    
}
.new-navi > svg {
    margin-right:40%;
}
.new-price {
    margin-top:30%;
}
.new-price > p {
    font-size: 16px;
    font-weight: 700;
    color: #8a8a8a;
}
.new-price > h1 {
    font-size:32px;
    font-weight:700;
    color:#262626;
}
.new-price > h1 > span {
    font-size: 18px;
}
.new-price > h3 {
    font-size:16px;
}
.new-price > button {
    width:153px;
    height:45px;
    border:1px solid #000;
    margin-top:10%;
}
.new-left {
    width:25%;
    height:100%;
    position:relative;
    margin: 0 auto;
    margin-top:8%;
}
.new-left > h1 {
    font-size:32px;
    font-weight:700;
    color:#262626;
    margin-bottom:10%;
}
.new-right {
    width:75%;
    height:100%;
    background:#ccc;
    position: relative;
}
.new-right > div {
    border: 1px solid #000;
    position: absolute;
    right:0;
}
.new-right > div:nth-child(1){
    width: 880px;
    height: 650px;
    
}
.new-right > div:nth-child(2){
    width:700px;
    height:700px;
}
.new-right > div:nth-child(3){
    width:550px;
    height:750px;
}
</style>