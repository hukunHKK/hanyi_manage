<template>
  <div class="upload-wrap">
    <Button type="default" @click="clickFileInput" v-if='base64===""'>{{text}}</Button>
    <img :src="base64" @click="clickFileInput" :style="{width,height}" v-else>
    <input type="file" :name="name" hidden ref="input" @change='fileChange'>
  </div>
</template>
<script>
  export default {
    props: {
      name: String,
      text: {
        default: '选择图片'
      },
      width: {
        default: '32px'
      },
      height: {
        default: '40px'
      },
      size:{
        default:100
      }
    },
    data() {
      return {
        showBtn: true,
        base64:''
        // 32*40
      }
    },
    methods: {
      clickFileInput() {
        this.$refs.input.click()
      },
      fileChange() {
        let input = this.$refs.input;
        let fileInfo = input.files[0];
        this.getBase64(fileInfo, input)
      },
      getBase64(fileInfo, input) {
        let size = Math.ceil(fileInfo.size / 1024);
        let type = fileInfo.type.indexOf("image");
        if (size > this.size * 1024) {
          this.$Message.error({
            background: true,
            content: "图片尺寸过大，最大2M"
          });
          input.value = ''
          this.base64 = ''
          return;
        }
        if (type == -1) {
          this.$Message.error({
            background: true,
            content: "只能上传图片格式的文件"
          });
          input.value = ''
          this.base64 = ''
          return;
        }
        let reader = new FileReader();
        //将图片转成base64格式
        reader.readAsDataURL(fileInfo);
        reader.onload = e => {
          this.base64 = e.target.result
        };
      }
    },
    computed: {

    }
  }
</script>
<style scoped lang="stylus">
  .upload-wrap {
    display: inline-block;
  }
</style>