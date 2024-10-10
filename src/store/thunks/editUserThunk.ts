import {createAsyncThunk} from '@reduxjs/toolkit';

import API from 'api/API';
import {USER} from 'constants/urls';
import {IEditUserRequest} from 'types/IEditUserRequest';

export const editUserThunk = createAsyncThunk(
    USER,
    async (dataUser: IEditUserRequest, {rejectWithValue}) => {
        const result = await API.editUser(dataUser);
        if (result.data) {
            return result.data;
        }
        return rejectWithValue(result.errorMessage);
    },
);
