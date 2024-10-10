import React from 'react';

import Notification from 'ui/Notification';
import Loader from 'ui/Loader';
import useAuth from 'hooks/useAuth';
import routes from 'routes';
import Router from '../Router';
import Header from '../Header';

import './Layout.scss';

export default function Layout() {
    const {isLoading, isAuth} = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='Layout'>
            {isAuth && <Header />}
            <Router routes={routes} />
            <Notification />
        </div>
    );
}
