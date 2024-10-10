import React from 'react';
import cn from 'classnames';

import {TMenuItemName} from '../../BurgerMenu';
import MenuIcon from './views/MenuIcon';

import './BurgerMenuLink.scss';

interface IBurgerMenuLinkProps {
    item: {
      name: TMenuItemName,
      label: string,
      path: string,
    },
    onMenuItemClick: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void,
    isActive: boolean,
}

export default function BurgerMenuLink(props: IBurgerMenuLinkProps) {
    const {item, onMenuItemClick, isActive} = props;

    const menuLinkClassName = cn(
        'BurgerMenuLink',
        {
            BurgerMenuLink_active: isActive,
        },
    );

    return (
        <a
            href={item.path}
            className={menuLinkClassName}
            onClick={(e) => onMenuItemClick(e, item.path)}
        >
            <MenuIcon iconName={item.name} />
            <span>{item.label}</span>
        </a>
    );
}
