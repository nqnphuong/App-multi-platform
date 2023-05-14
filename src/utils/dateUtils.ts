import moment from 'moment';

const dateStringToFromNow = (dateString: string) => {
  if (dateString) {
    const dateParts = dateString.split(' ');
    const [day, month, year] = dateParts[0].split('/');
    const [hour, minute, second] = dateParts[1].split(':');
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    );

    return moment(date).fromNow();
  }
  return '2 hours ago';
};

export {dateStringToFromNow};
