/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getArgument = /* GraphQL */ `
  query GetArgument($id: ID!) {
    getArgument(id: $id) {
      id
      title
      arguments
      description
      aiarguments
      strength
      public
      image
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listArguments = /* GraphQL */ `
  query ListArguments(
    $filter: ModelArgumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArguments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        arguments
        description
        aiarguments
        strength
        public
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      user
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        user
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
