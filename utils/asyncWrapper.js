exports.asyncWrapper = (asyncFunction) => {
  return (req, res, next) => {
    console.log("asyncWrapper");
    asyncFunction(req, res, next).catch((error) => next(error));
  };
};
