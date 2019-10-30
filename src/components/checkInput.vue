<template>
  <div class="hello">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      state: Boolean,
      data:Array
    },
    watch: {
      data () {
        console.log(131);
        
      }
    }
  }
</script>
<style scoped lang="stylus">
</style>