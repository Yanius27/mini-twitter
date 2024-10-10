import {createSlice} from '@reduxjs/toolkit';
import {editUserThunk} from 'store/thunks/editUserThunk';
import {getImageThunk} from 'store/thunks/getImageThunk';
import {setAvatarThunk} from 'store/thunks/setAvatarThunk';

interface IEditState {
    isEditLoading: boolean,
    editError: unknown | null,
    setAvatarError: unknown | null,
    getImageError: unknown | null,
}

const initialState: IEditState = {
    isEditLoading: false,
    editError: null,
    setAvatarError: null,
    getImageError: null,
};

const initSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editUserThunk.pending, (state) => {
                state.isEditLoading = true;
                state.editError = null;
            })
            .addCase(editUserThunk.fulfilled, (state, action) => {
                state.isEditLoading = false;
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
            });
    },
});

export default initSlice.reducer;
