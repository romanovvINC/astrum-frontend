import { FC, useEffect } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import FeedPageContent from "./FeedPageContent";
import { useAppDispatch } from "../../Redux/hooks";
import { getNewsRequest } from "../../Redux/Reducers/FeedReducer/FeedReducer";

// const feedClient = new ApolloClient({
//     uri: `${process.env.REACT_APP_BACKEND_URL}/graghql/news`,
//     cache: new InMemoryCache()
// });

const FeedPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNewsRequest());
    }, []);

    return (
        // <ApolloProvider client={feedClient}>
        <FeedPageContent />
        // </ApolloProvider>
    );
};

export default FeedPage;
