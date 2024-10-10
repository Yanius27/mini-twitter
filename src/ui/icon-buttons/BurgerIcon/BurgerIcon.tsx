import React from 'react';

import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ReactComponent as IconComponent} from 'icons/Burger.svg';

import './BurgerIcon.scss';

interface IBurgerIconProps {
    onBurgerClick: () => void,
}

export default function BurgerIcon(props: IBurgerIconProps) {
    const {onBurgerClick} = props;

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className="BurgerIcon"
            onClick={onBurgerClick}
            aria-label='Burger icon'
        >
            <IconComponent />
        </button>
    );
}
