<template>
  <div class="ArticleList">
    <van-pull-refresh
    v-model="isPullLoading"
     @refresh="onRefresh"
     :success-duration="1500"
     :success-text="pullRefreshText">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
>
<!-- :key="item.art_id+''"因为大数据处理之后拿到的是对象，所以需要转换成字符串，key只能是字符串和数值 -->
<ArticleItem  v-for="item in list" :key="item.art_id+''" :ArticleItem="item"/>

</van-list>
</van-pull-refresh>

  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import { Toast } from 'vant'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      isPullLoading: false,
      pullRefreshText: '',
      preTimestamp: Date.now()
    }
  },
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
    /**
     * 1.发送请求数据
     */
      try {
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: this.preTimestamp,
          with_top: 1
        })
        // 加判断写人为错误，更好测试
        if (Math.random() > 0.2) {
          console.lg('11')
        }

        this.list.push(...res.results)
        this.preTimestamp = res.pre_timestamp
        // 2.关闭加载状态 loading为  false
        this.loading = false
        // 3.数据全部记载完finished改为true
        if (!this.preTimestamp) {
          this.finished = true
        }
      } catch (error) {
        Toast.clear()
        // 产生错误关闭loading
        this.loading = false
        // 提示错误文本信息
        this.error = true
      }
    },
    async onRefresh () {
      // 下拉刷新数据，直接调用即可，时间戳数据需要一直保持最新时间，所以使用Date.now()
      try {
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: Date.now(),
          with_top: 1
        })
        // 加判断写人为错误，更好测试
        if (Math.random() > 0.2) {
          console.lg('11')
        }

        // 数据成功获取之后关闭isPullLoading
        this.isPullLoading = false
        // 将数据添加到原数据的前面
        this.list.unshift(...res.results)
        // 成功后提示的文本信息，自定义一个属性
        this.pullRefreshText = '亲，刷新成功，共刷新' + res.results.length + '条'
      } catch (error) {
        // 失败关闭isPullLoading
        this.isPullLoading = false
        // 失败后提示的文本信息
        this.pullRefreshText = '亲，刷新失败，稍后重试'
      }
    }
  }
}
</script>

<style scoped lang="less">
.ArticleList{
  // padding-bottom: 100px;
  //让里面的y轴滚动每个单独出来，设置高度
  height: 80vh;
  overflow-y: scroll;

}

</style>
