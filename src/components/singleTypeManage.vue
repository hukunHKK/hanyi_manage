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
        <Form :label-width="80" inline label-colon style="padding-top:12px;">
          <FormItem :label-width="0" v-for="(item,index) in selfTypeList" style="margin-bottom:0;" :key="index">
            <div style="margin-bottom:10px;">
              <input type="text" :value="item[k]" @input="change($event,index)" class="ivu-input" style="width: 255px"
                maxlength="20" required placeholder="只能输入中文英文数字，长度限制1-20">
              <remove-btn @click.native="removeType(index)" />
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
      modalState: String,//modalState为commit的名字
      width: String,
      typeList: {
        type: Array,
        default () {
          return []
          // console.log(this.dispatch);

          // return this.$store.state.mountings[this.dispatch]
        }
      },
      modalTitle: String,
      dispatch: {
        default: ''
      },
      k:String
    },
    data() {
      return {
        selfTypeList: JSON.parse(JSON.stringify(this.typeList)),
        modalState1: false
      }
    },
    methods: {
      addType() {
        if (!this.selfTypeList.some(item => item[this.k] === '')) {
          this.selfTypeList.push({[this.k]:''});
        }
      },
      change(event, index) {
        let value = event.target.value.replace(this.$global.cneReg, '');
        event.target.value = value;
        this.selfTypeList[index][this.k] = value
      },
      removeType(index) {
        this.selfTypeList.splice(index, 1)
      },
      submitType() {
        let canSubmit = true;
        //过滤掉为空的输入框(要不要自动过滤待定)
        this.selfTypeList = this.selfTypeList.filter(item => {
          return item[this.k] !== ''
        })
        if (!canSubmit) return
        setTimeout(() => {
          // dispatch有值则需要提交请求，更新store
          if (this.dispatch) {
            this.$store.dispatch(this.dispatch, this.selfTypeList)
          } else {
            this.$emit('update:typeList', JSON.parse(JSON.stringify(this.selfTypeList)))
          }
        }, 200) //200ms防止Modal在关闭的瞬间能看到里面多了个全选项
        this.close()
      },
      close() {
        this.modalState1 = false
        setTimeout(() => {
          console.log(this.modalState)
          this.$store.commit(this.modalState,false)
        }, 200); //200ms防止Modal关闭动画完成之前该组件销毁，导致没动画效果
      }
    },
    created() {
      this.$nextTick(function () {
        console.log(this.typeList)
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