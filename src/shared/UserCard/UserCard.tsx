import React, {useEffect, useState} from 'react';

import setFontSize from 'utils/setFontSize';
import {IItem} from 'routes/ProfilePage/ProfilePage';
import {IconSizeEnum} from 'enums/IconSizeEnum';
import Button from 'ui/form/Button';
import {IButtonProps} from 'ui/form/Button/Button';
import UserAvatar from 'ui/icon-buttons/UserAvatar';
import ActionBar from 'ui/icon-buttons/ActionBar';
import ActionBarMenu from '../../routes/ProfilePage/views/ActionBarMenu';

import './UserCard.scss';

interface IUserCardProps {
    firstName: string,
    lastName: string,
    email: string,
    description?: string,
    buttons?: IButtonProps[],
    onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    menuItems?: IItem[],
    onMenuItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void,
    isActionBar: boolean,
}

export default function UserCard(props: IUserCardProps) {
    const {firstName, lastName, email, description, buttons, onButtonClick, menuItems, onMenuItemClick, isActionBar} = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [shouldRenderMenu, setShouldRenderMenu] = useState(false);

    const onToggleAction = () => {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
            setShouldRenderMenu(true);
        } else {
            setIsMenuOpen(false);
            setTimeout(() => setShouldRenderMenu(false), 700);
        }
    };

    useEffect(() => {
        setFontSize(18, ['.UserCard__header-info', '.UserCard__userName']);
        setFontSize(12, ['.UserCard__header-info', '.UserCard__email']);
    });

    return (
        <div className='UserCard'>
            <div className='UserCard__header'>
                <UserAvatar size={IconSizeEnum.BIG} />
                <div className='UserCard__header-info'>
                    <span className='UserCard__userName'>{firstName + ' ' + lastName}</span>
                    <span className='UserCard__email'>{email}</span>
                </div>
                {isActionBar && (
                    <ActionBar onActionBarClick={onToggleAction} />
                )}
                {shouldRenderMenu && menuItems && onMenuItemClick && (
                    <ActionBarMenu
                        menuItems={menuItems}
                        onMenuItemClick={onMenuItemClick}
                        isActive={isMenuOpen}
                    />
                )}
            </div>
            {(description || buttons) && (
                <div className="UserCard__body">
                    {description && (
                        <p className='UserCard__description'>
                            {description}
                        </p>
                    )}
                    {buttons && (
                        <div className='UserCard__buttons'>
                            {buttons.map((btn => (
                                <Button
                                    key={btn.name}
                                    onButtonClick={onButtonClick}
                                    {...btn}
                                />
                            )))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
