<template>
<div>
    <input type="text" />
    <div class="close">
        <span class="front"></span>
        <span class="back"></span>
    </div>
</div>
</template>


<script >


    export default {
        created: function () {
        },
        data: function () {
            return {}
        },
        props:[],
        components: {},
    } 
</script>

<style scope>

input:focus{
    width:200px;
    height:30px;
    border-radius:40px;
    padding: 0 20px;
    line-height: 1em;
    font-weight: 100;
    font-size: 12px;
  cursor:auto;
}

input{
    float:right;
    border:3px solid #BEBEBE;
    outline:none;
    width:40px;
    cursor:pointer;
    -webkit-transition:.2s all ease-in;
    -moz-transition:.2s all ease-in;
    transition:.2s all ease-in;
    height:40px;
    color:#BEBEBE;
    border-radius:40px;
    background:none;
    font-size:0;
}
.close span{
width:3px;
height:20px;
border-radius:2px;
background:#BEBEBE;
display:inline-block;}

.front{
    position:absolute;
    right:24px;
    top:13px;
    transform: rotate(-45deg);
    opacity:0;
    animation-delay: 2s;
    -webkit-transition:.2s all ease-in;
    -moz-transition:.2s all ease-in;
    transition:.2s all ease-in;

}
.back{
    position:absolute;
    right:-3px;
    top:33px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
    transition:.2s all ease-in;
}

input:focus + div .front{
    opacity:1;
    -webkit-transition-delay: .2s; 
    -moz-transition-delay: .2s; 
    transition-delay: .2s;
    -webkit-transform: rotate(45deg);        
    -moz-transform: rotate(45deg);        
    transform: rotate(45deg);        
}

input:focus + div .back{
    right:24px;
    top:13px;
}

</style>