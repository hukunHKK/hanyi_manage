<template>
  <div class="template" ref="template1">
    <div class="info-title">
      <span>基本信息</span>
    </div>
    <Form :label-width="115" inline label-colon class="border-1px" style="padding-top:12px;">
      <FormItem label="建档模板">
        <Select v-model="templateData.type" style="width:120px;">
          <Option value="template1">模板1</Option>
          <Option value="template2">模板2</Option>
          <Option value="template3">模板3</Option>
          <Option value="special-pot">特殊类 盆</Option>
          <Option value="special-box">特殊类 箱麦</Option>
          <Option value="special-froth">特殊类 泡沫</Option>
        </Select>
      </FormItem>
      <FormItem label="配件类型">
        <Select v-model="templateData.a" style="width:120px;">
          <!-- <Option value="penzi">盆子</Option>
          <Option value="huaban">花瓣</Option>
          <Option value="yezi">叶子</Option>-->
          <Option v-for="item in typeList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="0">
        <Button type="primary" style="margin-right: 5px" @click="typeManageModal=true">配件类型管理</Button>
      </FormItem>
    </Form>
    <Form
      :label-width="115"
      label-colon
      class="border-1px"
      style="padding-top:12px;padding-right: 12px;margin-top:20px;"
    >
      <FormItem label="唯一编号">
        <Input style="width: 255px" placeholder="请输入" />
      </FormItem>
      <FormItem label="同款编号">
        <Input placeholder="可设定同款编号，多个编号以、隔开" />
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
      <!-- <div class="manufacturers-info">厂商编号：{{manufacturersInfo.id}}</div>
      <div class="manufacturers-info">厂商联系人：{{manufacturersInfo.contact}}</div>
      <div class="manufacturers-info">厂商详细地址：{{manufacturersInfo.address}}</div>-->
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
          <input
            type="text"
            v-model="manufacturersInfo.email"
            style="width:360px;"
            class="disabled-input email"
            disabled
          />
        </FormItem>
        <FormItem label="厂商详细地址">
          <input
            type="text"
            v-model="manufacturersInfo.address"
            class="disabled-input address"
            disabled
          />
        </FormItem>
      </Form>
    </div>
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
        <FormItem label="厂商内部编号">
          <Input style="width: 255px" placeholder="请输入厂商内部编号" />
        </FormItem>
        <FormItem label="单价" :label-width="70">
          <Input style="width: 255px" placeholder="请输入" />
        </FormItem>
        <FormItem label="名称\描述" style="width:100%;">
          <Input type="textarea" placeholder="请输入名称\描述" style="width:100%;" />
        </FormItem>
        <FormItem label style="width:100%;" :label-width="20">
          <Button style="margin-right: 5px" type="primary" @click="textureManageModal=true">配件材质</Button>
          {{textureStr}}
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
            <Input type="textarea" placeholder />
          </FormItem>
        </Form>
      </div>
    </div>
    <!-- <div v-if=""> -->
    <div class="info-title">
      <span>提交审核</span>
    </div>
    <div class="border-1px audit-wrap">
      <Form :label-width="115" label-colon inline ref="submitAudit" method="post" action="/a/b" enctype="multipart/form-data">
        <FormItem label="提交审核">
          <Input value="请审核入库" style="width: 170px" name="shenhe"/>
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
            <Input v-model="templateData.k" class="inform-input" name="tongzhi"/>
            <Button type="primary" style="margin-left: 5px">搜索</Button>
          </FormItem>
        </div>
        <div>
          <FormItem label="上传文件">
            <upload multiple name='wenjian'></upload>
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
    <single-input-manage
      :modal-state.sync="textureManageModal"
      :type-list.sync="textureList"
      width="360"
    ></single-input-manage>
    <single-input-manage :modal-state.sync="typeManageModal" :type-list.sync="typeList" width="360"></single-input-manage>
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
      manufacturersModal: false,
      textureManageModal: false,
      propListValid: null,
      value: "",
      typeList: [],
      textureList: [],
      propList: [],
      tableKey: "",
      manufacturersInfo: {},
      uploadImgList: [],
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
      ]
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
      this.propList.push({ key: "", value: "" });
    },
    removeProp(index) {
      this.propList.splice(index, 1);
    },
    submit() {
      console.log(this.$refs.submitAudit.$el.submit());
      // this.close();
    },
    storage() {
      this.close();
    },
    close() {
      this.$store.commit("setMyModalShow", false);
    },
    checkPropList() {
      this.propList = this.propList.filter(item => item.key !== "");
    }
  },
  computed: {
    textureStr() {
      if (this.textureList.length === 0) {
        return "";
      } else if (this.textureList.length === 1) {
        return "含 " + this.textureList.join("、");
      } else {
        return "含 " + this.textureList.join("、") + "；";
      }
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
  created() {}
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