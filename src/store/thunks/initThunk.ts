import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {INIT} from 'constants/urls';

export const initThunk = createAsyncThunk(
    INIT,
    async (_, {rejectWithValue}) => {
        const result = await API.init();
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
