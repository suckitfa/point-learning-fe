<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
            window.addEventListener('unload', this.saveState) //监听unload方法，如果重载页面就把state存入sessionStorage，然后在需要state的时候从sessionStorage中取值。
        },
        methods: {
            saveState() {
                sessionStorage.setItem('state', JSON.stringify(this.$store.state))
            }
        }
  }
</script>

<style lang="less">
  html, body, #app {
    width: 100%;
    height: 100%;
  }
  .el-tab-pane, .el-table tr {
    background-color: @boxBgColor;
  }
</style>
