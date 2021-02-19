export default class RequestError extends Error {
    constructor(data, httpCode) {
        super(data.message);
        this.httpCode = httpCode;
        this.data = data;
    }
}
