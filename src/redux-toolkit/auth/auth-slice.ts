import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  profile: string
  email: string
}

// Define the initial state using that type
const initialState: AuthState = {
  profile: 'Naphat',
  email: 'naphat.d@gmail.com',
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    //action
    updateProfileAction: (state) => {
      state.profile = 'Naphat Don'
      state.email = 'naphat.d1@gmail.com'
    },
  },
})

// export const { increment, decrement, incrementByAmount } = authSlice.actions
export const { updateProfileAction } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export const selectAuthState = (state: RootState) => state.authState

export default authSlice.reducer
