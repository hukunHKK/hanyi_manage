<template>
  <div>
    <Form :label-width="80" inline label-colon>
      <FormItem label="建档模板">
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
    <div>模板1</div>
  </div>
</template>
<script>
export default {
	props:{
		templateData:{}
	},
  data() {
    return {
		};
  }
};
</script>