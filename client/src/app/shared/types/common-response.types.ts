type CommonResponseBody = {
    statusCode: number;
};

export type EmptyResponseBody = CommonResponseBody;

export type SuccessResponseBody<T> = CommonResponseBody & {
    data?: T
}

export type ErrorResponseBody = CommonResponseBody & {
    error: {
        type: string;
        description?: string;
    }
};
