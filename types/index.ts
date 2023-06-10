export * from './auth';
export * from './listings';
export * from './modal';
export * from './user';

/**
 * Normally, any API from BE might have a generic/common response body.
 * We can use this type to represent that. In this project, we don't have any.
 *
 * Example:
 * ```tsx
 * type APIGenericResponse<T> = Partial<{
 *   success: boolean;
 *   data: T;
 *   code: number;
 *   locale: string;
 *   message: string;
 *   show_alert: boolean;
 * }>
 * ```
 */
export type APIGenericResponse<T> = {};
