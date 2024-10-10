import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux';

import AuthPage from 'routes/AuthPage';
import PublicRoute from 'shared/PublicRoute';
import PrivateRoute from 'shared/PrivateRoute';
import {IRoute} from 'types/IRoute';
import {ROUTE_AUTH, ROUTE_NEWS} from 'constants/routes';
import {TStore} from 'store/store';

interface IRouterProps {
    routes: IRoute[],
}

export default function Router(props: IRouterProps) {
    const {isAuth} = useSelector((state: TStore) => state.auth);

    return (
        <div className='Router'>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route
                        path={ROUTE_AUTH}
                        element={<AuthPage />}
                    />
                </Route>
                <Route element={<PrivateRoute />}>
                    {
                        props.routes?.map(route => (
                            <Route
                                key={route.id}
                                path={route.path}
                                Component={route.component}
                            />
                        ))
                    }
                </Route>
                <Route
                    path="*"
                    element={(
                        <Navigate
                            to={isAuth ? ROUTE_NEWS : ROUTE_AUTH}
                            replace
                        />
                    )}
                />
            </Routes>
        </div>
    );
}
