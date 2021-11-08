<template>
  <div class="main">
    <div class="flex ...">
      <div class="flex-1">
        <!-- This item will grow or shrink as needed -->
      </div>
      <div class="flex-shrink-0 w-3/5 mt-5">
        <div class="box flex justify-center w-60">
          <div
            class="nav nav-tabs flex-col sm:flex-row lg:justify-start ml-5"
            role="tablist"
          >
            <button
              id="normal_sales"
              class="py-4 sm:mr-8 flex items-center active"
              @click="changeTab(0)"
              :disabled="readOnly"
            >
              Normal Sales
            </button>

            <button
              id="auction"
              class="py-4 sm:mr-8 flex items-center"
              @click="changeTab(1)"
              :disabled="readOnly"
            >
              Auction
            </button>
          </div>
        </div>
        <div v-if="read_only === 0">
          <OrderEnrollForm :tab="tab" />
        </div>
        <div v-else-if="read_only === 1">
          <OrderEditForm :tab="tab" @editTab="editTab" />
        </div>
      </div>
      <div class="flex-1">
        <!-- This item will grow or shrink as needed -->
      </div>
    </div>
  </div>
</template>

<script>
import OrderEnrollForm from "../../custom-components/order/OrderEnrollForm.vue";
import OrderEditForm from "../../custom-components/order/OrderEditForm.vue";

export default {
  components: {
    OrderEnrollForm,
    OrderEditForm,
  },

  created() {
    const isEdit = this.$route.path.split("/");

    if (isEdit[2] === "edit" && this.$route.params.id) {
      this.read_only = 1;
    }
  },

  computed: {
    readOnly: function() {
      return this.read_only === 1 ? true : false;
    },
  },

  data: function() {
    return {
      read_only: 0,
      tab: 0,
    };
  },

  methods: {
    changeTab: function(num) {
      this.tab = num;
      this.tabClassInit();

      if (this.tab === 0) {
        document.querySelector("#normal_sales").classList.add("active");
      } else if (this.tab === 1) {
        document.querySelector("#auction").classList.add("active");
      }
    },

    editTab: function(e) {
      this.tab = e;
      this.tabClassInit();

      if (e === 0) {
        document.querySelector("#normal_sales").classList.add("active");
      } else if (e === 1) {
        document.querySelector("#auction").classList.add("active");
      }
    },

    tabClassInit: function() {
      document.querySelector("#normal_sales").classList.remove("active");
      document.querySelector("#auction").classList.remove("active");
    },
  },
};
</script>

<style scoped>
/* *{
    margin:0;
    padding:0;
}

.post {
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    }
.name {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  color: #42b883;
  margin-right: 5rem;
}
input {
    width:500px;
    height: 30px;
    border: 2px solid #000;
}
.main-wrapper {
    width:100%;
    height:100vh;
    background: #ccc;
}
.main {
    width:100%;
    height:100%;
    text-align: center;
    position:relative;
}
button {
    width:120px;
    height:30px;
    margin-left: 3%;
}
ul{
    text-align:center;
    margin: 2% 0;
}
li{
    display: inline;
    font-size: 23px;
    font-weight: 600;
    border:5px solid #000;
    padding:10px 50px;
    margin:0 1px;
} */

.main-wrapper {
  width: 100%;
  height: 100%;
}
.sell-header {
  width: 30%;
  margin: 0 auto;
  text-align: center;
  /* background-color: #ccc; */
}
.sell-header > h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 0%;
  margin-top: 0%;
}
.sell-menu {
  display: flex;
  justify-content: space-around;
}

.sell-menu > button {
  width: 30%;
  height: 8vw;
  border: 2px solid #c4c4c4;
  border-radius: 30px;
  outline: 0;
}

.sell-menu h2 {
  font-size: 24px;
  font-weight: 700;
  margin-top: 13%;
}
.sell-menu p {
  font-size: 14px;
  color: #848383;
  margin-top: 20%;
}
/* .sell-menu > div:hover {
    border:2px solid #FF8A00;
}
.sell-menu > div:first-child:active{
    border:2px solid #000;
} */
.main-wrapper > a > p {
  /* margin-top:3%; */
  /* margin-left:13%; */
}
</style>
