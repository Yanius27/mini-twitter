import React, {useEffect, useRef} from 'react';

import {TTitleAssignment, TTitleLabel} from 'ui/Title/Title';
import {IPost} from 'types/IPost';
import {IItem} from 'routes/ProfilePage/ProfilePage';
import Title from 'ui/Title';
import PostCard from '../PostCard';

import './PostsList.scss';

interface IPostsListProps {
    posts: IPost[] | null,
    titleLabel: TTitleLabel,
    titleAssignment: TTitleAssignment,
    isFullMode: boolean,
    menuItems?: IItem[],
    onMenuItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void,
    isActionBar: boolean,
}

export default function PostsList(props: IPostsListProps) {
    const {posts, titleLabel, titleAssignment, isFullMode, menuItems, onMenuItemClick, isActionBar} = props;
    const postCardsRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const currentRef = postCardsRefs.current;
        const scrollCb = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.children[0].classList.add('animated');
                } else {
                    entry.target.children[0].classList.remove('animated');
                }
            });
        };

        const observer = new IntersectionObserver(scrollCb);

        currentRef.forEach(el => {
            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            currentRef.forEach(el => {
                if (el) {
                    observer.unobserve(el);
                }
            });
        };
    }, [posts]);

    return (
        <div className="PostsList">
            <Title
                label={titleLabel}
                assignment={titleAssignment}
            />
            {
                posts?.map((item) => (
                    <div
                        key={item.id}
                        ref={(el) => {
                            if (el) {
                                postCardsRefs.current[item.id] = el;
                            }
                        }}
                    >
                        <PostCard
                            isFullMode={isFullMode}
                            post={item}
                            menuItems={menuItems}
                            onMenuItemClick={onMenuItemClick}
                            isActionBar={isActionBar}
                        />
                    </div>
                ))
            }
        </div>
    );
}
