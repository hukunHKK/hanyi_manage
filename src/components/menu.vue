<template>
  <div class="menu-wrapper">
    <ul>
      <li v-for="(item,index) in menu" :key="index" class="menu-1">
        <div @click="clickMenu1(index)" :class="{active1:index === current}">
        <!-- <div @click="clickMenu1(index)" > -->
          <Icon :type="item.title | getType" />
          {{item.title}}
          <Icon type="ios-arrow-down"  v-if='show[index]' class="float-right"/>
          <Icon type="ios-arrow-forward" v-else class="float-right"/>
        </div>
        <ul class="menu-2" :class="{'show-menu2':show[index]}">
          <li v-for="(it,inde) in item.children" :key="inde" @click='clickRoute(index)'>
            <!-- <div v-if="it.children">
              <div @click="clickMenu2(it.name)" :class="{active2:it.name === currentName}"> </div>
              <div @click="clickMenu2(it.name)">
                {{it.title}}
                <i class="glyphicon glyphicon-menu-down"></i>  
              </div>
              <ul class="menu-3" :class="{'show-menu3':show2[it.name]}">
                <li v-for="(i,ind) in it.children" :key="ind">
                  <router-link :to="i.url" tag="div">{{i.title}}</router-link>
                </li>
              </ul>
            </div> -->
            <router-link :to="it.url" tag="div" class="route-menu">{{it.title}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import vue from 'vue'
export default {
  props:['list'],
  data(){
    return {
      show:[],
      show2:{},
      current:null,
      currentName:null,
      menu:[]
    }
  },
  created(){
    this.menu = [
      {title:'资料库',children:[
          {url:'/dataBank/mountings',title:'配件表'},
          {url:'/dataBank/client',title:'客户表'},
        ]
      },
      {title:'研发',children:[
          {url:'/develop/mountings',title:'配件建档'},
          {url:'/develop/product',title:'产品建档'}
        ]
      },
      {title:'系统管理',children:[
          {url:'/systemManage/accountManage',title:'账户管理'},
        ]
      }
    ]
    // 刷新页面时获取选中的一级菜单
    for(let i=0;i<this.menu.length;i++){
      for(let j=0;j<this.menu[i].children.length;j++){
        if(this.$route.meta.name === this.menu[i].children[j].title){
          this.current = i;
          vue.set(this.show,i,true)
          return
        }
      }
    }
  },
  methods:{
    clickMenu1(index){
      let show = this.show[index]?false:true
      vue.set(this.show,index,show)
    },
    clickMenu2(name){
      let show = this.show2[name]?false:true
      vue.set(this.show2,name,show)
      this.currentName = name
    },
    clickRoute(index){
      this.current = index
    }
  },
  filters:{
    getType(title){
      switch(title){
        case '资料库':
          return "md-archive"
        case '系统管理':
          return "md-settings"
        case '研发':
          return "ios-create"
      }
    }
  }
}
</script>
<style lang="stylus">
  .menu-wrapper{
    background-color #217CCD
    color #fff
    font-size 18px
    overflow auto
    height: 100%
    &::-webkit-scrollbar {
        width:5px;
        height:5px;
    }
    &::-webkit-scrollbar-button    {
        background-color:#333645;
        display none
    }
    &::-webkit-scrollbar-thumb{
        background:#b7bac8;
        border-radius:4px;
    }
    ul{
      .menu-1{
        min-height 50px
        line-height 50px
        // border-bottom 2px solid #404352
        >div{
          padding-left 20px
          border-bottom 1px solid #cccdd1
          .float-right{
            float right
            margin-top 16px
            margin-right 5px
          }
        }
        .active1{
          background-color #FD8C02
          color #f5f5f5
        }
        .menu-2{
          display none
          >li{
            border-bottom 1px solid #cccdd1
            .active2{
              background-color #93d1ed
              color #f5f5f5
            }
            >div{
              >div{
                padding-left 55px
              }
            }
            .route-menu{
              padding-left 55px
              font-size 16px
            }
            .menu-3{
              display none
              // padding-left 20px
              >div{
                margin-left 30px
              }
            }
            .show-menu3{
              display block
              li{
                border-top 2px solid #404352
                div{
                  padding-left 70px
                }
              }
            }
          }
          .router-link-active{
            // border-left 7px solid #2ab5f6
            // background-color #337cba
            margin-left 0
            color #e9e833
          }
        }
        .show-menu2{
          display block
        }
      }
      i{
        margin-left 5px
      }
    }
  }
</style>