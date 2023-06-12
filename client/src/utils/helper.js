function getDay (day) {
  if (day === 1) return "st";
  else if (day === 2) return "nd";
  else if (day === 3) return "rd";
  else return "th";
}

function formatDate (date) {
  const newDate = new Date(date);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let formattedDate = `${newDate.getDate()}${getDay(newDate.getDate())} ` + monthNames[newDate.getMonth()] + `, ${newDate.getFullYear()}`
  return formattedDate;
}

function getDatesBetween (startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  const dates = [];

  while (start <= end) {
    dates.push((formatDate(start)));
    start.setDate(start.getDate() + 1);
  }

  return dates;
}

function futureDate (startDate) {
  const now = new Date()
  const inputStartDate = new Date(startDate);
  const inputEndDate = new Date(startDate);
  if (inputStartDate < now || inputEndDate < now) return alert('You have to choose a future date.');
}


function firstLetterUpperCase (text) {
  const arr = text.split('');
  arr[0] = arr[0].toUpperCase();
  return arr.join('');
}


module.exports = { getDay, formatDate, getDatesBetween, futureDate, firstLetterUpperCase }