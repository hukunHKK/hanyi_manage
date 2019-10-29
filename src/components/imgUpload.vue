<template>
  <div class="img-upload-wrap" @drop='drop'>
    <div v-for="(item,index) in uploadImgList" class="img-wrap">
      <img :src="item" />
      <Icon type="ios-trash-outline" @click="deleteImg(index)"/>
    </div>
    <div class="img-add-btn">
      <Icon type="md-add" @click='clickInput'/>
      <input type="file" ref="imgInput" @change='changeImg' hidden>
    </div>
    <div v-if="uploadImgList.length===0" class="prompt-message">
      拖拽图片进行上传，最多上传{{count}}张，每张最大2M</div>
  </div>
</template>
<script>
  export default {
    props: {
      size: {
        default: 2
      },
      count: {
        default: 5
      }
    },
    data() {
      return {
        uploadImgList: []
      };
    },
    created() {
      document.ondragover = function (e) {
        e.preventDefault();
      };
      document.ondrop = function (e) {
        e.preventDefault();
      };
      document.ondragenter = function (e) {
        e.preventDefault();
      };
      document.ondragleave = function (e) {
        e.preventDefault();
      };
    },
    methods: {
      deleteImg(index){
        this.uploadImgList.splice(index,1)
        this.$emit('update:upload-img-list', this.uploadImgList)
      },
      clickInput(){
        this.$refs.imgInput.click()
      },
      drop(e) {
        let fileInfo = e.dataTransfer.files[0];
        this.getBase64(fileInfo)
        e.preventDefault();
      },
      changeImg(e) {
        let input = this.$refs.imgInput;
        let fileInfo = input.files[0];
        this.getBase64(fileInfo,input)
      },
      getBase64(fileInfo,input) {
        console.log(this.uploadImgList.length);
        
        if(this.uploadImgList.length === this.count){
          this.$Message.error({
            background: true,
            content: `最多只能上传${this.count}张图片`
          });
          input&&(input.value = '')
          return;
        }
        let size = Math.ceil(fileInfo.size / 1024);
        let type = fileInfo.type.indexOf("image");
        if (size > this.size * 1024) {
          this.$Message.error({
            background: true,
            content: "图片尺寸过大，最大2M"
          });
          input&&(input.value = '')
          return;
        }
        if (type == -1) {
          this.$Message.error({
            background: true,
            content: "只能上传图片格式的文件"
          });
          input&&(input.value = '')
          return;
        }
        let reader = new FileReader();
        //将图片转成base64格式
        reader.readAsDataURL(fileInfo);
        reader.onload = e => {
          this.uploadImgList.push(e.target.result);
          this.$emit('update:upload-img-list', this.uploadImgList)
          //清空input数据，以便继续上传同样的图片
          input&&(input.value = '')
        };
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .img-upload-wrap {
    display: flex;
    width: 100%;
    height: 100%;

    .img-wrap {
      width: 130px;
      height: 130px;
      display: inline-block;
      margin: 15px 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      i{
        position: absolute;
        top: 100px;
        right: 4px;
        color: red;
        font-size: 25px;
        cursor: pointer;
      }
    }

    .img-add-btn {
      width: 130px;
      height: 130px;
      border: 1px solid #b5b5b5;
      border-radius: 3px;
      display: inline-block;
      margin: 15px 10px;
      text-align: center;
      cursor: pointer;

      i {
        line-height: 130px;
        font-size: 67px;
        color: #c1c1c1;
      }
    }

    .prompt-message {
      text-align: center;
      line-height: 160px;
      width: 100%;
    }
  }
</style>