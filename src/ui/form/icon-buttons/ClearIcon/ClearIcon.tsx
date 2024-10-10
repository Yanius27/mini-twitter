import React from 'react';

import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ReactComponent as IconComponent} from 'icons/Cross_8x8.svg';

import './ClearIcon.scss';

export interface IClearIconProps {
  onClearClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function ClearIcon(props: IClearIconProps) {
    const {onClearClick} = props;

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className="ClearIcon"
            onClick={(e) => onClearClick(e)}
            aria-label='Clear icon'
        >
            <IconComponent />
        </button>
    );
}
