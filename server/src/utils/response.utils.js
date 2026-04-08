export function success(res, data = {}, message = "success") {
  sendResponse(res, 200, true, message, data);
}

export function created(
  res,
  data = {},
  message = "Created Successfully",
  error = null,
) {
  sendResponse(res, 201, true, message, data, error);
}

export function updated(
  res,
  data = {},
  message = "Updated Successfully",
  error = null,
) {
  sendResponse(res, 200, true, message, data, error);
}

export function deleted(
  res,
  data = {},
  message = "Deleted Successfully",
  error = null,
) {
  sendResponse(res, 200, true, message, data, error);
}

export function notFound(res, data = {}, message = "Not Found", error = null) {
  sendResponse(res, 404, false, message, data, error);
}

export function badRequest(
  res,
  data = {},
  message = "Bad Request",
  error = null,
) {
  sendResponse(res, 400, false, message, data, error);
}

export function internalServerError(
  res,
  data = {},
  message = "Internal Server Error",
  error = null,
) {
  sendResponse(res, 500, false, message, data, error);
}

export function customError(
  res,
  statusCode = 500,
  data = {},
  message = "Error",
  error = null,
) {
  sendResponse(res, statusCode, false, message, data, error);
}

function sendResponse(
  res,
  statusCode,
  success,
  message,
  data = {},
  error = null,
) {
  res.status(statusCode).json({ statusCode, success, message, data, error });
}
