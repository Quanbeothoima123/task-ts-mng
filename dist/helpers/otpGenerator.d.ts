declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EMAIL_USER: string;
            EMAIL_PASSWORD: string;
        }
    }
}
export declare const generateAndSendOtp: (userId: string, subject: string, email?: string) => Promise<void>;
