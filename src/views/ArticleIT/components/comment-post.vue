<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    artId: {
      type: [String, Number, Object],
      required: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      // 因之前统一关闭loding,现需要手动加上
      Toast.loading({
        message: '加载中...',
        duration: 0, // 持续展示 toast
        forbidClick: true
      })
      // 评论文章的请求
      try {
        const res = await postComment({
          target: this.target + '',
          content: this.message,
          art_id: this.artId
        })
        console.log(res)
        Toast.success('评论成功')
        // 父子传值，关闭弹出层，res.new_obj将评论的数据添加到父组件的list里面
        this.$emit('onPostSuccess', res.new_obj)
        // 输入框为空
        this.message = ''
      } catch (error) {
        Toast.fail('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
