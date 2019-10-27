<template>
  <div class="template">
    <Form :label-width="80" inline label-colon class="border-1px" style="padding-top:12px;">
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
						<FormItem :label-width="0" v-for="(item,index) in typeList" style="margin-bottom:0;">
							<div style="margin-bottom:10px;">
								<Input :value="item.name" @input="change($event,index)" style="width: 255px" placeholder="只能输入中文英文数字，长度限制1-20"/>
								<div class="remove-btn" @click="removeType(index)">
									<Icon type="md-remove" />
								</div>
							</div>
						</FormItem>
					</Form>
					<!-- cneReg -->
			</div>
			<div slot="footer">
					<Button type="error" size="large" long @click="submitType">确定</Button>
			</div>
    </Modal>
  </div>
</template>
<script>
import { log } from 'util';
export default {
	props:{
		templateData:{}
	},
  data() {
    return {
			typeManageModal:false,
			value:'',
			typeList:[]
		};
	},
	methods:{
		addType(){
			if(!this.typeList.some(item=>item.name==='')){
				this.typeList.push({name:''});
			}
		},
		removeType(index){
			this.typeList.splice(index,1)
		},
		submitType(){
			this.typeList = this.typeList.filter(item=>item.name!=='')
		},
		change(value,index){
			this.typeList[index].name = value.replace(this.$global.cneReg,'')
		}
	},
	watch:{
		// typeList:{
		// 	handler(){
		// 		console.log(12);
				
		// 	},
		// 	deep:true
		// }
	}
};
</script>
<style lang="stylus" scoped>
.template{
	padding:20px;
	.ivu-form-item{
		margin-bottom:12px;	
	}
}
.remove-btn{
	display:inline-block;
	font-size: 18px;
	border: 1px solid #dcdee2;
	border-radius: 3px;
	margin-left: 11px;
	padding: 0 5px;
	height: 32px;
	cursor:pointer;
}
.add-btn{
	display:inline-block;
	font-size: 18px;
	border: 1px solid #dcdee2;
	border-radius: 3px;
	margin-left: 11px;
	padding: 0 5px;
	height: 22px;
	cursor:pointer;
}
</style>