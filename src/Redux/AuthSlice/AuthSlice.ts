import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import getCookie, { removeCookie } from "../../Utils/util";


export interface AuthState {
  userName: string;
  password: string;
  token: string | undefined;
}

const initialState: AuthState = {
  userName: "",
  password: "",
  token: getCookie('JwtToken')
};

export const AuthSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set('JwtToken', action.payload, { expires: 10, secure: true });
    },
    removeToken: (state) =>{
      state.token= undefined;
      removeCookie('JwtToken');
    }

  },
});

export const { setUserName, setPassword, setToken , removeToken } = AuthSlice.actions;
export default AuthSlice.reducer;
