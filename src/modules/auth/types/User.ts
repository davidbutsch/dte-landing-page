import { AuthUser, FetchUserAttributesOutput } from "@aws-amplify/auth";

export type User = AuthUser & { attributes: FetchUserAttributesOutput };
