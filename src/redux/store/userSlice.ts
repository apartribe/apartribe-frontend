import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {
    email: '',
    name: '',
    nickname: '',
    profileImageUrl: '',
    /*  aptName: '', 
    badge: '' */
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userInfo = action.payload
    },
  },
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
