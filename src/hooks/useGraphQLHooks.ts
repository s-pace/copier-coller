import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";

import {
  BooleanResult,
  Filament,
  Interaction,
  MutationContactArgs,
  MutationCreateFilamentArgs,
  MutationCreateInteractionArgs,
  MutationCreateOrderArgs,
  MutationCreatePrinterArgs,
  MutationCreateTeamArgs,
  MutationCreateUserArgs,
  MutationDeleteOrderArgs,
  MutationDeletePrinterArgs,
  MutationDeleteTeamArgs,
  MutationDeleteUserArgs,
  MutationPublishOrderArgs,
  MutationUpdateOrderArgs,
  MutationUpdatePrinterArgs,
  MutationUpdateTeamArgs,
  MutationUpdateUserArgs,
  Order,
  OrderListResult,
  OrderResult,
  Printer,
  QueryGetFilamentByIdArgs,
  QueryGetFileArgs,
  QueryGetOrderByIdArgs,
  QueryGetPrinterByIdArgs,
  QueryGetTeamByIdArgs,
  QueryGetUserByIdArgs,
  QueryListInteractionsArgs,
  Team,
  UploadFileResult,
  User,
  UserResult,
  MutationUploadScreenshotArgs,
} from "../generated/types";

// Mutations
const CREATE_FILAMENT_MUTATION: DocumentNode = gql`
  mutation CreateFilament($data: FilamentInput!) {
    createFilament(data: $data) {
      bedTemperature
      commonProperties
      commonlyPrintedMaterials
      extrusionTemperature
      filamentType
      id
      postPrintAppearance
    }
  }
`;

const CREATE_USER_MUTATION: DocumentNode = gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      result {
        id
        username
        firstName
        lastName
        email
        profileInfo
        socialMediaLinks
        discoverReason
        referrerUserName
        role
        printers {
          id
          volumeCapacity
          speed
          brand
          model
          quantity
        }
        subNewsletter
        portFolioURL
        location {
          latitude
          longitude
        }
      }
      reasons
    }
  }
`;

const CREATE_TEAM_MUTATION: DocumentNode = gql`
  mutation CreateTeam($data: TeamInput!) {
    createTeam(data: $data) {
      id
      teamName
      memberIds
    }
  }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      result {
        id
        type
        title
        category
        description
        deadline
        deliveryMethod
        views
        estimatedPrice
        paymentType
        filePic
        file3D
        status
        phoneNumber
        email
        fileId
        customerId
        address
      }
      reasons
    }
  }
`;

const GO_MUTATION = gql`
  mutation GoOrder($data: GoInput!) {
    go(data: $data) {
      result {
        id
        type
        title
        category
        description
        deadline
        deliveryMethod
        views
        estimatedPrice
        paymentType
        filePic
        file3D
        status
        phoneNumber
        email
        fileId
        customerId
        address
      }
      reasons
    }
  }
`;

const CREATE_PRINTER_MUTATION: DocumentNode = gql`
  mutation CreatePrinter($data: PrinterInput!) {
    createPrinter(data: $data) {
      id
      quantity
      location {
        latitude
        longitude
      }
      availabilitySchedule
      printedCount
      rateIncome
    }
  }
`;

// Queries
const GET_FILAMENT_BY_ID_QUERY: DocumentNode = gql`
  query GetFilamentById($id: String!) {
    getFilamentById(id: $id) {
      id
      filamentType
      commonlyPrintedMaterials
      extrusionTemperature
      bedTemperature
      postPrintAppearance
      commonProperties
    }
  }
`;

const PUBLISH_ORDER_MUTATION: DocumentNode = gql`
  mutation PublishOrder($orderId: ID!) {
    publishOrder(orderId: $orderId) {
      result
      reasons
    }
  }
`;

const GET_MY_ORDERS_QUERY: DocumentNode = gql`
  query {
    myOrders {
      result {
        order {
          id
          customerId
          type
          title
          category
          description
          deadline
          deliveryMethod
          views
          estimatedPrice
          paymentType
          filePic
          file3D
          status
          fileId
          address
          publishedAt
          unPublishedAt
          completedAt
        }
        screenshot {
          id
          orderId
          presignedUrl
        }
      }
      reasons
    }
  }
