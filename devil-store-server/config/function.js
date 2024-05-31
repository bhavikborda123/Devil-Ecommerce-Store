// Helper functions

exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.validateEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

exports.validatePasswordError = function (password) {
  if (password.length < 8) {
    return "Password must be 8 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain an uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain a lowercase letter";
  }
  if (!/\d/.test(password)) {
    return "Password must contain one digit";
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Password must contain at least one special character";
  }
}