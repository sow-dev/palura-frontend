<template>
    <div v-if="!isHiddens" class="login-wrapper">
        <form>
            <div class="login-navi">
                <a href="#">SIGN IN</a>
                <a href="#">SIGN UP</a>
            </div>
            <div class="input-main">
                <p>Email</p>
                <input type="text" placeholder="E-mail"><br>
                <input type="text" placeholder="Password">
            </div>
            <button>Confirm</button><br>
            <a class="fogotten" href="#">Have you forgotten your password?</a>
        </form>
    </div>
</template>
<script>    
export default {
    props: {
        isHiddens: Boolean,
    },
}
</script>
<style scoped>
form {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    margin-top: 70%;
    float: right;
    text-align: left;
    position:relative;
}
.login-wrapper {
    width: 35%;
    height:100vh;
    background-color: #fff;
    position: fixed;
    right:0;
    top:0;
    z-index: 99;
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
.input-main > input:nth-child(2){
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

</style>