/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';
import logoInvert from '@shared/assets/images/logoInvert.png';

const items = [
   { label: 'Главная', url: '/main' },
   { label: 'Курсы', url: '/courses' },
   { label: 'Специалисты', url: '/main' },
   { label: 'Статьи', key: '/articles' },
   { label: 'Контакты', url: '/main' }
];

const Footer = () => {
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
                        className="footer-block-menu-item">
                        {item.label}
                     </a>
                  ))}
               </div>

               <div className="footer-block-menu">
                  {items.map((item, index) => (
                     <a
                        key={index}
                        href={item.url}
                        className="footer-block-menu-item">
                        {item.label}
                     </a>
                  ))}
               </div>

               <div className="footer-block-menu">
                  {items.map((item, index) => (
                     <a
                        key={index}
                        href={item.url}
                        className="footer-block-menu-item">
                        {item.label}
                     </a>
                  ))}
               </div>
            </div>
         </Container>
      </div>
   );
};

export default Footer;
