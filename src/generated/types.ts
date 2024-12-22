/* eslint-disable no-unused-vars */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type Ability = {
  __typename?: "Ability";
  action: AbilityAction;
  inverted?: Maybe<Scalars["Boolean"]["output"]>;
  subject: Scalars["String"]["output"];
};

export enum AbilityAction {
  Arbitrate = "ARBITRATE",
  Cancel = "CANCEL",
  Create = "CREATE",
  Delete = "DELETE",
  Finish = "FINISH",
  Invite = "INVITE",
  Join = "JOIN",
  List = "LIST",
  Publish = "PUBLISH",
  Read = "READ",
  Search = "SEARCH",
  Send = "SEND",
  TempManage = "TEMP_MANAGE",
  Update = "UPDATE",
  Validate = "VALIDATE",
  Write = "WRITE",
}

export type AbilityWithName = {
  __typename?: "AbilityWithName";
  ability: Ability;
  name: Scalars["String"]["output"];
};

export type AgreedLegalDocument = {
  __typename?: "AgreedLegalDocument";
  agreedAt: Scalars["DateTime"]["output"];
  agreedVersion: Scalars["Float"]["output"];
  choices: Scalars["Float"]["output"];
  legalDocumentId: Scalars["String"]["output"];
};

export enum AppearanceEnum {
  Glossy = "Glossy",
  Matte = "Matte",
  Satin = "Satin",
}

export type BooleanResult = {
  __typename?: "BooleanResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ContactInput = {
  category: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  subject: Scalars["String"]["input"];
  type: ContactTypeEnum;
};

export enum ContactTypeEnum {
  Assistance = "Assistance",
  Bug = "Bug",
  Other = "Other",
}

export enum DeliveryMethodEnum {
  HandDelivery = "HandDelivery",
  Postal = "Postal",
}

export type Filament = {
  __typename?: "Filament";
  bedTemperature: Scalars["Float"]["output"];
  commonProperties: Scalars["String"]["output"];
  commonlyPrintedMaterials: Scalars["String"]["output"];
  extrusionTemperature: Scalars["Float"]["output"];
  filamentType: FilamentTypeEnum;
  id?: Maybe<Scalars["ID"]["output"]>;
  postPrintAppearance: Scalars["String"]["output"];
};

export type FilamentInput = {
  bedTemperature: Scalars["Float"]["input"];
  commonProperties: Scalars["String"]["input"];
  commonlyPrintedMaterials: Scalars["String"]["input"];
  extrusionTemperature: Scalars["Float"]["input"];
  filamentType: FilamentTypeEnum;
  postPrintAppearance: Scalars["String"]["input"];
};

export enum FilamentTypeEnum {
  Abs = "Abs",
  Petg = "Petg",
  Pla = "Pla",
}

export type FileDto = {
  __typename?: "FileDTO";
  createdAt: Scalars["DateTime"]["output"];
  extension: Scalars["String"]["output"];
  filename: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isShared: Scalars["Boolean"]["output"];
  orderId?: Maybe<Scalars["String"]["output"]>;
  presignedUrl: Scalars["String"]["output"];
  userId?: Maybe<Scalars["ID"]["output"]>;
};

export type GpsCoordinate = {
  __typename?: "GPSCoordinate";
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
};

export type GpsCoordinateInput = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type GoInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  appearance?: InputMaybe<AppearanceEnum>;
  category: ServiceCategoryEnum;
  color?: InputMaybe<Scalars["String"]["input"]>;
  deadline: Scalars["DateTime"]["input"];
  deliveryMethod: DeliveryMethodEnum;
  description: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  estimatedPrice?: InputMaybe<Scalars["Float"]["input"]>;
  file3D?: InputMaybe<Scalars["Upload"]["input"]>;
  fileId?: InputMaybe<Scalars["ID"]["input"]>;
  filePic?: InputMaybe<Scalars["Upload"]["input"]>;
  material?: InputMaybe<MaterialEnum>;
  paymentType?: InputMaybe<PaymentTypeEnum>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  status: OrderStatusEnum;
  texture?: InputMaybe<TextureEnum>;
  title: Scalars["String"]["input"];
  type: OrderTypeEnum;
  unPublishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  views?: InputMaybe<Scalars["Float"]["input"]>;
};

