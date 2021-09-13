<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isloading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.art_id" >
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | fromDeta}}</div>
          <!-- 抽取关注 -->
          <Followed
          v-model="article.is_followed"
          :autId="article.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
        ref="content"
        class="article-content markdown-body"
        v-html="article.content"

        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <Comment :source="article.art_id"/>
        <!-- 评论的评论列表 -->

      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="is404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleDetail">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <!-- v-if="article.art_id"会报错vlaue是没有定义的，因为渲染时article没有数据，所以加判断 -->
    <div class="article-bottom" v-if="article.art_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        badge="123"
        color="#777"
      />
      <!-- 抽取收藏 -->
      <Collected
      v-model="article.is_collected"
      :artId="article.art_id"/>
      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

  </div>
</template>

<script>
// 引入图片预览的方法
import Followed from '../../components/followed.vue'
import Collected from '../../components/collected.vue'
import { ImagePreview } from 'vant'
import { getArticleDetail } from '@/api/article.js'
import './github-markdown.css'
import Comment from '@/components/comment-list.vue'
export default {
  components: {
    Followed,
    Collected,
    Comment
  },
  name: 'article',
  // 由路由传递过来的参数，id
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      isloading: true,
      is404: false
    }
  },

  created () {
    this.loadArticleDetail()
  },

  methods: {
    // 获取文章列表详情
    async loadArticleDetail () {
      try {
        this.isloading = true
        const res = await getArticleDetail(this.articleId)
        this.article = res
        // 数据拿到关闭加载中
        this.isloading = false
        // 拿到上面定义的ref DOM元素，this.$nextTick因为是异步的所以需要使用，数据更新视图没有更新，mounted只能加载首次，拿不到数据变化之后加载的元素，
        this.$nextTick(() => {
          // 调用封装的图片预览方法
          this.previewImg()
        })
        console.log(res)
      } catch (error) {
        this.isloading = false
        if (error.response && error.response.status === 404) {
          this.is404 = true
        }
      }
    },
    // 封装预览的方法
    previewImg () {
      // 拿到 div上面所有DOM元素
      const contentEL = this.$refs.content
      // 拿到 div上面所有img
      const imgs = contentEL.querySelectorAll('img')
      // 定义空数组放每张图片的路径
      const images = []
      // 循环每个图片
      imgs.forEach((item, index) => {
        // 循环一次添加一张图片路径
        images.push(item.src)
        // 给每个图片添加点击事件
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    }

  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
