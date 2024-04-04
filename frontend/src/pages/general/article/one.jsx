import React, { useEffect, useState } from 'react';

import { Spin, Button, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import { Content, Title } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import { timestampToNormalDDMMYY } from '@shared/utils/tsToTime';
import { GetArticle } from '@features/article/model/services/GetArticle';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const ArticlePage = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const navigate = useNavigate();
   const { id } = useParams();

   useEffect(() => {
      fetchData(id);
   }, [id]);

   const fetchData = (id) => {
      setIsLoading(true);
      GetArticle(id).then((res) => {
         let result = res?.id ? [res] : [];
         setData(result);
         setIsLoading(false);
      });
   };

   if (isLoading) {
      return <Spin />;
   }

   return (
      <Content>
         <Container>
            {data.map((item) => (
               <React.Fragment key={item.id}>
                  {' '}
                  <Title>{item.title}</Title>
                  <div
                     className="article-card"
                     key={item.id}
                     style={{ width: '100%' }}>
                     <div className="article-card_description">
                        {item.description}
                     </div>
                     <Divider style={{ margin: '15px 0' }} />

                     <div
                        style={{ whiteSpace: 'pre-wrap' }}
                        className="article-card_description">
                        {parse(item.content)}
                     </div>

                     <Button
                        className="article-card_button"
                        type="primary"
                        onClick={() => navigate(-1)}>
                        Назад
                     </Button>

                     <div className="article-card_views">
                        Просмотров: {item.views}
                     </div>
                     <div className="article-card_created">
                        Дата создания: {timestampToNormalDDMMYY(item.createdAt)}
                     </div>
                  </div>
               </React.Fragment>
            ))}
         </Container>
      </Content>
   );
};

export default ArticlePage;
