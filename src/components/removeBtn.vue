<template>
  <div class="remove-btn" :style="{color,borderColor}">
    <Icon type="md-remove" />
  </div>
</template>
<script>
export default {
  props:['color','borderColor']
}
</script>
<style scoped lang="stylus">
.remove-btn {
    display: inline-block;
    font-size: 18px;
    border: 1px solid #dcdee2;
    border-radius: 3px;
    margin-left: 11px;
    padding: 0 5px;
    height: 32px;
    cursor: pointer;
  }
</style>