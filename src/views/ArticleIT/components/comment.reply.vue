<template>
  <div>
    <van-nav-bar
      :title="comment.reply_count?comment.reply_count+'条回复':'暂无数据'">
      <template #left><van-icon name="cross" @click="$emit('close-reply')"/></template>
    </van-nav-bar>
    <!-- 封装组件引用 -->
    <div class="scroll-con">
      <commentItem :row="comment"/>
        <van-cell title="全部回复" />
        <commentList type='c' :source="comment.com_id"
        :list="list"/>
    </div>

    <div class="post-warp">
    <van-button round @click="isShowReplyPost=true">评论</van-button>
    </div>

    <van-popup v-model="isShowReplyPost" position="bottom" style="height:30%">
     <commentPost
     :target="comment.com_id" :artId="$route.params.articleId"
     @onPostSuccess="onPostSuccess"/>
    </van-popup>
  </div>
</template>

<script>
import commentItem from '@/components/comment-item.vue'
import commentList from '@/components/comment-list.vue'
import commentPost from './comment-post.vue'
export default {
  components: {
    commentItem,
    commentList,
    commentPost
  },
  name: 'commentreply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      isShowReplyPost: false
    }
  },

  created () {

  },

  methods: {
    onPostSuccess (obj) {
      this.list.unshift(obj)
      this.isShowReplyPost = false
    }
  }
}
</script>

<style scoped lang="less">
.post-warp {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-button {
    width: 640px;
    height: 80px;
  }
}
.scroll-con{
  position: absolute;
  top: 92px;
  bottom: 102px;
  width: 100%;
  overflow-y: scroll;

}
</style>
