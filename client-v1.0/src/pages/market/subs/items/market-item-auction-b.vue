<template>
<div class="container mx-auto shadow-lg rounded-lg max-w-md hover:shadow-2xl transition duration-300">
    <img src="https://images.unsplash.com/photo-1627751476653-e954179b174a" alt="" class="rounded-t-lg w-full">
    <div class="p-6">
        <h1 class="md:text-1xl text-xl hover:text-indigo-600 transition duration-200  font-bold text-gray-900 ">This
            is Amazing for people to visit.</h1>
        <p class="text-gray-700 my-2 hover-text-900 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium quis.</p>
    </div>
</div>
</template>


<script >
    import LikeService from "../../../services/like.service.js"
    export default {
        created: function () {

        },
        data: function () {
            return {}
        },
        props: {
            marketId: String,
            userId: String
        },
        components: {},
        methods: {
            getInfo() {
                if (this.marketId == undefined || this.userId == undefined) {
                    return;
                } else {
                    LikeService.doeslike(2, this.marketId, this.userInfo.id).then(res => {
                        console.log('LikeService res', res.data)
                        if (res.data.length < 1) { // 데이터없으면 좋아요안누른거
                            this.clickedHeart = false
                        } else {
                            this.clickedHeart = true
                        }

                    })

                }

            }
        }
    }
</script>

<style scope>
  
</style>