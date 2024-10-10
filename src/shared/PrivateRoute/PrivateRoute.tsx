import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {ROUTE_AUTH} from 'constants/routes';
import {useSelector} from 'react-redux';
import {TStore} from 'store/store';
import Loader from 'ui/Loader';

export default function PrivateRoute() {
    const {user, isInitLoading} = useSelector((state: TStore) => state.init);

    if (isInitLoading) {
        return <Loader />;
    }

    if (!user) {
        return (
            <Navigate
                to={ROUTE_AUTH}
                replace
            />
        );
    }
    return (
        <Outlet />
    );
}
