// Units validation
// Units validation
export const validateUnits = (units) => {
  const unitsRegex = /^\d+$/;
  return unitsRegex.test(units);
};

// Volume validation
export const validateVolume = (volume) => {
  const volumeRegex = /^\d+(\.\d{1,2})?$/;
  return volumeRegex.test(volume);
};

// Weight validation
export const validateWeight = (weight) => {
  const weightRegex = /^\d+(\.\d{1,2})?$/;
  return weightRegex.test(weight);
};

// Package Type, Hazardous Class, Packaging Group validation
export const validateString = (value) => {
  const stringLength = value.length;
  return stringLength >= 3 && stringLength <= 15;
};

export const validateUnNaNumber = (unNaNumber) => {
  const unNaNumberRegex = /^\d{4,6}$/;
  return unNaNumberRegex.test(unNaNumber);
};
