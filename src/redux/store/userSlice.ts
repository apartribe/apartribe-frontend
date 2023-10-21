import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userEmail: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userEmail = action.payload
    },
  },
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
