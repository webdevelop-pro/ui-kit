export function currencify(value, minFraction) {
  if (!value) {
    return '0';
  }
  const params = { maximumFractionDigits: 2 };
  if (minFraction !== false && (value % 1)) {
    params.minimumFractionDigits = 2;
  }
  return Number(value).toLocaleString('en-US', params);
}

/**
 * rounding a number
 * @param num
 * @param decimalPlaces {number} - amount of decimal
 * @returns {number}
 */
export function numberRound(num, decimalPlaces) {
  const d = decimalPlaces || 0;
  const m = 10 ** d;
  const n = +(d ? num * m : num).toFixed(8);
  const i = Math.floor(n);
  const f = n - i;
  const e = 1e-8;
  const ter = (i % 2 === 0) ? i : i + 1;
  const r = (f > 0.5 - e && f < 0.5 + e) ? ter : Math.round(n);
  return d ? r / m : r;
}

export function getRandomNumber(min, max, step) {
  let number = Math.random() * (max - min) + min;
  if (step) {
    number -= (number % step);
  }
  return number;
}

/**
 * rounding a number with a negative value and symbol after minus's
 * @param value
 * @param decimalPlaces {number} - amount of decimal
 * @param symbol {string}
 * @returns {symbol number} or -{symbol number}
 */
export function currencyWithSymbol(value, decimalPlaces, symbol) {
  const currency = currencify(numberRound(value, decimalPlaces));
  if (value < 0) {
    const withoutMinus = currency.replace('-', '');
    return `-${symbol}${withoutMinus}`;
  }
  return `${symbol}${currency}`;
}

export function getCurrencyHumanizedSymbol(value) {
  if (value >= 1e3 && value < 1e6) return 'K';
  if (value >= 1e6 && value < 1e9) return 'M';
  if (value >= 1e9 && value < 1e12) return 'B';
  if (value >= 1e12) return 'T';
  return '';
}

export function getCurrencyHumanizedValue(value, decimalPlaces) {
  const d = decimalPlaces || 1;
  if (value >= 1e3 && value < 1e6) return parseFloat((Math.abs(value) / 1000).toFixed(d));
  if (value >= 1e6 && value < 1e9) return parseFloat((Math.abs(value) / 1e6).toFixed(d));
  if (value >= 1e9 && value < 1e12) return parseFloat((Math.abs(value) / 1e9).toFixed(d));
  return value;
}

export function getCurrencyHumanized(value, decimalPlaces = 1) {
  return getCurrencyHumanizedValue(value, decimalPlaces) + getCurrencyHumanizedSymbol(value);
}
