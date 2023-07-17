const { encryptData } = require("./encryptDecrypt");

exports.encryptedResponse = ({ res, statusCode, data, key, iv }) => {
  const encryptedResponse = encryptData(
    {
      status: "success",
      data,
    },
    key,
    iv
  );

  res.status(statusCode).json(encryptedResponse);
};
