<template>
  <div class="img-upload-wrap" @drop='drop'>
    <div
      v-if="uploadImgList.length===0"
      style="text-align: center;line-height: 300px;width:100%;"
    >拖拽图片进行上传，最多上传5张，每张最大2M</div>
    <img :src="item" v-for="item in uploadImgList" :style="{width:`${100/count}%`}" />
  </div>
</template>
<script>
import { log } from 'util';
export default {
  props: {
    size: {
      default:2
    },
    count:{
      default:5
    }
  },
  data() {
    return {
      uploadImgList:[]
    };
  },
  created() {
    document.ondragover = function(e) {
      e.preventDefault();
    };
    document.ondrop = function(e) {
      e.preventDefault();
    };
  },
  methods: {
    drop(e) {
      let fileInfo = e.dataTransfer.files[0];
      let size = Math.ceil(fileInfo.size / 1024);
      let type = fileInfo.type.indexOf("image");
      if (size > this.size * 1024) {
        this.$Message.error({
          background: true,
          content: "图片尺寸过大，最大2M"
        });
        return;
      }
      if (type == -1) {
        this.$Message.error({
          background: true,
          content: "只能上传图片格式的文件"
        });
        return;
      }
      let reader = new FileReader();
      //将图片转成base64格式
      reader.readAsDataURL(fileInfo);
      reader.onload = e => {
        this.uploadImgList.push(e.target.result);
        this.$emit('update:upload-img-list',this.uploadImgList)
      };
      e.preventDefault();
    }
  }
};
</script>
<style lang="stylus" scoped>
.img-upload-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
