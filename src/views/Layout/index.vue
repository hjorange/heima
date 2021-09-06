<template>
  <div>
    <router-view/>
<van-tabbar route>
  <van-tabbar-item icon="home-o" to="/home">
    <span>首页</span>
    <template #icon>
      <i class="toutiao toutiao-shouye"></i>
    </template>
  </van-tabbar-item>
  <van-tabbar-item icon="search" to="/video">
    <span>视频</span>
    <template #icon>
      <i class="toutiao toutiao-shipin"></i>
    </template>
  </van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="qa">
    <span>问答</span>
    <template #icon>
      <i class="toutiao toutiao-wenda"></i>
    </template>
  </van-tabbar-item>

  <van-tabbar-item icon="setting-o" to="/profile"><span>我的</span>
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
