import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';

interface ISetPostImageArgs {
    file: File,
    id: string,
}

export const setPostImageThunk = createAsyncThunk(
    '/api/post/image',
    async (args: ISetPostImageArgs, {rejectWithValue}) => {
        const result = await API.setPostImage(args.file, args.id);
        if (result.data) {
            return result;
        }
        return rejectWithValue(result.errorMessage);
    },
);
