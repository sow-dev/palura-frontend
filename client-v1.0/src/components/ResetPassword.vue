<template>
    <div class="login-wrapper">
        <form>
            <div class="login-navi">
                <a href="#">RESET YOUR PASSWORD</a>
            </div>
            <div class="input-main">
                <input type="text" placeholder="E-mail"><br>
                <p>* Please check your email inbox to reset your password.</p>
            </div>
            <button>Reset Password</button><br>
            <a class="fogotten" href="#"> &#60; Back to Sign in</a>
        </form>
    </div>
</template>
<style scoped>
form {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    margin-top: 0vh;
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
.login-navi {
    margin-top: 50%;
}
.login-navi > a {
    text-align: left;
    font-size: 1.2vw;
    font-weight: 600;
}
.login-navi > a:first-child {
    margin-right:10%;
}
.login-navi > a{
    border-bottom: 2px solid #000;
}
.input-main {
    text-align: left;
    font-size:10px;
    margin-top: 20%;
    margin-bottom: 7%;
}
.input-main > input {
    margin-bottom:1%;
}
.input-main > p {
    font-size: 8px;
    font-weight: 600;
}
.input-main > a{
    margin: 30px;
}
button{
    width:130px;
    height:25px;
    font-size: 12px;
    border: 1px solid #000;
    float: right;
    margin-right:37%;
}
form > div {
    margin-left: 10%;
}
.fogotten {
    font-size:8px;
    color:#bababa;
    position:absolute;
    top: 35vw;
    left:0;
}
#checkbox{
    width:30px;
    margin-top:5%;
    margin-left:25%;
}

</style>