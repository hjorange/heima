<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <div class="my-channel channel">
      <van-cell  :border="false" title="我的频道">
        <template>
          <van-button
          color="red"
          plain
          round
          size="mini"
          @click="isEdit=!isEdit" >{{isEdit?'完成':'编辑'}}</van-button>
        </template>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item
        @click="onClickMyItem(index,item.id)"
        v-for="(item,index) in myChannels"
        :class="{active:index===activeIndex}"
        :key="item.id"
        :icon="(isEdit && index!==0)?'close':''"
        :text="item.name" />
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <div class="re-channel channel">
      <van-cell :border="false" title="推荐频道">
      </van-cell>

      <van-grid :gutter="10" direction="horizontal"
      icon-size="0.32rem" >
        <van-grid-item
        v-for="item in recommChannels"
        :key="item.id"
        icon="plus"
        :text="item.name"
        @click="addToMyChannel(item)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllList, addUserChannel, deleteUserChannel } from '@/api/chnnel.js'
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },

  created () {
    this.loadAllChannel()
  },
  computed: {
    // 判断我的频道有没有。把没有的渲染到推荐频道2
    recommChannels () {
      // const recommendArr = this.allChannels.filter(channelItem => {
      //   const flag = this.myChannels.some(myItem => {
      //     return myItem.id === channelItem.id
      //   })
      //   return !flag
      // })
      // return recommendArr
      return this.allChannels.filter(channelItem => {
        return !this.myChannels.some(myItem =>
          myItem.id === channelItem.id
        )
      })
    },
    // 获取vuex里面有没有存入token
    ...mapState(['user'])
  },
  methods: {
    // 获取全部频道列表
    async loadAllChannel () {
      try {
        const { channels } = await getAllList()
        this.allChannels = channels
      } catch (error) {
        Toast('系统异常')
      }
    },
    // 点击推荐频道添加到我的频道
    async addToMyChannel (item) {
      this.myChannels.push(item)
      // 有无token，判断是发请求还是存本地数据
      if (this.user) {
        // 发起请求持久化数据
        try {
          await addUserChannel({
            id: item.id,
            seq: this.myChannels.length
          })
          Toast('添加成功')
        } catch (error) {
          Toast('添加失败')
        }
      } else {
        // 存储数据到本地
        setItem('HMTT-CHANNEL', this.myChannels)
      }
    },
    // 点击我的频道删除或跳转
    onClickMyItem (index, id) {
      if (this.isEdit) {
        // 加判断推荐不能删除
        if (index === 0) return
        // 加判断，否则删除高亮前面的时候，高亮会往前移一位，因为删除过后activeIndex就变了
        if (index <= this.activeIndex) {
          // 因为是同一事件所以共用一个事件
          // 编辑状态下删除和高亮效果
          this.$emit('UpActive', this.activeIndex - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 调用持久化数据方法
        this.deleteStorage(id)
      } else {
        // 完成状态下跳转和高亮效果
        this.$emit('UpActive', index, false)
      }
    },
    // 抽离删除持久化数据的方法
    async deleteStorage (id) {
      if (this.user) {
        try {
          await deleteUserChannel(id)
          Toast.success('删除成功')
        } catch (error) {
          Toast.fail('删除失败')
        }
      } else {
        setItem('HMTT-CHANNEL', this.myChannels)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top:90px ;
  .channel{
    /deep/.van-grid{
      .van-grid-item__content{
        width: 160px;
        height: 86px;
        background: #F4F5F6;
        border-radius: 6px;
        .van-grid-item__text{
          font-size: 28px;
          color: #222;
        }
      }
        .van-grid-item__content::after{
        border: none;
      }
    }
  }
  /deep/.van-grid-item__text{
    margin-top: 0px;
  }
  /deep/.active{
    .van-grid-item__text{
      color: red !important;
    }
  }
  .my-channel{
    .van-cell{
      display: flex;
      align-items: center;
    }
    .van-button{
      width: 103px;
      height: 50px;
    }
    /deep/.van-grid-item__icon{
      position: absolute;
      font-size: 32px;
      right: -12px;
      top: -12px;
    }
  }
}
</style>
