import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let cart = createSlice({ // useState 역할
  name:'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 1 },
    { id: 2, name: 'Grey Yordan', count: 1 }
  ],
  reducers: {
    increaseCount(state, action){
      const itemId = action.payload; // 액션 페이로드로 전달되는 데이터
      const itemIndex = state.findIndex(item => item.id === itemId); // 테스트 함수를 충족하는 배열의 첫번째 요소 인덱스를 반환
      state[itemIndex].count += 1;
    },
    decreaseCount(state, action){
      const itemIndex = state.findIndex(item => item.id === action.payload);
      if (state[itemIndex].count > 0) {
        state[itemIndex].count -= 1;
      } else {
        return state; // 아이템을 찾지 못한 경우 현재 상태를 그대로 반환
      }
    },
    addItem(state, action){
      // 만약에 state에 같은 데이터가 있을 경우, 기존에 있는 데이터에 숫자만 더하기
      const itemIndex = state.findIndex(item => item.id === action.payload.id);
      if(itemIndex !== -1) {
        state[itemIndex].count += 1;
      } else { 
        state.push(action.payload);
      }
    },
    deleteItem(state, action){
      return state.filter(item => item.id !== action.payload);
    }
  }
})
export let { increaseCount, decreaseCount, addItem, deleteItem } = cart.actions

export default configureStore({ // state 등록
  reducer: {
    user: user.reducer,
    cart: cart.reducer
   }
}) 