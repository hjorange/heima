<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="inpchange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="users.photo"
      />
    </van-cell>

    <van-cell title="昵称" :value="users.name" is-link  @click="isShowEditNickName=true"/>
    <van-cell title="性别"
    @click="isShowEditGender=true"
    :value="users.gender?'女':'男'" is-link />
    <van-cell
    @click="isShowEditBirthday=true"
    title="生日"
    :value="users.birthday"
    is-link />

     <!-- 点击昵称弹出层 -->
    <van-popup v-model="isShowEditNickName" position="bottom" style="height:100%">
    <EditNickName @ClickLeft="isShowEditNickName=false"
    v-model="users.name"
    v-if="isShowEditNickName"/>
    </van-popup>

    <!-- 点击性别弹出层 -->
    <van-popup v-model="isShowEditGender" position="bottom" >
      <EditGender @onCancel="isShowEditGender=false"
      v-model="users.gender"
      v-if="isShowEditGender"/>
    </van-popup>

    <!-- 点击生日弹出层 -->
    <van-popup v-model="isShowEditBirthday" position="bottom" >
      <EditBirthday @cancel="isShowEditBirthday=false"
      v-model="users.birthday"
      v-if="isShowEditBirthday"/>
    </van-popup>

    <!-- 点击头像弹出层 -->
    <van-popup v-model="isShowEditAvatar" position="bottom" style="height:100%" >
     <EditAvatar :img="imgSrc" @cancel="isShowEditAvatar=false"
     @on-success="users.photo=$event"
    />
    </van-popup>
  </div>
</template>

<script>
import EditNickName from './components/edit-nick-name.vue'
import EditGender from './components/edit-gender.vue'
import EditBirthday from './components/edit-birthday.vue'
import EditAvatar from './components/edit-avatar.vue'
import { getUserProfile } from '@/api/user.js'
export default {
  components: {
    EditNickName,
    EditGender,
    EditBirthday,
    EditAvatar
  },
  data () {
    return {
      users: {},
      isShowEditNickName: false,
      isShowEditGender: false,
      isShowEditBirthday: false,
      isShowEditAvatar: false,
      imgSrc: ''
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
    },
    // input输入框发生改变监听change事件
    inpchange (e) {
      this.isShowEditAvatar = true
      // 拿到改变后的图片
      const file = e.target.files[0]
      // 将文件转换为url地址
      this.imgSrc = URL.createObjectURL(file)
      e.target.files[0] = ''
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
