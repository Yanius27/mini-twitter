import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {AUTH_REGISTER} from 'constants/urls';
import {IAuthRequest} from 'types/IAuthRequest';

export const registrationThunk = createAsyncThunk(
    AUTH_REGISTER,
    async (dataUser: IAuthRequest, {rejectWithValue}) => {
        const result = await API.registrationUser(dataUser);
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
