import {createSlice} from '@reduxjs/toolkit';
import {TokenTypeEnum} from 'enums/TokenTypeEnum';
import {loginThunk} from 'store/thunks/loginThunk';
import {registrationThunk} from 'store/thunks/registrationThunk';
import removeFromLocalStorage from 'utils/removeFromLocalStorage';

interface IAuthState {
    isAuth: boolean,
    isLoginLoading: boolean,
    loginError: unknown | null,
    isRegistrationLoading: boolean,
    registrationError: unknown | null,
}

const initialState: IAuthState = {
    isAuth: false,
    isLoginLoading: false,
    loginError: null,
    isRegistrationLoading: false,
    registrationError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state) {
            state.isAuth = true;
        },
        logout(state) {
            state.isAuth = false;
            removeFromLocalStorage(TokenTypeEnum.ACCESS);
            removeFromLocalStorage(TokenTypeEnum.REFRESH);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoginLoading = true;
                state.loginError = null;
            })
            .addCase(loginThunk.fulfilled, (state) => {
                state.isLoginLoading = false;
                state.loginError = null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoginLoading = false;
                state.loginError = action.payload;
            })
            .addCase(registrationThunk.pending, (state) => {
                state.isRegistrationLoading = true;
                state.registrationError = null;
            })
            .addCase(registrationThunk.fulfilled, (state) => {
                state.isRegistrationLoading = false;
                state.registrationError = null;
            })
            .addCase(registrationThunk.rejected, (state, action) => {
                state.isRegistrationLoading = false;
                state.registrationError = action.payload;
            });
    },
});

export default authSlice.reducer;
export const {loginSuccess, logout} = authSlice.actions;
