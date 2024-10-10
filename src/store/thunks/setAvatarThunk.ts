import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {USER_AVATAR} from 'constants/urls';

export const setAvatarThunk = createAsyncThunk(
    USER_AVATAR,
    async (file: File, {rejectWithValue}) => {
        const result = await API.setAvatar(file);
        if (result.data) {
            return result;
        }
        return rejectWithValue(result.errorMessage);
    },
);
