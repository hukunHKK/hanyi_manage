<template>
  <div class="upload-wrap">
    <Button type="primary" @click="clickFileInput">{{text}}</Button>
    <span v-if='fileName' style="margin-left:25px;color:#0058cc;">
      {{fileName.join('、')}}
      <!-- <span style="color:red;position: relative;top: -3px;cursor: pointer;">X</span> -->
    </span>
    <span v-else style="margin-left:25px;color:#949090;">支持扩展名：{{expandedName}}...</span>
    <input type="file" :name="name" hidden  :multiple='multiple' ref="input" @change='fileChange'>
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
    },
    fileList:{
      default(){
        return []
      }
    }
  },
  data(){
    return{
      multiple:false,
      fileName:[],
      selectedFileList:[]
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
      Array.from(input.files).forEach(item=>{
        this.fileName.push(item.name)
        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = e=>{
          this.selectedFileList.push(e.target.result)
        }
      })
      this.$emit('input',this.selectedFileList)
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
