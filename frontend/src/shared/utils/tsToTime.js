import dayjs from 'dayjs';

function timestampToNormalDate(ts) {
   return dayjs(ts).format('DD.MM.YYYY HH:mm');
}

function timestampToNormalTime(ts) {
   return dayjs(ts).format('HH:mm');
}

function timestampToNormalDDMMYY(ts) {
   return dayjs(ts).format('DD.MM.YYYY');
}

export { timestampToNormalTime, timestampToNormalDate, timestampToNormalDDMMYY };
