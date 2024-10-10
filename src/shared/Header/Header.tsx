import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ROUTE_NEWS} from 'constants/routes';
import BurgerMenu from './views/BurgerMenu';
import HeaderBar from './views/HeaderBar';

import './Header.scss';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [shouldRenderMenu, setShouldRenderMenu] = useState(false);

    const onToggleMenu = () => {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
            setShouldRenderMenu(true);
        } else {
            setIsMenuOpen(false);
            setTimeout(() => setShouldRenderMenu(false), 600);
        }
    };

    const onNavigate = (path?: string) => {
        path = path ?? ROUTE_NEWS;
        setIsMenuOpen(false);
        setTimeout(() => setShouldRenderMenu(false), 600);
        navigate(path);
    };

    return (
        <div className='Header'>
            <HeaderBar
                onBurgerClick={onToggleMenu}
                onNavigate={onNavigate}
                isMenuOpen={isMenuOpen}
            />
            {shouldRenderMenu && (
                <BurgerMenu
                    onNavigate={onNavigate}
                    isActive={isMenuOpen}
                />
            )}
        </div>
    );
}
