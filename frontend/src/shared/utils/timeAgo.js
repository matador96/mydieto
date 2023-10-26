import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(ru);
const timeAgo = new TimeAgo('ru-RU');

export const getTimeAgo = (time) => {
   return timeAgo.format(time);
};
