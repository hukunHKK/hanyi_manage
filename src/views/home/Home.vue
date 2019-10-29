<template>
  <div class="layout">
    <Layout>
      <Menu mode="horizontal" active-name="1" class="h-home-header">
        <!-- <div class="layout-logo"></div> -->
        <div class="layout-name">
          <Icon type="ios-cube" class="icon" />瀚艺内务管理系统
        </div>
        <div class="user-info">
          <img src alt />
          <span>职位&nbsp;</span>
          <span class="user-name">&nbsp;员工昵称</span>
          <span class="sign-out">
            <Icon type="md-power" />&nbsp;退出
          </span>
        </div>
      </Menu>
      <Layout>
        <Sider :style="{background: '#fff'}" class="t-home-sider">
          <!-- <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="getTitle">
            <Submenu v-for="item in menuList" :name='item.name'>
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                <span>{{item.name}}</span>
              </template>
              <MenuItem style="padding:0;" v-for="i in item.children" :name=i.name>
                <router-link :to="i.url" tag="div">{{i.name}}</router-link>
              </MenuItem>
            </Submenu>
          </Menu> -->
          <my-menu />
        </Sider>
        <Content
          :style="{paddingLeft: '24px',paddingRight: '24px',paddingTop: '12px', minHeight: '280px', background: '#fff',height:'100%'}"
        >
          <div class="content-header">
            <Icon type="ios-contact" />
            <span class="title">{{contentTitle}}</span>
          </div>
          <router-view style="display:flex;flex-direction:column;height:calc(100% - 40px);"/>
        </Content>
        <!-- <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            Content
          </Content>
        </Layout>-->
      </Layout>
    </Layout>
  </div>
</template>

<script>
import MyMenu from '../../components/menu.vue'
export default {
  name: "home",
  components: {'my-menu':MyMenu},
  data(){
    return{
      menuList:[],
      // contentTitle:this.$route.meta.name
    }
  },
  methods:{
    getTitle(title){
      this.contentTitle = title
    }
  },
  computed:{
    contentTitle(){
      return this.$route.meta.name
    }
  },
  created() {
    this.menuList = [
      {name:'资料库',children:[
          {url:'/dataBank/mountings',name:'配件表'},
          {url:'/dataBank/client',name:'客户表'},
        ]
      },
      {name:'系统管理',children:[
          {url:'/systemManage/accountManage',name:'账户管理'},
          {url:'/systemManage/menu',name:'菜单'}
        ]
      }
    ]
    // this.$axios.get('/city')
  }
};
</script>
<style scoped  lang="stylus">
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100vh;

  .h-home-header {
    background-color: #0358cc;
    height: 64px;
    line-height: 64px;
  }
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

.layout-name {
  color: #fff;
  margin-left: 20px;
  font-size: 20px;
  float: left;
}

.user-info {
  float: right;
  color: #fff;
  margin-right:30px;
}

.user-name {
  border-left: 2px solid #fff;
}

.sign-out {
  margin-left: 15px;
  cursor: pointer;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.ivu-layout {
  height: 100%;
}

.ivu-menu {
  height: 100%;
  background-color:#217CCD;
  color:#fff;
  .ivu-menu-submenu{
    .ivu-menu-submenu-title {
      border-bottom:1px solid red;
      span,i{
        font-size:18px;  
      }
    }
  }
  
}

.t-home-sider {
  .ivu-menu-item {
    padding:0px;
    height:50px;
    line-height:50px;
    // border-bottom:1px solid red;
    div{
      padding-left:43px;
    }
  }
}
</style>