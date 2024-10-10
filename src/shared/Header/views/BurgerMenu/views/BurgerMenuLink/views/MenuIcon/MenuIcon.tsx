import React from 'react';
import cn from 'classnames';

import {ReactComponent as NewsIcon} from 'icons/Home.svg';
import {ReactComponent as SubscriptionsIcon} from 'icons/Group.svg';
import {ReactComponent as ProfileIcon} from 'icons/User.svg';
import {TMenuItemName} from 'shared/Header/views/BurgerMenu/BurgerMenu';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';

import './MenuIcon.scss';

interface IMenuIconProps {
    iconName: TMenuItemName,
}

const ICON_MAP = {
    news: NewsIcon,
    subscriptions: SubscriptionsIcon,
    profile: ProfileIcon,
};

export default function MenuIcon(props: IMenuIconProps) {
    const {iconName} = props;

    const menuIconClassName = cn(
        'MenuIcon',
        `MenuIcon_${iconName}`,
    );

    const IconComponent = ICON_MAP[iconName];

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className={menuIconClassName}
            aria-label='Menu icon'
        >
            <IconComponent />
        </button>
    );
}
