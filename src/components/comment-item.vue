<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{row.aut_name}}</div>
      <van-button
        class="like-btn"
        :icon="row.is_liking?'good-job':'good-job-o'"
        v-model="row.is_liking"
        @click="IsLiling()"
      >{{row.like_count||'赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{row.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{row.pubdate|fromDeta}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('click-reply',row)"
        >回复 {{row.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { Toast } from 'vant'
import { getInLink, removeInLink } from '../api/article.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    console.log(this.row)
  },
  mounted () {},
  methods: {
    async IsLiling () {
      try {
        if (!this.row.is_liking) {
          const res = await getInLink(this.row.com_id + '')
          Toast.success('点赞成功')
          if (this.row.like_count === '赞') {
            this.row.like_count = 0
          }
          this.row.like_count = this.row.like_count + 1
          console.log(res)
        } else {
          const res = await removeInLink(this.row.com_id + '')
          console.log(res)
          if (this.row.like_count <= 0) {
            this.row.like_count = '赞'
          } else {
            this.row.like_count = this.row.like_count - 1
          }
          Toast.success('取消点赞成功')
        }
        this.row.is_liking = !this.row.is_liking
      } catch (error) {
        Toast.fail('操作异常')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
