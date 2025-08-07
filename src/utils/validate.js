const validator = require('validator');

const validateRegisterInput = ({ firstName, lastName, email, password }) => {
  const errors = {};

  if (!firstName || firstName.trim() === '') {
    errors.firstName = 'First name is required';
  } else if (firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!lastName || lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  } else if (lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!email || !validator.isEmail(email)) {
    errors.email = 'Valid email is required';
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validateLoginInput = ({ email, password }) => {
  const errors = {};

  if (!email || !validator.isEmail(email)) {
    errors.email = 'Valid email is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = {
  validateRegisterInput,
  validateLoginInput
};
