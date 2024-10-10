import {isRejectedWithValue} from '@reduxjs/toolkit';
import {errors} from 'constants/errors';
import {NotificationTypeEnum} from 'enums/NotificationTypeEnum';
import {Middleware} from 'redux';
import {showNotification} from 'ui/Notification/showNotification';

export const errorMiddleware: Middleware = (store) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const payload = action.payload as string;
        const errorMessage = errors[payload] || 'Unknown error';
        setTimeout(() => showNotification(NotificationTypeEnum.ERROR, errorMessage), 0);
    }
    return next(action);
};
