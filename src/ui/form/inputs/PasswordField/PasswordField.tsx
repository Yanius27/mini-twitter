import React, {useState, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import cn from 'classnames';

import {IAuthRequest} from 'types/IAuthRequest';
import ViewIcon from './views/ViewIcon';

import './PasswordField.scss';

export interface IPasswordFieldProps {
    type: string,
    name: keyof IAuthRequest,
    placeholder: string,
    label: string,
    id: string,
}

export default function PasswordField(props: IPasswordFieldProps) {
    const {type, name, placeholder, label, id} = props;

    const [inputType, setInputType] = useState(type);

    const [isShowPassword, setIsShowPassword] = useState(false);

    const {register, watch, formState: {errors}} = useFormContext();

    useEffect(() => {
        setInputType(isShowPassword ? 'text' : 'password');
    }, [isShowPassword]);

    const passwordFieldClassName = cn(
        'PasswordField',
        {
            PasswordField_error: errors[name],
        },
    );

    const onToggleType = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className={passwordFieldClassName}>
            <label htmlFor={id}>{label}</label>
            <input
                type={inputType}
                placeholder={placeholder}
                {...(register && register(name))}
                id={id}
            />
            {watch(name) && (
                <ViewIcon
                    type={inputType}
                    onViewClick={onToggleType}
                />
            )}
            {errors[name] && (
                <p className='ValidateError'>
                    {errors[name].message?.toString()}
                </p>
            )}
        </div>
    );
}
