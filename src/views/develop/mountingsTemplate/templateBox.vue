<template>
  <div class="template" ref="template1">
    <div class="info-title">
      <span>基本信息</span>
    </div>
    <Form :label-width="115" inline label-colon class="border-1px" style="padding-top:12px;">
      <FormItem label="建档模板">
        <Select v-model="templateData.hyParts.modelType" style="width:120px;">
          <Option value="模板一">模板一</Option>
          <Option value="模板二">模板二</Option>
          <Option value="模板三">模板三</Option>
          <Option value="特殊类盆">特殊类盆</Option>
          <Option value="特殊类箱麦">特殊类箱麦</Option>
          <Option value="特殊类泡沫">特殊类泡沫</Option>
        </Select>
      </FormItem>
      <FormItem label="配件类型">
        <Input value="箱麦" style="width: 130px" disabled />
      </FormItem>
    </Form>
    <Form :label-width="115" label-colon class="border-1px"
      style="padding-top:12px;padding-right: 12px;margin-top:20px;">
      <FormItem label="唯一编号">
        <Input v-model='templateData.hyParts.partCode' style="width: 255px" placeholder="请输入" />
      </FormItem>
      <FormItem label="同款编号">
        <Input v-model='templateData.hyParts.sameCode' placeholder="可设定同款编号，多个编号以、隔开" />
      </FormItem>
    </Form>
    <!-- 图片上传 -->
    <div class="border-1px" style="height:160px;margin-top:20px;">
      <img-upload :upload-img-list.sync="uploadImgList" />
    </div>
    <div class="info-title">
      <span>厂商信息</span>
      <Button type="primary" @click="manufacturersModal=true">选择厂商</Button>
    </div>
    <div class="border-1px" style="margin-top:20px;padding: 10px 0;">
      <Form :label-width="115" label-colon inline class="manufacturers-info">
        <FormItem label="厂商编号">
          <input type="text" v-model="manufacturersInfo.factoryCode" class="disabled-input" disabled />
        </FormItem>
        <FormItem label="厂商名称">
          <input type="text" v-model="manufacturersInfo.factoryName" class="disabled-input name" disabled />
        </FormItem>
        <FormItem label="厂商联系人">
          <input type="text" v-model="manufacturersInfo.name" class="disabled-input" disabled />
        </FormItem>
        <FormItem label="联系电话">
          <input type="text" v-model="manufacturersInfo.telephone" class="disabled-input" disabled />
        </FormItem>
        <FormItem label="邮箱地址">
          <input type="text" v-model="manufacturersInfo.email" style="width:360px;" class="disabled-input email"
            disabled />
        </FormItem>
        <FormItem label="厂商详细地址">
          <input type="text" v-model="manufacturersInfo.factoryAddress" class="disabled-input address" disabled />
        </FormItem>
      </Form>
    </div>
    <!-- 配件属性 -->
    <div class="info-title">
      <span>配件属性</span>
    </div>
    <div class="border-1px texture-prop" style="margin-top:20px;padding:0 0 10px;">
      <Form :label-width="115" inline label-colon style="padding-top:12px;padding-right: 12px;margin-top:20px;">
        <FormItem label="厂商内部编号">
          <Input v-model='templateData.hyFactoryPropertyMap.factoryPartCode' style="width: 255px"
            placeholder="请输入厂商内部编号" />
        </FormItem>
        <FormItem label style="width:100%;" :label-width="20">
          <Button style="margin-right: 5px" type="primary" @click="textureManageBt">配件材质</Button>
          <Select v-model="selectTexture" style="width:220px;margin-right:10px;" multiple :max-tag-count='2'>
            <Option :value="item.materialName" v-for='item in textureList'>{{item.materialName}}</Option>
          </Select>
          <span>{{selectTexture | listToStr}}</span>
        </FormItem>
        <span style="margin-left:25px;color: #0058cc;vertical-align: super;">箱卡类型：</span>
        <FormItem label style="width:100%;" :label-width="20">
          <Button style="margin-right: 5px" type="primary" @click="cartonManageBt">纸箱管理</Button>
          <Select v-model="selectCarton" style="width:220px;margin-right:10px;" multiple :max-tag-count='2'>
            <Option :value="item.cartonName" v-for='item in cartonList'>{{item.cartonName}}</Option>
          </Select>
          <span>{{selectCarton | listToStr}}</span>
        </FormItem>
        <FormItem label style="width:100%;" :label-width="20">
          <Button style="margin-right: 5px" type="primary" @click="paperCardManageBt">纸卡管理</Button>
          <Select v-model="selectPaperCard" style="width:220px;margin-right:10px;" multiple :max-tag-count='2'>
            <Option :value="item.paperCardName" v-for='item in paperCardList'>{{item.paperCardName}}</Option>
          </Select>
          <span>{{selectPaperCard | listToStr}}</span>
        </FormItem>
      </Form>
      <div style="margin-bottom: 10px;">
        <span style="margin-left:25px;color: #0058cc;vertical-align: super;">纸质报价：</span>
      </div>
      <div style="display: flex;padding: 0 10px;">
        <!-- 单坑 -->
        <Table :columns="pitThead.singleThead" :data="singlePitList" class="table-thead-blue"
          style="margin-right:5px;flex: 1;">
          <template slot-scope="{ row, index }" slot="pit">
            <Input v-model='singlePitList[index].name'
              placeholder="请输入名称" />
          </template>
          <template slot-scope="{ row, index }" slot="price">
            <Input v-model='singlePitList[index].price'
              placeholder="请输入价格" />
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <remove-btn color="#1296db" @click.native="deleteFactoryItem(index)" border-color="#1296db"
              style="padding:1px 4px;margin-left: -5px;" />
          </template>
        </Table>
        <!-- 双坑 -->
        <Table :columns="pitThead.doubleThead" :data="doublePitList" class="table-thead-blue"
          style="margin-right:5px;flex: 1;">
          <template slot-scope="{ row, index }" slot="pit">
            <Input v-model='doublePitList[index].name' placeholder="请输入名称" />
          </template>
          <template slot-scope="{ row, index }" slot="price">
            <Input v-model='doublePitList[index].price' placeholder="请输入价格" />
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <remove-btn color="#1296db" @click.native="deleteFactoryItem(index)" border-color="#1296db"
              style="padding:1px 4px;margin-left: -5px;" />
          </template>
        </Table>
        <!-- 三坑 -->
        <Table :columns="pitThead.threeThead" :data="threePitList" class="table-thead-blue"
          style="margin-right:5px;flex: 1;">
          <template slot-scope="{ row, index }" slot="pit">
            <Input v-model='threePitList[index].name' placeholder="请输入名称" />
          </template>
          <template slot-scope="{ row, index }" slot="price">
            <Input v-model='threePitList[index].price' placeholder="请输入价格" />
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <remove-btn color="#1296db" @click.native="deleteFactoryItem(index)" border-color="#1296db"
              style="padding:1px 4px;margin-left: -5px;" />
          </template>
        </Table>
        <!-- E坑 -->
        <Table :columns="pitThead.eThead" :data="ePitList" class="table-thead-blue" style="flex: 1;">
          <template slot-scope="{ row, index }" slot="pit">
            <Input v-model='ePitList[index].name' placeholder="请输入名称" />
          </template>
          <template slot-scope="{ row, index }" slot="price">
            <Input v-model='ePitList[index].price' placeholder="请输入价格" />
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <remove-btn color="#1296db" @click.native="deleteFactoryItem(index)" border-color="#1296db"
              style="padding:1px 4px;margin-left: -5px;" />
          </template>
        </Table>
      </div>
      <!-- <check-input :data="propList">
        <div style="padding:0 0 10px 37px;" v-for="(item,index) in propList">
          <Input v-model="item.key" maxlength="8" style="width: 170px" placeholder="请输入名称" />
          <Input v-model="item.value" maxlength="30" style="width: 296px;margin-left: 15px;" placeholder="请输入描述" />
          <div class="remove-btn" @click="removeProp(index)">
            <Icon type="md-remove" />
          </div>
        </div>
      </check-input> -->
      <div>
        <Form :label-width="102" inline label-colon style="padding-top:12px;padding-right: 12px;margin-top:20px;">
          <FormItem label="备注" style="width:100%;">
            <Input v-model='templateData.hyFactoryPropertyMap.remark' type="textarea" placeholder />
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
          <Input v-model='templateData.hyAudits.reason' value="请审核入库" style="width: 170px" name="shenhe" />
        </FormItem>
        <div>
          <FormItem label="指派到">
            <Select v-model="templateData.hyAudits.zhipai" style="width:170px;" name="zhipai">
              <Option value="template1">张三</Option>
              <Option value="template2">李四</Option>
              <Option value="template3">王五</Option>
            </Select>
          </FormItem>
          <FormItem label="通知到">
            <Input v-model="templateData.hyAudits.noticeUser" class="inform-input" name="tongzhi" />
            <Button type="primary" style="margin-left: 5px">搜索</Button>
          </FormItem>
        </div>
        <div>
          <FormItem label="上传文件">
            <upload multiple name='wenjian' v-model='fileList'></upload>
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
          <Input v-model='templateData.hyAudits.jiandangren' style="width: 170px" />
        </FormItem>
        <FormItem label="建档时间">
          <Input v-model='templateData.hyAudits.jiandangshijian' style="width: 170px" />
        </FormItem>
      </Form>
      <Form :label-width="115" label-colon>
        <FormItem label="附件">
          <div>
            <span style="margin-right:20px;color:#0058cc;">fujian.txt</span>
            <span style="margin-right:20px;color:#0058cc;">zaijin.txt</span>
            <!-- <span v-for='item in templateData.hyAudits.files' style="margin-right:20px;color:#0058cc;">
              {{item.name}}
            </span> -->
          </div>
        </FormItem>
        <FormItem label="回复信息">
          <Input v-model='templateData.hyAudits.message' type="textarea" placeholder style="width:calc(100% - 100px)" />
        </FormItem>
        <FormItem label="通知到">
          <Input v-model="templateData.hyAudits.notice_user" class="inform-input" />
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
    <!-- <single-type-manage modal-title="配件材质管理" :modal-state.sync="textureManageModal" :type-list.sync="textureList"
      v-if="textureManageModal" width="360"></single-type-manage>
    <single-type-manage modal-title="配件类型管理" :modal-state.sync="typeManageModal" v-if="typeManageModal"
      :type-list.sync="typeList" width="360">
    </single-type-manage> -->
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    props: {
      templateData: {}
    },
    data() {
      return {
        typeManageModal: false,
        manufacturersModal: false,
        textureManageModal: false,
        propListValid: null,
        value: "",
        propList: [],
        fileList: [],
        selectTexture: [],
        selectCarton: [],
        selectPaperCard: [],
        tableKey: "",
        manufacturersInfo: {},
        uploadImgList: [],
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
        manufacturersList: [
          {
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
        pitThead: {
          singleThead: [
            {
              title: '单坑',
              slot: 'pit'
            },
            {
              title: '单价',
              slot: 'price'
            },
            {
              slot: 'action',
              width:50,
              renderHeader: (h, params) => {
                return h('Button', {
                  style: {
                    padding: '4px',
                    position: 'relative',
                    right: ' 7px'
                  },
                  on: {
                    click: () => {
                      this.singlePitList.push({
                        name: '',
                        price: ''
                      })
                    }
                  }
                }, [h('Icon', {
                  attrs: {
                    type: 'md-add'
                  },
                  style: {
                    fontSize: '20px'
                  }
                }, '')]);
              },
              align: 'center'
            }
          ],
          doubleThead: [{
              title: '双坑',
              slot: 'pit'
            },
            {
              title: '单价',
              slot: 'price'
            },
            {
              slot: 'action',
              width:50,
              renderHeader: (h, params) => {
                return h('Button', {
                  style: {
                    padding: '4px',
                    position: 'relative',
                    right: '7px'
                  },
                  on: {
                    click: () => {
                      this.doublePitList.push({
                        property: {},
                        name: '',
                        price: ''
                      })
                    }
                  }
                }, [h('Icon', {
                  attrs: {
                    type: 'md-add'
                  },
                  style: {
                    fontSize: '20px'
                  }
                }, '')]);
              },
              align: 'center'
            }
          ],
          threeThead: [
            {
              title: '三坑',
              slot: 'pit'
            },
            {
              title: '单价',
              slot: 'price'
            },
            {
              slot: 'action',
              width:50,
              renderHeader: (h, params) => {
                return h('Button', {
                  style: {
                    padding: '4px',
                    position: 'relative',
                    right: '7px'
                  },
                  on: {
                    click: () => {
                      this.threePitList.push({
                        property: {},
                        name: '',
                        price: ''
                      })
                    }
                  }
                }, [h('Icon', {
                  attrs: {
                    type: 'md-add'
                  },
                  style: {
                    fontSize: '20px'
                  }
                }, '')]);
              },
              align: 'center'
            }
          ],
          eThead: [
            {
              title: 'E坑',
              slot: 'pit'
            },
            {
              title: '单价',
              slot: 'price'
            },
            {
              slot: 'action',
              width:50,
              renderHeader: (h, params) => {
                return h('Button', {
                  style: {
                    padding: '4px',
                    position: 'relative',
                    right: '7px'
                  },
                  on: {
                    click: () => {
                      this.ePitList.push({
                        name:'',
                        price:''
                      })
                    }
                  }
                }, [h('Icon', {
                  attrs: {
                    type: 'md-add'
                  },
                  style: {
                    fontSize: '20px'
                  }
                }, '')]);
              },
              align: 'center'
            }
          ]
        },
        singlePitList: [],
        doublePitList: [],
        threePitList: [],
        ePitList: [],
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
        //templateData.hyFactoryPropertyMap选择厂商时把选择的ID传过去[{ID:''}]
        this.manufacturersModal = false;
        this.manufacturersInfo = this.tempManufacturers;
      },
      removeProp(index) {
        this.propList.splice(index, 1);
      },
      submit() {
        //提交时再把图片数据加进去hyPartPicture:[{picture_url:'',picture_type:1}]
        //配件材质也要加进去(格式化selectTexture)
        //配件属性propList
        // 上传的文件fileList
        // console.log(this.$refs.submitAudit.$el.submit());
        // this.close();
        let temp = this.$deepClone(this.templateData)
        temp.hyPartPicture = this.uploadImgList.map(item => {
          return {
            pictureUrl: item,
            pictureType: 1
          }
        })
        this.fileList.forEach(item => {
          temp.hyPartPicture.push({
            pictureUrl: item,
            pictureType: 3
          })
        })
        temp.hyFactoryPropertyMap.caizhi = this.selectTexture.join('、')
        let prop = {}
        this.propList.forEach(item => {
          prop[item.key] = item.value
        })
        temp.hyFactoryPropertyMap.property[0] = prop
        console.log(temp);
        this.$axios.post('/a/a', temp)
      },
      storage() {
        let props = {
          singkePit:{}
        }
        this.templateData.hyFactoryPropertyMap.property[0] = props
        this.singlePitList.forEach(item=>{
          props.singkePit[item.name] = item.price
        })
        console.log(this.templateData.hyFactoryPropertyMap.property[0]);
        
        // this.templateData.hyFactoryPropertyMap.property[0] = {}
        // this.close();
      },
      close() {
        this.$store.commit("setMyModalShow", false);
      },
      checkPropList() {
        this.propList = this.propList.filter(item => item.key !== "");
      },
      textureManageBt() {
        this.$store.commit('setTextureManageModal', true)
      },
      cartonManageBt() {
        this.$store.commit('setCartonManageModal', true)
      },
      paperCardManageBt() {
        this.$store.commit('setPaperCardManageModal', true)
      },
    },
    computed: {
      ...mapState({
        textureList: state => state.mountings.textureList,
        typeList: state => state.mountings.typeList,
        cartonList: state => state.mountings.cartonList,
        paperCardList: state => state.mountings.paperCardList,
      })
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
      }
    },
    created() {
      this.templateData.hyParts.partType = '特殊类盆'
      return
      //查询textureList
      // this.$axios.get('/a').then(res=>{

      // })
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

    .select-multiple {
      .ivu-select-selection {
        height: 32px;
        overflow: hidden;
      }
    }
  }
</style>