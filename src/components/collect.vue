<template>
  <div>
    <van-icon
        :color="value===-1?'#777':'#3296fa'"
        :name="value===-1?'good-job-o':'good-job' "
        @click="oncollect"
    />
  </div>
</template>

<script>
import { getCollect, removeCollect } from '../api/article.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    artId: {
      type: [Object, String, Number],
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
    async oncollect () {
      try {
        if (this.value === -1) {
        // 处于未点赞状态，点击点赞
          await getCollect(this.artId)
          this.$emit('input', 1)
          Toast.success('点赞成功')
        } else if (this.value === 1) {
          await removeCollect(this.artId)
          this.$emit('input', -1)
          Toast.success('取消点赞成功')
        }
        console.log(this.value)
      } catch (error) {
        Toast.success('操作一次')
      }
    }
  }
}
</script>

<style scoped>

</style>
