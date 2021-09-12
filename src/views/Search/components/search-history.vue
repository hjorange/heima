<template>
  <div class="search-con">
    <van-cell title="搜索历史">
    <!-- 使用插槽来自定义右侧内容 -->
      <template>
        <div class="right" v-if="isDel">
          <!-- 点击清除全部历史记录，两种方法 -->
          <!-- <span @click="history.splice(0)">全部删除</span> -->
          <span @click="$emit('delAll')">全部删除</span>
          <span @click="isDel=false">完成</span>
        </div>
        <van-icon name="delete-o" @click="isDel=true" v-else/>
      </template>
    </van-cell>
    <van-cell
    :title="item"
    v-for="(item,i) in history"
    :key="item"
    @click="onSearchHistory(item,i)">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <template>
      <van-icon name="close" v-if="isDel"/>
    </template>
  </van-cell>
  </div>
</template>

<script>

export default {
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDel: false
    }
  },

  created () {

  },

  methods: {
    onSearchHistory (item, i) {
      if (item === '') return
      if (this.isDel) {
        // 点击删除
        this.history.splice(i, 1)
      } else {
        // 点击输入框显示跳转到搜索结果，触发的是父组件同一个事件，因为步骤一样
        this.$emit('SearchHistory', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-con{
  .van-cell{
    .right{
      span:nth-child(1){
        margin-right: 8px;
      }
    }
  }
}
</style>
