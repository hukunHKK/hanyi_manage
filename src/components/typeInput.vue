<template>
  <div class="hello">
    <input type="text" :value="value" @input="change($event)" class="ivu-input" style="width: 255px"
              maxlength="20" required placeholder="只能输入中文英文数字，长度限制1-20">
  </div>
</template>
<script>
import { log } from 'util'
  export default {
    props: {
      state: Boolean,
      data:Array,
      value:String
    },
    data(){
      return{
        
      }
    },
    methods:{
      change(event) {
        let value = event.target.value.replace(this.$global.cneReg, '')
        event.target.value = value
        this.$emit('input',value)
      }
    },
    created(){
      this.$emit('input','')
    }
  }
</script>
<style scoped lang="stylus">
</style>