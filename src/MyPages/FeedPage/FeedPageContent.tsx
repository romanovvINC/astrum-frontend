import { FC, useCallback } from "react";
import { Col, Container, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "Redux/hooks";
import { deletePostRequest, postSelectors } from "modules/post";
import FeedSlider from "./Components/FeedSlider/FeedSlider";
import FeedWidget from "./Components/FeedWidget/FeedWidget";
import { PostList } from "modules/post/components/PostList";
import { ModalLoading } from "ui/Modal";

import s from "./FeedPage.module.css";

const FeedPageContent: FC = () => {
    const { pendingChange, errorChange } = useAppSelector(postSelectors.getPostInfoState);
    const { pending, state, error } = useAppSelector(state => state.feedReducer);
    const dispatch = useAppDispatch();

    const deletePostHandler = useCallback((id: string) => {
        dispatch(deletePostRequest({ id, successCallback: null }));
    }, []);

    if (pending) {
        return <div>Загрузка...</div>;
    } else if (error) {
        return <div>{error}</div>;
    } else {
        return (
            <Container fluid={false}>
                {state.banners.length > 0 && <FeedSlider />}
                <Row className={s.row}>
                    <Col xl={9}>
                        <PostList
                            loadingPosts={pending}
                            loadingAsync={false}
                            enablePostCreate={true}
                            posts={state.posts}
                            onClickPostDelete={deletePostHandler}
                        />
                    </Col>
                    <Col
                        xl={3}
                        className={s.widgets}
                    >
                        {state.widgets.map(w => {
                            return (
                                <FeedWidget
                                    key={w.id}
                                    imageSrc={w.imageUrl}
                                />
                            );
                        })}
                    </Col>
                </Row>
                <ModalLoading isOpen={pendingChange} />
            </Container>
        );
    }
};

export default FeedPageContent;
