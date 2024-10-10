/* eslint-disable no-console */
import {createSlice} from '@reduxjs/toolkit';
import {createPostThunk} from 'store/thunks/createPostThunk';
import {deletePostThunk} from 'store/thunks/deletePostThunk';
import {editPostThunk} from 'store/thunks/editPostThunk';
import {editUserThunk} from 'store/thunks/editUserThunk';
import {getImageThunk} from 'store/thunks/getImageThunk';
import {getTagsThunk} from 'store/thunks/getTagsThunk';
import {getUserPostsThunk} from 'store/thunks/getUserPostsThunk';
import {initThunk} from 'store/thunks/initThunk';
import {setAvatarThunk} from 'store/thunks/setAvatarThunk';
import {IUser} from 'types/IUser';

interface IInitState {
    user: IUser | null,
    isInitLoading: boolean,
    initError: unknown | null,
    isEditLoading: boolean,
    editError: unknown | null,
    setAvatarError: unknown | null,
    getImageError: unknown | null,
    isCreatePostLoading: boolean,
    createPostError: unknown | null,
    getPostError: unknown | null,
    getTagsError: unknown | null,
    editPostError: unknown | null,
    deletePostError: unknown | null,
}

const initialState: IInitState = {
    user: null,
    isInitLoading: false,
    initError: null,
    isEditLoading: false,
    editError: null,
    setAvatarError: null,
    getImageError: null,
    isCreatePostLoading: false,
    createPostError: null,
    getPostError: null,
    getTagsError: null,
    editPostError: null,
    deletePostError: null,
};

const initSlice = createSlice({
    name: 'init',
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initThunk.pending, (state) => {
                state.isInitLoading = true;
                state.initError = null;
            })
            .addCase(initThunk.fulfilled, (state, action) => {
                state.isInitLoading = false;
                state.user = action.payload;
            })
            .addCase(initThunk.rejected, (state, action) => {
                state.isInitLoading = false;
                state.initError = action.payload;
            })
            .addCase(editUserThunk.pending, (state) => {
                state.isEditLoading = true;
                state.editError = null;
            })
            .addCase(editUserThunk.fulfilled, (state, action) => {
                state.isEditLoading = false;
                state.user = action.payload;
            })
            .addCase(editUserThunk.rejected, (state, action) => {
                state.isEditLoading = false;
                state.editError = action.payload;
            })
            .addCase(setAvatarThunk.rejected, (state, action) => {
                state.setAvatarError = action.payload;
            })
            .addCase(getImageThunk.rejected, (state, action) => {
                state.getImageError = action.payload;
            })
            .addCase(createPostThunk.pending, (state) => {
                state.isCreatePostLoading = true;
                state.createPostError = null;
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.isCreatePostLoading = false;
                state.user?.posts?.unshift(action.payload);
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.isCreatePostLoading = false;
                state.createPostError = action.payload;
            })
            .addCase(getUserPostsThunk.pending, (state) => {
                state.getPostError = null;
            })
            .addCase(getUserPostsThunk.rejected, (state, action) => {
                state.getPostError = action.payload;
            })
            .addCase(getTagsThunk.pending, (state) => {
                state.getTagsError = null;
            })
            .addCase(getTagsThunk.rejected, (state, action) => {
                state.getTagsError = action.payload;
            })
            .addCase(editPostThunk.pending, (state) => {
                state.editPostError = null;
            })
            .addCase(editPostThunk.rejected, (state, action) => {
                state.editPostError = action.payload;
            })
            .addCase(deletePostThunk.pending, (state) => {
                state.deletePostError = null;
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.deletePostError = null;
                if (state.user) {
                    state.user.posts = state.user.posts?.filter((post) => post.id !== action.payload.id);
                }
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.deletePostError = action.payload;
            });
    },
});

export default initSlice.reducer;
export const {clearUser} = initSlice.actions;
