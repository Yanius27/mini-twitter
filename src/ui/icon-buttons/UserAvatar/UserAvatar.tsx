import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import {ReactComponent as IconComponent} from 'icons/User.svg';
import {ROUTE_PROFILE} from 'constants/routes';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {TDispatch, TStore} from 'store/store';
import {getImageThunk} from 'store/thunks/getImageThunk';

import './UserAvatar.scss';

interface IUserAvatarProps {
    avatarUrl?: string,
    onAvatarClick?: (path?: string) => void,
    size: string,
}

export default function UserAvatar(props: IUserAvatarProps) {
    const {onAvatarClick, size} = props;
    const {user} = useSelector((state: TStore) => state.init);
    const dispatch: TDispatch = useDispatch();
    const [avatarSrc, setAvatarSrc] = useState<null | string>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const loadAvatar = async () => {
            if (user?.avatarId) {
                try {
                    const result = await dispatch(getImageThunk(user.avatarId.toString())).unwrap();

                    setAvatarSrc(result.data);
                } catch (error) {
                    console.error('Avatar load error: ' + error);
                }
            }
        };
        loadAvatar();
    }, [user?.avatarId, dispatch]);

    const avatarClassName = cn(
        'UserAvatar',
        `UserAvatar_${size}`,
        {
            UserAvatar_active: isActive,
        },
    );

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className={avatarClassName}
            aria-label='User avatar'
            onClick={() => {
                if (onAvatarClick) {
                    setIsActive(true);
                    setTimeout(() => setIsActive(false), 1500);
                    onAvatarClick(ROUTE_PROFILE);
                }
            }}
        >
            {
                avatarSrc ? (
                    <img
                        alt='Avatar icon'
                        src={avatarSrc}
                    />
                ) : <IconComponent />
            }
        </button>
    );
}
