import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import cn from 'classnames';

import {IPost} from 'types/IPost';
import {IItem} from 'routes/ProfilePage/ProfilePage';
import UserCard from 'shared/UserCard';
import {TDispatch} from 'store/store';
import {useDispatch} from 'react-redux';
import {getImageThunk} from 'store/thunks/getImageThunk';
import Button from 'ui/form/Button';
import {ButtonIdEnum} from 'enums/ButtonIdEnum';
import {ButtonTypeEnum} from 'enums/ButtonTypeEnum';
import {ButtonVariantEnum} from 'enums/ButtonVariantEnum';
import {ButtonSizeEnum} from 'enums/ButtonSizeEnum';
import ActionBar from 'ui/icon-buttons/ActionBar';
import ActionBarMenu from 'routes/ProfilePage/views/ActionBarMenu';
import LikeIcon from 'ui/icon-buttons/LikeIcon';
import {editPostLikeStatusThunk} from 'store/thunks/editPostLikeStatusThunk';

import './PostCard.scss';

interface IPostCardProps {
    post: IPost,
    isFullMode: boolean,
    menuItems?: IItem[],
    onMenuItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void,
    isActionBar: boolean,
}

export default function PostCard(props: IPostCardProps) {
    const {post, isFullMode, menuItems, onMenuItemClick, isActionBar} = props;
    const dispatch: TDispatch = useDispatch();
    const [postImageSrc, setPostImageSrc] = useState<null | string>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likesCount);

    const onToggleLikeStatus = async (likeStatus: boolean) => {
        try {
            const args = {
                id: post.id.toString(),
                data: {
                    isLiked: !likeStatus,
                },
            };
            const result = await dispatch(editPostLikeStatusThunk(args)).unwrap();
            setLikesCount(result.likesCount);
        } catch (error) {
            console.error(error);
        }
    };

    const onToggleAction = () => {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
            setShouldRenderMenu(true);
        } else {
            setIsMenuOpen(false);
            setTimeout(() => setShouldRenderMenu(false), 700);
        }
    };

    const onCloseMenu = () => {
        setShouldRenderMenu(false);
        return true;
    };

    useEffect(() => {
        const loadPostImage = async () => {
            if (post.imageId) {
                try {
                    const result = await dispatch(getImageThunk(post.imageId.toString())).unwrap();
                    setPostImageSrc(result.data);
                } catch (error) {
                    console.error('PostImage load error: ' + error);
                }
            }
        };
        loadPostImage();
    }, [dispatch, post.imageId]);

    const postCardClassName = cn(
        'PostCard',
        {
            PostCard_blurred: isMenuOpen,
        },
    );

    return (
        <div
            className={postCardClassName}
            id={post.id.toString()}
        >
            {isFullMode && (
                <UserCard
                    firstName={post.creator.firstName}
                    lastName={post.creator.lastName}
                    email={post.creator.email as string}
                    isActionBar={false}
                />
            )}
            <div className="PostCard__body">
                {
                    postImageSrc && (
                        <img
                            alt='Post_Image'
                            src={postImageSrc}
                        />
                    )
                }
                <div className='PostCard__content'>
                    <div className="PostCard__content-header">
                        <span className='PostCard__title'>
                            {post.title}
                        </span>
                        {isActionBar && (
                            <ActionBar
                                onActionBarClick={onToggleAction}
                            />
                        )}
                        {shouldRenderMenu && menuItems && onMenuItemClick && (
                            <ActionBarMenu
                                menuItems={menuItems}
                                onMenuItemClick={onMenuItemClick}
                                closeMenuCallback={onCloseMenu}
                                isActive={isMenuOpen}
                            />
                        )}
                    </div>
                    <span className='PostCard__text'>
                        {post.text}
                    </span>
                    {post.tags.length > 0 && (
                        <div className="PostCard__tags">
                            {post.tags.map((tag) => (
                                <Button
                                    key={tag.title}
                                    text={tag.title}
                                    name={tag.title}
                                    id={ButtonIdEnum.TAG}
                                    type={ButtonTypeEnum.BUTTON}
                                    variant={ButtonVariantEnum.PRIMARY}
                                    size={ButtonSizeEnum.SMALL}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="PostCard__footer">
                <div className="PostCard__likes">
                    <LikeIcon
                        isLiked={post.isLiked}
                        changeLikeStatus={onToggleLikeStatus}
                    />
                    <span className='PostCard__likes-count'>
                        {likesCount !== 0 ? likesCount : ''}
                    </span>
                </div>
                <span>{moment(post.createTime).format('DD.MM.YYYY')}</span>
            </div>
        </div>
    );
}
