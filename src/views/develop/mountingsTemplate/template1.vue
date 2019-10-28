<template>
  <div class="template" ref="template1">
    <Form :label-width="80" inline label-colon class="border-2px" style="padding-top:12px;">
      <FormItem label="配件类型">
        <Select v-model="templateData.type">
          <Option value="penzi">盆子</Option>
          <Option value="huaban">花瓣</Option>
          <Option value="yezi">叶子</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="0">
        <Button style="margin-right: 5px" @click="typeManageModal=true">配件类型管理</Button>
      </FormItem>
      <FormItem label="建档模板" class="float-right">
        <Select v-model="templateData.type">
          <Option value="template1">模板1</Option>
          <Option value="template2">模板2</Option>
          <Option value="template3">模板3</Option>
          <Option value="special-pot">特殊类 盆</Option>
          <Option value="special-box">特殊类 箱麦</Option>
          <Option value="special-froth">特殊类 泡沫</Option>
        </Select>
      </FormItem>
    </Form>
    <Form :label-width="80" label-colon class="border-2px"
      style="padding-top:12px;padding-right: 12px;margin-top:20px;">
      <FormItem label="唯一编号">
        <Input style="width: 255px" placeholder="请输入" />
      </FormItem>
      <FormItem label="同款编号">
        <Input placeholder="可设定同款编号，多个编号以、隔开" />
      </FormItem>
    </Form>
    <div class="border-2px" style="height:300px;margin-top:20px;display: flex;" @drop='drop'>
      <div v-if='uploadImgList.length===0' style="text-align: center;line-height: 300px;width:100%;">
        拖拽图片进行上传，最多上传5张，每张最大2M
      </div>
      <img :src="item" v-for='item in uploadImgList' style="width: 20%;">
    </div>
    <div class="border-2px" style="margin-top:20px;padding: 10px;" @drop='drop'>
      <Button style="margin: 15px;float: right;" @click="manufacturersModal=true">选择厂商</Button>
      <div class="manufacturers-info">厂商编号：{{manufacturersInfo.id}}</div>
      <div class="manufacturers-info">厂商联系人：{{manufacturersInfo.contact}}</div>
      <div class="manufacturers-info">厂商详细地址：{{manufacturersInfo.address}}</div>
    </div>
    <div class="border-2px" style="margin-top:20px;padding: 10px;" @drop='drop'>
      <Form :label-width="115" inline label-colon class="border-2px"
        style="padding-top:12px;padding-right: 12px;margin-top:20px;">
        <FormItem label="厂商内部编号">
          <Input style="width: 255px" placeholder="请输入厂商内部编号" />
        </FormItem>
        <FormItem label="单价" :label-width="70">
          <Input style="width: 255px" placeholder="请输入" />
        </FormItem>
        <FormItem label="名称\描述" style="width:100%;">
          <Input type="textarea" placeholder="请输入名称\描述" style="width:100%;"/>
        </FormItem>
        <FormItem label="" style="width:100%;" :label-width="20">
          <Button style="margin-right: 5px" @click="textureManageModal=true">配件材质</Button>
        </FormItem>
      </Form>
    </div>
    <Modal v-model="typeManageModal" width="360">
      <p slot="header" style="color:#f60;text-align:center;height:22px;">
        <span>
          配件类型管理
          <div class="add-btn" @click="addType">
            +
          </div>
        </span>
      </p>
      <div style="text-align:center">
        <Form :label-width="80" inline label-colon style="padding-top:12px;">
          <FormItem :label-width="0" v-for="(item,index) in typeList" style="margin-bottom:0;" :key="index">
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
        <Button type="error" size="large" long :disabled='typeCanSubmit' @click="submitType">确定</Button>
      </div>
    </Modal>
    <Modal v-model="manufacturersModal" width="700">
      <p slot="header" style="color:#f60;text-align:center;height:22px;">
        <span>
          选择厂商
        </span>
      </p>
      <div style="text-align:center">
        <Form :label-width="80" inline label-colon style="padding-top:12px;">
          <FormItem label="厂商编号">
            <Input style="width: 170px" placeholder="请输入" />
          </FormItem>
          <FormItem label="厂商名称">
            <Input style="width: 170px" placeholder="请输入" />
          </FormItem>
          <FormItem :label-width="0">
            <Button style="margin-right: 5px">搜索</Button>
          </FormItem>
        </Form>
        <div class="content">
          <Table :columns="columns1" :data="manufacturersList" height='300' :key="tableKey">
            <template slot-scope="{ row, index }" slot="action">
              <Checkbox v-model="row.checked" @on-change='checkOne(row,index)'></Checkbox>
            </template>
          </Table>
          <div class="page-wrap" style="text-align: center;">
            <Page :total="100" show-elevator :page-size='10' show-total />
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :disabled='typeCanSubmit' @click="chooseManufacturers">确定</Button>
      </div>
    </Modal>
    <Modal v-model="textureManageModal" width="360">
      <p slot="header" style="color:#f60;text-align:center;height:22px;">
        <span>
          配件材质
          <div class="add-btn" @click="addType">
            +
          </div>
        </span>
      </p>
      <div style="text-align:center">
        <Form :label-width="80" inline label-colon style="padding-top:12px;">
          <FormItem :label-width="0" v-for="(item,index) in typeList" style="margin-bottom:0;" :key="index">
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
        <Button type="error" size="large" long :disabled='typeCanSubmit' @click="submitType">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {
    log
  } from 'util';
  export default {
    props: {
      templateData: {}
    },
    data() {
      return {
        typeManageModal: false,
        manufacturersModal:false,
        textureManageModal:false,
        value: '',
        typeList: [{
          name: ''
        }],
        tableKey:'',
        manufacturersInfo:{},
        uploadImgList:[],
        columns1: [
          {
            title: "厂商编号",
            key: "id"
          },
          {
            title: "厂商名称",
            key: "name"
          },
          {
            title: "选择",
            slot: "action",
            width: 150,
            align: "center"
          }
        ],
        manufacturersList: [
          {
          name: "John Brown",
          id: 181241,
          address: "湖北",
          contact:'刘德华'
          },
          {
          name: "John ",
          id: 181,
          address: "陈慧娴",
          contact:'香港'
          },
          {
          name: " Brown",
          id: 1241,
          address: "南京",
          contact:'彭于晏'
          },
        ],
      };
    },
    methods: {
      addType() {
        if (!this.typeList.some(item => item.name === '')) {
          this.typeList.push({
            name: ''
          });
        }
      },
      removeType(index) {
        this.typeList.splice(index, 1)
      },
      submitType() {
        this.typeList = this.typeList.filter(item => item.name !== '')
      },
      change(event, index) {
        let value = event.target.value.replace(this.$global.cneReg, '');
        event.target.value = value;
        this.typeList[index].name = value
      },
      drop(e){
        let fileInfo = e.dataTransfer.files[0];
        let size = Math.ceil(fileInfo.size / 1024);
        let type = fileInfo.type.indexOf("image");
        if (size > 2048) {
          this.$Message.error({
            background: true,
            content: '图片尺寸过大，最大2M'
          });
          return;
        }
        if (type == -1) {
          this.$Message.error({
            background: true,
            content: '只能上传图片格式的文件'
          });
          return;
        }
        let reader = new FileReader()
        //将图片转成base64格式
        reader.readAsDataURL(fileInfo)
        reader.onload=(e)=>{
          this.uploadImgList.push(e.target.result)
        }
        e.preventDefault();
      },
      checkOne(row,index){
        this.manufacturersList.forEach(item=>item.checked=false)
        this.manufacturersList[index].checked = true
        this.tempManufacturers = this.manufacturersList[index]
        this.tableKey = Math.random()
      },
      chooseManufacturers(){
        this.manufacturersModal = false
        this.manufacturersInfo = this.tempManufacturers
      }
    },
    computed: {
      typeCanSubmit() {

      }
    },
    created() {
      document.ondragover = function(e) {
        e.preventDefault()
      }
      document.ondrop = function (e) {
        e.preventDefault()
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .template {
    padding: 20px;
    .ivu-form-item {
      margin-bottom: 12px;
    }
    .manufacturers-info{
      font-size: 16px;
      padding: 5px 15px 5px;
    }
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