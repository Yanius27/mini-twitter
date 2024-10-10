import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Form from 'shared/Form';
import InputField from 'ui/form/inputs/InputField';
import PasswordField from 'ui/form/inputs/PasswordField';
import Button from 'ui/form/Button';
import {IAuthRequest} from 'types/IAuthRequest';
import {loginThunk} from 'store/thunks/loginThunk';
import getFromLocalStorage from 'utils/getFromLocalStorage';
import {TokenTypeEnum} from 'enums/TokenTypeEnum';
import {SuccessMessageEnum} from 'enums/SuccessMessageEnum';
import {ButtonVariantEnum} from 'enums/ButtonVariantEnum';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ButtonSizeEnum} from 'enums/ButtonSizeEnum';
import {NotificationTypeEnum} from 'enums/NotificationTypeEnum';
import {AuthFieldTypeEnum} from 'enums/AuthFieldTypeEnum';
import {TDispatch, TStore} from 'store/store';
import {ROUTE_NEWS} from 'constants/routes';
import {loginSuccess} from 'store/slices/authSlice';
import {initThunk} from 'store/thunks/initThunk';
import {loginSchema} from 'constants/loginSchema';
import {showNotification} from 'ui/Notification/showNotification';

export default function LoginForm() {
    const {isLoginLoading} = useSelector((state: TStore) => state.auth);
    const navigate = useNavigate();
    const dispatch: TDispatch = useDispatch();
    const methods = useForm<IAuthRequest>({
        resolver: yupResolver(loginSchema),
    });

    const onLogin: SubmitHandler<IAuthRequest> = async (data) => {
        try {
            await dispatch(loginThunk(data)).unwrap();
        } catch (error: unknown) {
            const errMessage = error as string;
            methods.setError(errMessage.includes(AuthFieldTypeEnum.PASSWORD)
                ? AuthFieldTypeEnum.PASSWORD
                : AuthFieldTypeEnum.EMAIL, {message: ''});
        }

        const accessToken = getFromLocalStorage(TokenTypeEnum.ACCESS);
        const refreshToken = getFromLocalStorage(TokenTypeEnum.REFRESH);

        if (!isLoginLoading && accessToken && refreshToken) {
            showNotification(NotificationTypeEnum.SUCCESS, SuccessMessageEnum.LOGIN);
            dispatch(loginSuccess());
            await dispatch(initThunk());
            navigate(ROUTE_NEWS);
        }
    };
    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onLogin as SubmitHandler<any>)}>
                <InputField
                    key='email'
                    name='email'
                    type='email'
                    placeholder='Введите Email'
                    label='Email'
                    id='email'
                />
                <PasswordField
                    key='password'
                    type='password'
                    name='password'
                    placeholder='Введите пароль'
                    label='Пароль'
                    id='password'
                />
                <Button
                    key='submit'
                    text='Войти'
                    name='submit'
                    type={ButtonTypeEnum.SUBMIT}
                    variant={ButtonVariantEnum.PRIMARY}
                    size={ButtonSizeEnum.BIG}
                />
            </Form>
        </FormProvider>
    );
}
