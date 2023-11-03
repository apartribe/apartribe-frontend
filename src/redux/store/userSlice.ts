import { createSlice } from '@reduxjs/toolkit'
import { MyInfo } from 'types/setting'

const initialState = {
  userInfo: {
    email: '',
    name: '',
    nickname: '',
    profileImageUrl: '',
    apartCode: '',
    apartName: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload
    },
    updateLoginUser(state, action) {
      const payloadKey = Object.keys(action.payload)[0] as string
      const payloadValue = Object.values(action.payload)[0] as string
      state.userInfo[payloadKey as keyof MyInfo] = payloadValue
    },
  },
})

export const { loginUser, updateLoginUser } = userSlice.actions
export default userSlice.reducer
