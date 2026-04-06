import { internalServerError } from "./response.utils.js";

const errorMiddleware = (err, req, res, next) => {
  return internalServerError(res, err.message || err.stack);
};

export default errorMiddleware;
