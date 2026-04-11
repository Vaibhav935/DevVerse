const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log("Error in async handler -> ", err);
    });
  };
};

export default asyncHandler;
