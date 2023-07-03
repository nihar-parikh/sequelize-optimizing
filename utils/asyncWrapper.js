exports.asyncWrapper = (asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next).catch((error) => next(error));
  };
};
