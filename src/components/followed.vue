<template>
    <van-button
          class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollowed"
            v-if="!isFollowed"
          >关注</van-button>
          <van-button
            class="follow-btn"
            round
            size="small"
            v-else
            @click="onFollowed"
          >已关注</van-button>
</template>

<script>
import { addFollowUser, removeFollowUser } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, Object],
      required: true
    }
  },
  model: {
    prop: 'isFollowed',
    event: 'updataFollowed'
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    // 点击关注或取消关注，发送请求，改变状态
    async onFollowed () {
      try {
        if (this.isFollowed) {
          await removeFollowUser(this.autId)
          Toast.success('取消关注成功')
        } else {
          await addFollowUser(this.autId)
          Toast.success('关注成功')
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('updataFollowed', !this.isFollowed)
      } catch (error) {
        Toast.fail('操作成功')
      }
    }
  }
}
</script>

<style scoped>

</style>
