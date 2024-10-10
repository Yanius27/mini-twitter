import React from 'react';
import {useFormContext} from 'react-hook-form';
import cn from 'classnames';

import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ReactComponent as IconComponent} from 'icons/resize.svg';
import ClearIcon from '../../icon-buttons/ClearIcon';

import './TextField.scss';

export interface ITextareaProps {
    name: string,
    placeholder: string,
    label: string,
    id: string,
}

export default function TextField(props: ITextareaProps) {
    const {name, placeholder, label, id} = props;

    const {register, setValue, watch, formState: {errors}} = useFormContext();

    const onClearInput = () => {
        setValue(name, '');
    };

    const textFieldClassName = cn(
        'TextField',
        {
            TextField_error: errors[name],
        },
    );

    return (
        <div className={textFieldClassName}>
            <label htmlFor={id}>
                {label}
            </label>
            <textarea
                rows={5}
                placeholder={placeholder}
                {...(register && register(name))}
                id={id}
            />
            {watch(name) && (
                <ClearIcon
                    onClearClick={onClearInput}
                />
            )}
            <button
                type={ButtonTypeEnum.BUTTON}
                className='TextField__resizeIcon'
                aria-label='Resize icon'
            >
                <IconComponent />
            </button>
            {errors[name] && (
                <p className='ValidateError'>
                    {errors[name].message?.toString()}
                </p>
            )}
        </div>
    );
}
