import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  subscription {
    currentUser {
      id
      username
      firstName
      lastName
      moderatorLevel
      affiliation
      posts {
        id
        title
        content
        userId
      }
    }
  }
`;

export const GET_POST = gql`
  subscription ($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      userId
      comments {
        id
        userId
        content
      }
    }
  }
`;

export const COMMENT_ADDED = gql`
  subscription ($postId: String!) {
    onCommentAdded(postId: $postId) {
      id
      content
      userId
      postId
    }
  }
`;
