import React, { Fragment } from "react";
import MyAppealsContain from "../../Components/Appeal/MyAppealsContain";
import { ApolloProvider } from "@apollo/client";
import { appealClient } from "../../Api/AppealApi";

const MyAppeals = () => {
    return (
        <ApolloProvider client={appealClient}>
            <MyAppealsContain />
        </ApolloProvider>
    );
};

export default MyAppeals;
