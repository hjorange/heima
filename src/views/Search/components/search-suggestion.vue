<template>
  <div>
    <van-cell
    v-for="(item,index) in suggestions" :key="index"
    :title="item" icon="search"
    @click="onClickItem(item)">
    <template #title>
      <div v-html="fromStr(item)"></div>
    </template>
    </van-cell>
    <!-- 搜索提示 -->
    <van-empty v-if="!suggestions.length" image="search" description="描述文字" />
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'

export default {

  props: {
    // 传入监听的搜索框数据，用来发送搜索建议请求
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  // 监听输入框发生变化发送请求
  watch: {
    searchText: {
      // 首次监听
      immediate: true,
      handler (newval) {
        // 防抖
        this.setID && clearTimeout(this.setID)
        this.setID = setTimeout(() => {
          // 调用发送请求方法
          this.loadSearchSuggestion()
        }, 800)
      }
    }
  },
  beforeDestroy () {
    // 清除完的最后一个字符会发送一次请求，但是组件已经被销毁，去到了搜索历史页面，所以需要在销毁前清除定时器
    clearTimeout(this.setID)
  },
  created () {

  },

  methods: {
    // 发送获取搜索建议请求
    async loadSearchSuggestion () {
      try {
        const { options: res } = await getSearchSuggestion(this.searchText)
        this.suggestions = res
      } catch (error) {
        console.log(error)
      }
    },
    // 设置搜索字高亮
    fromStr (str) {
      // 设置正则匹配
      const reg = new RegExp(this.searchText, 'gi')
      // 将数据设置高亮
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    },
    // 点击把数据显示在搜索框，跳转到搜索结果页面
    onClickItem (item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style scoped>

</style>
