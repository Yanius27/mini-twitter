import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';

export interface IEditPostLikeStatus {
    isLiked?: boolean,
    likesCount?: number,
}

interface IEditPostLikeStatusArgs {
    id: string,
    data: IEditPostLikeStatus,
}

export const editPostLikeStatusThunk = createAsyncThunk(
    '/api/post/likes/edit',
    async (args: IEditPostLikeStatusArgs, {rejectWithValue}) => {
        const result = await API.editPostLikeStatus(args.id, args.data);
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
