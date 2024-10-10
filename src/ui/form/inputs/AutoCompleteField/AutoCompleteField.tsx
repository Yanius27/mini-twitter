import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select';

import './AutoCompleteField.scss';

export interface ILabel{
    label: string,
    value: string,
}

interface IAutoCompleteFieldOptions {
    name: string,
    label: string,
    placeholder: string,
    id: string,
    options: ILabel[],
    defaultValue?: ILabel[],
}

export default function AutoCompleteField(props: IAutoCompleteFieldOptions) {
    const {name, label, placeholder, id, options, defaultValue} = props;

    const {control} = useFormContext();

    return (
        <div className='AutoCompleteField'>
            <label htmlFor={id}>{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({field}) => (
                    <Select
                        className='AutoCompleteSelect'
                        placeholder={placeholder}
                        {...field}
                        id={id}
                        options={options}
                        isMulti
                        value={field.value || []}
                    />
                )}
            />
        </div>
    );
}
