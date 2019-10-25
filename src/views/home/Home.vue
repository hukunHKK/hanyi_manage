<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-name">瀚艺内务管理系统</div>
          <div class="user-info">
            <img src="" alt="">
            <span>职位&nbsp;</span>
            <span class="user-name">&nbsp;员工昵称</span>
            <span class="sign-out">
              <Icon type="md-power" />&nbsp;退出
            </span>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </template>
              <MenuItem name="1-1">Option 1</MenuItem>
              <MenuItem name="1-2">Option 2</MenuItem>
              <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <router-view/>
        </Content>
        <!-- <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            Content
          </Content>
        </Layout> -->
      </Layout>
    </Layout>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    
  },
  created(){
    // this.$axios.get('/city')
  }
}
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100vh;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-name{
    color: #fff;
    margin-left: 73px;
    font-size: 20px;
    float: left;
  }
  .user-info{
    float:right;
    color: #fff;
  }
  .user-name{
    border-left: 2px solid #fff;
  }
  .sign-out{
    margin-left: 15px;
    cursor: pointer;
  }
  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .ivu-layout{
    height: 100%;
  }
  .ivu-menu{
    height: 100%;
  }
</style>
