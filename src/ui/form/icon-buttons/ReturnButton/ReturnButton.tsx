import React from 'react';

import {ReactComponent as IconComponent} from 'icons/Arrow_left.svg';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';

import './ReturnButton.scss';

interface IReturnButtonProps {
  onReturnClick: () => void,
}

export default function ReturnButton(props: IReturnButtonProps) {
    const {onReturnClick} = props;

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className="ReturnButton"
            onClick={onReturnClick}
            aria-label='Return button'
        >
            <IconComponent />
            <span>Назад</span>
        </button>
    );
}
