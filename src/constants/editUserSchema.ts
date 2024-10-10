import * as yup from 'yup';

import {EMAIL_PATTERN} from 'constants/patterns';

export const editUserSchema = yup.object().shape({
    firstName: yup.string().required('Обязательное поле').optional(),
    lastName: yup.string().required('Обязательное поле').optional(),
    email: yup.string().required('Обязательное поле').matches(EMAIL_PATTERN, 'Некорректный email').optional(),
    file: yup
        .mixed<FileList>()
        .test('fileFormat', 'Неподдерживаемый формат', (value) => {
            if (!value || value.length === 0) {
                return true;
            }
            const file = value[0];
            return file && ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg', 'image/svg+xml'].includes(file.type);
        })
        .optional(),
    description: yup.string().optional(),
});
