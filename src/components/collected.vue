<template>
  <div>
    <van-icon
        :color="value?'#3296fa':'#777'"
        :name="value?'star':'star-o'"
        @click="onCollected"
      />
  </div>
</template>

<script>
import { addCollected, removeCollected } from '../api/article.js'
import { Toast } from 'vant'
export default {
  data () {
    return {

    }
  },
  props: {
    /**
     *  通过v-model绑定语法糖解析拿到数据
     * @input事件
     * :value传值
     */
    value: {
      type: Boolean,
      required: true
    },
    // 传参id
    artId: {
      type: [Number, Object],
      required: true
    }
  },
  created () {

  },

  methods: {
    // 点击收藏或取消收藏
    async onCollected () {
      try {
        if (this.value) {
          // 处于收藏状态，调用点击取消收藏
          await removeCollected(this.artId)
          Toast.success('取消收藏成功')
        } else {
        // 处于未收藏状态，调用点击收藏
          await addCollected(this.artId)
          Toast.success('收藏成功')
        }
        // 改变视图变化，给父组件传值
        this.$emit('input', !this.value)
      } catch (error) {
        Toast.fail('操作成功')
      }
    }
  }
}
</script>

<style scoped>

</style>
