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
        <Input value="盆" style="width: 130px" disabled/>
      </FormItem>
      <!-- <FormItem :label-width="0">
        <Button type="primary" style="margin-right: 5px" @click="typeManageModal=true">配件类型管理</Button>
      </FormItem> -->
    </Form>
    <Form
      :label-width="115"
      label-colon
      class="border-1px"
      style="padding-top:12px;padding-right: 12px;margin-top:20px;"
    >
      <FormItem label="唯一编号">
        <Input v-model="templateData.hyParts.partCode" style="width: 255px" placeholder="请输入" />
      </FormItem>
      <FormItem label="同款编号">
        <Input v-model="templateData.hyParts.sameCode" placeholder="可设定同款编号，多个编号以、隔开" />
      </FormItem>
    </Form>
    <!-- 图片上传 -->
    <div class="border-1px" style="height:160px;margin-top:20px;">
      <img-upload :upload-img-list.sync="uploadImgList" :size="3" />
    </div>
    <!-- 配件属性 -->
    <div class="info-title">
      <span>配件属性</span>
    </div>
    <div class="border-1px texture-prop" style="margin-top:20px;padding:0 0 10px;">
      <Form
        :label-width="115"
        inline
        label-colon
        style="padding-top:12px;padding-right: 12px;margin-top:20px;"
      >
        <FormItem label="名称\描述" style="width:100%;">
          <Input
            v-model="templateData.hyFactoryPropertyMap.propertyName"
            type="textarea"
            placeholder="请输入名称\描述"
            style="width:100%;"
          />
        </FormItem>
        <FormItem label style="width:100%;" :label-width="20">
          <Button style="margin-right: 5px" type="primary" @click="textureManageModal=true">配件材质</Button>
          <Select
            v-model="selectTexture"
            style="width:220px;margin-right:10px;"
            multiple
            :max-tag-count="2"
          >
            <Option :value="item.materialName" v-for="item in textureList">{{item.materialName}}</Option>
          </Select>
          <span>{{selectTexture | listToStr}}</span>
        </FormItem>
      </Form>
      <div style="margin-bottom: 10px;">
        <span style="margin-left:25px;color: #0058cc;vertical-align: super;">配件属性：</span>
        <div @click="addProp" class="prop-add-btn">
          <Icon type="md-add" style="font-size: 30px;" />
        </div>
      </div>
      <check-input :data="propList">
        <div style="padding:0 0 10px 37px;" v-for="(item,index) in propList">
          <Input v-model="item.key" maxlength="8" style="width: 170px" placeholder="请输入名称" />
          <Input
            v-model="item.value"
            maxlength="30"
            style="width: 296px;margin-left: 15px;"
            placeholder="请输入描述"
          />
          <div class="remove-btn" @click="removeProp(index)">
            <Icon type="md-remove" />
          </div>
        </div>
      </check-input>
      <div>
        <Form
          :label-width="102"
          inline
          label-colon
          style="padding-top:12px;padding-right: 12px;margin-top:20px;"
        >
          <FormItem label="备注" style="width:100%;">
            <Input v-model="templateData.hyFactoryPropertyMap.remark" type="textarea" placeholder />
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="info-title">
      <span>厂商信息</span>
    </div>
    <div class="border-1px" style="margin-top:20px;padding: 10px 0;">
      <div class="content" style="padding:0 24px;">
        <form ref="propTableForm">
          <Table :columns="partFactoryTableThead" :data="pastFactoryInfoList" style="overflow:visible;">
            <template slot-scope="{ row, index }" slot="action">
              <!-- <add-btn color='#1296db' border-color='#1296db'/> -->
              <remove-btn
                color="#1296db"
                @click.native="deleteFactoryItem(index)"
                border-color="#1296db"
                style="padding:1px 4px;"
              />
            </template>
          </Table>
        </form>
      </div>
    </div>
    <!-- <div v-if=""> -->
    <div class="info-title">
      <span>提交审核</span>
    </div>
    <div class="border-1px audit-wrap">
      <Form
        :label-width="115"
        label-colon
        inline
        ref="submitAudit"
        method="post"
        action="/a/b"
        enctype="multipart/form-data"
      >
        <FormItem label="提交审核">
          <Input
            v-model="templateData.hyAudits.reason"
            value="请审核入库"
            style="width: 170px"
            name="shenhe"
          />
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
            <upload multiple name="wenjian" v-model="fileList"></upload>
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
          <Input v-model="templateData.hyAudits.jiandangren" style="width: 170px" />
        </FormItem>
        <FormItem label="建档时间">
          <Input v-model="templateData.hyAudits.jiandangshijian" style="width: 170px" />
        </FormItem>
      </Form>
      <Form :label-width="115" label-colon>
        <FormItem label="附件">
          <div>
            <span style="margin-right:20px;color:#0058cc;">fujian.txt</span>
            <span style="margin-right:20px;color:#0058cc;">zaijin.txt</span>
            <!-- <span v-for='item in templateData.hyAudits.files' style="margin-right:20px;color:#0058cc;">
              {{item.name}}
            </span>-->
          </div>
        </FormItem>
        <FormItem label="回复信息">
          <Input
            v-model="templateData.hyAudits.message"
            type="textarea"
            placeholder
            style="width:calc(100% - 100px)"
          />
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
    <Modal v-model="factoryModal" width="700">
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
          <Table :columns="factoryTableThead" :data="factoryList" height="300" :key="tableKey">
            <template slot-scope="{ row, index }" slot="action">
              <Radio v-model="row.checked" @on-change="checkOne(row,index)" name="a"></Radio>
            </template>
          </Table>
          <div class="page-wrap" style="text-align: center;border-bottom:1px solid #cdd3dd;padding-bottom:10px;">
            <Page :total="100" show-elevator :page-size="10" show-total />
          </div>
          <Form
            :label-width="90"
            :model="selectedFactory"
            inline
            label-colon
            style="padding-top:12px;border-bottom:1px solid #cdd3dd;"
          >
            <FormItem label="编号" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.factoryCode" disabled style="width: 170px" />
            </FormItem>
            <FormItem label="名称" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.factoryName" disabled style="width: 170px" />
            </FormItem>
            <FormItem label="地址" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.factoryAddress" disabled style="width: 170px" />
            </FormItem>
            <FormItem label="联系人姓名" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.name" disabled style="width: 170px" />
            </FormItem>
            <FormItem label="电话" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.telephone" disabled style="width: 170px" />
            </FormItem>
            <FormItem label="邮箱" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.email" disabled style="width: 170px" />
            </FormItem>
          </Form>
          <Form
            :label-width="80"
            :model="selectedFactory"
            inline
            label-colon
            style="padding-top:12px;border-bottom:1px solid #cdd3dd;"
          >
            <FormItem label="出厂价" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.factoryPriceComing" style="width: 80px" />
            </FormItem>
            <FormItem label="到厂价" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.factoryPriceGoing" style="width: 80px" />
            </FormItem>
            <FormItem label="内部编号" style="margin-bottom:10px;">
              <Input v-model="selectedFactory.factoryPartCode" style="width: 170px" />
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="chooseFactory">确定</Button>
      </div>
    </Modal>
    <single-type-manage
      modal-title="配件材质管理"
      :modal-state.sync="textureManageModal"
      :type-list.sync="textureList"
      v-if="textureManageModal"
      width="360"
    ></single-type-manage>
    <single-type-manage
      modal-title="配件类型管理"
      :modal-state.sync="typeManageModal"
      v-if="typeManageModal"
      :type-list.sync="typeList"
      width="360"
    ></single-type-manage>
  </div>
