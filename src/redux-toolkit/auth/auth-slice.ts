import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { login } from '../../services/auth.service'
import { AxiosError } from '../../services/http.service'
import { LoginErrorResponse, LoginResponse } from '../../app-type/login.type'
import { LoginFormInput } from '../../app-type/login-form-input.type'

export interface AuthState {
  profile: string
  email: string
  loginResponse: LoginResponse | null
}

const initialState: AuthState = {
  profile: 'John Doe Example',
  email: 'john@gmail.com Example',
  loginResponse: null
}

export const loginThunk = 
createAsyncThunk<LoginResponse, LoginFormInput, { rejectValue: LoginErrorResponse }>('auth/loginThunkStatus', async (user: LoginFormInput, {rejectWithValue}) => {
    try {
        const response = await login(user.email, user.password);
        // console.log(response.data);
        localStorage.setItem('token', JSON.stringify(response.data));
        return response.data; 
    } catch (error: any) {
        let err: AxiosError<LoginErrorResponse> = error;
        if (!err.response) {
          throw error;
        }
        return rejectWithValue(err.response.data);
    }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateProfileAction: (state) => {
      state.profile = 'Mary Doe Example';
      state.email = 'mary@gmail.com Example'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse | null>) => {
        state.loginResponse = action.payload; //กรณีต้องการใช้ global state ถ้าใช้ unwrap เอาออกได้
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateProfileAction} = authSlice.actions

export const selectAuthState = (state: RootState) => state.authState

export default authSlice.reducer