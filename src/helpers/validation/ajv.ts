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

// Small helper to reduce boilerplate when adding simple validators with a static error message
function addKeywordWithMessage(
  keyword: string,
  validate: (schema: unknown, data: unknown) => boolean,
  message: string,
) {
  ajv.addKeyword({
    keyword,
    validate,
    error: { message },
  });
}

enum CitizenTypes {
  us_citizen = 'U.S. Citizen',
  us_resident = 'U.S. Resident',
  us_non_resident = 'Non Resident'
}

addKeywordWithMessage(
  NOT_EMPTY_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => (
    data !== null
    && data !== undefined
    && (typeof data === 'string')
    && (data.trim() !== '')
  ),
  REQUIRED_ERROR_MESSAGE,
);

addKeywordWithMessage(
  MUST_BE_CITIZEN_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => (
    data === CitizenTypes.us_citizen || data === CitizenTypes.us_resident
  ),
  MUST_BE_CITIZEN_ERROR_MESSAGE,
);

addKeywordWithMessage(
  MUST_BE_US_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => {
    const value = (data as any);
    const candidate = String((value && typeof value === 'object' && 'code' in value) ? value.code : value).toLowerCase();
    return candidate === 'us';
  },
  MUST_BE_US_ERROR_MESSAGE,
);

addKeywordWithMessage(
  CHECKBOX_TRUE_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => data === true,
  CHECKBOX_TRUE_ERROR_MESSAGE,
);

addKeywordWithMessage(
  NOT_ZERO_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => (
    _schema ? (typeof data === 'number' && data > 0) : true
  ),
  NOT_ZERO_ERROR_MESSAGE,
);

const ONLY_LETTERS_REGEX = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
addKeywordWithMessage(
  ONLY_LETTERS_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => (
    typeof data === 'string' && ONLY_LETTERS_REGEX.test(data)
  ),
  ONLY_LETTERS_ERROR_MESSAGE,
);

const ZIP_REGEX = /^\d{5}(-\d{4})?$/;
addKeywordWithMessage(
  ZIP_REGEX_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => {
    if (typeof data !== 'string' || data.length < 5) return true;
    return ZIP_REGEX.test(data);
  },
  ZIP_REGEX_ERROR_MESSAGE,
);

addKeywordWithMessage(
  UNDER_AGE_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => {
    const birthDate = new Date(data as any);
    if (Number.isNaN(birthDate.getTime())) return true;
    if (birthDate.getTime() > Date.now()) return true;
    const eighteen = new Date(
      birthDate.getFullYear() + 18,
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    return eighteen <= new Date();
  },
  UNDER_AGE_ERROR_MESSAGE,
);

addKeywordWithMessage(
  FUTURE_DATE_VALIDATOR_NAME,
  (_schema: unknown, data: unknown) => {
    const inputDate = new Date(data as any);
    if (Number.isNaN(inputDate.getTime())) return true;
    return inputDate < new Date();
  },
  FUTURE_DATE_ERROR_MESSAGE,
);

// add dummy to remove error
ajv.addKeyword({
  keyword: ENUM_NAMES_VALIDATOR_NAME,
});

export {
  ajv,
};
