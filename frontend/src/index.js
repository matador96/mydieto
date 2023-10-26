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

root.render(
   <BrowserRouter>
      <ConfigProvider locale={ruRU}>
         <App />
      </ConfigProvider>
   </BrowserRouter>
);

reportWebVitals();