`;

const LIST_ORDERS_QUERY: DocumentNode = gql`
  query {
    orders {
      result {
        order {
          id
          customerId
          type
          title
          category
          description
          deadline
          deliveryMethod
          views
          estimatedPrice
          paymentType
          filePic
          file3D
          status
          fileId
          address
          publishedAt
          createdAt
          unPublishedAt
          completedAt
        }
        interactions {
          id
          authorName
          memberIds
          userId
          orderId
          createdAt
          action
          payload
          richTextComment
          temperature
        }
        screenshot {
          id
          orderId
          presignedUrl
        }
      }
      reasons
    }
  }
`;

const GET_USER_BY_ID_QUERY: DocumentNode = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      id
      username
      firstName
      lastName
      email
      profileInfo
      socialMediaLinks
      discoverReason
      referrerUserName
      role
      # printers
      subNewsletter
      portFolioURL
    }
  }
`;

const GET_CURRENT_USER_QUERY: DocumentNode = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      firstName
      lastName
      email
      profileInfo
      socialMediaLinks
      discoverReason
      referrerUserName
      role
      # printers
      subNewsletter
      portFolioURL
    }
  }
`;

const GET_TEAM_BY_ID_QUERY: DocumentNode = gql`
  query GetTeamById($id: String!) {
    getTeamById(id: $id) {
      id
      teamName
      memberIds
    }
  }
`;

const GET_ORDER_BY_ID_QUERY: DocumentNode = gql`
  query GetOrderById($id: String!) {
    getOrderById(id: $id) {
      id
      customerId
      fileId
      createdAt
      orderStatus
    }
  }
`;

const GET_PRINTER_BY_ID_QUERY: DocumentNode = gql`
  query GetPrinterById($id: String!) {
    getPrinterById(id: $id) {
      id
      quantity
      location {
        latitude
        longitude
      }
      availabilitySchedule
      printedCount
      rateIncome
    }
  }
`;

// Mutations
export const useCreateFilamentMutation = () => {
  return useMutation<Filament, MutationCreateFilamentArgs>(
    CREATE_FILAMENT_MUTATION,
  );
};

export const useCreateUserMutation = () => {
  return useMutation<{ createUser: UserResult }, MutationCreateUserArgs>(
    CREATE_USER_MUTATION,
  );
};

export const useCreateTeamMutation = () => {
  return useMutation<Team, MutationCreateTeamArgs>(CREATE_TEAM_MUTATION);
};

export const useCreateOrderMutation = () => {
  return useMutation<{ createOrder: OrderResult }, MutationCreateOrderArgs>(
    CREATE_ORDER_MUTATION,
  );
};

export const useGoMutation = () => {
  return useMutation<{ go: OrderResult }, MutationCreateOrderArgs>(GO_MUTATION);
};

export const usePublishOrderMutation = () => {
  return useMutation<User, MutationPublishOrderArgs>(PUBLISH_ORDER_MUTATION);
};

export const useCreatePrinterMutation = () => {
  return useMutation<Printer, MutationCreatePrinterArgs>(
    CREATE_PRINTER_MUTATION,
  );
};

// Queries
export const useGetFilamentByIdQuery = (
  variables: QueryGetFilamentByIdArgs,
) => {
  return useQuery(GET_FILAMENT_BY_ID_QUERY, {
    variables,
  });
};

// Queries
export const useMyOrdersQuery = () => {
  return useQuery<{ myOrders: OrderListResult }>(GET_MY_ORDERS_QUERY);
};

export const useOrdersQuery = () => {
  return useQuery<{ orders: OrderListResult }>(LIST_ORDERS_QUERY);
};

export const useGetUserByIdQuery = (variables: QueryGetUserByIdArgs) => {
  return useQuery(GET_USER_BY_ID_QUERY, {
    variables,
  });
};

export const useGetCurrentUserQuery = () => {
  return useQuery(GET_CURRENT_USER_QUERY, {});
};

export const useGetTeamByIdQuery = (variables: QueryGetTeamByIdArgs) => {
  return useQuery(GET_TEAM_BY_ID_QUERY, {
    variables,
  });
};

export const useGetOrderByIdQuery = (variables: QueryGetOrderByIdArgs) => {
  return useQuery(GET_ORDER_BY_ID_QUERY, {
    variables,
  });
};

export const useGetPrinterByIdQuery = (variables: QueryGetPrinterByIdArgs) => {
  return useQuery(GET_PRINTER_BY_ID_QUERY, {
    variables,
  });
};

const UPDATE_USER_MUTATION: DocumentNode = gql`
  mutation UpdateUser($id: ID!, $data: UserInput!) {
    updateUser(id: $id, data: $data) {
      id
      username
      password
      email
      profileInfo
      role
      credit
      loyaltyStatus
      lastLogin
      socialMediaLinks
      stripeId
      referrerId
    }
  }
