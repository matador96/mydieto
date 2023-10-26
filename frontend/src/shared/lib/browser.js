import { useEffect } from 'react';

export const scrollToTop = () => {
   document
      .querySelector('.ant-layout-content')
      ?.scrollTo({ top: 0, behavior: 'smooth' });
};

export const useTitle = (title) => {
   useEffect(() => {
      document.title = title;
   }, [title]);
};
