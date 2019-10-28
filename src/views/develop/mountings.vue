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
      <Table :columns="columns1" :data="data1" class="table-height">
        <template slot-scope="{ row, index }" slot="action">
          <Button size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        </template>
      </Table>
      <div class="page-wrap">
        <div style='float: left;'>
          <Button @click="handleSubmit('formValidate')">草稿列表</Button>
          <Button @click="handleSubmit('formValidate')">配件材质管理</Button>
          <Button @click="handleSubmit('formValidate')">配件类型管理</Button>
        </div>
        <Page :total="100" show-elevator />
      </div>
    </div>
    <my-modal :show.sync="showAdd" modal-title='研发-配件建档'>
      <template #btn>
        <Button type="primary">保存草稿</Button>
      </template>
      <template #content>
        <template2 :templateData='templateData' v-if='templateData.type === "template2"'/>
        <template1 :templateData='templateData' v-if='templateData.type === "template1"'/>
      </template>
    </my-modal>
  </div>
</template>
<script>
import Template1 from './mountingsTemplate/template1'
import Template2 from './mountingsTemplate/template2'
import { log } from 'util';
  export default {
    components:{
      template1:Template1,
      template2:Template2
    },
    data() {
      return {
        showAdd:true,
        templateData:{
          type:'template1'
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
        columns1: [
          {
            title: '序号',
            type:'index'
          },
          {
            title: '配件类型',
            key: 'name'
          },
          {
            title: '配件编号',
            key: 'age'
          },
          {
            title: '图片',
            key: 'address'
          },
          {
            title: '厂商信息',
            key: 'address'
          },
          {
            title: '名称/描述',
            key: 'address'
          },
          {
            title: '建档日期',
            key: 'address'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data1: [{
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
        ]
      }
    },
    methods:{
      bookbuilding(){
        this.showAdd = true;
        this.templateData.type = 'template1';
      }
    }
  }
</script>