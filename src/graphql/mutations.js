/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArgument = /* GraphQL */ `
  mutation CreateArgument(
    $input: CreateArgumentInput!
    $condition: ModelArgumentConditionInput
  ) {
    createArgument(input: $input, condition: $condition) {
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
export const updateArgument = /* GraphQL */ `
  mutation UpdateArgument(
    $input: UpdateArgumentInput!
    $condition: ModelArgumentConditionInput
  ) {
    updateArgument(input: $input, condition: $condition) {
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
export const deleteArgument = /* GraphQL */ `
  mutation DeleteArgument(
    $input: DeleteArgumentInput!
    $condition: ModelArgumentConditionInput
  ) {
    deleteArgument(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
