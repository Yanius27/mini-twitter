import React from 'react';
import cn from 'classnames';

import {IItem} from 'routes/ProfilePage/ProfilePage';
import ActionBarMenuLink from './views/ActionBarMenuLink';

import './ActionBarMenu.scss';

export interface IActionBarMenuProps {
    menuItems: IItem[],
    onMenuItemClick: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void,
    closeMenuCallback?: () => boolean,
    isActive: boolean,
}

export default function ActionBarMenu(props: IActionBarMenuProps) {
    const {menuItems, onMenuItemClick, closeMenuCallback, isActive} = props;

    const actionBarMenuClassName = cn(
        'ActionBarMenu',
        {
            ActionBarMenu_active: isActive,
            ActionBarMenu_inactive: !isActive,
        },
    );

    return (
        <nav className={actionBarMenuClassName}>
            <ul>
                {menuItems?.map((item, index) => (
                    <li
                        className='ActionBarMenu__item'
                        key={index}
                    >
                        <ActionBarMenuLink
                            onMenuItemClick={onMenuItemClick}
                            onCloseMenu={closeMenuCallback}
                            item={item}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
