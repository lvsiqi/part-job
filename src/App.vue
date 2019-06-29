<template>
  <div id="app">
    <transition name="transitionRouter">
    <router-view></router-view>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if(this.$store.state.userData !==''){
      this.socketApi.initWebSocket(this.$store.state.userData.account)
    }
  }
}
</script>

<style>
  #app{
    height: 100%;
    width: 100%;
  }
  .transitionRouter-enter-active,
  .transitionRouter-leave-active {
    transition: all 0.4s;
  }

  .transitionRouter-enter,
  .transitionRouter-leave{
    transform: translate3d(100%, 0, 0);
  }
</style>
