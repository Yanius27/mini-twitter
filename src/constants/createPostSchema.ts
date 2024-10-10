import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
    title: yup.string().min(5, 'минимум 5 символов').required('Обязательное поле'),
    text: yup.string().min(10, 'минимум 10 символов').required('Обязательное поле'),
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
    tags: yup.array()
        .of(yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
        }))
        .optional(),
});
