import CryptoJS from "crypto-js";

// Encryption function
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), "secret-key").toString();
};

// Decryption function
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, "secret-key");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
