<template>
  <div class="edit-con">
   <van-nav-bar
    title="更新昵称"
    left-text="取消"
    right-text="保存"
    @click-left="$emit('ClickLeft')"
    @click-right="onSave"
  />

  <van-field
    v-model.trim="message"
    autosize
    type="textarea"
    maxlength="7"
    placeholder="请输入新昵称"
    show-word-limit
  />
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    // 传值名字
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 页面进来的时候让本来就昵称显示在输入框
      message: this.value
    }
  },

  created () {

  },

  methods: {
    async onSave () {
      // 判断输入框有没有值
      if (this.message === '') return Toast('请输入昵称')
      // 更新用户信息的请求
      try {
        await updataUserProfile({
          name: this.message
        })
        Toast.success('更改成功')
        // 触发ClickLeft事件关闭弹层
        this.$emit('ClickLeft')
        // 将父组件的昵称实时更新
        this.$emit('input', this.message)
      } catch (error) {
        if (error.response && error.response.status === 409) return Toast.fail('昵称已存在')
        Toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.edit-con{
  /deep/.van-nav-bar{
    .van-nav-bar__text{
    color: #000;
   }
 }
}
</style>
