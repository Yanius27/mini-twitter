import React, {useState} from 'react';
import cn from 'classnames';

import {ReactComponent as IconComponent} from 'icons/Favorite.svg';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';

import './LikeIcon.scss';

interface ILikeIconProps {
    isLiked: boolean,
    changeLikeStatus: (likeStatus: boolean) => void,
}

export default function LikeIcon(props: ILikeIconProps) {
    const {isLiked, changeLikeStatus} = props;
    const [isActive, setIsActive] = useState(isLiked);

    const onToggleClassName = () => {
        changeLikeStatus(isActive);
        setIsActive(!isActive);
    };

    const LikeIconClassName = cn(
        'LikeIcon',
        {
            LikeIcon_active: isActive,
        },
    );

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className={LikeIconClassName}
            onClick={onToggleClassName}
            aria-label='Like icon'
        >
            <IconComponent />
        </button>
    );
}
