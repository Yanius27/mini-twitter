import React from 'react';
import cn from 'classnames';

import {TitleAssignmentEnum} from 'enums/TitleAssignmentEnum';
import {TitleLabelEnum} from 'enums/TitleLabelEnum';

import './Title.scss';

export type TTitleLabel = `${TitleLabelEnum}`;
export type TTitleAssignment = `${TitleAssignmentEnum}`;

interface ITitleProps {
  label: TTitleLabel,
  assignment: TTitleAssignment,
}

export default function Title(props: ITitleProps) {
    const {label, assignment} = props;

    const titleClassName = cn(
        'Title',
        {
            [`Title_${assignment}`]: assignment,
        },
    );

    return <h2 className={titleClassName}>{label}</h2>;
}
