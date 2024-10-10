import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {TAG_SEARCH} from 'constants/urls';

export const getTagsThunk = createAsyncThunk(
    TAG_SEARCH,
    async (_, {rejectWithValue}) => {
        const result = await API.getTags();
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
