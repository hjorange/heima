/**
 *本地数据获取封装
 * @param {*} key 接收本地存取的数据
 * @returns
 */
export function getItem (key) {
  // 获取本地数据
  const data = localStorage.getItem(key)
  // 判断 普通字符串还是Json字符串
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 保存本地数据
export const setItem = (key, value) => {
  // 判断value值为复杂数据类型还是普通字符串，如果是数组或对象就转换，如不是不需转换
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 删除本地数据
export const removeItem = key => {
  localStorage.removeItem(key)
}
