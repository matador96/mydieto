import dayjs from 'dayjs';

export default function timestampToNormalDate(ts) {
   return dayjs(ts).format('DD.MM.YYYY HH:MM');
}
