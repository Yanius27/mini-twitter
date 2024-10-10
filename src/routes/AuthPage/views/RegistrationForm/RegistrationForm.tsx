import React from 'react';
import {useDispatch} from 'react-redux';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Form from 'shared/Form';
import InputField from 'ui/form/inputs/InputField';
import PasswordField from 'ui/form/inputs/PasswordField';
import TextField from 'ui/form/inputs/TextField';
import Button from 'ui/form/Button';
import {IAuthRequest} from 'types/IAuthRequest';
import {TDispatch} from 'store/store';
import {registrationThunk} from 'store/thunks/registrationThunk';
import {registrationSchema} from 'constants/registrationSchema';
import {showNotification} from 'ui/Notification/showNotification';
import {SuccessMessageEnum} from 'enums/SuccessMessageEnum';
import {NotificationTypeEnum} from 'enums/NotificationTypeEnum';
import {ButtonSizeEnum} from 'enums/ButtonSizeEnum';
import {ButtonVariantEnum} from 'enums/ButtonVariantEnum';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {AuthFieldTypeEnum} from 'enums/AuthFieldTypeEnum';

interface IRegistrationFormProps {
    onTabChange: () => void,
}

export default function RegistrationForm(props: IRegistrationFormProps) {
    const {onTabChange} = props;
    const dispatch: TDispatch = useDispatch();
    const methods = useForm<IAuthRequest>({
        resolver: yupResolver(registrationSchema),
    });

    const onRegistration: SubmitHandler<IAuthRequest> = async (data) => {
        try {
            await dispatch(registrationThunk(data)).unwrap();
            showNotification(NotificationTypeEnum.SUCCESS, SuccessMessageEnum.REGISTRATION);
            onTabChange();
            methods.reset();
        } catch (err) {
            methods.setError(AuthFieldTypeEnum.EMAIL, {message: ''});
        }
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onRegistration as SubmitHandler<any>)}>
                <InputField
                    key='firstName'
                    name='firstName'
                    type='text'
                    placeholder='Введите имя'
                    label='Имя'
                    id='firstName'
                />
                <InputField
                    key='lastName'
                    name='lastName'
                    type='text'
                    placeholder='Введите фамилию'
                    label='Фамилия'
                    id='lastName'
                />
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
                <TextField
                    key='description'
                    name='description'
                    placeholder="Расскажите о себе"
                    label="Описание профиля"
                    id="text"
                />
                <Button
                    key='submit'
                    text='Зарегистрироваться'
                    name='submit'
                    type={ButtonTypeEnum.SUBMIT}
                    variant={ButtonVariantEnum.PRIMARY}
                    size={ButtonSizeEnum.BIG}
                />
            </Form>
        </FormProvider>
    );
}
