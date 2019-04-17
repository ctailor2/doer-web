interface FieldError {
    field: string;
    message: string;
}

export interface GlobalError {
    message: string;
}

export interface Errors {
    fieldErrors: FieldError[];
    globalErrors: GlobalError[];
}
