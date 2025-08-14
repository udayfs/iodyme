/**
 * An array of public routes that are accessible to unauthenticated users also.
 * @type {string[]}
 */
export const PublicRoutes = ["/"];

/**
 * An array of public routes that are used for user authentication.
 * @type {string[]}
 */
export const AuthRoutes = ["/auth/sign-in", "/auth/sign-up"];

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const ApiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successfull sign-in request.
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/dashboard";