</template>
<script>
export default {
  props: {
    templateData: {}
  },
  data() {
    return {
      typeManageModal: false,
      factoryModal: false,
      textureManageModal: false,
      propListValid: null,
      value: "",
      propList: [],
      fileList: [],
      selectTexture: [],
      tableKey: "",
      selectedFactory: {},
      manufacturersInfo: {},
      uploadImgList: [],
      pastFactoryInfoList: [],
      baseTableThead:[
        {
          title: "厂商编号",
          key: "factoryCode"
        },
        {
          title: "厂商名称",
          key: "factoryName"
        },
        {
          title: "出厂价",
          key: "factoryPriceComing"
        },
        {
          title: "到厂价",
          key: "factoryPriceGoing"
        },
        {
          title: "编辑日期",
          key: "updateDate"
        }
      ],
      factoryTableThead: [],
      partFactoryTableThead: [],
      factoryList: [
        {
          factoryCode: "496456",
          factoryName: "沪电",
          factoryPriceComing: "10",
          factoryPriceGoing: "11",
          updateDate: "2011-2-6",
          factoryAddress: "深圳",
          name: "詹姆斯",
          telephone: "1235689845",
          email: "13@139.com"
        },
        {
          factoryCode: "496456",
          factoryName: "共进",
          factoryPriceComing: "10",
          factoryPriceGoing: "11",
          updateDate: "2011-2-6",
          factoryAddress: "上海",
          name: "刘德华",
          telephone: "1235689456",
          email: "13@qq.com"
        }
      ]
    };
  },
  methods: {
    checkOne(row, index) {
      this.factoryList.forEach(item => (item.checked = false));
      this.factoryList[index].checked = true;
      this.selectedFactory = this.$deepClone(this.factoryList[index]);
      this.tableKey = Math.random();
    },
    chooseFactory() {
      //templateData.hyFactoryPropertyMap选择厂商时把选择的ID传过去[{ID:''}]
      this.factoryModal = false;
      this.pastFactoryInfoList.push(this.selectedFactory)
    },
    addProp() {
      this.propList.push({ key: "", value: "" });
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
      let temp = this.$deepClone(this.templateData);
      temp.hyPartPicture = this.uploadImgList.map(item => {
        return {
          pictureUrl: item,
          pictureType: 1
        };
      });
      this.fileList.forEach(item => {
        temp.hyPartPicture.push({
          pictureUrl: item,
          pictureType: 3
        });
      });
      temp.hyFactoryPropertyMap.caizhi = this.selectTexture.join("、");
      let prop = {};
      this.propList.forEach(item => {
        prop[item.key] = item.value;
      });
      temp.hyFactoryPropertyMap.property[0] = prop;
      console.log(temp);
      this.$axios.post("/a/a", temp);
    },
    storage() {
      this.close();
    },
    close() {
      this.$store.commit("setMyModalShow", false);
    },
    checkPropList() {
      this.propList = this.propList.filter(item => item.key !== "");
    },
    deleteFactoryItem(index){
      this.pastFactoryInfoList.splice(index,1)
    }
  },
  computed: {
    textureList() {
      return this.$store.state.mountings.textureList;
    },
    typeList() {
      return this.$store.state.mountings.typeList;
    }
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
    this.factoryTableThead = [...this.baseTableThead,{slot:'action',title:'选择'}]
    this.partFactoryTableThead = [...this.baseTableThead,{
      slot:'action',
      renderHeader: (h, params) => {
        return h('Button',{
          style:{
            padding:'4px',
            position: 'relative',
            right:' -4px'
          },
          on:{
            click:()=>{
              this.factoryModal=true
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
    }]
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
    .audit-wrap .inform-input {
      width: 520px;
    }
  }

  @media screen and (max-width: 1550px) {
    .audit-wrap .inform-input {
      width: calc(100vw - 600px);
    }
  }
}
</style>