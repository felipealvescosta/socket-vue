<template>
  <div id="app">
    <socket-test/>
  </div>
</template>

<script>
import SocketTest from './components/SocketTest.vue'

export default {
  name: 'App',
  components: {
    SocketTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
