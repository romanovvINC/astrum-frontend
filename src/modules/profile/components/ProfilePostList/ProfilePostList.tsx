import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { authSelectors } from "modules/auth";
import { getProfilePostsRequest, profileSelectors } from "modules/profile";
import { deletePostRequest } from "modules/post";
import { PostList } from "modules/post/components/PostList";

interface IProfilePostListProps {
    username: string;
}

const ProfilePostList: FC<IProfilePostListProps> = ({ username }) => {
    const { username: accountUsername } = useAppSelector(authSelectors.getBasicInfo);
    const {
        pendingPosts,
        pendingPostsAsync,
        errorPosts,
        profileInfo: { posts },
    } = useAppSelector(profileSelectors.getProfileState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfilePostsRequest(username));
    }, [username]);

    const deletePostHandler = useCallback(
        (id: string) => dispatch(deletePostRequest({ id, successCallback: null })),
        []
    );

    return (
        <PostList
            loadingPosts={pendingPosts}
            loadingAsync={pendingPostsAsync}
            enablePostCreate={username === accountUsername}
            posts={posts}
            onClickPostDelete={deletePostHandler}
        />
    );
};

export default ProfilePostList;
