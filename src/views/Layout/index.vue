<template>
  <div>
    <router-view/>
<van-tabbar route>
  <!-- 首页 -->
  <van-tabbar-item icon="home-o" to="/">
    <span>首页</span>
    <template #icon>
      <i class="toutiao toutiao-shouye"></i>
    </template>
  </van-tabbar-item>
  <!-- 视频 -->
  <van-tabbar-item icon="search" to="/video">
    <span>视频</span>
    <template #icon>
      <i class="toutiao toutiao-shipin"></i>
    </template>
  </van-tabbar-item>
  <!-- 问答 -->
  <van-tabbar-item icon="friends-o" to="/qa">
    <span>问答</span>
    <template #icon>
      <i class="toutiao toutiao-wenda"></i>
    </template>
  </van-tabbar-item>
<!-- 我的 -->
  <van-tabbar-item icon="setting-o" to="/profile"><span>{{$store.state.user?'我的':'未登录'}}</span>
    <template #icon>
      <i class="toutiao toutiao-wode"></i>
    </template></van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang="less">
.van-tabbar{
  .toutiao{
   font-size: 38px;

  }
}
</style>
