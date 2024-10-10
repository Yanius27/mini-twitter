import React from 'react';
import {useFormContext} from 'react-hook-form';
import cn from 'classnames';

import {IAuthRequest} from 'types/IAuthRequest';
import ClearIcon from '../../icon-buttons/ClearIcon';

import './InputField.scss';

export interface IInputFieldProps {
    name: keyof IAuthRequest | 'tags',
    type: string,
    placeholder: string,
    label: string,
    id: string,
    pattern?: RegExp,
}

export default function InputField(props: IInputFieldProps) {
    const {name, type, placeholder, label, id} = props;

    const {register, setValue, watch, formState: {errors}} = useFormContext();

    const onClearClick = () => {
        setValue(name, '');
    };

    const inputdFieldClassName = cn(
        'InputField',
        {
            InputField_error: errors[name],
        },
    );

    return (
        <div className={inputdFieldClassName}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                {...(register && register(name))}
                id={id}
            />
            {watch(name) && (
                <ClearIcon
                    onClearClick={onClearClick}
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
