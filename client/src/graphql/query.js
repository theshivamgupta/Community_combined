import { gql } from "@apollo/client";

export const CHECK_IF_USERNAME_EMAIL_EXISTS = gql`
  query ($cred: String!) {
    ifUserExists(cred: $cred)
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
      firstName
      lastName
      profileImage
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

export const GET_USER_BY_ID = gql`
  query ($id: ID!) {
    getUserById(id: $id) {
      id
      profileImage
      lastName
      firstName
      username
      email
      posts {
        id
        content
        title
        createdAt
      }
    }
  }
`;

export const GET_ALL_STUDENTS = gql`
  query {
    getStudentUsers {
      id
      confirmed
      profileImage
      moderatorLevel
      username
      firstName
      lastName
    }
  }
`;

export const GET_USER_VIA_POST = gql`
  query ($id: String!) {
    getUserById(id: $id) {
      id
      profileImage
      lastName
      firstName
      username
      email
      posts {
        id
        content
        title
        createdAt
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      userId
      title
      content
      createdAt
      comments {
        id
        content
        flagged
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query ($id: ID!) {
    getPostById(id: $id) {
      id
      title
      userId
      content
      createdAt
      comments {
        id
        userId
        content
        createdAt
        flagged
      }
    }
  }
`;

export const GET_ALL_POST_COMMENTS = gql`
  query ($postId: String!) {
    getCommentsByPostId(postId: $postId) {
      id
      content
      userId
    }
  }
`;

export const GET_ALL_FLAGGED_COMMENTS = gql`
  query {
    getAllFlaggedComments {
      id
      content
      userId
    }
  }
`;
