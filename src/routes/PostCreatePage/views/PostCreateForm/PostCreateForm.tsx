import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Form from 'shared/Form';
import Button from 'ui/form/Button';
import {TDispatch} from 'store/store';
import TextField from 'ui/form/inputs/TextField';
import {postSchema} from 'constants/postSchema';
import FileField from 'ui/form/inputs/FileField';
import {ButtonSizeEnum} from 'enums/ButtonSizeEnum';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ButtonVariantEnum} from 'enums/ButtonVariantEnum';
import {IPostRequest} from 'types/IPostRequest';
import {createPostThunk} from 'store/thunks/createPostThunk';
import {useNavigate} from 'react-router-dom';
import {ROUTE_PROFILE} from 'constants/routes';
import {setPostImageThunk} from 'store/thunks/setPostImageThunk';
import AutoCompleteField from 'ui/form/inputs/AutoCompleteField';
import {getTagsThunk} from 'store/thunks/getTagsThunk';
import {ILabel} from 'ui/form/inputs/AutoCompleteField/AutoCompleteField';
import {ITag} from 'types/ITag';

export default function PostCreateForm() {
    const [tagsValues, setTagsValues] = useState<ILabel[]>([]);
    const dispatch: TDispatch = useDispatch();
    const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver<IPostRequest>(postSchema),
    });

    useEffect(() => {
        const getTagsValues = async () => {
            try {
                const tags = await dispatch(getTagsThunk()).unwrap();
                const formattedTags = tags.map((tag: { title: string, }) => ({
                    label: tag.title,
                    value: tag.title,
                }));
                setTagsValues(formattedTags.length > 0 ? formattedTags : undefined);
            } catch (error) {
                console.error(error);
            }
        };

        getTagsValues();
    }, [dispatch]);

    const onCreatePost: SubmitHandler<IPostRequest> = async (data) => {
        const changedData = new FormData();
        (Object.keys(data) as Array<keyof IPostRequest>).forEach(key => {
            const value = data[key];
            if (key !== 'file') {
                if (Array.isArray(value)) {
                    if (key === 'tags') {
                        (value as ITag[]).forEach((tag) => changedData.append('tags[]', tag.value));
                    } else {
                        changedData.append(key, value.join(',') || '');
                    }
                } else if (typeof value === 'string' || value instanceof Blob) {
                    changedData.append(key, value);
                } else {
                    changedData.append(key, '');
                }
            }
        });

        try {
            const result = await dispatch(createPostThunk(changedData as unknown as IPostRequest)).unwrap();
            if (data.file && data.file?.length > 0) {
                const file = data.file[0] as File;
                const args = {
                    file,
                    id: result.id,
                };
                await dispatch(setPostImageThunk(args));
            }
            navigate(ROUTE_PROFILE);
        } catch (error: unknown) {
            console.error('Create post error: ', error);
        }
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onCreatePost as SubmitHandler<any>)}>
                <TextField
                    key='title'
                    name='title'
                    placeholder="Введите текст"
                    label="Заголовок"
                    id="title"
                />
                <TextField
                    key='text'
                    name='text'
                    placeholder="Введите текст"
                    label="Основной текст"
                    id="text"
                />
                <FileField
                    key='file'
                    name='file'
                    label='Изображение'
                    id='file'
                    hasPreview={false}
                />
                <AutoCompleteField
                    key='tags'
                    name='tags'
                    label='Теги'
                    placeholder='Выберите теги'
                    id='tags'
                    options={tagsValues || []}
                />
                <Button
                    key='submit'
                    text='Опубликовать пост'
                    name='submit'
                    type={ButtonTypeEnum.SUBMIT}
                    variant={ButtonVariantEnum.PRIMARY}
                    size={ButtonSizeEnum.BIG}
                />
            </Form>
        </FormProvider>
    );
}
