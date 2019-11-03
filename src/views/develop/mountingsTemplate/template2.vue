<template>
  <div class="template" ref="template1">
    <div class="info-title">
      <span>基本信息</span>
    </div>
    <Form :label-width="115" inline label-colon class="border-1px" style="padding-top:12px;">
      <FormItem label="建档模板">
        <Select v-model="templateData.type" style="width:120px;" :disabled='isAudit'>
          <Option value="template1">模板1</Option>
          <Option value="template2">模板2</Option>
          <Option value="template3">模板3</Option>
          <Option value="special-pot">特殊类 盆</Option>
          <Option value="special-box">特殊类 箱麦</Option>
          <Option value="special-froth">特殊类 泡沫</Option>
        </Select>
      </FormItem>
      <FormItem label="配件类型">
        <Select v-model="templateData.a" style="width:120px;" :disabled='isAudit'>
          <!-- <Option value="penzi">盆子</Option>
          <Option value="huaban">花瓣</Option>
          <Option value="yezi">叶子</Option>-->
          <Option v-for="item in typeList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="0">
        <Button :disabled='isAudit' type="primary" style="margin-right: 5px"
          @click="typeManageModal=true">配件类型管理</Button>
      </FormItem>
    </Form>
    <Form :label-width="115" label-colon class="border-1px"
      style="padding-top:12px;padding-right: 12px;margin-top:20px;">
      <FormItem label="唯一编号">
        <Input style="width: 255px" placeholder="请输入" :disabled='isAudit' />
      </FormItem>
      <FormItem label="同款编号">
        <Input placeholder="可设定同款编号，多个编号以、隔开" :disabled='isAudit' />
      </FormItem>
    </Form>
    <div class="info-title">
      <span>厂商信息</span>
      <Button type="primary" @click="manufacturersModal=true">选择厂商</Button>
    </div>
    <div class="border-1px" style="margin-top:20px;padding: 10px 0;">
      <Form :label-width="115" label-colon inline class="manufacturers-info">
        <FormItem label="厂商编号">
          <input type="text" v-model="manufacturersInfo.id" class="disabled-input" disabled />
        </FormItem>
        <FormItem label="厂商名称">
          <input type="text" v-model="manufacturersInfo.name" class="disabled-input name" disabled />
        </FormItem>
        <FormItem label="厂商联系人">
          <input type="text" v-model="manufacturersInfo.contact" class="disabled-input" disabled />
        </FormItem>
        <FormItem label="联系电话">
          <input type="text" v-model="manufacturersInfo.phone" class="disabled-input" disabled />
        </FormItem>
        <FormItem label="邮箱地址">
          <input type="text" v-model="manufacturersInfo.email" style="width:360px;" class="disabled-input email"
            disabled />
        </FormItem>
        <FormItem label="厂商详细地址">
          <input type="text" v-model="manufacturersInfo.address" class="disabled-input address" disabled />
        </FormItem>
      </Form>
    </div>
    <!-- 配件属性 -->
    <div class="info-title">
      <span>配件属性</span>
      <Button :disabled='isAudit' type="primary" @click="addTypeModal=true">新增类型</Button>
    </div>
    <div class="border-1px texture-prop" style="margin-top:20px;padding:0 0 10px;">
      <List :split='false' style="padding-left: 20px;">
        <ListItem v-for='(item,index) in propTypeList' style="padding-bottom:0;">
          <Button type="primary" @click='propTypeMgBt(item,index)'>{{item.key}}管理</Button>
          <span style="margin-left:10px;">{{item.list | listToStr}}</span>
        </ListItem>
      </List>
      <div style="margin: 10px 0;">
        <span style="margin-left:25px;color: #0058cc;vertical-align: super;">属性报价：</span>
      </div>
      <div class="content" style="padding:0 24px;">{{propPriceData}}
        <form  ref="propTableForm">
        <Table :columns="propPriceThead" :data="propPriceData" style="overflow:visible;">
          <template slot-scope="{ row, index }" slot="name">
            <Input type="text" v-model="propPriceData[index].name" :disabled='isAudit' />
          </template>
          <template slot-scope="{ row, index }" slot="code">
            <Input type="text" v-model="propPriceData[index].code" :disabled='isAudit' />
          </template>
          <template slot-scope="{ row, index }" slot="img">
            <td-upload :name='propPriceData[index].code' :disabled='isAudit'></td-upload>
          </template>
          <template slot-scope="{ row, index }" :slot="item.title" v-for="item in tablePropTheadList">
            <Select v-model="propPriceData[index].property[item.title]" :disabled='isAudit' style="width:120px;">
              <Option :value="i" v-for="i in item.selectList">{{i}}</Option>
            </Select>
          </template>
          <template slot-scope="{ row, index }" slot="price">
            <!-- <Input type="text" v-model="propPriceData[index].price" /> -->
            <type-input number v-model="propPriceData[index].price" :disabled='isAudit' />
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <!-- <add-btn color='#1296db' border-color='#1296db'/> -->
            <remove-btn :disabled='isAudit' color='#1296db' @click.native='deletePriceItem(index)'
              border-color='#1296db' style="padding:1px 4px;" />
          </template>
        </Table>
        </form>
      </div>
      <Form :label-width="115" inline label-colon style="padding-top:12px;padding-right: 12px;margin-top:20px;">
        <FormItem label style="width:100%;" :label-width="20">
          <Button style="margin-right: 5px" type="primary" @click="textureManageModal=true"
            :disabled='isAudit'>配件材质</Button>
          {{textureList | listToStr}}
        </FormItem>
      </Form>
      <div style="margin-bottom: 10px;">
        <span style="margin-left:25px;color: #0058cc;vertical-align: super;">配件属性：</span>
        <div @click="addProp" class="prop-add-btn" :disabled='isAudit'>
          <Icon type="md-add" style="font-size: 30px;" />
        </div>
      </div>
      <check-input :data="propList">
        <div style="padding:0 0 10px 37px;" v-for="(item,index) in propList">
          <Input v-model="item.key" maxlength="8" style="width: 170px" :disabled='isAudit' placeholder="请输入名称" />
          <Input v-model="item.value" maxlength="30" :disabled='isAudit' style="width: 296px;margin-left: 15px;"
            placeholder="请输入描述" />
          <div class="remove-btn" @click="removeProp(index)">
            <Icon type="md-remove" />
          </div>
        </div>
      </check-input>
      <div>
        <Form :label-width="102" inline label-colon style="padding-top:12px;padding-right: 12px;margin-top:20px;">
          <FormItem label="备注" style="width:100%;">
            <Input type="textarea" placeholder :disabled='isAudit' />
          </FormItem>
        </Form>
      </div>
    </div>
    <!-- <div v-if=""> -->
    <div class="info-title">
      <span>提交审核</span>
    </div>
    <div class="border-1px audit-wrap">
      <Form :label-width="115" label-colon inline ref="submitAudit" method="post" action="/a/b"
        enctype="multipart/form-data">
        <FormItem label="提交审核">
          <Input value="请审核入库" style="width: 170px" name="shenhe" />
        </FormItem>
        <div>
          <FormItem label="指派到">
            <Select v-model="templateData.l" style="width:170px;" name="zhipai">
              <Option value="template1">张三</Option>
              <Option value="template2">李四</Option>
              <Option value="template3">王五</Option>
            </Select>
          </FormItem>
          <FormItem label="通知到">
            <Input v-model="templateData.k" class="inform-input" name="tongzhi" />
            <Button type="primary" style="margin-left: 5px">搜索</Button>
          </FormItem>
        </div>
        <div>
          <FormItem label="上传文件">
            <upload multiple name="wenjian"></upload>
          </FormItem>
        </div>
      </Form>
      <!-- </div> -->
    </div>
    <!-- <div v-else> -->
    <div class="info-title">
      <span>审核入库</span>
    </div>
    <div class="border-1px audit-wrap">
      <Form :label-width="115" label-colon inline>
        <FormItem label="建档人">
          <Input value="配件录入人-寒冬" style="width: 170px" />
        </FormItem>
        <FormItem label="建档时间">
          <Input value="2019-11-11 11:11" style="width: 170px" />
        </FormItem>
      </Form>
      <Form :label-width="115" label-colon>
        <FormItem label="附件">
          <div>
            <span style="margin-right:20px;color:#0058cc;">fujian.txt</span>
            <span style="margin-right:20px;color:#0058cc;">zaijin.txt</span>
          </div>
        </FormItem>
        <FormItem label="回复信息">
          <Input type="textarea" placeholder style="width:calc(100% - 100px)" />
        </FormItem>
        <FormItem label="通知到">
          <Input v-model="templateData.k" class="inform-input" />
          <Button type="primary" style="margin-left: 5px">搜索</Button>
        </FormItem>
      </Form>
      <!-- </div> -->
    </div>
    <div style="margin: 30px;text-align: center;">
      <Button type="warning" @click="submit" style="margin-left: 5px">提交</Button>
      <Button type="primary" @click="storage" style="margin-left: 5px">暂存</Button>
      <Button type="primary" @click="close" style="margin-left: 5px">返回</Button>
    </div>
    <!-- 新增类型 -->
    <Modal v-model="addTypeModal" width='350' :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center;height:22px;">
        <span>新增类型</span>
      </p>
      <div style="text-align:center">
        <type-input v-model="addPropTypeText" />
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="addPropTypeBt">确定</Button>
      </div>
    </Modal>
    <Modal v-model="manufacturersModal" width="700">
      <p slot="header" style="color:#f60;text-align:center;height:22px;">
        <span>选择厂商</span>
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
            <Button style="margin-right: 5px" type="primary">搜索</Button>
          </FormItem>
        </Form>
        <div class="content">
          <Table :columns="columns1" :data="manufacturersList" height="300" :key="tableKey">
            <template slot-scope="{ row, index }" slot="action">
              <Radio v-model="row.checked" @on-change="checkOne(row,index)"></Radio>
            </template>
          </Table>
          <div class="page-wrap" style="text-align: center;">
            <Page :total="100" show-elevator :page-size="10" show-total />
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="chooseManufacturers">确定</Button>
      </div>
    </Modal>
    <single-input-manage modal-title="配件材质" :modal-state.sync="textureManageModal" :type-list.sync="textureList"
      width="360"
      v-if='textureManageModal'></single-input-manage>
    <single-input-manage modal-title='配件类型' :modal-state.sync="typeManageModal" :type-list.sync="typeList" width="360"
      v-if='typeManageModal'>
    </single-input-manage>
    <single-input-manage :modal-title='propTypeMgTitle' :modal-state.sync="propTypeManageModal"
      v-if='propTypeManageModal' :type-list.sync="itemPropTypeList" width="360" select>
    </single-input-manage>
  </div>
