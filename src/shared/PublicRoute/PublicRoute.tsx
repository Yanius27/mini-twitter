import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {ROUTE_NEWS} from 'constants/routes';
import Loader from 'ui/Loader';
import {useSelector} from 'react-redux';
import {TStore} from 'store/store';

export default function PublicRoute() {
    const {isInitLoading} = useSelector((state: TStore) => state.init);
    const {isAuth} = useSelector((state: TStore) => state.auth);

    if (isInitLoading) {
        return <Loader />;
    }

    if (isAuth) {
        return (
            <Navigate
                to={ROUTE_NEWS}
                replace
            />
        );
    }

    return (
        <Outlet />
    );
}
