export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^_])[A-Za-z\d@$!%^_]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name) => {
  // Check if the name contains only letters, spaces, and underscores
  const nameRegex = /^[a-zA-Z_\s]+$/;

  // Check if the name is at least 3 characters long
  const isNameValid = nameRegex.test(name) && name.length >= 3;

  return isNameValid;
};

export const validateAddress = (address) => {
  // Check if the address is at least 5 characters long
  const isAddressValid = address.length >= 5;

  return isAddressValid;
};

export const validateState = (state) => {
  // Check if the state is at least 3 characters long
  const isStateValid = state.length >= 3;

  return isStateValid;
};

export const validateCity = (city) => {
  // Check if the city is at least 3 characters long
  const isCityValid = city.length >= 3;

  return isCityValid;
};

export const validateStatus = (status) => {
  // Check if the status is at least 3 characters long
  const isStatusValid = status.length >= 3;

  return isStatusValid;
};

export const validateZipcode = (zipcode) => {
  // Check if the zipcode contains only digits and is at least 4 characters long
  const isZipcodeValid = /^\d{4,}$/.test(zipcode);

  return isZipcodeValid;
};

export const validatePhoneNumber = (phoneNumber) => {
  // Check if the phone number contains only digits and has a length between 8 and 15
  const isPhoneNumberValid = /^\d{8,15}$/.test(phoneNumber);

  return isPhoneNumberValid;
};

export const emailRegex = /^\S+@\S+\.\S+$/;
