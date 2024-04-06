/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';
import logoInvert from '@shared/assets/images/logoInvert.png';
import { Input, Button, Space } from 'antd';
import WhatsappIconWhite from '@shared/assets/icons/WhatsappIconWhite';
import VKIconWhite from '@shared/assets/icons/VKIconWhite';
import { useNavigate } from 'react-router-dom';
import TelegramIconWhite from '@shared/assets/icons/TelegramIconWhite';

const items = [
   { label: 'Главная', key: '/' },
   { label: 'Курсы', key: '/courses' },
   { label: 'Эксперты', key: '/instructors' },
   { label: 'Статьи', key: '/articles' },
   { label: 'Контакты', key: '/contacts' }
];

const Footer = () => {
   const navigate = useNavigate();

   return (
      <div className="footer">
         <Container>
            <div className="footer-block">
               <div className="footer-block-logo">
                  <div
                     className="logo-invert"
                     style={{
                        backgroundImage: `url(${logoInvert})`
                     }}
                  />
               </div>
               <div className="footer-block-menu">
                  {items.map((item, index) => (
                     <a
                        key={index}
                        href={item.key}
                        onClick={(e) => {
                           e.preventDefault();
                           navigate(item.key);
                        }}
                        className="footer-block-menu-item">
                        {item.label}
                     </a>
                  ))}
               </div>{' '}
               <div />
               <div className="footer-block-socials">
                  <div className="footer-block-socials_email">
                     <Space.Compact
                        className="footer-block-socials_email_input"
                        style={{
                           width: '100%'
                        }}>
                        <Input defaultValue="" placeholder="Введите почту" />
                        <Button type="primary">Подписаться</Button>
                     </Space.Compact>
                  </div>

                  <div className="footer-block-socials_list">
                     Наши социальные сети:
                     <WhatsappIconWhite />
                     <VKIconWhite />
                     <TelegramIconWhite />
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default Footer;
