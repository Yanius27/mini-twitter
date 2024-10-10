import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import getFromLocalStorage from 'utils/getFromLocalStorage';
import {TokenTypeEnum} from 'enums/TokenTypeEnum';
import {loginSuccess, logout} from 'store/slices/authSlice';
import {TDispatch, TStore} from 'store/store';
import {initThunk} from 'store/thunks/initThunk';
import {clearUser} from 'store/slices/initSlice';
import {ROUTE_AUTH} from 'constants/routes';

export default function useAuth() {
    const dispatch: TDispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const {isAuth} = useSelector((state: TStore) => state.auth);
    const location = useLocation();
    const initRef = useRef(false);
    const prevLocationRef = useRef(location.pathname);

    useEffect(() => {
        prevLocationRef.current = location.pathname;
    }, [location]);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(false);
            if (initRef.current) {
                return;
            }
            initRef.current = true;

            if (!isAuth) {
                try {
                    const accessToken = getFromLocalStorage(TokenTypeEnum.ACCESS);
                    const refreshToken = getFromLocalStorage(TokenTypeEnum.REFRESH);
                    if ((accessToken || refreshToken) || prevLocationRef.current !== ROUTE_AUTH) {
                        await dispatch(initThunk()).unwrap();
                        dispatch(loginSuccess());
                    }
                } catch (error) {
                    dispatch(logout());
                    dispatch(clearUser());
                }
            }
        };
        if (isLoading) {
            checkAuth();
        }
    }, [dispatch, isAuth, isLoading, navigate]);

    return {
        isAuth,
        isLoading,
    };
}
