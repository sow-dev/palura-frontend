<template>
    <div class="login-wrapper">
        <div class="login-bg flex w-1/3 p-8  md:p-10 md:pb-32 lg:p-14 md:items-center">
        <div class="form px-10 pb-10 space-y-12">
            <div class="login-navi">
                <a href="#" class="underline  mr-3 font-semibold text-lg">TERMS OF SERVICE</a>
            </div>
            <div class="input-main mt-10">
               <p class="text-lg">Please take a few minutes to read and understand<br>
                   <a href="#"> Terms of Service.</a> To continue, you'll need to accept the <br>
                    Terms of Service by checking the box. <br>
                </p>
                <form class="my-10">
                    <input id="checkbox" type="checkbox" name="checktext" value="1" v-model="checkedNames">
                    <label for="checktext">I'm at least 13 years old.</label><br>
                     <input id="checkbox" type="checkbox" name="checktext2" value="2" v-model="checkedNames">
                    <label for="checktext2">I accept the Terms of Service.</label>
                </form>
            </div>
            
            <button v-on:click="myclick">Next</button><br>
            <a href="./" class="Home text-sm font-semibold">&#60; Back to Home</a>
        </div>
         <WalletProfile v-if="isProfile===true" />
         </div>
    </div> 
</template>
<script>
import WalletProfile from "./WalletProfile.vue"

export default {
    data: function() {
        return {
            checkedNames: [],
            isProfile:false
        }
    },
     props: {
        isLogins:Boolean
    },
    components: {
        WalletProfile
    },
    methods: {
        myclick:function() {
            // console.log('checkedNames :'+ this.props.checkedNames + this.props.checkedNames2);
            
            console.log(this.checkedNames);
            if(this.checkedNames.length == 2) {
                console.log('this.checkedNames.length '+this.checkedNames.length)
                this.isProfile = true
                return 
            } else {
                alert("필수 동의를 하셔야 계속 진행하실수 있습니다.");
            }
        }
    }
}
</script>
<style scoped>
.form {
    width: 100%;
    height: auto;
    margin: 0 auto;
    float: right;
    text-align: left;
    position:relative;
}
.login-wrapper {
    width: 100%;
    height:100vh;
    /* background-color: rgba(1,1,1,0); */
    position: fixed;
    right:0;
    top:0;
    z-index: 99;
}

/* .login-navi {
    margin-top: 50%;
} */



.input-main > p {
    width: 84%;
    font-size: 14px;
    font-weight: 400;

}
.input-main  a{
  color:blue;
  border-bottom: 1px solid blue;
}
button{
    width:85px;
    height:25px;
    font-size: 12px;
    border: 1px solid #262626;
    position:absolute;
    right:15%;
    bottom:15%;
    
}
.Home {
    color:#8a8a8a;
    position:absolute;
    bottom: 0;
    left:7%;
}
/* form {
    margin-top: 15%;
    margin-bottom:15%;
    font-weight: 700;
} */
input {
    margin-right:3%;
}
.login-bg{
    /* width:35%; */
    height:100vh;
    background:#fff;
    margin-left: auto;

}
</style>