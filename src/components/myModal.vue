<template>
  <div class="my-modal-wrap" v-if="show">
    <div class="modal-header">
      <Icon type="ios-contact" />
      <span class="title">{{modalTitle}}</span>
      <div class="modal-header-btn"><slot name='btn'></slot></div>
      <Button type="success" class="return-btn" @click="close">
        <Icon type="ios-undo" style="font-size: 19px;margin-right: 6px;margin-top: 1px;"/>返回
      </Button>
    </div>
    <div class="slot-wrap">
      <slot name='content'></slot>
    </div>
  </div>
</template>
<script>
export default {
	props:{
		show:{
			default:true
    },
    modalTitle:{
      default:''
    }
  },
  // props:['show','modalTitle'],
  data() {
    return {
      // showModal:this.show
    }
  },
  methods: {
    close(){
      this.$emit('update:show',false)
    }
  }
};
</script>
<style lang="stylus">
.my-modal-wrap{
  position: absolute;
	top: 63 px;
	bottom: 0;
	left: 200px;
	right:0;
	z-index: 999;
	background-color:#fff;
  .modal-header{
    font-size: 22px;
    font-weight: 600;
    border-bottom: 1px solid #cdd3dd;
    padding-bottom: 2px;
    margin-left: 25px;
    height: 53px;
    line-height: 57px;
    color:#000;
    padding-left:16px;
    margin-right: 55px;
    .title{
      margin-left:6px;  
    }
    .return-btn{
      float: right;
      margin-top: 10px;
    }
    .modal-header-btn{
      position: absolute;
      top: -4px;
      right: 148px;
      button{
        margin-left:7px;
      }
    }
  }
  .slot-wrap{
    overflow:auto;
    height:calc(100% - 53px);
    width:100%;
  }
}
</style>