<template>
    <div class="delete-wrapper">
        <div class="delete-main">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle w-16 h-16 text-theme-21 mx-auto mt-3 w-16 h-16 text-theme-21 mx-auto mt-3"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>

            <h1>Are you sure?</h1>
            <p>Do you want to delete these records? <br>
                This process cannot be undone.
            </p>
            <div class="button">
                <button>Cancel</button>
                <button>Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.delete-wrapper {
    width:100%;
    height:100vh;
    position: relative;
    background-color: rgba(0,0,0,0.3);
    padding-top:10%;
}
.delete-main {
    width:500px;
    text-align: center;
    margin:0 auto;
    background:#fff;
    position: relative;
}
.button{
    display: flex;
    justify-content: center;
    margin-top:5%;
    padding-bottom:10%;
}
.button > button {
    width:100px;
    height:40px;
    border-radius: 10px;
}
.button > button:nth-child(1) {
    background:#fff;
    margin-right:1%;
    border:1px solid #ccc;
}
.button > button:nth-child(2) {
    background: #D73E3E;
    color:#fff;
}
svg {
    margin-top: 10%;
}
h1 {
    font-size: 1.875rem;
    margin-top: 5%;
    margin-bottom:3%;
}
p {
    font-size: 18px;
    color:#666;
}
</style>