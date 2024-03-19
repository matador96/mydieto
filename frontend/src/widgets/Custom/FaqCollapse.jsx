/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { Collapse, Spin } from 'antd';
import Container from '@widgets/Container/ui/Container';
import { GetFaqs } from '@features/faq/model/services/GetFaqs';
import RightArrowIconWhite from '@shared/assets/icons/RightArrowIconWhite';

const items = [
   {
      label: 'Какой нибудь очень длинный вопрос',
      key: '1',
      children:
         'У нас можно получить индивидуальные советы и планы питания, выбрав специалиста в соответствии с вашими потребностями и целями. Кроме того, у вас есть возможность заказать персонализированное меню, учитывающее ваши вкусы. '
   },
   {
      label: 'Какой нибудь очень длинный вопрос',
      key: '2',
      children:
         'У нас можно получить индивидуальные советы и планы питания, выбрав специалиста в соответствии с вашими потребностями и целями. Кроме того, у вас есть возможность заказать персонализированное меню, учитывающее ваши вкусы. '
   },
   {
      label: 'Какой нибудь очень длинный вопрос',
      key: '3',
      children:
         'У нас можно получить индивидуальные советы и планы питания, выбрав специалиста в соответствии с вашими потребностями и целями. Кроме того, у вас есть возможность заказать персонализированное меню, учитывающее ваши вкусы. '
   },
   {
      label: 'Какой нибудь очень длинный вопрос',
      key: '4',
      children:
         'У нас можно получить индивидуальные советы и планы питания, выбрав специалиста в соответствии с вашими потребностями и целями. Кроме того, у вас есть возможность заказать персонализированное меню, учитывающее ваши вкусы. '
   },
   {
      label: 'Какой нибудь очень длинный вопрос',
      key: '5',
      children:
         'У нас можно получить индивидуальные советы и планы питания, выбрав специалиста в соответствии с вашими потребностями и целями. Кроме того, у вас есть возможность заказать персонализированное меню, учитывающее ваши вкусы. '
   }
];

const FaqCollapse = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetFaqs({
         page: 1,
         limit: 1000,
         status: 'published',
         sort: 'priority',
         order: 'asc'
      }).then((res) => {
         setData(
            res?.data
               ? res?.data.map((item) => ({
                    label: item.title,
                    key: item.id,
                    children: item.description
                 }))
               : []
         );
         setIsLoading(false);
      });
   };

   if (isLoading) {
      return <Spin />;
   }

   return (
      <div className="faq-collapse">
         <Container>
            <Collapse
               expandIconPosition={'end'}
               className="dieto-collapse"
               defaultActiveKey={['1']}
               items={data}
               ghost
            />
         </Container>
      </div>
   );
};

export default FaqCollapse;
