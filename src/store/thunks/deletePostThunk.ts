import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {IPostRequest} from 'types/IPostRequest';

export const deletePostThunk = createAsyncThunk(
    '/api/post/delete',
    async (id: string, {rejectWithValue}) => {
        const result = await API.deletePost(id);
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
