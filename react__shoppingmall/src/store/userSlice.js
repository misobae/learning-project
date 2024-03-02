import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: {
    name: 'Kim',
    age: 20
  },
  reducers: {
    changeName(state){ // array/object의 경우 return없이 직접 수정해도 state 변경됨
      state.name = 'park'
    },
    increase(state, action){
      state.age += action.payload
      console.log(state.name)
    }
  }
})
export let { changeName, increase } = user.actions

export default user