<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      @cancel="$emit('cancel')"
    />
  </div>
</template>

<script>
import { fromtime } from '@/fitles/fitle.js'
import { updataUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)

    }
  },

  created () {

  },

  methods: {
    // 修改生日的请求
    async confirm (value) {
      // 调封装年月日的方法调用
      value = fromtime(value)
      try {
        await updataUserProfile({
          birthday: value
        })
        // 关闭弹层
        this.$emit('cancel')
        // 更改生日原本数据
        this.$emit('input', value)
        Toast.success('更改成功')
      } catch (error) {
        Toast.fail('更改失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
