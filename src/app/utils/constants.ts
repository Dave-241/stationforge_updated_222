export const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const allYears = (() => {
  let currentYear = new Date().getFullYear();

  let arr = [];
  for (let i = 2018; i <= currentYear; i++) {
    arr.push(i);
  } 
  return arr;
})();
