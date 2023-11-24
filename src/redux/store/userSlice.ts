import { createSlice } from '@reduxjs/toolkit'
import { MyInfo } from 'types/settingType'

interface InitialState {
  userInfo: MyInfo
  isDelete: boolean
}

const initialState: InitialState = {
  userInfo: {
    email: '',
    name: '',
    nickname: '',
    profileImageUrl: '',
    apartCode: '',
    apartName: '',
    userType: '',
  },
  isDelete: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.userInfo = action.payload
      state.isDelete = false
    },
    setLogout(state) {
      state.userInfo = initialState.userInfo
      state.isDelete = false
    },
    setDelete(state) {
      state.userInfo = initialState.userInfo
      state.isDelete = true
    },
    setLoginUser(state, action) {
      const newArray = Object.entries(action.payload)
      newArray.map((_, index) => {
        const payloadKey = Object.keys(action.payload)[index] as string
        const payloadValue = Object.values(action.payload)[index] as string
        state.userInfo[payloadKey as keyof MyInfo] = payloadValue
      })
    },
  },
})

export const { setLogin, setLogout, setDelete, setLoginUser } = userSlice.actions
export default userSlice.reducer
