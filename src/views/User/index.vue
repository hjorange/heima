<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="users.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="users.name" is-link  @click="isShowEditNickName=true"/>
    <van-cell title="性别" :value="users.gender?'女':'男'" is-link />
    <van-cell title="生日" :value="users.birthday" is-link />

    <van-popup v-model="isShowEditNickName" position="bottom" style="height:100%">
    <EditNickName/>
    </van-popup>
  </div>
</template>

<script>
import EditNickName from './components/edit-nick-name.vue'
import { getUserProfile } from '@/api/user.js'
export default {
  components: {
    EditNickName
  },
  data () {
    return {
      users: {},
      isShowEditNickName: false
    }
  },

  created () {
    this.loadUserProfile()
  },

  methods: {
    // 获取用户信息请求
    async loadUserProfile () {
      try {
        const res = await getUserProfile()
        this.users = res
      } catch (error) {

      }
    }
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
