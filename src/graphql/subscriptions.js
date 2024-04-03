/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArgument = /* GraphQL */ `
  subscription OnCreateArgument(
    $filter: ModelSubscriptionArgumentFilterInput
    $owner: String
  ) {
    onCreateArgument(filter: $filter, owner: $owner) {
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
export const onUpdateArgument = /* GraphQL */ `
  subscription OnUpdateArgument(
    $filter: ModelSubscriptionArgumentFilterInput
    $owner: String
  ) {
    onUpdateArgument(filter: $filter, owner: $owner) {
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
export const onDeleteArgument = /* GraphQL */ `
  subscription OnDeleteArgument(
    $filter: ModelSubscriptionArgumentFilterInput
    $owner: String
  ) {
    onDeleteArgument(filter: $filter, owner: $owner) {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onCreateNote(filter: $filter, owner: $owner) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onUpdateNote(filter: $filter, owner: $owner) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onDeleteNote(filter: $filter, owner: $owner) {
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
