interface EmailValidationOptions {
    required?: boolean;
    mustExist?: boolean;
    mustNotExist?: boolean;
}
export declare const validateEmail: (email: string | undefined, options?: EmailValidationOptions) => Promise<string | null>;
export {};