`;

export const useUpdateUserMutation = () => {
  return useMutation<User, MutationUpdateUserArgs>(UPDATE_USER_MUTATION);
};

const DELETE_USER_MUTATION: DocumentNode = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Hook for deleting a user
export const useDeleteUserMutation = () => {
  return useMutation<boolean, MutationDeleteUserArgs>(DELETE_USER_MUTATION);
};

const UPDATE_ORDER_MUTATION: DocumentNode = gql`
  mutation UpdateOrder($id: ID!, $data: OrderInput!) {
    updateOrder(id: $id, data: $data) {
      id
      customerId
      fileId
      createdAt
      orderStatus
    }
  }
`;

export const useUpdateOrderMutation = () => {
  return useMutation<Order, MutationUpdateOrderArgs>(UPDATE_ORDER_MUTATION);
};

// DELETE_ORDER_MUTATION
const DELETE_ORDER_MUTATION: DocumentNode = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

export const useDeleteOrderMutation = () => {
  return useMutation<boolean, MutationDeleteOrderArgs>(DELETE_ORDER_MUTATION);
};

const UPDATE_TEAM_MUTATION: DocumentNode = gql`
  mutation UpdateTeam($id: ID!, $data: TeamInput!) {
    updateTeam(id: $id, data: $data) {
      id
      teamName
      memberIds
    }
  }
`;

export const useUpdateTeamMutation = () => {
  return useMutation<Team, MutationUpdateTeamArgs>(UPDATE_TEAM_MUTATION);
};

// DELETE_TEAM_MUTATION
const DELETE_TEAM_MUTATION: DocumentNode = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id)
  }
`;

export const useDeleteTeamMutation = () => {
  return useMutation<boolean, MutationDeleteTeamArgs>(DELETE_TEAM_MUTATION);
};

const UPDATE_PRINTER_MUTATION: DocumentNode = gql`
  mutation UpdatePrinter($id: ID!, $data: PrinterInput!) {
    updatePrinter(id: $id, data: $data) {
      id
      quantity
      location {
        latitude
        longitude
      }
      availabilitySchedule
      printedCount
      rateIncome
    }
  }
`;

export const useUpdatePrinterMutation = () => {
  return useMutation<Printer, MutationUpdatePrinterArgs>(
    UPDATE_PRINTER_MUTATION,
  );
};

// DELETE_PRINTER_MUTATION
const DELETE_PRINTER_MUTATION: DocumentNode = gql`
  mutation DeletePrinter($id: ID!) {
    deletePrinter(id: $id)
  }
`;

export const useDeletePrinterMutation = () => {
  return useMutation<boolean, MutationDeletePrinterArgs>(
    DELETE_PRINTER_MUTATION,
  );
};

// Mutation to create a Reaction
const CREATE_REACTION_MUTATION = gql`
  mutation CreateReaction($data: ReactionInput!) {
    createReaction(data: $data) {
      id
      memberId
      modelId
      createdAt
      deletedAt
      type
    }
  }
`;

// Mutation to update a Reaction
const UPDATE_REACTION_MUTATION = gql`
  mutation UpdateReaction($id: ID!, $data: ReactionInput!) {
    updateReaction(id: $id, data: $data) {
      id
      memberId
      modelId
      createdAt
      deletedAt
      type
    }
  }
`;

// Mutation to delete a Reaction
const DELETE_REACTION_MUTATION = gql`
  mutation DeleteReaction($id: ID!) {
    deleteReaction(id: $id)
  }
`;

