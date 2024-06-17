import AppealsInboxContain from "../../Components/Appeal/AppelsInboxContain";
import { ApolloProvider } from "@apollo/client";
import { appealClient } from "../../Api/AppealApi";

const AppealsInbox = () => {
    return (
        <ApolloProvider client={appealClient}>
            <AppealsInboxContain />
        </ApolloProvider>
    );
};

export default AppealsInbox;
