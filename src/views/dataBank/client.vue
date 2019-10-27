<template>
  <div>
    <div class="query-heard">
      <Form :label-width="80" inline label-colon>
        <FormItem label="客户编号">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="公司名称">
          <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem class="h-form-bottom">
          <Button type="primary" @click="handleSubmit('formValidate')">搜索</Button>
          <Button type="primary" @click="showAddBt">新建</Button>
        </FormItem>
      </Form>
    </div>
    <div class="content">
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row, index }" slot="action">
          <Button size="small" style="margin-right: 5px" @click="showDetail(index)">详情</Button>
        </template>
      </Table>
      <div class="page-wrap">
        <div style="float: left;">
          <Button @click="handleSubmit('formValidate')">模具表</Button>
        </div>
        <Page :total="100" show-elevator />
      </div>
    </div>
    <my-modal :show="showAdd">
      <div class="client-add">
        <div class="client-add-client">
          <div class="client-add-client-title">新增客户</div>
          <Form :label-width="80" :model='formItem' :rules='addRules' label-colon>
            <FormItem label="客户编号" prop='id'>
              <Input v-model="formItem.id" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="公司名称">
              <Input v-model="formItem.input" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="传真">
              <Input v-model="formItem.input" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="公司地址">
              <Input v-model="formItem.input" placeholder="请输入" style="width:600px;"></Input>
            </FormItem>
          </Form>
        </div>
        <div class="client-add-contact marginTop20 content">
          <div class="client-add-contact-title">联系人</div>
          <Table :columns="columns1" :data="data1" style="margin-top:20px;">
            <template slot-scope="{ row, index }" slot="action">
              <Button size="small" style="margin-right: 5px" @click="showDetail(index)">详情</Button>
            </template>
          </Table>
        </div>
        <div class="client-add-contact marginTop20">
          <div class="client-add-contact-title">付款账户</div>
          <Form :label-width="80" :model='formItem' :rules='addRules' label-colon>
            <FormItem label="账户" prop='id'>
              <Input v-model="formItem.id" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="银行名称">
              <Input v-model="formItem.input" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="支行">
              <Input v-model="formItem.input" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="姓名">
              <Input v-model="formItem.input" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="手机号码">
              <Input v-model="formItem.input" placeholder="请输入"></Input>
            </FormItem>
          </Form>
        </div>
        <div class="modal-submit">
          <Button type="primary" @click="close">确定</Button>
          <Button type="primary" @click="close">返回</Button>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
import { log } from "util";
export default {
  data() {
    return {
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
				textarea: "",
				id:''
      },
      columns1: [
        {
          title: "客户编号",
          key: "name"
        },
        {
          title: "公司名称",
          key: "age"
        },
        {
          title: "添加日期",
          key: "address"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        }
      ],
			showAdd: false,
			addRules:{
				id:[
					{
						validator: (rule, value, callback)=>{
							if(value===''){
								callback(new Error('客户编号为必填项'))
              }else if(value.length<3||value.length>20){
                callback(new Error('客户编号长度不符合要求，长度限制：3-20'))
              }else if(!this.$global.codeReg.test(value)){
								callback(new Error('客户编号格式不正确，只能输入英文、数字、特殊字符'))
							}
							setTimeout(()=>{
								callback()
							},1500)
						}, 
						trigger: 'blur'
					}
				]
			}
    };
  },
  methods: {
    ok() {
      console.log(12);
    },
    close() {
      this.showAdd = false;
    },
    showAddBt() {
      this.showAdd = true;
    }
  }
};
</script>
<style lang="stylus">
.client-add{
	padding:40px;
	&-client,&-contact{
		border:2px solid #eee;
		border-radius:4px;
		&-title{
			border-bottom:2px solid #eee;
			font-size:24px;
			padding:5px 20px 5px;
		}
		form{
			padding-top:24px;
      padding-left:15px;
		}
	}
	.ivu-input-wrapper{
		width:250px;
	}
}
.marginTop20{
  margin-top:20px;
}
</style>