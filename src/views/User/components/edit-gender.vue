<template>
  <div>
     <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        :default-index="value"
        @cancel="$emit('onCancel')"
      />
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },

  created () {

  },

  methods: {
    async onConfirm (val, index) {
      try {
        await updataUserProfile({
          gender: index
        })
        Toast.success('更改成功')
        this.$emit('onCancel')
        this.$emit('input', index)
      } catch (error) {
        Toast.fail('更改失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
