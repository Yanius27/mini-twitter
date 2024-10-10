import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {useFormContext} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {TDispatch, TStore} from 'store/store';
import {ReactComponent as IconComponent} from 'icons/Import.svg';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import ClearIcon from 'ui/form/icon-buttons/ClearIcon';
import {getImageThunk} from 'store/thunks/getImageThunk';
import getFromLocalStorage from 'utils/getFromLocalStorage';

import './FileField.scss';

export interface IFileFieldProps {
    name: string,
    label: string,
    id: string,
    postId?: string,
    hasPreview: boolean,
}

export default function FileField(props: IFileFieldProps) {
    const {name, label, id, hasPreview, postId} = props;
    const {register, watch, setValue, formState: {errors}} = useFormContext();
    const {user} = useSelector((state: TStore) => state.init);
    const dispatch: TDispatch = useDispatch();
    const [fileFieldLabel, setFileFieldLabel] = useState<string | undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
    const [advancePreview, setAdvancePreview] = useState(hasPreview);
    const [isPreview, setIsPreview] = useState(false);

    const fileFieldValue = watch(name) as FileList | undefined;

    useEffect(() => {
        const loadPreview = async () => {
            if (postId && advancePreview && !fileFieldValue && !isPreview) {
                try {
                    const imageId = user?.posts?.find((post) => post.id === +postId)?.imageId;
                    const result = imageId && await dispatch(getImageThunk(imageId.toString())).unwrap();
                    if (result && result.data) {
                        setPreviewUrl(result.data);
                        setFileFieldLabel('Post image');
                        setIsPreview(true);
                    }
                } catch (error) {
                    console.error('Post image load error: ' + error);
                }
                return;
            }
            if (user?.avatarId && advancePreview && !fileFieldValue && !isPreview) {
                try {
                    const result = await dispatch(getImageThunk(user.avatarId.toString())).unwrap();
                    const avatarName = getFromLocalStorage('avatarName');
                    if (result.data && avatarName) {
                        setPreviewUrl(result.data);
                        setFileFieldLabel(avatarName);
                        setIsPreview(true);
                    }
                } catch (error) {
                    console.error('Avatar load error: ' + error);
                }
            }
        };

        loadPreview();
    }, [dispatch, user?.avatarId, user?.posts, postId, hasPreview, fileFieldValue, isPreview, advancePreview]);

    useEffect(() => {
        if (fileFieldValue && fileFieldValue.length > 0) {
            const file = fileFieldValue[0];
            setFileFieldLabel(file.name);

            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);

            return () => {
                URL.revokeObjectURL(fileUrl);
                setFileFieldLabel(undefined);
                setPreviewUrl(undefined);
            };
        }
        return undefined;
    }, [fileFieldValue]);

    const onClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue(name, '');
        setIsPreview(false);
        setPreviewUrl(undefined);
        setFileFieldLabel(undefined);
        setAdvancePreview(false);
    };

    const fileFieldClassName = cn(
        'FileField',
        {
            FileField_error: errors[name],
        },
    );

    return (
        <div className={fileFieldClassName}>
            <label htmlFor={id}>
                {label}
                <div className="FileField__wrapper">
                    {fileFieldLabel || isPreview ? (
                        <div className='FileField__content'>
                            <img
                                src={previewUrl}
                                className='FileField__image-preview'
                                alt="Preview"
                            />
                            <span className='FileField__image-label'>{fileFieldLabel}</span>
                            <ClearIcon onClearClick={onClearClick} />
                        </div>

                    ) : (
                        <button
                            type={ButtonTypeEnum.BUTTON}
                            className="FileField__importIcon"
                            aria-label='Import icon'
                        >
                            <IconComponent />
                            <span>Нажмите для загрузки</span>
                        </button>
                    )}
                </div>
            </label>
            <input
                type='file'
                {...(register && register(name))}
                id={id}
            />
            {errors[name] && (
                <p className='ValidateError'>
                    {errors[name].message?.toString()}
                </p>
            )}
        </div>
    );
}
