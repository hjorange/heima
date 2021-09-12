<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search.js'
export default {
  props: {
    // 传入搜索框数据，用来发送搜索结果请求
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1
    }
  },

  created () {

  },

  methods: {

    async onLoad () {
      try {
        // 发送请求
        const res = await getSearchResults(
          {
            q: this.searchText,
            page: this.page,
            per_page: 10
          }
        )
        if (Math.random() > 0.2) {
          console.lo(1)
        }
        this.page++
        // 保存数据
        this.list.push(...res.results)
        // 当前加载状态结束
        this.loading = false

        // 判断数据全部加载完成
        if (this.list.length >= res.total_count) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
