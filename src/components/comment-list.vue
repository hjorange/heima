<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id +''" :title="item.content" />
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '../api/article.js'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
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
      // 保存数据
      this.list.push(...res.results)
      console.log(res)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (!res.last_id) {
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
