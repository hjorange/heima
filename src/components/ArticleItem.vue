<template>
  <div>
<van-cell :to="'/article/'+ArticleItem.art_id">
  <!-- 下面自定义插槽 -->
  <template #label>
    <div class="lable-img" v-if="ArticleItem.cover.type===3">
       <van-image
       v-for="(item,index) in ArticleItem.cover.images" :key="index"
    fit="cover"
    :src="item"
  />
    </div>
    <div class="label-box">
      <span>{{ArticleItem.aut_name}}</span>
      <span>{{ArticleItem.pubdate | fromDeta}}</span>
      <span>评论： {{ArticleItem.comm_count}}</span>
    </div>
  </template>
  <!-- 右侧自定义图片 -->
  <template>
    <van-image
      v-if="ArticleItem.cover.type===1"
     class="right-img"
    fit="cover"
    :src="ArticleItem.cover.images[0]"
  />
  </template>
  <template #title>
    <div class="van-multi-ellipsis--l2">
      {{ArticleItem.title}}
    </div>
  </template>
</van-cell>
  </div>
</template>

<script>
export default {
  props: {
    ArticleItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang="less">
.label-box{
  span:nth-child(2){
    margin: 0 8px;
  }
}
.van-cell__value{
  flex: unset;
}
.right-img,.van-cell__value{
  width: 232px;
  height: 146px;
}
.lable-img{
  display: flex;
  .van-image{
    width: 232px;
    height: 146px;
  }
  .van-image:nth-child(2){
    margin: 0 4px;
  }
}
</style>
