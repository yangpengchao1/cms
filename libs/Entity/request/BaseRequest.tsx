export abstract class BaseRequest {
    public abstract convertToJsonString(): string;

    abstract requestURL(): string;

    abstract needToken(): boolean;
}