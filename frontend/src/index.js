import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import '@shared/assets/styles/main.scss';
import '@shared/assets/styles/override.scss';

import App from './app';
import reportWebVitals from './reportWebVitals';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addLocale(ru);
TimeAgo.addDefaultLocale(ru);

import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { loadAndSavePaginationPageSize } from '@widgets/Pagination/ui/Pagination';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

const container = document.getElementById('root');
const root = createRoot(container);

dayjs.locale('ru');
dayjs.extend(utc);
dayjs.extend(tz);

dayjs.tz.setDefault('Etc/UCT');

loadAndSavePaginationPageSize();

const PATH_APP = process.env.REACT_APP_ROOT_PATH || '/';

root.render(
   <BrowserRouter basename={PATH_APP}>
      <ConfigProvider
         locale={ruRU}
         theme={{
            components: {
               Button: {
                  defaultShadow: 'none',
                  primaryShadow:
                     '0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(103, 110, 118, 0.16), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)',
                  dangerShadow:
                     '0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(103, 110, 118, 0.16), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)'
               }
            },
            token: {
               fontFamily: 'Inter, sans-serif',
               colorPrimary: '#0b9093',
               colorLink: '#0b9093',
               boxShadow:
                  '0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(103, 110, 118, 0.16), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)',
               boxShadowSecondary:
                  '0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(103, 110, 118, 0.16), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)',
               boxShadowTertiary:
                  '0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(103, 110, 118, 0.16), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)'
            }
         }}>
         <App />
      </ConfigProvider>
   </BrowserRouter>
);

reportWebVitals();
