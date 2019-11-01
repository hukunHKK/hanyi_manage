<!-- 用于新增类型、数字等输入框 -->
<template>
  <div >
    <input type="text" :value="value" @input="change($event)" @blur='blur($event)' class="ivu-input"
              maxlength="20" required :placeholder="placeholder">
  </div>
</template>
<script>
  export default {
    props: {
      state: Boolean,
      data:Array,
      value:{
        default:''
      }
    },
    data(){
      return{
        placeholder:'',
        reg:'',
        IsNumber:null
      }
    },
    methods:{
      change(event) {
        let value = event.target.value.replace(this.reg, '')
        event.target.value = value
        this.$emit('input',value)
      },
      blur(event){
        if(this.IsNumber){
          let value = Number(event.target.value)
          event.target.value = value
          this.$emit('input',value)
        }
      }
    },
    created(){
      this.$emit('input','')
      this.IsNumber = this.$attrs.hasOwnProperty('number')
      this.placeholder = this.IsNumber?'只能输入数字':'只能输入中文英文数字，长度限制1-20'
      this.reg = this.IsNumber?this.$global.numbereReg:this.$global.cneReg
    }
  }
</script>
<style scoped lang="stylus">
</style>