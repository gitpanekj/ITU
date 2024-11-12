class HttpError extends Error {
    statusCode: number;
    statusText: string;

    constructor(statusCode: number, statusText: string, message: string) {
        super(message);
        this.name = "HttpError";
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}