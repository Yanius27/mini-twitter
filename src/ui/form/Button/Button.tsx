import React from 'react';
import cn from 'classnames';

import {ButtonIdEnum} from 'enums/ButtonIdEnum';
import {ButtonVariantEnum} from 'enums/ButtonVariantEnum';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ButtonSizeEnum} from 'enums/ButtonSizeEnum';

import './Button.scss';

type TButtonId = `${ButtonIdEnum}`;
type TButtonType = `${ButtonTypeEnum}`;
type TButtonVariant = `${ButtonVariantEnum}`;
type TButtonSize = `${ButtonSizeEnum}`;

export interface IButtonProps {
    text: string,
    name: string,
    id?: TButtonId,
    type: TButtonType,
    variant: TButtonVariant,
    size: TButtonSize,
    disabled?: boolean,
    onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function Button(props: IButtonProps) {
    const {text, id, type, variant, size, disabled, onButtonClick} = props;

    const btnClassName = cn(
        'Button',
        {
            [`Button_variant_${variant}`]: variant,
            [`Button_size_${size}`]: size,
        },
    );

    return (
        <button
            type={type}
            id={id && id}
            disabled={disabled}
            className={btnClassName}
            onClick={e => onButtonClick && onButtonClick(e)}
        >
            {text}
        </button>
    );
}
