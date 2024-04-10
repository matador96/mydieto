/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';
import LeftToBottomRightArrowPNG from '@shared/assets/images/leftToBottomRightArrow.png';

const Dividier = ({ direction }) => {
   return (
      <div
         className={`about-list-of-schema_item-dividier ${
            direction === 'left' ? 'left' : 'right'
         }`}>
         <img src={LeftToBottomRightArrowPNG} />
      </div>
   );
};

const listOfSchema = [
   {
      left: (
         <div className="about-list-of-schema_item-title">
            Начните с обращения к нам
         </div>
      ),
      right: (
         <div className="about-list-of-schema_item-description">
            Пройдите отбор с помощью алгоритма — расскажите, с чем нужна помощь. Если
            хотите проконсультироваться со специалистом по подбору, заполните анкету
         </div>
      ),
      dividier: <Dividier direction="right" />
   },
   {
      left: (
         <div className="about-list-of-schema_item-description">
            Не находите слов, чтобы рассказать о проблеме? Оставьте поле пустым —
            мы поможем составить запрос
         </div>
      ),
      right: (
         <div className="about-list-of-schema_item-title">
            Опишите свое состояние в анкете
         </div>
      ),
      dividier: <Dividier direction="left" />
   },
   {
      left: (
         <div className="about-list-of-schema_item-title">
            Подберем подходящего психолога
         </div>
      ),
      right: (
         <div className="about-list-of-schema_item-description">
            Алгоритм или консультант найдут специалистов под ситуацию. Вы получите
            ссылку для оплаты сеанса в WhatsApp, как только мы подберём психолога
         </div>
      ),
      dividier: <Dividier direction="right" />
   },
   {
      left: (
         <div className="about-list-of-schema_item-description">
            Психолог напишет, чтобы договориться о начале терапии и поможет выбрать
            удобное время для сессии
         </div>
      ),
      right: (
         <div className="about-list-of-schema_item-title">
            Получите профессиональную поддержку
         </div>
      )
   }
];

const AboutSchemaWithArrows = () => {
   return (
      <div style={{ margin: '20px 0 ' }}>
         <Container>
            <div className="about-list-of-schema">
               {listOfSchema.map((e, index) => (
                  <>
                     <div className="about-list-of-schema_item" key={index}>
                        <div className="about-list-of-schema_item_left">
                           {e.left}
                        </div>
                        <div className="about-list-of-schema_item_right">
                           {e.right}
                        </div>
                     </div>
                     {e?.dividier ? e.dividier : null}
                  </>
               ))}
            </div>
         </Container>
      </div>
   );
};

export default AboutSchemaWithArrows;
