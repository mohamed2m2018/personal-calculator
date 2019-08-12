import Moment from 'moment';

let dateArray = [];
let interestDictionary = {};
let bankNameDictionary = {};
let interestAmountDictionary = {};
let amountDictionary = {};
let valueDividedBy = 1;

const addMonthsUpToYear = (date, monthsToAdd) => {
  let [year, month, day] = date;
  month = month + monthsToAdd;
  if (month > 12) {
    month = month % 12;
    year++;
  }

  return [[year, month, day], `${year}-${month}-${day}`];
};

const parseDate = (date) => {
  let year = date.substring(0, 4);
  let month = date.substring(5, 7);
  let day = date.substring(8, 10);

  return [Number(year), Number(month), Number(day)];
};

 const calculateInterests = (certificate) => {
  let {
    bankName,
    interestDuration,
    duration,
    interestAmount,
    amount,
    date,
  } = certificate;

  const performCalculation = () => {
    let [dateAsArray, dateAsString] = addMonthsUpToYear(date, monthsToAdd);
    date = dateAsArray;
    dateArray.push(dateAsString);
    interestDictionary[dateAsString] = (
      (amount * (interestAmount / 100)) /
      valueDividedBy
    ).toFixed(2);
    bankNameDictionary[dateAsString] = bankName;
    interestAmountDictionary[dateAsString] = interestAmount;
    amountDictionary[dateAsString] = amount;
  };

  let monthsToAdd = 0;

  date = parseDate(date);

  switch (interestDuration) {
    case 'شهرى':
      monthsToAdd = 1;
      valueDividedBy = 12;
      break;
    case 'ربع سنوى':
      monthsToAdd = 3;
      valueDividedBy = 4;
      break;
    case 'نصف سنوى':
      monthsToAdd = 6;
      valueDividedBy = 2;
      break;
    case 'سنوى':
      monthsToAdd = 12;
      valueDividedBy = 1;
      break;

    default:
      break;
  }

  //to calculate interest every duration

  switch (duration) {
    case 'سنة':
      for (let i = 0; i < 12; i = i + monthsToAdd) {
        performCalculation();
      }

      break;
    case 'سنة ونصف':
      for (let i = 0; i < 18; i = i + monthsToAdd) {
        if (i >= 12) {
          monthsToAdd = 6;
        }
        performCalculation();
      }
      break;
    case 'ثلاث سنوات':
      for (let i = 0; i < 36; i = i + monthsToAdd) {
        performCalculation();
      }
      break;
    case 'خمس سنوات':
      for (let i = 0; i < 60; i = i + monthsToAdd) {
        performCalculation();
      }
      break;

    default:
      break;
  }

  const sortedDateArray = dateArray.sort(
    (a, b) =>
      new Moment(a).format('YYYYMMDD') - new Moment(b).format('YYYYMMDD')
  );

  return {
    sortedDateArray,
    interestDictionary,
    bankNameDictionary,
    interestAmountDictionary,
    amountDictionary,
  };
};

export default calculateInterests;
