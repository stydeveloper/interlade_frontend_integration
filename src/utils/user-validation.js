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

  // Check if the address contains at least one alphabet/character
  const containsAlphabet = /[a-zA-Z]/.test(address);

  // Combine both validation criteria
  const isValid = isAddressValid && containsAlphabet;

  return isValid;
};

export const validateState = (state) => {
  // Check if the state contains only letters or spaces and is at least 3 characters long
  const isStateValid = /^[a-zA-Z\s]{3,}$/.test(state.trim());

  return isStateValid;
};

export const validateCity = (city) => {
  // Check if the city contains only letters or spaces and is at least 3 characters long
  const isCityValid = /^[a-zA-Z\s]{3,}$/.test(city.trim());

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
  // Check if the phone number contains exactly 10 digits
  const isPhoneNumberValid = /^\d{10}$/.test(phoneNumber);

  return isPhoneNumberValid;
};

export const emailRegex = /^\S+@\S+\.\S+$/;

export const getCookie = (name) => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null; // Return null if cookie with the given name is not found
};
