import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {getUserPostsThunk} from 'store/thunks/getUserPostsThunk';
import {deletePostThunk} from 'store/thunks/deletePostThunk';
import {ActionBarMenuItemsEnum} from 'enums/ActionBarMenuItemsEnum';
import {TitleAssignmentEnum} from 'enums/TitleAssignmentEnum';
import {TitleLabelEnum} from 'enums/TitleLabelEnum';
import {TDispatch, TStore} from 'store/store';
import {IButtonProps} from 'ui/form/Button/Button';
import {IPost} from 'types/IPost';
import {ButtonSizeEnum} from 'enums/ButtonSizeEnum';
import Title from 'ui/Title';
import {logout} from 'store/slices/authSlice';
import {clearUser} from 'store/slices/initSlice';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ButtonVariantEnum} from 'enums/ButtonVariantEnum';
import {ButtonIdEnum} from 'enums/ButtonIdEnum';
import {ROUTE_AUTH, ROUTE_POST_CREATE, ROUTE_POST_EDIT, ROUTE_PROFILE, ROUTE_PROFILE_EDIT, ROUTE_SUBSCRIPTIONS} from 'constants/routes';
import UserCard from 'shared/UserCard';
import PostsList from 'shared/PostsList';

import './ProfilePage.scss';
import setToLocalStorage from 'utils/setToLocalStorage';

export type TActionBarMenuItems = `${ActionBarMenuItemsEnum}`;

export interface IItem {
    label: string,
    id: TActionBarMenuItems,
    path: string,
}

const USERCARD_MENU_ITEMS: IItem[] = [
    {
        label: 'Редактировать профиль',
        id: ActionBarMenuItemsEnum.EDIT,
        path: ROUTE_PROFILE_EDIT,
    },
    {
        label: 'Выйти из профиля',
        id: ActionBarMenuItemsEnum.EXIT,
        path: ROUTE_AUTH,
    },
];

const POSTCARD_MENU_ITEMS: IItem[] = [
    {
        label: 'Редактировать пост',
        id: ActionBarMenuItemsEnum.EDIT,
        path: ROUTE_POST_EDIT,
    },
    {
        label: 'Удалить пост',
        id: ActionBarMenuItemsEnum.DELETE,
        path: ROUTE_PROFILE,
    },
];

const BUTTONS: IButtonProps[] = [
    {
        text: 'Мои подписки',
        name: ButtonIdEnum.SUBSCRIPTIONS,
        id: ButtonIdEnum.SUBSCRIPTIONS,
        type: ButtonTypeEnum.BUTTON,
        size: ButtonSizeEnum.MEDIUM,
        variant: ButtonVariantEnum.WHITE,
    },
    {
        text: 'Создать пост',
        name: ButtonIdEnum.CTREATE_POST,
        id: ButtonIdEnum.CTREATE_POST,
        type: ButtonTypeEnum.BUTTON,
        size: ButtonSizeEnum.MEDIUM,
        variant: ButtonVariantEnum.PRIMARY,
    },
];

export default function ProfilePage() {
    const {user} = useSelector((state: TStore) => state.init);
    const dispatch: TDispatch = useDispatch();
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState<null | IPost[]>(null);

    useEffect(() => {
        async function getUserPosts() {
            try {
                const result = await dispatch(getUserPostsThunk()).unwrap();
                setUserPosts(result);
            } catch (error) {
                console.error(error);
            }
        }
        getUserPosts();
    }, [dispatch, user?.posts?.length]);

    const onExitClick = () => {
        dispatch(logout());
        dispatch(clearUser());
    };

    const onNavigate = (path: string) => {
        navigate(path);
    };

    const onDeleteClick = async (id: string) => {
        try {
            await dispatch(deletePostThunk(id)).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    const onCardMenuItemClick = async (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        if (e.currentTarget.id === ActionBarMenuItemsEnum.EXIT) {
            onExitClick();
        }
        onNavigate(path);
    };

    const onPostMenuItemClick = async (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        const post = e.currentTarget.closest('.PostCard');
        if (e.currentTarget.id === ActionBarMenuItemsEnum.DELETE) {
            post?.classList.remove('PostCard_blurred');
            post?.classList.add('deleted');
            setTimeout(() => onDeleteClick(post?.id as string), 1000);
        }
        setToLocalStorage('changingPostId', post?.id);
        onNavigate(path);
    };

    const onButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(e.currentTarget.id === ButtonIdEnum.SUBSCRIPTIONS
            ? ROUTE_SUBSCRIPTIONS
            : ROUTE_POST_CREATE);
    };

    return (
        <div className="ProfilePage">
            <Title
                label={TitleLabelEnum.PROFILE}
                assignment={TitleAssignmentEnum.PAGE}
            />
            {user && (
                <UserCard
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    email={user?.email as string}
                    description={user?.description}
                    buttons={BUTTONS}
                    onButtonClick={onButtonClick}
                    menuItems={USERCARD_MENU_ITEMS}
                    onMenuItemClick={onCardMenuItemClick}
                    isActionBar
                />
            )}
            {userPosts && (
                <PostsList
                    posts={userPosts}
                    titleLabel={TitleLabelEnum.USER_POSTS}
                    titleAssignment={TitleAssignmentEnum.SECTION}
                    isFullMode={false}
                    menuItems={POSTCARD_MENU_ITEMS}
                    onMenuItemClick={onPostMenuItemClick}
                    isActionBar
                />
            )}
        </div>
    );
}
