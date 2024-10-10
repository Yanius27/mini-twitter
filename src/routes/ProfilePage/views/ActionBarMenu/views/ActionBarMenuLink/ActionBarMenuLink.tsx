import React from 'react';

import {TActionBarMenuItems} from 'routes/ProfilePage/ProfilePage';

import './ActionBarMenuLink.scss';

interface IActionBarMenuLinkProps {
    item: {
      label: string,
      id: TActionBarMenuItems,
      path: string,
    },
    onMenuItemClick: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void,
    onCloseMenu?: () => boolean,
}

export default function ActionBarMenuLink(props: IActionBarMenuLinkProps) {
    const {item, onMenuItemClick, onCloseMenu} = props;

    return (
        <a
            href={item.path}
            className='ActionBarMenuLink'
            id={item.id}
            onClick={(e) => {
                if (onCloseMenu) {
                    onCloseMenu();
                }
                onMenuItemClick(e, item.path);
            }}
        >
            <span>{item.label}</span>
        </a>
    );
}
