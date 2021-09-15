<template>
  <div class="profile-con">
<div class="not-login  header-bj" v-if="!user">
  <img src="@/assets/mobile.png" alt="">
  <span class="lg" @click="$router.push('/login')">登录 / 注册</span>
</div>
<!-- 已登录 -->
<div class="login-box header-bj" v-else>
  <div class="user-info">
  <div class="left">
  <van-image
  round
  fit="cover"
  :src="users.photo"
/>
<span class="name">{{users.name}}</span>
</div>
<van-button type="default" to="/user">编辑资料</van-button>
</div>
  <div class="user-data">
    <div class="data-item">
      <span>{{users.art_count}}</span>
      <span>头条</span>
    </div>
    <div class="data-item">
      <span>{{users.follow_count}}</span>
      <span>关注</span>
    </div>
    <div class="data-item">
      <span>{{users.fans_count}}</span>
      <span>粉丝</span>
    </div>
    <div class="data-item">
      <span>{{users.like_count}}</span>
      <span>获赞</span>
    </div>
  </div>
</div>
<van-grid clickable :column-num="2">
  <van-grid-item icon="home-o" text="收藏" to="/shoucang">
    <template #icon>
      <i class="toutiao toutiao-shoucang"></i>
    </template>
  </van-grid-item>
  <van-grid-item icon="search" text="历史" to="/lishi">
    <template #icon>
      <i class="toutiao toutiao-lishi"></i>
      </template>
  </van-grid-item>
</van-grid>
<div class="box">
  <van-cell title="消息通知" is-link />
  <van-cell title="小智同学" is-link />
</div>
<van-cell class="logout-btn" @click="onLogout" title="退出" v-if="user"/>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      users: {}
    }
  },

  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },

  methods: {
    onLogout () {
      Dialog.confirm({
        title: '黑马头条',
        message: '确认退出登录？'
      })
        .then(() => {
          // on confirm
          // 清除token退出登录，通过vuex里面setUser (state, payload)第二个参数传值为null
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const res = await getUserInfo()
        this.users = res
      } catch (error) {
        Toast('系统异常')
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile-con{
  .header-bj{
   width: 100%;
    height: 401px;
    background-image: url(~@/assets/banner.png);
    background-size: 100%;
  }
  .not-login{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  img{
    width: 132px;
    height: 132px;
  }
 .lg{
    font-size: 28px;
    color: #fff;
    margin-top: 15px;
  }
  .login-box{
    overflow: hidden;
    .user-info{
      margin-top: 116px;
      height: 132px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px;
      .left{
        display: flex;
        align-items: center;
        .van-image{
         width: 132px;
         height: 132px;
        }
        .name{
          font-size: 29px;
          color: #fff;
          margin-left: 22px;
        }
          }
      .van-button{
        width: 116px;
        height: 32px;
        font-size: 20px;
        color: #666;
        padding: 0;
        border-radius: 16px;
        }
          }
    .user-data{
     height: 153px;
     padding: 0 32px;
     display: flex;
     .data-item{
       flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      span:nth-child(1){
        font-size: 26px;
      }
      span:nth-child(2){
        font-size: 23px;
        margin-top: 15px;
      }
          }
    }
  }
  .van-grid{
    .toutiao{
      font-size: 45px;

    }
     .toutiao-shoucang {
      color: #EB5253;
    }

     .toutiao-lishi {
      color: #FF9D1D;
    }
    /deep/.van-grid-item__text{
      font-size: 27px;
      color: #333;
      text-align: center;
      margin-top: 10px;
      letter-spacing: 20px;
      padding-left: 20px;
    }
  }
  .logout-btn{
    font-size: 29px;
    color: #D86262;
    text-align: center;
  }
  .box{
    margin: 0 3px;
  }
}
</style>
