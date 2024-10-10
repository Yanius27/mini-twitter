import React from 'react';
import cn from 'classnames';

import {ITabItem} from 'routes/AuthPage/AuthPage';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';

import './AuthTabs.scss';

export interface IAuthTabsProps {
    activeTab: string,
    items: ITabItem[],
    onTabClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function AuthTabs(props: IAuthTabsProps) {
    const {activeTab, items, onTabClick} = props;

    const tabsClassName = cn(
        'AuthTabs',
        {
            [`${activeTab}`]: activeTab,
        },
    );

    return (
        <div
            className={tabsClassName}
        >
            {items?.map((item, index) => (
                <button
                    type={ButtonTypeEnum.BUTTON}
                    key={index}
                    id={item.id}
                    className={item.className}
                    onClick={onTabClick}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
