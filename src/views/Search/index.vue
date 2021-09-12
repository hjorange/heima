<template>
  <div class="search-con">
    <van-sticky>
      <form action="/">
        <van-search
          v-model.trim="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          background="#3296fa"
          @cancel="$router.go(-1)"
          @focus="isshowResults=false"
        />
      </form>
    </van-sticky>

<!-- 搜索结果 -->
<SearchResults v-if="isshowResults" :searchText="searchText"/>
<!-- 搜索历史 -->
<SearchHistory
v-else-if="!searchText"
:history="history"
@SearchHistory="onSearch"
@delAll="history=[]"/>
<!-- 搜索建议 -->
<SearchSuggestion v-else :searchText="searchText"
@clickItem="onSearch"/>

  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage.js'
import SearchHistory from './components/search-history.vue'
import SearchResults from './components/search-results.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
  name: 'search',
  data () {
    return {
      // 输入框的值属性
      searchText: '',
      // 搜索结果页面是否显示
      isshowResults: false,
      // 存储搜索记录
      history: getItem('HMTT-HISTORY') || []
    }
  },
  components: {
    SearchSuggestion,
    SearchResults,
    SearchHistory
  },
  created () {

  },

  watch: {
    history: {
      deep: true,
      handler () {
        setItem('HMTT-HISTORY', this.history)
      }
    }
  },

  methods: {
    // 敲回车或者点击搜索、、s搜索页面点击跳转
    onSearch (val) {
      // 将搜索的两种方式的结果存入到定义的数组属性里面
      this.history.unshift(val)
      // 利用ES6new Set 去重，得到一个新的结果，但是不是数据，需要解构，然后再赋值给定义的属性
      this.history = [...new Set(this.history)]
      // 子组件传参改变输入框的值，公用一个事件val接受传过来的数据

      this.searchText = val
      this.isshowResults = true
    }
  }
}
</script>

<style scoped lang="less">
.search-con{
  .van-search__action{
    color: #fff;
  }
}
</style>
