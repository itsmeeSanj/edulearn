exports.successMessage = (msg) => {
  return { type: "success", text: msg };
};

exports.errorMessage = (msg) => {
  return { type: "error", text: msg };
};
