import { Amplify } from "aws-amplify";

import { env } from "@/common";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: env.USER_POOL_ID,
      userPoolClientId: env.USER_POOL_CLIENT_ID,
      identityPoolId: env.IDENTITY_POOL_ID,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: false, // Do not require special characters
      },
    },
  },
});
