import * as yup from 'yup';

import {EMAIL_PATTERN} from 'constants/patterns';

export const loginSchema = yup.object().shape({
    email: yup.string().matches(EMAIL_PATTERN, 'Некорректный email').required('Обязательное поле'),
    password: yup.string().min(4, 'Минимум 4 символа').required('Обязательное поле'),
});
