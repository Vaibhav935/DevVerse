const asyncHandler = (fn) => {
  return () => {
    Promise.resolve(fn()).catch((err) => {
      throw new Error(err)
    });
  };
};

export default asyncHandler;
