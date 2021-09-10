import Vue from 'vue'

import * as filter from './fitle'
/**
 *
 */
Object.keys(filter).forEach(item => {
  console.log(filter)
  console.log(item)
  return Vue.filter(item, filter[item])
})
// 时间过滤器
