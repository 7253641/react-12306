/*
 * action 类型
 */

export const SET_STARTSITE = 'SET_STARTSITE'
export const SET_ENDSITE = 'SET_ENDSITE'
export const LOGIN_IN ='LOGIN_IN'
export const LOGIN_OUT='LOGIN_OUT'
/*如果不从server取数据，用redux模拟，使用下面方法*/
// export const ADD_ORDER='ADD_ORDER'
// export const REMOVE_ORDER='REMOVE_ORDER'
// export const REMOVE_ALLORDER='REMOVE_ALLORDER'



/*
 * action 创建函数
 */

export function setStartSite(site) {
  return {type: SET_STARTSITE, site}
}

export function loginin(user) {
  return {type: LOGIN_IN, user}
}

export function loginout(user) {
  return {type: LOGIN_OUT, user}
}

export function setEndSite(site) {
    return { type: SET_ENDSITE, site }
}

// export function addorder(number) {
//   return {type: ADD_ORDER, number}
// }
//
// export function removeorder(index) {
//   return {type: REMOVE_ORDER, index}
// }
//
// export function removeallorder() {
//   return {type: REMOVE_ALLORDER }
// }
