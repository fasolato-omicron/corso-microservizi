class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

exports.NotFoundError = NotFoundError;
exports.BadRequestError = BadRequestError;
exports.InternalError = InternalError;
