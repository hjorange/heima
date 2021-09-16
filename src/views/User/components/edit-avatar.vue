<template>
  <div class="update-avatar">
    <img :src="img" ref="img" />
    <div class="toolbar">
      <span @click="$emit('cancel')">取消</span>
      <span @click="onSave">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updataUserAvatar } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {

    }
  },
  props: {
    img: {
      type: String,
      required: true
    }
  },
  created () {

  },
  mounted () {
    const img = this.$refs.img
    this.cropper = new Cropper(img, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    onSave () {
      // 后端裁剪，前段提供坐标
      this.cropper.getData()
      // 前段裁剪
      // this.cropper.getCroppedCanvas()
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const fromData = new FormData()
        fromData.append('photo', blob)
        // 将fromData给后端

        try {
          const res = await updataUserAvatar(fromData)
          Toast.success('更改成功')
          this.$emit('cancel')
          this.$emit('on-success', res.photo)
        } catch (error) {
          Toast.fail('操作失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
