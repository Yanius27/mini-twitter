import React from 'react';

import BurgerIcon from 'ui/icon-buttons/BurgerIcon';
import CloseIcon from 'ui/icon-buttons/CloseIcon';
import LogoIcon from 'ui/icon-buttons/LogoIcon';
import {IconSizeEnum} from 'enums/IconSizeEnum';
import UserAvatar from 'ui/icon-buttons/UserAvatar';

import './HeaderBar.scss';

interface IHeaderBarProps {
    onBurgerClick: () => void,
    onNavigate: (path?: string) => void,
    isMenuOpen: boolean,
}

export default function HeaderBar(props: IHeaderBarProps) {
    const {onBurgerClick, onNavigate, isMenuOpen} = props;

    return (
        <div className="HeaderBar">
            <LogoIcon
                size={IconSizeEnum.SMALL}
                onLogoClick={onNavigate}
            />
            <div className='HeaderBar__menu'>
                <UserAvatar
                    onAvatarClick={onNavigate}
                    size={IconSizeEnum.SMALL}
                />
                {
                    isMenuOpen
                        ? <CloseIcon onCloseClick={onBurgerClick} />
                        : <BurgerIcon onBurgerClick={onBurgerClick} />
                }
            </div>
        </div>
    );
}
