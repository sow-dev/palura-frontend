<template>
    <div class="login-wrapper">
        <div class="sign-wrapper">
            <h1>Welcom to <br><span>PARULA !</span></h1>
            <p>안녕하세요! 파룰라에 오신 것을 환영합니다. <br>
                파룰라는 북미, 좁은 지역에 서식하는 매우 작은 철새입니다. <br>
                희귀 철새로서 환경에 예민하다 알려져 특정 지역에 길들어져 있습니다.<br>
                파룰라와 함께 아름다운 모험을 떠날 준비 되셨나요? <br>
                신묘한 Inspiration을 잔뜩 얻을 수 있을거에요! <br>
            <span> 그럼, 이제 저를 따라오세요 :)</span> 
            </p>
        </div>
        <form>
            <div class="login-navi">
                <a href="#">SIGN IN</a>
                <a href="#">SIGN UP</a>
            </div>
            <div class="input-main">
                <p>Name</p><br>
                <input type="text" placeholder="Name"><br>
                <p>Email</p><br>
                <input type="text" placeholder="E-mail"><br>
                <input type="text" placeholder="Password"><br>
                <input id="checkbox" type="checkbox" name="checktext">
                <label for="checktext">Please sign me up for the newsletter.</label>
            </div>
            <button>Next</button><br>
            <a class="fogotten" href="#">Have you forgotten your password?</a>
        </form>
    </div>
</template>
<style scoped>
form {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    margin-top: 13%;
    float: right;
    text-align: left;
    position:relative;
    color:#262626;
}
.login-wrapper {
    width: 35%;
    height:100vh;
    background-color: #fff;
    position: fixed;
    right:0;
    top:0;
    z-index: 99;
    color: #8a8a8a;
}
.sign-wrapper {
    text-align: left;
    width: 70%;
    margin:0 auto;
    margin-top:30%;
    line-height:16px;
}
.sign-wrapper > h1 {
    font-size: 14px;
    margin-bottom:5%;
}
.sign-wrapper > h1 > span {
    font-weight: 700;
}
.sign-wrapper > p {
    font-size:10px;
}
.sign-wrapper > p > span {
    font-weight: 700;
}
.login-wrapper input {
    width: 300px;
    border-bottom: 1px solid #bababa;
}
/* .login-navi {
    margin-top: 50%;
} */
.login-navi > a {
    text-align: left;
    font-size: 1.2vw;
    font-weight: 600;
}
.login-navi > a:first-child {
    margin-right:10%;
}
.login-navi > a:hover {
    border-bottom: 1px solid #000;
}
.input-main {
    text-align: left;
    font-size:10px;
    margin-top: 20%;
    margin-bottom: 7%;
}
.input-main > input:nth-child(7), .input-main > input:nth-child(3){
    margin-bottom:6%;
}
.input-main > p {
    font-size: 8px;
    font-weight: 600;
}
.input-main > a{
    margin: 30px;
}
button{
    width:85px;
    height:25px;
    font-size: 12px;
    border: 1px solid #000;
    float: right;
    margin-right:15%;
}
form > div {
    margin-left: 10%;
}
.fogotten {
    font-size:8px;
    color:#bababa;
    position:absolute;
    top: 50%;;
    left:0;
}
#checkbox{
    width:30px;
    margin-top:5%;
    margin-left:25%;
}

</style>