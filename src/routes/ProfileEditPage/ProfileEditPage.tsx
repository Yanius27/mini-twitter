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
import ProfileEditForm from './views/ProfileEditForm';

import './ProfileEditPage.scss';

export default function ProfileEditPage() {
    const {isEditLoading} = useSelector((state: TStore) => state.edit);
    const navigate = useNavigate();

    const onReturnClick = () => {
        navigate(ROUTE_PROFILE);
    };

    return (
        <div className='ProfileEditPage'>
            <ReturnButton onReturnClick={onReturnClick} />
            <Title
                label={TitleLabelEnum.EDIT_PROFILE}
                assignment={TitleAssignmentEnum.PAGE}
            />
            <ProfileEditForm />
            {isEditLoading && <Loader />}
        </div>
    );
}
