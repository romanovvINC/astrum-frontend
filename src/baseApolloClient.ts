import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

type CreateApolloClientPayload = {
    uri: string;
    cache?: InMemoryCache;
};

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("@ACCESS_TOKEN");
    return {
        headers: {
            ...headers,
            ["Access-Control-Allow-Credentials"]: String(true),
            ["Authorization"]: token ? `Bearer ${token}` : "",
        },
    };
});

export const createApolloClient = ({ uri, cache = new InMemoryCache() }: CreateApolloClientPayload) => {
    const httpLink = createHttpLink({
        uri,
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
    });
};
