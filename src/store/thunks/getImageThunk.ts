import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';

interface ISetImageSuccess {
    data: string,
    error: null,
}

interface ISetImageError {
    errorMessage: string,
}

export const getImageThunk = createAsyncThunk<ISetImageSuccess, string, { rejectValue: ISetImageError, }>(
    '/api/file',
    async (id: string, {rejectWithValue}) => {
        const result = await API.getImage(id);
        if (result.data) {
            const blob = new Blob([result.data], {type: 'image/jpeg'});
            const imageUrl = URL.createObjectURL(blob);
            return {
                data: imageUrl,
                error: null,
            };
        }
        return rejectWithValue(result.errorMessage);
    },
);
