import * as yup from 'yup';

import {EMAIL_PATTERN} from 'constants/patterns';

export const registrationSchema = yup.object().shape({
    firstName: yup.string().required('Обязательное поле').optional(),
    lastName: yup.string().required('Обязательное поле').optional(),
    email: yup.string().required('Обязательное поле').matches(EMAIL_PATTERN, 'Некорректный email'),
    password: yup.string().required('Обязательное поле').min(4, 'Минимум 4 символа'),
    description: yup.string().optional(),
});
