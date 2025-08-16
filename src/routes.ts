/**
 * An array of public routes that are accessible to unauthenticated users also.
 */
export const PublicRoutes: string[] = ["/"];

/**
 * An array of public routes that are used for user authentication.
 */
export const AuthRoutes: string[] = ["/auth/sign-in", "/auth/sign-up"];

/**
 * The prefix for API authentication routes.
 */
export const ApiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after a successfull sign-in request.
 */
export const DEFAULT_SIGNIN_REDIRECT: string = "/dashboard";
