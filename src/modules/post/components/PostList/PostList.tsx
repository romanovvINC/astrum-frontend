import { FC } from "react";
import { Col, Row } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { Post } from "models/post/Post";
import { isArticle } from "Helpers/InstanceHelpers";
import { PostCreate } from "modules/post/components/PostCreate";
import { ArticlePostItem } from "./ArticlePostItem";
import { UserPostItem } from "./UserPostItem";

import s from "./PostList.module.scss";

interface IPostListProps {
    loadingPosts: boolean;
    loadingAsync: boolean;
    enablePostCreate?: boolean;
    posts: Post[];
    onClickPostDelete: (id: string) => void;
}

const PostList: FC<IPostListProps> = ({ loadingPosts, enablePostCreate = false, posts, onClickPostDelete }) => {
    return (
        <Row>
            {enablePostCreate && <PostCreate />}
            {loadingPosts ? (
                <>
                    <Col sm={12}>
                        <Skeleton className={s.skeleton_post} />
                    </Col>
                    <Col sm={12}>
                        <Skeleton className={s.skeleton_post} />
                    </Col>
                </>
            ) : (
                posts.map(p => {
                    if (isArticle(p)) {
                        return (
                            <ArticlePostItem
                                key={`ProfileArticle-${p.id}`}
                                {...p}
                                onClickDelete={onClickPostDelete}
                            />
                        );
                    } else {
                        return (
                            <UserPostItem
                                key={`ProfilePost-${p.id}`}
                                {...p}
                                onClickDelete={onClickPostDelete}
                            />
                        );
                    }
                })
            )}
        </Row>
    );
};

export default PostList;
