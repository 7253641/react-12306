import { combineReducers } from 'redux'
import { SET_STARTSITE, SET_ENDSITE, LOGIN_IN, LOGIN_OUT, TRAIN_PAY/*, ADD_ORDER, REMOVE_ORDER, REMOVE_ALLORDER*/ } from '../actions'

function startsite(state = '北京', action) {
    switch (action.type) {
        case SET_STARTSITE:
            return action.site
        default:
            return state
    }
}
function login(state = '未登录', action) {
  switch (action.type) {
    case LOGIN_IN:
      return action.user
    case LOGIN_OUT:
      return '未登录'
    default:
      return state
  }
}

function endsite(state = '上海', action) {
  switch(action.type) {
    case SET_ENDSITE:
      return action.site
    default:
      return state
  }
}
function trainpay(state = [], action) {
  switch(action.type) {
    case TRAIN_PAY:
    return action.list
    default:
      return state
  }
}
/*redux存储车票信息方法*/
// function order(state = [], action) {
//   switch(action.type) {
//     case ADD_ORDER:
//       return [
//         ...state,
//         action.number
//       ]
//     case REMOVE_ORDER:
//       return [
//         ...state.slice(0, action.index),
//         ...state.slice(action.index + 1)
//       ]
//     case REMOVE_ALLORDER:
//       return []
//     default:
//       return state
//   }
// }

const Site = combineReducers({
  startsite,
  endsite,
  login,
  trainpay
  // order
})

export default Site;
