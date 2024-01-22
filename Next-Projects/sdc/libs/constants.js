const batchNames = [
  "Cornea",
  "Locus",
  "Verity",
  "Brillo",
  "Inforia",
  "Sinforia",
  "Euphoria",
];
const monthNames = [
  "Jan",
  "Febr",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const calculateTotalBookCount = (rentalsData) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const totalBooksByMonth = {};

  const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

  allMonths.forEach((month) => {
    totalBooksByMonth[month] = 0;
  });

  rentalsData?.forEach((rental) => {
    const rentedDate = new Date(rental.rentedDate);
    const year = rentedDate.getFullYear();
    const month = rentedDate.getMonth() + 1;

    if (year === currentYear) {
      totalBooksByMonth[month] += 1;
    }
  });

  return totalBooksByMonth;
};
const calculateTopReader = (rentalsData) => {
  const topReaders = {};

  rentalsData?.forEach((rental) => {
    const rentedDate = new Date(rental.rentedDate);
    const monthYearKey = `${
      rentedDate.getMonth() + 1
    }-${rentedDate.getFullYear()}`;

    topReaders[monthYearKey] = topReaders[monthYearKey] || {};
    topReaders[monthYearKey][rental.studentName] =
      (topReaders[monthYearKey][rental.studentName] || 0) + 1;
  });

  const sortedResult = Object.entries(topReaders)
    .sort(([aKey], [bKey]) => {
      const [aMonth, aYear] = aKey.split("-");
      const [bMonth, bYear] = bKey.split("-");

      // First, compare years
      const yearComparison = bYear - aYear;
      if (yearComparison !== 0) {
        return yearComparison;
      }

      // If years are equal, compare months
      return bMonth - aMonth;
    })
    .reduce((sortedObj, [key, value]) => {
      sortedObj[key] = value;
      return sortedObj;
    }, {});

  const topReadersByMonth = {};

  Object.entries(sortedResult).forEach(([monthYearKey, monthData]) => {
    const monthTopReader = Object.entries(monthData).reduce(
      (maxReader, [studentName, bookCount]) =>
        bookCount > (maxReader?.bookCount || 0)
          ? { studentName, bookCount }
          : maxReader,
      null
    );

    topReadersByMonth[monthYearKey] = monthTopReader;
  });

  return topReadersByMonth;
};

const calculateAnnualReaders = (totalBooksByMonth) => {
  const totalReaders = Object.values(totalBooksByMonth).reduce(
    (sum, count) => sum + count,
    0
  );

  return totalReaders;
};
export {
  batchNames,
  monthNames,
  calculateTotalBookCount,
  calculateTopReader,
  calculateAnnualReaders,
};
