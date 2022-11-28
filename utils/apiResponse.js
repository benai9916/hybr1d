exports.success = (message, statuCode, data) => {
  return {
    message: message,
    error: false,
    code: statuCode,
    data: data,
  };
};

exports.error = (message, statusCode) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message: message,
    error: true,
    code: statusCode,
  };
};
