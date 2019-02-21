interface FieldError {
    field: string;
    message: string;
}

interface GlobalError {
    message: string;
}

export interface Errors {
    fieldErrors: FieldError[];
    glboalErrors: GlobalError[];
}
