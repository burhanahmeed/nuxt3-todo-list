import * as dayjs from 'dayjs';

export function dateFormat(date: string) {
  return dayjs(date).format('DD MMMM YYYY');
}