export type Interaction = {
  __typename?: "Interaction";
  action: Scalars["String"]["output"];
  authorName?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  id?: Maybe<Scalars["ID"]["output"]>;
  memberIds?: Maybe<Array<Scalars["ID"]["output"]>>;
  orderId: Scalars["String"]["output"];
  payload?: Maybe<Scalars["String"]["output"]>;
  richTextComment?: Maybe<Scalars["String"]["output"]>;
  temperature?: Maybe<Scalars["Float"]["output"]>;
  userId: Scalars["String"]["output"];
};

export type InteractionInput = {
  action: Scalars["String"]["input"];
  createdAt: Scalars["DateTime"]["input"];
  memberIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  orderId: Scalars["String"]["input"];
  payload?: InputMaybe<Scalars["String"]["input"]>;
  richTextComment?: InputMaybe<Scalars["String"]["input"]>;
  temperature?: InputMaybe<Scalars["Float"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type ListInteractionInput = {
  orderId?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export enum MaterialEnum {
  Elastic = "Elastic",
  Rigid = "Rigid",
  Soft = "Soft",
}

export type Mutation = {
  __typename?: "Mutation";
  contact: BooleanResult;
  createFilament: Filament;
  createInteraction: Interaction;
  createOrder: OrderResult;
  createPrinter: Printer;
  createReaction: Reaction;
  createTeam: Team;
  createUser: UserResult;
  createView: ViewResult;
  deleteFilament: Scalars["Boolean"]["output"];
  deleteInteraction: Scalars["Boolean"]["output"];
  deleteOrder: Scalars["Boolean"]["output"];
  deletePrinter: Scalars["Boolean"]["output"];
  deleteReaction: Scalars["Boolean"]["output"];
  deleteTeam: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  deleteView: Scalars["Boolean"]["output"];
  go: OrderResult;
  publishOrder: PublishOrderResult;
  updateFilament: Filament;
  updateInteraction: Interaction;
  updateOrder: OrderResult;
  updatePrinter: Printer;
  updateReaction: Reaction;
  updateTeam: Team;
  updateUser: User;
  updateView: ViewResult;
  uploadFile?: Maybe<UploadFileResult>;
  uploadProfilePicture?: Maybe<UploadFileResult>;
  uploadScreenshot?: Maybe<UploadFileResult>;
};

export type MutationContactArgs = {
  data: ContactInput;
};

export type MutationCreateFilamentArgs = {
  data: FilamentInput;
};

export type MutationCreateInteractionArgs = {
  data: InteractionInput;
};

export type MutationCreateOrderArgs = {
  data: OrderInput;
};

export type MutationCreatePrinterArgs = {
  data: PrinterInput;
};

export type MutationCreateReactionArgs = {
  data: ReactionInput;
};

export type MutationCreateTeamArgs = {
  data: TeamInput;
};

export type MutationCreateUserArgs = {
  data: UserInput;
};

export type MutationCreateViewArgs = {
  data: ViewInput;
};

export type MutationDeleteFilamentArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteInteractionArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteOrderArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeletePrinterArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteReactionArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteTeamArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteViewArgs = {
  id: Scalars["String"]["input"];
};

export type MutationGoArgs = {
  data: GoInput;
};

export type MutationPublishOrderArgs = {
  orderId: Scalars["ID"]["input"];
};

export type MutationUpdateFilamentArgs = {
  data: FilamentInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateInteractionArgs = {
  data: InteractionInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateOrderArgs = {
  data: OrderInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdatePrinterArgs = {
  data: PrinterInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateReactionArgs = {
  data: ReactionInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateTeamArgs = {
  data: TeamInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateViewArgs = {
  data: ViewInput;
  id: Scalars["ID"]["input"];
};

export type MutationUploadFileArgs = {
  fileName: Scalars["String"]["input"];
};

export type MutationUploadProfilePictureArgs = {
  fileName: Scalars["String"]["input"];
};

export type MutationUploadScreenshotArgs = {
  fileName: Scalars["String"]["input"];
  orderId?: InputMaybe<Scalars["String"]["input"]>;
};

export type Order = {
  __typename?: "Order";
  address?: Maybe<Scalars["String"]["output"]>;
  appearance?: Maybe<AppearanceEnum>;
  category: ServiceCategoryEnum;
  color?: Maybe<Scalars["String"]["output"]>;
  completedAt?: Maybe<Scalars["DateTime"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  customerId?: Maybe<Scalars["ID"]["output"]>;
  deadline: Scalars["DateTime"]["output"];
  deliveryMethod: DeliveryMethodEnum;
  description: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  estimatedPrice?: Maybe<Scalars["Float"]["output"]>;
  file3D?: Maybe<Scalars["Upload"]["output"]>;
  fileId?: Maybe<Scalars["ID"]["output"]>;
  filePic?: Maybe<Scalars["Upload"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  material?: Maybe<MaterialEnum>;
  paymentType?: Maybe<PaymentTypeEnum>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  status: OrderStatusEnum;
  texture?: Maybe<TextureEnum>;
  title: Scalars["String"]["output"];
  type: OrderTypeEnum;
  unPublishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  views?: Maybe<Scalars["Float"]["output"]>;
};

export type OrderInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  appearance?: InputMaybe<AppearanceEnum>;
  category: ServiceCategoryEnum;
  color?: InputMaybe<Scalars["String"]["input"]>;
  deadline: Scalars["DateTime"]["input"];
  deliveryMethod: DeliveryMethodEnum;
  description: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  estimatedPrice?: InputMaybe<Scalars["Float"]["input"]>;
  file3D?: InputMaybe<Scalars["Upload"]["input"]>;
  fileId?: InputMaybe<Scalars["ID"]["input"]>;
  filePic?: InputMaybe<Scalars["Upload"]["input"]>;
  material?: InputMaybe<MaterialEnum>;
  paymentType?: InputMaybe<PaymentTypeEnum>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  status: OrderStatusEnum;
  texture?: InputMaybe<TextureEnum>;
  title: Scalars["String"]["input"];
  type: OrderTypeEnum;
  unPublishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  views?: InputMaybe<Scalars["Float"]["input"]>;
};

export type OrderListResult = {
  __typename?: "OrderListResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<Array<OrderWithFile>>;
};

export type OrderResult = {
  __typename?: "OrderResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<Order>;
};

export enum OrderStatusEnum {
  Created = "Created",
  Printing = "Printing",
  Shipped = "Shipped",
  Submitted = "Submitted",
}

export enum OrderTypeEnum {
  Offer = "Offer",
  Request = "Request",
}

export type OrderWithFile = {
  __typename?: "OrderWithFile";
  interactions: Array<Interaction>;
  order: Order;
  screenshot?: Maybe<FileDto>;
};

export enum PaymentTypeEnum {
  Cash = "Cash",
  Lydia = "Lydia",
  PayPal = "PayPal",
  Sepa = "SEPA",
}

export type Printer = {
  __typename?: "Printer";
  brand: Scalars["String"]["output"];
  id?: Maybe<Scalars["ID"]["output"]>;
  model: Scalars["String"]["output"];
  quantity: Scalars["Float"]["output"];
  speed: Scalars["Float"]["output"];
  volumeCapacity: Scalars["Float"]["output"];
};

export type PrinterInput = {
  brand: Scalars["String"]["input"];
  model: Scalars["String"]["input"];
  quantity: Scalars["Float"]["input"];
  speed: Scalars["Float"]["input"];
  volumeCapacity: Scalars["Float"]["input"];
};

export type PublishOrderResult = {
  __typename?: "PublishOrderResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<Scalars["Float"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  getCurrentUser: User;
  getFilamentById: Filament;
  getFile?: Maybe<UploadFileResult>;
  getInteractionById: Interaction;
  getOrderById: OrderResult;
  getPrinterById: Printer;
  getReactionById: Reaction;
  getTeamById: Team;
  getUserById: User;
  listInteractions: Array<Interaction>;
  myOrders: OrderListResult;
  orders: OrderListResult;
  views: ViewListResult;
};

export type QueryGetFilamentByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetFileArgs = {
  fileId: Scalars["String"]["input"];
};

export type QueryGetInteractionByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetOrderByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetPrinterByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetReactionByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetTeamByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetUserByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryListInteractionsArgs = {
  filter: ListInteractionInput;
};

export type Reaction = {
  __typename?: "Reaction";
  createdAt: Scalars["DateTime"]["output"];
  deletedAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  memberId: Scalars["ID"]["output"];
  modelId: Scalars["ID"]["output"];
  type: ReactionTypeEnum;
};

export type ReactionInput = {
  createdAt: Scalars["DateTime"]["input"];
  deletedAt: Scalars["DateTime"]["input"];
  id?: InputMaybe<Scalars["ID"]["input"]>;
  memberId: Scalars["ID"]["input"];
  modelId: Scalars["ID"]["input"];
  type: ReactionTypeEnum;
};

export enum ReactionTypeEnum {
  Crush = "CRUSH",
  Dislike = "DISLIKE",
  Favorite = "FAVORITE",
  Follow = "FOLLOW",
  Like = "LIKE",
}

export enum RoleEnum {
  Admin = "Admin",
  Printer = "Printer",
  User = "User",
}

export enum ServiceCategoryEnum {
  Cnc = "CNC",
  ModelingService = "ModelingService",
  Printer3D = "Printer3D",
  Scanner = "Scanner",
}

export type Team = {
  __typename?: "Team";
  id?: Maybe<Scalars["ID"]["output"]>;
  memberIds: Array<Scalars["ID"]["output"]>;
  teamName: Scalars["String"]["output"];
};

export type TeamInput = {
  memberIds: Array<Scalars["ID"]["input"]>;
  teamName: Scalars["String"]["input"];
};

export enum TextureEnum {
  Porous = "Porous",
  Rough = "Rough",
  Smooth = "Smooth",
}

export type UploadFile = {
  __typename?: "UploadFile";
  fileId: Scalars["String"]["output"];
  presignedUrl: Scalars["String"]["output"];
};

export type UploadFileResult = {
  __typename?: "UploadFileResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<UploadFile>;
};

export type User = {
  __typename?: "User";
  discoverReason?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastName: Scalars["String"]["output"];
  location?: Maybe<GpsCoordinate>;
  portFolioURL?: Maybe<Scalars["String"]["output"]>;
  printers?: Maybe<Array<Printer>>;
  profileInfo: Scalars["String"]["output"];
  profilePictureFileId?: Maybe<Scalars["String"]["output"]>;
  referrerUserName?: Maybe<Scalars["ID"]["output"]>;
  role: RoleEnum;
  socialMediaLinks: Array<Scalars["String"]["output"]>;
  subNewsletter: Scalars["Boolean"]["output"];
  username: Scalars["String"]["output"];
};

export type UserInput = {
  discoverReason?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  location: GpsCoordinateInput;
  password: Scalars["String"]["input"];
  portFolioURL?: InputMaybe<Scalars["String"]["input"]>;
  printers?: InputMaybe<Array<PrinterInput>>;
  profileInfo: Scalars["String"]["input"];
  profilePictureFileId?: InputMaybe<Scalars["String"]["input"]>;
  referrerUserName?: InputMaybe<Scalars["ID"]["input"]>;
  role: RoleEnum;
  socialMediaLinks: Array<Scalars["String"]["input"]>;
  subNewsletter?: Scalars["Boolean"]["input"];
  username: Scalars["String"]["input"];
};

export type UserResult = {
  __typename?: "UserResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<User>;
};

export type View = {
  __typename?: "View";
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  orderIds: Array<Scalars["ID"]["output"]>;
  subscriberIds: Array<Scalars["String"]["output"]>;
  tags: Array<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  upvoteScore: Scalars["Float"]["output"];
};

export type ViewInput = {
  orderIds: Array<Scalars["ID"]["input"]>;
  subscriberIds: Array<Scalars["String"]["input"]>;
  tags: Array<Scalars["String"]["input"]>;
  upvoteScore: Scalars["Float"]["input"];
};

export type ViewListResult = {
  __typename?: "ViewListResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<Array<View>>;
};

export type ViewResult = {
  __typename?: "ViewResult";
  reasons: Array<Scalars["String"]["output"]>;
  result?: Maybe<View>;
};
