<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >

      <!-- 抽离评论列表每一项 -->
      <CommentItem
      @click-reply="$emit('click-reply',$event)"
      v-for="item in list" :key="item.com_id +''" :row="item"/>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '../api/article.js'
import CommentItem from './comment-item.vue'
export default {
  components: {
    CommentItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    source: {
      type: [Number, Object, String],
      required: true
    }
  },
  created () {
    this.onLoad()
  },

  methods: {
    async onLoad () {
      // 发送请求
      const res = await getCommentList({
        type: this.type,
        source: this.source + '',
        offset: this.offset,
        limit: this.limit
      })
      // 评论条数，传值
      this.$emit('upTatolCount', res.total_count)
      // 保存数据
      this.list.push(...res.results)
      console.log(res)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (!res.last_id || this.list.length >= res.total_count) {
        this.finished = true
      } else {
        this.offset = res.last_id
      }
    }
  }
}
</script>

<style scoped>

</style>
