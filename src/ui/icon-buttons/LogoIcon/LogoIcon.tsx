import React from 'react';
import cn from 'classnames';

import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ReactComponent as IconComponent} from 'icons/Logo.svg';

import './LogoIcon.scss';

interface ILogoIconProps {
    size: string,
    onLogoClick?: () => void,
}

export default function LogoIcon(props: ILogoIconProps) {
    const {size, onLogoClick} = props;

    const logoIconClassName = cn(
        'LogoIcon',
        {
            [`LogoIcon_${size}`]: size,
        },
    );

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className={logoIconClassName}
            aria-label='Logo icon'
            onClick={() => onLogoClick && onLogoClick()}
        >
            <IconComponent />
        </button>
    );
}
