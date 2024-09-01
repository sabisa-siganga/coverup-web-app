function validate(idNumber: string): boolean {
  return (
    regexpValidate(idNumber) &&
    datePartValidate(idNumber) &&
    controlDigitValidate(idNumber)
  );
}

function regexpValidate(idNumber: string): boolean {
  const regexp = /^[0-9]{13}$/;
  return regexp.test(idNumber);
}

function datePartValidate(idNumber: string): boolean {
  return !!parseDateOfBirth(idNumber);
}

function controlDigitValidate(idNumber: string): boolean {
  const checkDigit = parseInt(idNumber[12], 10);
  let oddDigitsSum = 0;
  for (let i = 0; i < idNumber.length - 1; i += 2) {
    oddDigitsSum += parseInt(idNumber[i], 10);
  }
  let evenDigits = "";
  for (let j = 1; j < idNumber.length - 1; j += 2) {
    evenDigits += idNumber[j];
  }
  evenDigits = parseInt(evenDigits, 10) * 2 + "";
  let sumOfEvenDigits = 0;
  for (let k = 0; k < evenDigits.length; k++) {
    sumOfEvenDigits += parseInt(evenDigits[k], 10);
  }
  const total = sumOfEvenDigits + oddDigitsSum;
  let computedCheckDigit = 10 - (total % 10);
  if (computedCheckDigit === 10) {
    computedCheckDigit = 0;
  }
  return computedCheckDigit === checkDigit;
}

function parseDateOfBirth(idNumber: string): Date | undefined {
  if (!regexpValidate(idNumber)) {
    return undefined;
  }
  const currentYear = new Date().getFullYear();
  const currentCentury = Math.floor(currentYear / 100) * 100;
  let yearPart = currentCentury + parseInt(idNumber.substring(0, 2), 10);
  if (yearPart > currentYear) {
    yearPart -= 100; // must be last century
  }
  const monthPart = parseInt(idNumber.substring(2, 4), 10) - 1;
  const dayPart = parseInt(idNumber.substring(4, 6), 10);
  const dateOfBirth = new Date(yearPart, monthPart, dayPart);
  if (
    !dateOfBirth ||
    dateOfBirth.getFullYear() !== yearPart ||
    dateOfBirth.getMonth() !== monthPart ||
    dateOfBirth.getDate() !== dayPart
  ) {
    return undefined;
  }
  return dateOfBirth;
}

/**
 * Example usage:
 * saIdParser("98743543543535") -> { isValid: true }.
 * saIdParser("1234567")); -> { isValid: false, message: 'Invalid ID number' }
 */
export function saIdParser(idNumber: string) {
  if (!validate(idNumber)) {
    return "Invalid ID number";
  }

  return true;
}
