import React from 'react';
import {useNavigate} from 'react-router-dom';

import {TitleAssignmentEnum} from 'enums/TitleAssignmentEnum';
import {TitleLabelEnum} from 'enums/TitleLabelEnum';
import {useSelector} from 'react-redux';
import {TStore} from 'store/store';
import Title from 'ui/Title';
import {ROUTE_PROFILE} from 'constants/routes';
import ReturnButton from 'ui/form/icon-buttons/ReturnButton';
import Loader from 'ui/Loader';
import PostCreateForm from './views/PostCreateForm';

import './PostCreatePage.scss';

export default function PostCreatePage() {
    const {isEditLoading} = useSelector((state: TStore) => state.edit);
    const navigate = useNavigate();

    const onReturnClick = () => {
        navigate(ROUTE_PROFILE);
    };

    return (
        <div className='PostCreatePage'>
            <ReturnButton onReturnClick={onReturnClick} />
            <Title
                label={TitleLabelEnum.ADD_POST}
                assignment={TitleAssignmentEnum.PAGE}
            />
            <PostCreateForm />
            {isEditLoading && <Loader />}
        </div>
    );
}
