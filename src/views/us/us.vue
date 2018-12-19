<template>
  <div>
    <o-header></o-header>
    <router-view class="main"></router-view>
    <o-footer></o-footer>
  </div>
</template>
<script>
import OHeader from '../common/header'
import OFooter from '../common/footer'
export default {
  data () {
    return {}
  },
  components: {
    OHeader,
    OFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    min-height: calc(100vh - 454px);
    overflow: hidden;
    width: 100%;
  }
</style>
