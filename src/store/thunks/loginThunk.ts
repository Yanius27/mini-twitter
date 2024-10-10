import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {AUTH_LOGIN} from 'constants/urls';
import {IAuthRequest} from 'types/IAuthRequest';

export const loginThunk = createAsyncThunk(
    AUTH_LOGIN,
    async (dataUser: IAuthRequest, {rejectWithValue}) => {
        const result = await API.loginUser(dataUser);
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
