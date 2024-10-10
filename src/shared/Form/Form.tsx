import React from 'react';
import {FormProvider, SubmitHandler, useFormContext} from 'react-hook-form';

import './Form.scss';

export interface IFormProps{
  children: React.ReactNode,
  onSubmit: SubmitHandler<any>,
}

export default function Form(props: IFormProps) {
    const {children, onSubmit} = props;
    const methods = useFormContext();

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={onSubmit}
                className='Form'
                noValidate
            >
                {children}
            </form>
        </FormProvider>
    );
}
