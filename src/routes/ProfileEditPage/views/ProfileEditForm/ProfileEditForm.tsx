import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Form from 'shared/Form';
import InputField from 'ui/form/inputs/InputField';
import Button from 'ui/form/Button';
import {TDispatch, TStore} from 'store/store';
import TextField from 'ui/form/inputs/TextField';
import {IEditUserRequest} from 'types/IEditUserRequest';
import {editUserSchema} from 'constants/editUserSchema';
import {editUserThunk} from 'store/thunks/editUserThunk';
import {logout} from 'store/slices/authSlice';
import {clearUser} from 'store/slices/initSlice';
import {setAvatarThunk} from 'store/thunks/setAvatarThunk';
import FileField from 'ui/form/inputs/FileField';
import {ROUTE_AUTH, ROUTE_PROFILE} from 'constants/routes';
import {ButtonSizeEnum} from 'enums/ButtonSizeEnum';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ButtonVariantEnum} from 'enums/ButtonVariantEnum';
import {AuthFieldTypeEnum} from 'enums/AuthFieldTypeEnum';

export default function ProfileEditForm() {
    const dispatch: TDispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state: TStore) => state.init);
    const defaultValues = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        description: user?.description,
    };
    const methods = useForm({
        resolver: yupResolver<IEditUserRequest>(editUserSchema),
        defaultValues,
    });

    const onEditProfile: SubmitHandler<IEditUserRequest> = async (data) => {
        const changedData = new FormData();
        (Object.keys(data) as Array<keyof IEditUserRequest>).forEach(key => {
            if (key !== 'file' && data[key] !== defaultValues[key]) {
                changedData.append(key, data[key] || '');
            }
        });
        try {
            if (data.file && data.file?.length > 0) {
                const file = data.file[0] as File;
                await dispatch(setAvatarThunk(file));
            }
            const result = await dispatch(editUserThunk(changedData as unknown as IEditUserRequest)).unwrap();
            if (result.email !== defaultValues.email) {
                dispatch(logout());
                dispatch(clearUser());
                navigate(ROUTE_AUTH);
            } else {
                navigate(ROUTE_PROFILE);
            }
        } catch (error: unknown) {
            methods.setError(AuthFieldTypeEnum.EMAIL, {message: ''});
        }
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onEditProfile as SubmitHandler<any>)}>
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
                <FileField
                    key='file'
                    name='file'
                    label='Аватар'
                    id='file'
                    hasPreview
                />
                <TextField
                    key='description'
                    name='description'
                    placeholder="Расскажите о себе"
                    label="Описание профиля"
                    id="description"
                />
                <Button
                    key='submit'
                    text='Редактировать'
                    name='submit'
                    type={ButtonTypeEnum.SUBMIT}
                    variant={ButtonVariantEnum.PRIMARY}
                    size={ButtonSizeEnum.BIG}
                />
            </Form>
        </FormProvider>
    );
}
