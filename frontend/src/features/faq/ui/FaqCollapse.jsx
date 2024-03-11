import React, { useState, useEffect } from 'react';
import { GetFaqs } from '../model/services/GetFaqs';

import { Collapse } from 'antd';
import Container from '@widgets/Container/ui/Container';

const FaqCollapse = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      GetFaqs({
         page: 1,
         limit: 1000,
         sort: 'priority',
         order: 'desc',
         status: 'published'
      }).then((res) => {
         setData(
            res.data.map((item) => ({
               key: item.id,
               label: item.title,
               children: item.description
            }))
         );
      });
   };

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
