<template>
  <div class="upload-wrap">
    <Button type="primary" @click="clickFileInput">{{text}}</Button>
    <span v-if='fileName' style="margin-left:25px;color:#0058cc;">{{fileName}}</span>
    <span v-else style="margin-left:25px;color:#949090;">支持扩展名：{{expandedName}}...</span>
    <input type="file" :name="name" hidden  multiple ref="input" @change='fileChange'>
  </div>
</template>
<script>
import { log } from 'util'
export default {
  props: {
    name: String,
    text:{
      default:'选择附件'
    },
    expandedName:{
      default:'.xls .doc .docx .pdf .png .jpg'
    }
  },
  data(){
    return{
      multiple:false,
      fileName:''
    }
  },
  created(){
    this.multiple = this.$attrs.hasOwnProperty('multiple')
  },
  methods:{
    clickFileInput(){
      // console.log(this.$refs);
      
      this.$refs.input.click()
    },
    fileChange(e){
      let input = this.$refs.input;
      this.fileName = Array.from(input.files).map(item=>item.name).join('、')
    }
  },
  computed:{
   
  }
}
</script>
<style scoped lang="stylus">
.upload-wrap{
  display:inline-block;
}
</style>
