<template>
  <div>
    <!-- <div class="content-header">
      <Icon type="ios-contact" />
      <span class="title">账户管理</span>
    </div> -->
    <div class="query-heard">
      <Form :label-width="80" inline label-colon>
        <FormItem label="账户角色">
          <Select v-model="formItem.select">
            <Option value="beijing">正序</Option>
            <Option value="shanghai">倒叙</Option>
          </Select>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="手机号码">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem class="h-form-bottom">
          <Button type="primary" @click="handleSubmit('formValidate')">搜索</Button>
          <Button type="primary" @click="handleSubmit('formValidate')">新建</Button>
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
        formItem:{

        },
        columns1: [{
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
          }
        ]
    };
  }
};
</script>