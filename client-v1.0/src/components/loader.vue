<template>
<div class="loader-dots block relative w-40 h-10 mt-2">
    <div class="absolute top-0 mt-1 w-6 h-6 rounded-full bg-parular-1"></div>
    <div class="absolute top-0 mt-1 w-6 h-6 rounded-full bg-parular-2"></div>
    <div class="absolute top-0 mt-1 w-6 h-6 rounded-full bg-parular-3"></div>
    <div class="absolute top-0 mt-1 w-6 h-6 rounded-full bg-parular-gray"></div>
</div>
</template>

<script>
export default {

}
</script>

<style scope>

.loader-dots div {
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-dots div:nth-child(1) {
    left: 16px;
    animation: loader-dots1 0.6s infinite;
}
.loader-dots div:nth-child(2) {
    left: 16px;
    animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(3) {
    left: 64px;
    animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(4) {
    left: 136px;
    animation: loader-dots3 0.6s infinite;
}
@keyframes loader-dots1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes loader-dots3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes loader-dots2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(48px, 0);
    }
}
</style>