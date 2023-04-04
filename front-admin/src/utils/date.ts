export function dateToAgo(date: Date | string) {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  // date is in UTC, so we need to convert it to local time
  date = new Date(date)
  date.setTime(date.getTime() - offset);

  // format with xx s/min/h/day ago
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  let diffStr = '';
  if (diff < 1) {
    diffStr = 'now';
  } else if (diff < 60) {
    diffStr = `${diff} s ago`;
  } else if (diff < 3600) {
    diffStr = `${Math.floor(diff / 60)} min ago`;
  } else if (diff < 86400) {
    diffStr = `${Math.floor(diff / 3600)} h ago`;
  } else {
    diffStr = `${Math.floor(diff / 86400)} day ago`;
  }
  return diffStr;
}

export function formatDate(date: Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}