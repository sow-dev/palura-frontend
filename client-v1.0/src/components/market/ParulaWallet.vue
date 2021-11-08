<template>
    <div class="login-wrapper" v-if="!isHiddens">
        <div class="form">
            <div class="login-navi">
                <a href="#">CONNECT YOUR WALLET</a>
            </div>
            <div class="input-main">
               <p>Metamask</p>
               <p>Wallet Connect</p>
               <p>Wallet Link</p>
               <p>Kaikas</p>
            </div>
            <button>Next</button><br>
            <a class="Home" href="#">&#60; Back to Home</a>
        </div>
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
.form {
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
    border-bottom: 2px solid #000;
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
.input-main > p:hover {
    background: #000;
    color:#fff;
}
.input-main > p {
    width: 84%;
    font-size: 12px;
    font-weight: 600;
    border:1px solid #000;
    padding: 5px 0 5px 10px;
    margin: 10px 0;
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
.form > div {
    margin-left: 10%;
}
.Home {
    font-size:8px;
    color:#bababa;
    position:absolute;
    top: 50%;;
    left:0;
}

</style>