export function success(res, data = {}, message = "success") {
  sendResponse(res, 200, true, message, data);
}

export function created(res, data = {}, message = "Created Successfully") {
  sendResponse(res, 201, true, message, data);
}

export function updated(res, data = {}, message = "Updated Successfully") {
  sendResponse(res, 200, true, message, data);
}

export function deleted(res, data = {}, message = "Deleted Successfully") {
  sendResponse(res, 200, true, message, data);
}

export function notFound(res, data = {}, message = "Not Found") {
  sendResponse(res, 404, false, message, data);
}

export function badRequest(res, data = {}, message = "Bad Request") {
  sendResponse(res, 400, false, message, data);
}

export function internalServerError(
  res,
  data = {},
  message = "Internal Server Error",
) {
  sendResponse(res, 500, false, message, data);
}

export function customError(
  res,
  statusCode = 500,
  data = {},
  message = "Error",
) {
  sendResponse(res, statusCode, false, message, data);
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
