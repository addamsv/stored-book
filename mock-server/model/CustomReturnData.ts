const CustomReturnData = (message, data) => ({
  isSuccess: true,
  statusCode: 200,
  message,
  data
});

module.exports = CustomReturnData;
