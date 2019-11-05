<template>
  <div>
    <div class="query-heard">
      <Form :label-width="80" inline label-colon>
        <FormItem label="配件类型">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="配件编号">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="名称/描述">
          <Input v-model="formItem.input" placeholder="请输入" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="formItem.select">
            <Option value="beijing">待审核</Option>
            <Option value="shanghai">已驳回</Option>
            <Option value="shanghai">编辑中</Option>
          </Select>
        </FormItem>
        <FormItem label="建档日期">
          <Select v-model="formItem.select">
            <Option value="beijing">正序</Option>
            <Option value="shanghai">倒叙</Option>
          </Select>
        </FormItem>
        <FormItem label="处理人">
          <Select v-model="formItem.select">
            <Option value="beijing">全部</Option>
            <Option value="beijing">周杰伦</Option>
            <Option value="shanghai">陈慧娴</Option>
          </Select>
        </FormItem>
        <FormItem class="h-form-bottom">
          <Button type="primary" @click="handleSubmit('formValidate')">搜索</Button>
          <Button type="primary" @click="bookbuilding">建档</Button>
        </FormItem>
      </Form>
    </div>
    <div class="content">
      <Table :columns="columns" :data="mountingsList" class="table-height">
        <template slot-scope="{ row, index }" slot="action">
          <Button size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        </template>
      </Table>
      <div class="page-wrap">
        <div style='float: left;'>
          <Button @click="handleSubmit('formValidate')">草稿列表</Button>
          <Button @click="textureManageBt()">配件材质管理</Button>
          <Button @click="typeManageBt()">配件类型管理</Button>
        </div>
        <Page :total="100" show-elevator />
      </div>
    </div>
    <my-modal modal-title='研发-配件建档'>
      <template #btn>
        <Button type="primary" style="width:85px;" @click="storage">暂存</Button>
      </template>
      <template #content>
        <template1 :templateData='templateData' v-if='templateData.hyParts.modelType === "模板一"' ref="模板一" />
        <template2 :templateData='templateData' v-if='templateData.hyParts.modelType === "模板二"' ref="模板二" />
        <template3 :templateData='templateData' v-if='templateData.hyParts.modelType === "模板三"' ref="模板三" />
        <templateSalver :templateData='templateData' v-if='templateData.hyParts.modelType === "特殊类盆"' ref="特殊类盆" />
        <templateBox :templateData='templateData' v-if='templateData.hyParts.modelType === "特殊类箱麦"' ref="特殊类箱麦" />
      </template>
    </my-modal>
    <single-type-manage
      modal-title="配件材质管理"
      :modal-state.sync="textureManageModal"
      dispatch='setTextureList'
      k='materialName'
      v-if="textureManageModal"
      :type-list.sync="textureList"
      width="360"
    ></single-type-manage>
    <single-type-manage 
      modal-title="配件类型管理" 
      :modal-state.sync="typeManageModal"
      k='typeName'
      dispatch='setTypeList'
      v-if="typeManageModal"
      :type-list.sync="typeList" width="360">
    </single-type-manage>
  </div>
</template>
<script>
import Template1 from './mountingsTemplate/template1'
import Template2 from './mountingsTemplate/template2'
import Template3 from './mountingsTemplate/template3'
import TemplateSalver from './mountingsTemplate/templateSalver'
import TemplateBox from './mountingsTemplate/templateBox'
  export default {
    components:{
      template1:Template1,
      template2:Template2,
      template3:Template3,
      templateSalver:TemplateSalver,
      templateBox:TemplateBox,
    },
    data() {
      return {
        textureManageModal:false,
        typeManageModal:false,
        templateData:{
          hyParts:{
            modelType:'特殊类箱麦'
          },
          hyFactoryPropertyMap:{
            property:[]
          },
          hyAudits:{},
          hyPartPicture:[]
        },
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        },
        columns: [
          {
            title: '序号',
            type:'index',
            width:70,
            align:'center'
          },
          {
            title: '配件类型',
            key: 'name',
            width:120
          },
          {
            title: '配件编号',
            key: 'age',
            width:120
          },
          {
            title: '图片',
            key: 'address'
          },
          {
            title: '厂商信息',
            key: 'address',
            width:250
          },
          {
            title: '名称/描述',
            key: 'address',
            width:250
          },
          {
            title: '建档日期',
            key: 'address'
          },
          {
            title: '状态',
            key: 'state',
            width:80
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        mountingsList: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            state:'已驳回'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01',
            state:'审核中'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'审核中'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'审核中'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'审核中'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
            state:'已驳回'
          }
        ]
      }
    },
    methods:{
      bookbuilding(){
        this.$store.commit('setMyModalShow', true);
        this.templateData.hyParts.modelType = 'template一';
      },
      storage(){
        this.$refs[this.templateData.type].storage()
      },
      textureManageBt(){
        // console.log(this.$store.dispatch('getTextureList'))
        // return
        this.textureManageModal = true
      },
      typeManageBt(){
        this.typeManageModal = true
      }
    },
    created(){
      // return
      // 查询配件类型
      this.$store.dispatch('getTypeList')
      // 查询配件材质
      this.$store.dispatch('getTextureList')
    },
    computed: {
      textureList(){
        return this.$store.state.mountings.textureList
      },
      typeList(){
        return this.$store.state.mountings.typeList
      }
    }
  }
</script>