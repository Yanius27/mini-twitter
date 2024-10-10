import React from 'react';

import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ReactComponent as IconComponent} from 'icons/Cross_12x12.svg';

import './CloseIcon.scss';

export interface ICloseIconProps {
  onCloseClick: () => void,
}

export default function CloseIcon(props: ICloseIconProps) {
    const {onCloseClick} = props;

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className="CloseIcon"
            onClick={onCloseClick}
            aria-label='Close icon'
        >
            <IconComponent />
        </button>
    );
}
