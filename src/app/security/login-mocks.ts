//login-mocks.ts
//using for client side authentication/authorization w/o an api

import { AppUserAuth } from  "./app-user-auth";

export const LOGIN_MOCKS: AppUserAuth [] = [
    { 
        userName: "Baker",
        bearerToken: "abc123456",
        isAuthenticated: true,

        canAccessProducts:  true,
        canAddProduct:      true,
        canSaveProduct:     true,

        canAccessCategories:   true,
        canAddCategory:        false

    },

    { 
        userName: "Test",
        bearerToken: "dssg4353abc123456",
        isAuthenticated: true,

        canAccessProducts:  false,
        canAddProduct:      false,
        canSaveProduct:     false,

        canAccessCategories:   true,
        canAddCategory:        true

    }
]