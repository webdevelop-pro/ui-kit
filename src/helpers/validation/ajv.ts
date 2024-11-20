import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import {
  MUST_BE_CITIZEN_ERROR_MESSAGE, MUST_BE_CITIZEN_VALIDATOR_NAME, NOT_EMPTY_VALIDATOR_NAME,
  REQUIRED_ERROR_MESSAGE, ENUM_NAMES_VALIDATOR_NAME, ONLY_LETTERS_VALIDATOR_NAME,
  ONLY_LETTERS_ERROR_MESSAGE, UNDER_AGE_VALIDATOR_NAME, UNDER_AGE_ERROR_MESSAGE,
  FUTURE_DATE_ERROR_MESSAGE, FUTURE_DATE_VALIDATOR_NAME, ZIP_REGEX_VALIDATOR_NAME,
  ZIP_REGEX_ERROR_MESSAGE, CHECKBOX_TRUE_VALIDATOR_NAME, CHECKBOX_TRUE_ERROR_MESSAGE,
  NOT_ZERO_VALIDATOR_NAME, NOT_ZERO_ERROR_MESSAGE, MUST_BE_US_VALIDATOR_NAME, MUST_BE_US_ERROR_MESSAGE,
} from './constants';

const ajv = new Ajv({ allErrors: true, allowMatchingProperties: true, $data: true });

ajvErrors(ajv);
addFormats(ajv, ['date', 'time', 'float', 'email']);


enum CitizenTypes {
  us_citizen = 'U.S. Citizen',
  us_resident = 'U.S. Resident',
  us_non_resident = 'Non Resident'
}

ajv.addKeyword({
  keyword: NOT_EMPTY_VALIDATOR_NAME,
  validate: (_schema: unknown, data: unknown) => (
    data !== null
    && data !== undefined
    && ((typeof data === 'string') && (data.trim() !== ''))
  ),
  error: {
    message: REQUIRED_ERROR_MESSAGE,
  },
});

ajv.addKeyword({
  keyword: MUST_BE_CITIZEN_VALIDATOR_NAME,
  validate: (_schema: unknown, data: unknown) => (
    data === CitizenTypes.us_citizen || data === CitizenTypes.us_resident
  ),
  error: {
    message: MUST_BE_CITIZEN_ERROR_MESSAGE,
  },
});

ajv.addKeyword({
  keyword: MUST_BE_US_VALIDATOR_NAME,
  validate: (_schema: unknown, data: unknown) => (
    (String(data).toLowerCase() === 'us') || (String(data?.code).toLowerCase() === 'us')
  ),
  error: {
    message: MUST_BE_US_ERROR_MESSAGE,
  },
});

ajv.addKeyword({
  keyword: CHECKBOX_TRUE_VALIDATOR_NAME,
  validate: (_schema: unknown, data: unknown) => (
    data === true
  ),
  error: {
    message: CHECKBOX_TRUE_ERROR_MESSAGE,
  },
});

ajv.addKeyword({
  keyword: NOT_ZERO_VALIDATOR_NAME,
  validate: (_schema: unknown, data: number) => (
    _schema ? data > 0 : true
  ),
  error: {
    message: NOT_ZERO_ERROR_MESSAGE,
  },
});

ajv.addKeyword({
  keyword: ONLY_LETTERS_VALIDATOR_NAME,
  validate: (_schema: unknown, data: unknown) => {
    const pattern = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/; // Modified regex
    return pattern.test(data);
  },
  error: {
    message: ONLY_LETTERS_ERROR_MESSAGE,
  },
});

ajv.addKeyword({
  keyword: ZIP_REGEX_VALIDATOR_NAME,
  validate: (_schema: unknown, data: unknown) => {
    // Updated regex pattern to support xxxxx-xxxx format
    const pattern = /^\d{5}(-\d{4})?$/;
    if (typeof data !== 'string' || data.length < 5) {
      return true; // Return true if not a string or length is less than 5
    }
    return pattern.test(data);
  },
  error: {
    message: ZIP_REGEX_ERROR_MESSAGE,
  },
});


// Custom keyword definition
ajv.addKeyword({
  keyword: UNDER_AGE_VALIDATOR_NAME,
  // This function is called during validation
  validate: (_schema: unknown, data: unknown) => {
    // Convert the date string to a Date object
    const birthDate = new Date(data);
    // Check if the birthDate is in the future
    if (birthDate.getTime() > new Date().getTime()) {
      // If the birth date is in the future, return true (valid)
      return true;
    }
    // Calculate the age
    const ageInMilliseconds = Date.now() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears > 18;
  },
  error: {
    message: UNDER_AGE_ERROR_MESSAGE,
  },
});

// Custom keyword definition
ajv.addKeyword({
  keyword: FUTURE_DATE_VALIDATOR_NAME,
  // This function is called during validation
  validate: (_schema: unknown, data: unknown) => {
    // Convert the date string to a Date object
    const currentDate = new Date();
    const inputDate = new Date(data);
    return inputDate < currentDate;
  },
  error: {
    message: FUTURE_DATE_ERROR_MESSAGE,
  },
});

// add dummy to remove error
ajv.addKeyword({
  keyword: ENUM_NAMES_VALIDATOR_NAME,
});

export {
  ajv,
};
