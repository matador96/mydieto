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

function declineWord(amount, word) {
   const cases = [2, 0, 1, 1, 1, 2];
   const index =
      amount % 100 > 4 && amount % 100 < 20 ? 2 : cases[Math.min(amount % 10, 5)];
   const words = {
      неделя: ['неделя', 'недели', 'недель'],
      час: ['час', 'часа', 'часов'],
      день: ['день', 'дня', 'дней']
   };
   return words[word][index];
}

function getDurationInDaysOrWeeks(hours) {
   const hoursInDay = 8;
   const daysLeft = Math.floor(hours / hoursInDay);
   const weeksLeft = Math.floor(daysLeft / 7);
   const remainingDays = daysLeft % 7;

   if (hours < hoursInDay) {
      return `${hours} ${declineWord(hours, 'час')}`;
   }

   if (weeksLeft === 0) {
      return `${daysLeft} ${declineWord(daysLeft, 'день')}`;
   }
   if (remainingDays > 0) {
      return `${weeksLeft + 1} ${declineWord(weeksLeft, 'неделя')}`;
   }

   return `${weeksLeft} ${declineWord(weeksLeft, 'неделя')}`;
}

export {
   timestampToNormalTime,
   timestampToNormalDate,
   timestampToNormalDDMMYY,
   getDurationInDaysOrWeeks
};
