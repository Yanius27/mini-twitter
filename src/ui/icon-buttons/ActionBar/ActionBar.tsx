import React from 'react';

import {ReactComponent as IconComponent} from 'icons/ActionBar.svg';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';

import './ActionBar.scss';

interface IActionBarProps {
    onActionBarClick: () => void,
}

export default function ActionBar(props: IActionBarProps) {
    const {onActionBarClick} = props;

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className='ActionBar'
            aria-label='ActionBar icon'
        >
            <IconComponent onClick={onActionBarClick} />
        </button>
    );
}
