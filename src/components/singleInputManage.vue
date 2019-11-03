<template>
  <div>
  <Modal v-model.sync="modalState1" :width="width" :closable="false" :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;height:22px;">
      <span>
        {{modalTitle}}
        <div class="add-btn" @click="addType">
          +
        </div>
        <Icon type="ios-close" @click='close'
          style="font-size: 32px;position: absolute;right: 7px;top: 9px;color:#999;cursor: pointer;" />
      </span>
    </p>
    <div style="text-align:center">
      <div v-if='showSelect' style="padding-left: 10px;text-align: left;">含全选项：
        <Select v-model="selectAll" style="width:180px;">
          <Option value="1">是</Option>
          <Option value="0">否</Option>
        </Select>
      </div>
      <Form :label-width="80" inline label-colon style="padding-top:12px;">
        <FormItem :label-width="0" v-for="(item,index) in selfTypeList" style="margin-bottom:0;" :key="index">
          <div style="margin-bottom:10px;">
            <input type="text" :value="item" @input="change($event,index)" class="ivu-input" style="width: 255px"
              maxlength="20" required placeholder="只能输入中文英文数字，长度限制1-20">
            <remove-btn  @click.native="removeType(index)"/>
          </div>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" long @click="submitType">确定</Button>
    </div>
  </Modal>
  </div>
</template>
<script>
  export default {
    props: {
      modalState: Boolean,
      width: String,
      typeList:{
        type:Array,
        default(){
          return []
        }
      },
      modalTitle:String,
      dispatch:{
        default:false
      }
    },
    data() {
      return {
        selfTypeList: JSON.parse(JSON.stringify(this.typeList)),
        selectAll:'0',
        showSelect:this.$attrs.hasOwnProperty('select'),//是否显示全选框
        modalState1:false
      }
    },
    methods: {
      addType() {
        if (!this.selfTypeList.some(item => item === '')) {
          this.selfTypeList.push('');
        }
      },
      change(event, index) {
        let value = event.target.value.replace(this.$global.cneReg, '');
        event.target.value = value;
        this.selfTypeList[index] = value
      },
      removeType(index) {
        this.selfTypeList.splice(index, 1)
      },
      submitType() {
        let canSubmit = true;
        //过滤掉为空的输入框
        this.selfTypeList = this.selfTypeList.filter(item => {
          if(item === '全部'&&this.showSelect){
            canSubmit = false
            this.$Message.error({
                background: true,
                content: '全部项请在下拉框中选择'
            })
           return false 
          }
          return item !== ''
        })
        if(!canSubmit) return
        setTimeout(()=>{
          if(this.selectAll === '1'&&this.selfTypeList[0]!=='全部'){
            this.selfTypeList.unshift('全部')
          }
          // dispatch有值则需要提交请求，更新store
          if(this.dispatch){
            this.$store.dispatch(this.dispatch,this.selfTypeList)
          }else{
            this.$emit('update:typeList', JSON.parse(JSON.stringify(this.selfTypeList)))
          }
        },200)//200ms防止Modal在关闭的瞬间能看到里面多了个全选项
        this.close()
      },
      close() {
        this.modalState1 = false
        setTimeout(() => {
          this.$emit('update:modalState', false)
        }, 200);//200ms防止Modal关闭动画完成之前该组件销毁，导致没动画效果
      }
    },
    created () {
     
      if(this.showSelect&&this.selfTypeList[0]==='全部'){
        this.selfTypeList.shift()
        this.selectAll = '1'
      }
      this.$nextTick(function() {
        this.modalState1 = true
      })
    },
  }
</script>
<style scoped lang="stylus">
  .add-btn {
    display: inline-block;
    font-size: 18px;
    border: 1px solid #dcdee2;
    border-radius: 3px;
    margin-left: 11px;
    padding: 0 5px;
    height: 22px;
    cursor: pointer;
  }
</style>