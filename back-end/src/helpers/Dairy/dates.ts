export const isToday = (dateString:string) => {
  const today = new Date();
  const gettingDate = new Date(Date.parse(dateString));
  return today.getFullYear() === gettingDate.getFullYear()
      && today.getMonth() === gettingDate.getMonth()
      && today.getDate() === gettingDate.getDate();
};

export const getDateOnly = (dateString:string) => dateString.slice(0, dateString.indexOf('T'));
