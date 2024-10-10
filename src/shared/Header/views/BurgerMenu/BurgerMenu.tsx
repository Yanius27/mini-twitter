import React from 'react';
import cn from 'classnames';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {MenuItemEnum} from 'enums/MenuItemEnum';
import {ROUTE_AUTH, ROUTE_NEWS, ROUTE_PROFILE, ROUTE_SUBSCRIPTIONS} from 'constants/routes';
import {logout} from 'store/slices/authSlice';
import {clearUser} from 'store/slices/initSlice';
import BurgerMenuLink from './views/BurgerMenuLink';

import './BurgerMenu.scss';

interface IBurgerMenuProps {
    onNavigate: (path?: string) => void,
    isActive: boolean,
}

export type TMenuItemName = `${MenuItemEnum}`;

interface IMenuItem {
    name: TMenuItemName,
    label: string,
    path: string,
}

const MENU_ITEMS: IMenuItem[] = [
    {
        name: MenuItemEnum.NEWS,
        label: 'Новости',
        path: ROUTE_NEWS,
    },
    {
        name: MenuItemEnum.SUBSCRIPTIONS,
        label: 'Подписки',
        path: ROUTE_SUBSCRIPTIONS,
    },
    {
        name: MenuItemEnum.PROFILE,
        label: 'Мой профиль',
        path: ROUTE_PROFILE,
    },
];

export default function BurgerMenu(props: IBurgerMenuProps) {
    const {onNavigate, isActive} = props;
    const location = useLocation();
    const dispatch = useDispatch();

    const onMenuItemClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        onNavigate(path);
    };

    const onLogoutClick = () => {
        dispatch(logout());
        dispatch(clearUser());
        onNavigate(ROUTE_AUTH);
    };

    const burgerMenuClassName = cn(
        'BurgerMenu',
        {
            BurgerMenu_active: isActive,
            BurgerMenu_inactive: !isActive,
        },
    );

    return (
        <nav className={burgerMenuClassName}>
            <ul>
                {
                    MENU_ITEMS.map((item) => (
                        <li
                            className='BurgerMenu__item'
                            key={item.name}
                        >
                            <BurgerMenuLink
                                item={item}
                                onMenuItemClick={onMenuItemClick}
                                isActive={location.pathname.includes(item.path)}
                            />
                        </li>
                    ))
                }
            </ul>
            <div className='BurgerMenu__footer'>
                <button
                    type={ButtonTypeEnum.BUTTON}
                    onClick={onLogoutClick}
                >
                    Выйти из аккаунта
                </button>
            </div>
        </nav>
    );
}