// Query to get a Reaction by ID
const GET_REACTION_BY_ID_QUERY = gql`
  query GetReactionById($id: String!) {
    getReactionById(id: $id) {
      id
      memberId
      modelId
      createdAt
      deletedAt
      type
    }
  }
`;

// React hooks for the mutations and query

// Hook for creating a Reaction
export const useCreateReactionMutation = () => {
  return useMutation(CREATE_REACTION_MUTATION);
};

const CREATE_INTERACTION_MUTATION = gql`
  mutation CreateInteraction($data: InteractionInput!) {
    createInteraction(data: $data) {
      id
      action
      createdAt
      memberIds
      orderId
      payload
      richTextComment
      temperature
      userId
    }
  }
`;

export const useCreateInteractionMutation = () => {
  return useMutation<
    { createInteraction: Interaction },
    MutationCreateInteractionArgs
  >(CREATE_INTERACTION_MUTATION);
};

const LIST_INTERACTIONS_QUERY = gql`
  query listInteractions($filter: ListInteractionInput!) {
    listInteractions(filter: $filter) {
      id
      memberIds
      userId
      orderId
      createdAt
      action
      payload
      richTextComment
      temperature
    }
  }
`;

export const useListInteractionQuery = (filter: {
  userId?: string;
  orderId?: string;
}) => {
  return useQuery<
    { listInteractions: Interaction[] },
    QueryListInteractionsArgs
  >(LIST_INTERACTIONS_QUERY, {
    variables: { filter },
  });
};

// Hook for updating a Reaction
export const useUpdateReactionMutation = () => {
  return useMutation(UPDATE_REACTION_MUTATION);
};

// Hook for deleting a Reaction
export const useDeleteReactionMutation = () => {
  return useMutation(DELETE_REACTION_MUTATION);
};

// Hook for fetching a Reaction by ID
export const useGetReactionByIdQuery = () => {
  return useQuery(GET_REACTION_BY_ID_QUERY);
};

const UPLOAD_FILE_MUTATION = gql`
  mutation uploadFile($fileName: String!) {
    uploadFile(fileName: $fileName) {
      result {
        presignedUrl
        fileId
      }
      reasons
    }
  }
`;

const UPLOAD_PROFILE_PICTURE_MUTATION = gql`
  mutation uploadProfilePicture($fileName: String!) {
    uploadProfilePicture(fileName: $fileName) {
      result {
        presignedUrl
        fileId
      }
      reasons
    }
  }
`;

export const useUploadFile = () => {
  return useMutation<{ uploadFile: UploadFileResult }, { fileName: string }>(
    UPLOAD_FILE_MUTATION,
  );
};

export const useUploadProfilePicture = () => {
  return useMutation<
    { uploadProfilePicture: UploadFileResult },
    { fileName: string }
  >(UPLOAD_PROFILE_PICTURE_MUTATION);
};

const GET_FILE_QUERY: DocumentNode = gql`
  query GetFile($fileId: String!) {
    getFile(fileId: $fileId) {
      result {
        presignedUrl
        fileId
      }
      reasons
    }
  }
`;

const UPLOAD_SCREENSHOT_MUTATION = gql`
  mutation uploadScreenshot($fileName: String!, $orderId: String!) {
    uploadScreenshot(fileName: $fileName, orderId: $orderId) {
      result {
        presignedUrl
        fileId
      }
      reasons
    }
  }
`;

export const useUploadScreenshot = () => {
  return useMutation<
    { uploadScreenshot: UploadFileResult },
    MutationUploadScreenshotArgs
  >(UPLOAD_SCREENSHOT_MUTATION);
};

export const useGetFileQuery = (variables: QueryGetFileArgs) => {
  return useQuery<{ getFile: UploadFileResult }, QueryGetFileArgs>(
    GET_FILE_QUERY,
    {
      variables,
    },
  );
};

const SEND_CONTACT_MESSAGE_MUTATION = gql`
  mutation contact($data: ContactInput!) {
    contact(data: $data) {
      result
      reasons
    }
  }
`;

export const useSendContactMessageMutation = () => {
  return useMutation<{ contact: BooleanResult }, MutationContactArgs>(
    SEND_CONTACT_MESSAGE_MUTATION,
  );
};
