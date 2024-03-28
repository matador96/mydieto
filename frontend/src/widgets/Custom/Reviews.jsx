/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';
import { Rate } from 'antd';
import RightArrowIconWhite from '@shared/assets/icons/RightArrowIconWhite';

function shuffleAndTrimArray(array, limit = 3) {
   // Рандомизируем массив
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }

   // Урезаем массив до limit элементов
   array = array.slice(0, limit);

   return array;
}

const arrayOfReviews = [
   {
      firstName: 'Елена',
      lastName: 'Иванова',
      commentForCourse: 'Здоровое Питание: Путь к Гармонии',
      comment:
         'Очень информативный курс! Получила массу полезной информации о влиянии питания на здоровье. Рекомендую всем, кто стремится к здоровому образу жизни.',
      rating: 5
   },
   {
      firstName: 'Алексей',
      lastName: 'Петров',
      commentForCourse: 'Энергия Здоровья: Секреты Нутриологии',
      comment:
         'Прекрасный курс для тех, кто хочет понять, как правильное питание влияет на энергию и жизненный тонус. Очень познавательно и полезно!',
      rating: 3
   },
   {
      firstName: 'Мария',
      lastName: 'Смирнова',
      commentForCourse: 'Здоровое Питание: Путь к Гармонии',
      comment:
         'Очень понравился курс! Преподаватели объясняют все доступно и интересно, а материалы курса очень информативны. Очень рекомендую!',
      rating: 2
   },
   {
      firstName: 'Андрей',
      lastName: 'Козлов',
      commentForCourse: 'Питание для Здоровья и Красоты',
      comment:
         'Отличный курс! Наконец-то разобрался, как правильно питаться, чтобы не только быть здоровым, но и выглядеть на все сто. Большое спасибо!',
      rating: 5
   },
   {
      firstName: 'Екатерина',
      lastName: 'Новикова',
      commentForCourse: 'Энергия Здоровья: Секреты Нутриологии',
      comment:
         'Прекрасный курс, который помог мне лучше понять, какое питание необходимо для поддержания высокого уровня энергии и здоровья. Рекомендую!',
      rating: 3
   },
   {
      firstName: 'Иван',
      lastName: 'Смирнов',
      commentForCourse: 'Здоровое Питание: Путь к Гармонии',
      comment:
         'Курс превзошел мои ожидания! Много полезной информации, которую можно сразу применить на практике. Очень доволен результатом!',
      rating: 2
   },
   {
      firstName: 'Анастасия',
      lastName: 'Ковалева',
      commentForCourse: 'Питание для Здоровья и Красоты',
      comment:
         'Очень интересный и полезный курс! Получила много новой информации о том, как питание влияет на красоту и здоровье кожи. Очень рекомендую!',
      rating: 4
   },
   {
      firstName: 'Дмитрий',
      lastName: 'Васильев',
      commentForCourse: 'Энергия Здоровья: Секреты Нутриологии',
      comment:
         'Очень познавательный курс! Получил много полезных знаний о том, как питание влияет на энергию и настроение. Спасибо за такой отличный материал!',
      rating: 1
   },
   {
      firstName: 'Наталья',
      lastName: 'Попова',
      commentForCourse: 'Здоровое Питание: Путь к Гармонии',
      comment:
         'Отличный курс для тех, кто хочет научиться правильно питаться и поддерживать свое здоровье. Рекомендую всем, кто ценит свое здоровье!',
      rating: 5
   },
   {
      firstName: 'Павел',
      lastName: 'Сидоров',
      commentForCourse: 'Питание для Здоровья и Красоты',
      comment:
         'Очень полезный курс! Получил много новой информации о том, как питание влияет на красоту и здоровье. Спасибо организаторам!',
      rating: 3
   },
   {
      firstName: 'Александра',
      lastName: 'Михайлова',
      commentForCourse: 'Энергия Здоровья: Секреты Нутриологии',
      comment:
         'Прекрасный курс! Очень понравилась структура и содержание материалов. Теперь я знаю, какие продукты выбирать для поддержания энергии на высоком уровне.',
      rating: 2
   },
   {
      firstName: 'Анна',
      lastName: 'Кузнецова',
      commentForCourse: 'Секреты Здорового Питания',
      comment:
         'Отличный курс! Узнала много нового о важности балансированного питания для здоровья. Рекомендую всем!',
      rating: 3
   },
   {
      firstName: 'Алексей',
      lastName: 'Сергеев',
      commentForCourse: 'Питание для Здоровья и Долголетия',
      comment:
         'Очень понравился курс! Получил много полезных советов по поддержанию здоровья и долголетия через правильное питание. Спасибо!',
      rating: 4
   },
   {
      firstName: 'Елена',
      lastName: 'Павлова',
      commentForCourse: 'Здоровое Питание: Основы и Принципы',
      comment:
         'Очень информативный курс! Преподаватели излагают материал доступно и интересно. Очень довольна результатом обучения!',
      rating: 3
   },
   {
      firstName: 'Денис',
      lastName: 'Краснов',
      commentForCourse: 'Питание и Иммунитет',
      comment:
         'Превосходный курс! Получил много ценных знаний о том, как питание влияет на иммунную систему. Очень рекомендую!',
      rating: 5
   },
   {
      firstName: 'Ольга',
      lastName: 'Иванова',
      commentForCourse: 'Питание для Красоты и Здоровья Кожи',
      comment:
         'Отличный курс! Узнала много интересного о том, как правильное питание влияет на состояние кожи. Рекомендую!',
      rating: 4
   },
   {
      firstName: 'Игорь',
      lastName: 'Николаев',
      commentForCourse: 'Биохимия Питания',
      comment:
         'Очень глубокий и интересный курс! Получил много новой информации о химических процессах в организме при употреблении пищи. Спасибо!',
      rating: 4
   },
   {
      firstName: 'Татьяна',
      lastName: 'Соколова',
      commentForCourse: 'Питание и Спорт',
      comment:
         'Прекрасный курс! Узнала, как правильное питание может повлиять на результаты в спорте. Очень полезно и информативно!',
      rating: 5
   },
   {
      firstName: 'Сергей',
      lastName: 'Беляев',
      commentForCourse: 'Вегетарианство и Здоровье',
      comment:
         'Отличный курс для вегетарианцев! Получил много полезных советов о том, как сбалансировать питание без мяса. Рекомендую!',
      rating: 5
   },
   {
      firstName: 'Кристина',
      lastName: 'Макарова',
      commentForCourse: 'Правильное Питание: Основы и Рекомендации',
      comment:
         'Очень интересный курс! Узнала много нового о питании и его влиянии на здоровье. Большое спасибо!',
      rating: 4
   },
   {
      firstName: 'Ирина',
      lastName: 'Григорьева',
      commentForCourse: 'Здоровое Питание для Детей',
      comment:
         'Отличный курс для родителей! Узнала много полезного о том, как правильное питание влияет на здоровье детей. Спасибо!',
      rating: 5
   }
];

const ReviewCard = ({ commentForCourse, firstName, lastName, comment, rating }) => {
   return (
      <div className="review-card">
         <div className="review-card__author">
            <div className="review-card__author_avatar"></div>

            <div className="review-card__author_nameblock">
               <div className="review-card__author_nameblock_name">
                  {firstName} {lastName}
               </div>
               <div className="review-card__author_nameblock_rating">
                  <Rate disabled defaultValue={rating} />
               </div>
            </div>
         </div>

         <div className="review-card__content">
            <div className="review-card__content_commentforcourse">
               Комментарий к курсу: {commentForCourse}
            </div>

            <div className="review-card__content_comment">{comment}</div>
         </div>
      </div>
   );
};

const Reviews = () => {
   return (
      <div className="reviews">
         <Container>
            <div className="reviews_list">
               {shuffleAndTrimArray(arrayOfReviews, 3).map((review, index) => (
                  <ReviewCard key={`${review.firstName}${index}`} {...review} />
               ))}
            </div>
         </Container>
      </div>
   );
};

export default Reviews;
