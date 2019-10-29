<template>
  <Modal v-model.sync="modalState" :width="width" :closable="false" :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;height:22px;">
      <span>
        配件材质
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
            <!-- <Input :value="item.name" @input="change($event,index)" style="width: 255px" placeholder="只能输入中文英文数字，长度限制1-20"/> -->
            <input type="text" :value="item.name" @input="change($event,index)" class="ivu-input" style="width: 255px"
              maxlength="20" required placeholder="只能输入中文英文数字，长度限制1-20">
            <div class="remove-btn" @click="removeType(index)">
              <Icon type="md-remove" />
            </div>
          </div>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long @click="submitType">确定</Button>
    </div>
  </Modal>
</template>
<script>
  export default {
    props: {
      modalState: Boolean,
      width: String,
      typeList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        selfTypeList: this.typeList
      }
    },
    methods: {
      addType() {
        console.log(this.selfTypeList);

        if (!this.selfTypeList.some(item => item.name === '')) {
          this.selfTypeList.push({
            name: ''
          });
        }
      },
      change(event, index) {
        let value = event.target.value.replace(this.$global.cneReg, '');
        event.target.value = value;
        this.selfTypeList[index].name = value
      },
      removeType(index) {
        this.selfTypeList.splice(index, 1)
      },
      submitType() {
        this.selfTypeList = this.selfTypeList.filter(item => item.name !== '')
        this.$emit('update:modalState', false)
        this.$emit('update:typeList', this.selfTypeList)
      },
      close() {
        this.$emit('update:modalState', false)
      }
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

  .remove-btn {
    display: inline-block;
    font-size: 18px;
    border: 1px solid #dcdee2;
    border-radius: 3px;
    margin-left: 11px;
    padding: 0 5px;
    height: 32px;
    cursor: pointer;
  }
</style>