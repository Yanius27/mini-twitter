import React from 'react';

import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {AuthFieldTypeEnum} from 'enums/AuthFieldTypeEnum';
import {ReactComponent as ShowIconComponent} from 'icons/View.svg';
import {ReactComponent as HideIconComponet} from 'icons/View_hide.svg';

import './ViewIcon.scss';

interface IViewIconProps {
  type: string,
  onViewClick: () => void,
}

export default function ViewIcon(props: IViewIconProps) {
    const {type, onViewClick} = props;

    return (
        <button
            type={ButtonTypeEnum.BUTTON}
            className="ViewIcon"
            onClick={onViewClick}
            aria-label='View icon'
        >
            {type === AuthFieldTypeEnum.PASSWORD
                ? <HideIconComponet />
                : <ShowIconComponent />}
        </button>
    );
}
