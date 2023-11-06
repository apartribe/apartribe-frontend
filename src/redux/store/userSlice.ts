import { createSlice } from '@reduxjs/toolkit'
import { MyInfo } from 'types/settingType'

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
      state.userInfo = action.payload === null ? initialState.userInfo : action.payload
    },
    updateLoginUser(state, action) {
      const newArray = Object.entries(action.payload)
      newArray.map((_, index) => {
        const payloadKey = Object.keys(action.payload)[index] as string
        const payloadValue = Object.values(action.payload)[index] as string
        state.userInfo[payloadKey as keyof MyInfo] = payloadValue
      })
    },
  },
})

export const { loginUser, updateLoginUser } = userSlice.actions
export default userSlice.reducer