</template>
<script>
import { log } from 'util';
  export default {
    props: {
      templateData: {},
      isAudit:{
        default:false
      }
    },
    data() {
      return {
        tablePropTheadList:[],
        propPriceData: [{property:{},name:'',code:'',price:''}],
        index: null,
        propTypeList: [],
        itemPropTypeList: [],
        addPropTypeText: '',
        propTypeMgTitle: '',
        addTypeModal: false,
        typeManageModal: false,
        propTypeManageModal: false,
        manufacturersModal: false,
        textureManageModal: false,
        propListValid: null,
        value: "",
        typeList: [],
        textureList: [],
        propList: [],
        tableKey: "",
        manufacturersInfo: {},
        columns1: [{
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
        manufacturersList: [{
            name: "John Brown",
            id: 181241,
            address: "湖北",
            contact: "刘德华"
          },
          {
            name: "John ",
            id: 181,
            address: "陈慧娴",
            contact: "香港"
          },
          {
            name: " Brown",
            id: 1241,
            address: "南京",
            contact: "彭于晏"
          }
        ],
        addTypeRule: {
          type: [

          ]
        },
        initPropPriceThead: [{
            title: '名称/描述',
            slot: 'name',
            align: 'center'
          },
          {
            title: '内部编号',
            slot: 'code',
            align: 'center'
          },
          {
            title: '图片',
            slot: 'img',
            align: 'center'
          },
          {
            title: '单价',
            slot: 'price',
            align: 'center'
          },
          {
            slot:'action',
            renderHeader: (h, params) => {
              return h('Button',{
                style:{
                  padding:'4px'
                },
                on:{
                  click:()=>{
                    this.propPriceData.push({property:{},name:'',code:'',price:''})
                  }
                }
              },[h('Icon',{
                attrs:{
                  type:'md-add'
                },
                style:{
                  fontSize:'20px'
                }
              },'')]);
            },
            align: 'center'
          },
        ],
        propPriceThead: [],
      };
    },
    methods: {
      checkOne(row, index) {
        this.manufacturersList.forEach(item => (item.checked = false));
        this.manufacturersList[index].checked = true;
        this.tempManufacturers = this.manufacturersList[index];
        this.tableKey = Math.random();
      },
      chooseManufacturers() {
        this.manufacturersModal = false;
        this.manufacturersInfo = this.tempManufacturers;
      },
      addProp() {
        this.propList.push({
          key: "",
          value: ""
        });
      },
      removeProp(index) {
        this.propList.splice(index, 1);
      },
      submit() {
        // console.log(this.$refs.submitAudit.$el.submit());
        // this.close();
      },
      storage() {
        let formdata = new FormData(this.$refs.propTableForm)
        console.log(formdata);
        this.$axios.post('/a/k',formdata)
        this.verifyPropPriceData()
        // this.close();
      },
      close() {
        this.$store.commit("setMyModalShow", false);
      },
      checkPropList() {
        this.propList = this.propList.filter(item => item.key !== "");
      },
      addPropTypeBt() {
        if (this.addPropTypeText !== '') {

          this.propTypeList.push({
            key: this.addPropTypeText,
            value: '',
            list: []
          })
          this.addPropTypeText = ''
          this.addTypeModal = false;
        }
      },
      propTypeMgBt(item, index) {
        this.propTypeMgTitle = item.key + '管理'
        this.propTypeManageModal = true
        this.itemPropTypeList = item.list
        this.index = index
      },
      deletePriceItem(index){
        this.propPriceData.splice(index,1)
      },
      verifyPropPriceData(){
        return this.propPriceData.some(item=>{
          for (let key in item) {
            if(key!=='property'){
              if(item[key] == ''){
                return true
              }
            }else{
              for(let k in item[key]){
                if(item[key][k] == ''){
                  return true
                }
              }
            }
          }
        })
      }
    },
    computed: {

    },
    watch: {
      propList: {
        handler(n) {
          //同为空或都有值时验证通过，同为空的情况在提交时再处理，直接清掉
          this.propListValid = !n.some(item => {
            return (item.key === "") !== (item.value === "");
          });
        },
        deep: true
      },
      itemPropTypeList(n) {
        this.propTypeList[this.index].list = n
      },
      propTypeList:{
        handler(n){
          //每次属性有变动时初始化表头数据
          //因为有renderHeader，所以需要用深度克隆，JSON无效
          this.propPriceThead = this.$deepClone(this.initPropPriceThead)
          this.tablePropTheadList = []
          n.forEach(item=>{
            //渲染表头的数据
            this.propPriceThead.splice(3,0,{
              title:item.key,
              slot:item.key,
              align:'center',
              width:140
            })
            //渲染属性部分的表头数据
            this.tablePropTheadList.push({title:item.key,selectList:item.list})
            //列表数据，防止添加属性后不选择属性直接提交，检测不到下拉框为空
            this.propPriceData.forEach(it=>{
              if(!it.property.hasOwnProperty(item.key)){
                it[item.key] = ''
              }
            })
          })
          console.log(this.tablePropTheadList);
          
        },
        deep:true
      }
    },
    created() {
      this.propPriceThead = this.$deepClone(this.initPropPriceThead)
      let data = new FormData()
      data.append('name','hh')
      this.$axios.post('/a/b',{
        data
      })
    }
  };
</script>
<style lang="stylus" scoped>
  .template {
    padding: 0 48px;

    .info-title {
      color: #0058cc;
      border-left: 4px solid #0058cc;
      height: 21px;
      font-weight: bold;
      font-size: 16px;
      padding-left: 8px;
      margin: 20px 0;

      span {
        vertical-align: 3px;
      }

      button {
        position: relative;
        left: 40px;
        top: -5px;
      }
    }

    .ivu-form-item {
      margin-bottom: 12px;
    }

    .manufacturers-info {
      /* font-size: 16px; */
      max-width: 1300px;
      padding: 5px 0 5px;

      .disabled-input {
        display: inline-block;
        width: 225px;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 14px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #f5f7fa;
        background-image: none;
        position: relative;
        cursor: not-allowed;
      }
    }

    .texture-prop {
      .prop-add-btn {
        display: inline-block;
        border-radius: 4px;
        color: #fff;
        background: #2d8cf0;
        padding: 0 1px;
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
    }

    .audit-wrap {
      margin-top: 20px;
      padding: 10px 0;
    }

    @media screen and (min-width: 1550px) {
      .manufacturers-info .name {
        width: 710px !important;
      }

      .manufacturers-info .address {
        width: 1060px !important;
      }

      .audit-wrap .inform-input {
        width: 520px;
      }
    }

    @media screen and (max-width: 1550px) {
      .manufacturers-info .name {
        width: calc(100vw - 500px) !important;
      }

      .manufacturers-info .address {
        width: calc(100vw - 500px) !important;
      }

      .audit-wrap .inform-input {
        width: calc(100vw - 600px);
      }
    }

    @media screen and (max-width: 860px) {
      .manufacturers-info .email {
        width: calc(100vw - 500px) !important;
      }
    }
  }
</style>