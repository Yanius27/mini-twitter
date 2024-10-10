import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {POST} from 'constants/urls';
import {IPostRequest} from 'types/IPostRequest';

export const createPostThunk = createAsyncThunk(
    POST,
    async (dataUser: IPostRequest, {rejectWithValue}) => {
        const result = await API.createPost(dataUser);
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
