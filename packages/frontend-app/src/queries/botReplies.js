import gql from 'graphql-tag';

export const GET_ORGANIZATION_BOT_REPLIES = gql`
    query GetReplies($organizationId: Int!) {
        organization(organizationId: $organizationId) {
            botReplies {
                id
                title
                replyText
                createdAt
                triggers {
                    id
                    sentence
                }
            }
        }
    }
`;
