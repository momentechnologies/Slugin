module.exports = class HandledError extends Error {
    constructor(message) {
        super(message);
    }

    getStatus() {
        return this.status;
    }

    getBody() {
        throw new Error('implement getBody function');
    }
};
