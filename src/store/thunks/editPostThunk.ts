import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {IPostRequest} from 'types/IPostRequest';

interface IEditPostArgs {
    id: string,
    data: IPostRequest,
}

export const editPostThunk = createAsyncThunk(
    '/api/post/edit',
    async (args: IEditPostArgs, {rejectWithValue}) => {
        const result = await API.editPost(args.id, args.data);
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
