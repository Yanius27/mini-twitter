import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {POST_MYFEED} from 'constants/urls';

export const getUserPostsThunk = createAsyncThunk(
    POST_MYFEED,
    async (_, {rejectWithValue}) => {
        const result = await API.getUserPosts();
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
