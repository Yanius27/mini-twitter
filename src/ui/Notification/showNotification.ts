import toast from 'react-hot-toast';
import cn from 'classnames';

import {NotificationTypeEnum} from 'enums/NotificationTypeEnum';

import './showNotification.scss';

type TNotification = `${NotificationTypeEnum}`;

export const showNotification = (notificationType: TNotification, message: string) => {
    const notificationClassName = cn(
        'Notification',
        {
            [`Notification_${notificationType}`]: notificationType,
        },
    );

    toast[notificationType](message, {
        className: notificationClassName,
        icon: '',
    });
};
