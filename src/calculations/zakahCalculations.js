import Moment from 'moment';

let dateArray = [];
let zakahDictionary = {};

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

const CalculateZakah = (certificate) => {
  console.log('I am', certificate);
  let { duration, interestAmount, amount, date } = certificate;

  let dateAsArray;
  let dateAsString;

  date = parseDate(date);

  switch (duration) {
    case 'سنة':
      [dateAsArray, dateAsString] = addMonthsUpToYear(date, 12);
      dateArray.push(dateAsString);
      zakahDictionary[dateAsString] =
      ((amount + amount * (interestAmount / 100)) * (2.5 / 100)).toFixed(2);
      break;
    case 'سنة ونصف':
      [dateAsArray, dateAsString] = addMonthsUpToYear(date, 12);
      dateArray.push(dateAsString);
      zakahDictionary[dateAsString] =
      ((amount + amount * (interestAmount / 100)) * (2.5 / 100)).toFixed(2);
      [dateAsArray, dateAsString] = addMonthsUpToYear(dateAsArray, 6);

      break;
    case 'ثلاث سنوات':
      for (let i = 0; i < 3; i++) {
        [dateAsArray, dateAsString] = addMonthsUpToYear(date, 12);
        date=dateAsArray;
        dateArray.push(dateAsString);
        zakahDictionary[dateAsString] =
        ((amount + amount * (interestAmount / 100)) * (2.5 / 100)).toFixed(2);
    }
      break;
    case 'خمس سنوات':
      for (let i = 0; i < 5; i++) {
        [dateAsArray, dateAsString] = addMonthsUpToYear(date, 12);
        date=dateAsArray;
        dateArray.push(dateAsString);
        zakahDictionary[dateAsString] =
          ((amount + amount * (interestAmount / 100)) * (2.5 / 100)).toFixed(2);
      }
      break;

    default:
      break;
  }


  const sortedDateArray = dateArray.sort(
    (a, b) =>
      new Moment(a).format('YYYYMMDD') - new Moment(b).format('YYYYMMDD')
  );

  return { sortedDateArray, zakahDictionary };
};

export default CalculateZakah;
