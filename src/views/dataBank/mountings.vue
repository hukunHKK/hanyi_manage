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
        <FormItem label="厂商编号">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="厂商名称">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="建档日期">
          <Select v-model="formItem.select">
            <Option value="beijing">正序</Option>
            <Option value="shanghai">倒叙</Option>
          </Select>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="formItem.select">
            <Option value="beijing">待审核</Option>
            <Option value="shanghai">已驳回</Option>
            <Option value="shanghai">编辑中</Option>
          </Select>
        </FormItem>
        <FormItem label="名称/描述">
          <Input v-model="formItem.input" placeholder="请输入" style="width: 186px"></Input>
        </FormItem>
        <FormItem :label-width="20">
          <Button type="primary" @click="handleSubmit('formValidate')">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="content">
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row, index }" slot="action">
          <Button size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        </template>
      </Table>
      <div class="page-wrap">
        <div style='float: left;'>
          <Button @click="handleSubmit('formValidate')">模具表</Button>
        </div>
        <Page :total="100" show-elevator />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
            key: 'name',
            type: 'index',
            align:'center',
            width:70
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
        data1: [{
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            state:'审核中'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01',
            state:'已驳回'
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
          }
        ]
      }
    }
  }
</script>