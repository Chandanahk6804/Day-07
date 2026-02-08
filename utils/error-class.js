class CustomError extends Error {
    constructor(status, name = "CustomError", message) {
        super(message)
        this.status = status,
        this.name = name
    }
}

module.exports = CustomError;