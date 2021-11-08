<template>
  <div id="app">
    <ToolBar />
    <!-- <transition name="page"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
// import ToolBar from '../src/custom-components/ToolBar.vue'
import { computed } from "vue";
// import { useStore } from "vuex";

// import { computed } from "vue";
// import { useStore } from "vuex";

export default {
  setup() {
    // const store = useStore();d
    const stateConter = computed(() => store.state.Counter);
    const stateModuleA = computed(() => store.state.moduleA);
    const stateProductList = computed(() => store.state.ProductList);
    const counter = computed(() => store.state.Counter.counter);
    const test = computed(() => store.getters.time2);
    const doubleGetters = computed(() => store.getters["moduleA/doubleCount"]);
    const inc = () => store.commit("setCounter", counter.value + 1);
    const globalFunc = () => store.dispatch("moduleA/other");
    // const web3 = store.state.web3;
    return {
      inc,
      counter,
      test,
      stateConter,
      stateModuleA,
      doubleGetters,
      globalFunc,
      stateProductList,
    };
  },
  components: {},
};
</script>
<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  margin: 0 auto;
}
a {
  color: #34495e;
  text-decoration: none;
}
a:hover {
  color: #42b883;
  text-decoration: underline;
}
a.router-link-exact-active {
  text-decoration: underline;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter, .page-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
