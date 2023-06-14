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

function futureDate (date) {
  const now = new Date()
  const inputStartDate = new Date(date);
  if (inputStartDate < now) return true;
}

function counterDate (date) {
  const now = new Date()
  const inputStartDate = new Date(date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
  const diffTime = inputStartDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 3600 * 24));
  return daysLeft;
}

function firstLetterUpperCase (text) {
  const arr = text.split('');
  arr[0] = arr[0].toUpperCase();
  return arr.join('');
}

function scrollToTop () {
  window.scrollTo(0, 0);
}

function scrollToBottom () {
  window.scrollTo(0, document.body.scrollHeight);
}


module.exports = { getDay, formatDate, getDatesBetween, futureDate, firstLetterUpperCase, scrollToTop, scrollToBottom, counterDate };