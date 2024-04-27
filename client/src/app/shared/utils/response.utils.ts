import { ErrorResponseBody } from '../types/common-response.types';

export function isSuccessResponse<T>(body?: unknown | null): body is T {
    return !!body &&
        typeof body === 'object' &&
        'data' in body &&
        !!body.data &&
        typeof body.data === 'object';
}

export function isErrorResponse(body?: unknown | null): body is ErrorResponseBody {
    return !!body &&
        typeof body === 'object' &&
        'error' in body && !!body.error &&
        typeof body.error === 'object' &&
        'type' in body.error &&
        !!body.error.type &&
        typeof body.error.type === 'string';
}
