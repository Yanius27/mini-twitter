import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import initReducer from './slices/initSlice';
import editReducer from './slices/editSlice';
import {errorMiddleware} from './middleware/errorMiddleware';

const store = configureStore({
    reducer: {
        auth: authReducer,
        init: initReducer,
        edit: editReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
});

export default store;
export type TStore = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch;
