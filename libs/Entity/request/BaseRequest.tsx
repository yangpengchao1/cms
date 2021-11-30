export abstract class BaseRequest {
    public abstract getRequestData(): string;

    abstract requestURL(): string;

    abstract needToken(): boolean;
}