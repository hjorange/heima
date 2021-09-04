<template>
  <div class="login-container">
<van-nav-bar
  title="登录"
/>
<!-- 填写手机号区域 -->
<van-form @submit="onSubmit" ref="from">
  <van-field
    v-model="from.mobile"
    name="mobile"
    placeholder="请填写手机号"
    :rules="fromRules.mobile"
    maxlength="11"
    type="number"
  >
  <!-- 手机图标 -->
  <template v-slot:left-icon>
    <i class="toutiao toutiao-shouji"></i>
    </template></van-field>
<!-- 填写验证码区域 -->
  <van-field
    v-model="from.code"
    name="code"
    placeholder="请填写验证码"
    :rules="fromRules.code"
    maxlength="6"
    type="number"
  >
  <!-- 验证码图标 -->
  <template #left-icon>
    <i class="toutiao toutiao-yanzhengma"></i></template>
     <!-- 发送验证码按钮 -->
    <template #button>
      <van-count-down @finish="isshow=false" v-if="isshow" :time="60*1000" format="ss s" />
    <van-button size="mini" v-else native-type="button" @click="onSebdCode" class="send-btn">发送验证码</van-button>
  </template></van-field>
  <!-- 提交区域 -->
  <div class="login-btn">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
// 引入轻提示，不能在全局引用
import { Toast } from 'vant'
// 引入axios封装的组件
import { sendCode, login } from '../../api/user.js'
const mobileRes = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
export default {
  data () {
    return {
      from: {
        mobile: '',
        code: ''
      },
      isshow: false,
      // 表单验证规则
      fromRules: {
        mobile: [{
          required: true, message: '请填写手机号'
        }, {
          pattern: mobileRes, message: '请填写正确的手机号码'
        }],
        code: [{
          required: true, message: '请填写手机号'
        }, {
          pattern: /^[0-9]{6}$/, message: '请填写正确的验证码'
        }]
      }
    }
  },

  created () {

  },

  methods: {
    // 登录功能
    async onSubmit () {
      try {
        const { data: res } = await login(this.from)

        Toast.success('登录成功')
        this.$store.commit('setUser', res.data)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return Toast.fail('亲，验证码错误或重新登录')
        }Toast.fail('系统异常')
      }
    },
    // 发送验证码验证
    async onSebdCode () {
      // 验证手机号码
      try {
        // await修饰，要不然是异步，会先执行同步任务
        await this.$refs.from.validate('mobile')
      } catch (err) {
        return
      }
      // 验证手机号码成功发送请求判断
      try {
        await sendCode(this.from.mobile)
        Toast('亲，发送成功')
        this.isshow = true
      } catch (err) {
        if (err.response && err.response.status === 429) {
          return Toast('亲，操作频繁')
        }
        Toast('亲，网络错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
.toutiao{
  font-size: 37px;
}
.send-btn{
   width: 152px;
    height: 46px;
    background: #EDEDED;
    border-radius: 23px;
    color: #666;

}
.login-btn{
  margin: 53px 28px;
  .van-button{
    width: 694px;
      height: 88px;
      background: #6DB4FB;
      border-radius: 10px;
      border: none;
  }
}
}
</style>
