<template>
  <div class="home-con">
    <!-- 头部 -->
<van-nav-bar
 fixed
  class="van-nav-bar"
>
  <template #title>
    <van-button  class="search-btn" icon="search" type="primary">按钮</van-button>
  </template>
</van-nav-bar>

<!-- 头部导航栏 -->
<van-tabs v-model="active" class="header-tab" animated swipeable>
  <van-tab v-for="item in channels" :key="item.id" :title="item.name">
    <ArticleList :channelId="item.id"/>
    </van-tab>
  <template #nav-right>
    <div class="right-btn" @click="showPopup=true">
      <i class="toutiao toutiao-gengduo"></i></div>
    <div class="place-box"></div>
  </template>
</van-tabs>
<van-popup
 v-model="showPopup"
 position="bottom"
 closeable
 close-icon-position="top-left"
 :style="{ height: '80%' }">
 <!-- 弹出层抽离 -->
<ChannelEdit :myChannels="channels" :activeIndex="active"
@UpActive="UpActive"/>
 </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
import { Toast } from 'vant'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  name: 'home',
  data () {
    return {
      active: 0,
      // 弹出层的判断显示或隐藏
      showPopup: false,
      channels: []
    }
  },

  created () {
    // 调用，页面一进来就会显示数据
    this.loadUserChannels()
  },

  methods: {
    // 获取导航栏数据
    async loadUserChannels () {
      try {
        const res = await getUserChannels()
        this.channels = res.channels
      } catch (error) {
        Toast('系统异常')
      }
    },
    // 子传父接受值进行跳转，关闭弹出层
    UpActive (val) {
      this.active = val
      this.showPopup = false
    }
  }
}
</script>

<style scoped lang="less">
.home-con{
  padding-top: 172px;
  /deep/.van-nav-bar__title{
    max-width: unset;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background: rgba(255, 255, 255, .2);
    border-radius: 32px;
    .van-icon-search{
      color: #fff;
    }
  }
  /deep/.header-tab{
    .van-tabs__wrap{
      height: 80px;
      border-bottom: 1px solid #EDEFF3;
      position: fixed;
      width: 100%;
      top: 92px;
      z-index: 2;
    }

    .van-tabs__nav--line{
      padding: 0;
    }

    .van-tab{
      width: 200px;
      border-right:1px solid #EDEFF3 ;
      .van-tab__text{
        font-size: 28px;
        color: #777;
      }
    }

    .van-tab--active{
      .van-tab__text{
        font-size: 30px;
        color: #333;
      }
    }

    .van-tabs__line{
      width: 31px;
      height: 6px;
      background: #3296FA;
      border-radius: 3px;
      bottom: 8px;
    }
    .right-btn{
      width: 66px;
      height: 80px;
      background-color: rgba(255, 255, 255, .9);
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .toutiao{
        font-size: 33px;
      }
      &::before{
        content:'' ;
        position: absolute;
        left: 0;
        width: 2px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: 100% 100%;
      }
    }
    .place-box{
      width: 66px;
      flex-shrink: 0;
    }
  }
}
</style>
