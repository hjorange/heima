// 引入时间插件
import dayjs from 'dayjs'
// 引入语言安装包插件
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// 将过滤器的回调函数抽离出来，可以在js文件中引入调用使用
export const fromDeta = (data) => {
  return dayjs().to(data)
}

export const fromtime = (data) => {
  return dayjs(data).format('YYYY-MM-DD')
}
