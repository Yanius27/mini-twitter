import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import Loader from 'ui/Loader';
import {AuthPhaseEnum} from 'enums/AuthPhaseEnum';
import {IconSizeEnum} from 'enums/IconSizeEnum';
import {TStore} from 'store/store';
import LogoIcon from 'ui/icon-buttons/LogoIcon';
import AuthTabs from 'routes/AuthPage/views/AuthTabs';
import RegistrationForm from './views/RegistrationForm';
import LoginForm from './views/LoginForm';

import './AuthPage.scss';

export type TAuthPhase = `${AuthPhaseEnum}`;

export interface ITabItem {
    label: string,
    className: string,
    id: TAuthPhase,
}

const TAB_ITEMS: ITabItem[] = [
    {
        label: 'Авторизация',
        className: 'tab-login',
        id: AuthPhaseEnum.LOGIN,
    },
    {
        label: 'Регистрация',
        className: 'tab-registration',
        id: AuthPhaseEnum.REGISTRATION,
    },
];

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<AuthPhaseEnum>(AuthPhaseEnum.LOGIN);
    const {isLoginLoading, isRegistrationLoading} = useSelector((state: TStore) => state.auth);

    const onTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveTab(e.currentTarget.id === AuthPhaseEnum.LOGIN
            ? AuthPhaseEnum.LOGIN
            : AuthPhaseEnum.REGISTRATION);
    };

    const onRegistration = () => {
        setActiveTab(AuthPhaseEnum.LOGIN);
    };

    return (
        <div className="AuthPage">
            <LogoIcon size={IconSizeEnum.BIG} />
            <AuthTabs
                activeTab={activeTab}
                items={TAB_ITEMS}
                onTabClick={onTabClick}
            />
            {activeTab === AuthPhaseEnum.REGISTRATION ? (
                <RegistrationForm onTabChange={onRegistration} />
            ) : (
                <LoginForm />
            )}
            {(isLoginLoading || isRegistrationLoading) && <Loader />}
        </div>
    );
}
