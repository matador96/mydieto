import React, { useState, useEffect } from 'react';

import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@shared/config/routes';
import { useLocation } from 'react-router-dom';
import { extraActions, getFilterArticle } from '@entitles/Extra';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import searchIcon from '@shared/assets/images/search.svg';
import clearSearchInput from '@shared/assets/images/clearSearchInput.svg';

const SearchBox = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const [str, setStr] = useState('');
   const navigate = useNavigate();
   const chexBoxValues = useSelector(getFilterArticle);

   const onChange = (e) => {
      setStr(e.target.value);
   };

   useEffect(() => {
      if (chexBoxValues.length > 0) {
         setStr('');
      }
   }, [chexBoxValues]);

   const onClick = () => {
      const url = location?.pathname;
      if (url !== RoutePath['seller-articles']) {
         navigate(RoutePath['seller-articles']);
      }

      setTimeout(() => {
         dispatch(extraActions.setFilterArticle([]));
         dispatch(extraActions.setSearchArticle(str));
      }, 100);
   };

   const onClear = () => {
      setStr('');
      dispatch(extraActions.setSearchArticle(''));
   };

   const MyIcon = () => <img src={searchIcon} />;

   return (
      <div className="search-container-input">
         <Input
            className="custom-search-input"
            placeholder="Введите запрос"
            value={str}
            onChange={onChange}
            onPressEnter={onClick}
         />
         <div className="clear-search-button-container">
            <img
               className="clear-icon-input"
               src={clearSearchInput}
               onClick={onClear}
            />
            <Button
               icon={<MyIcon />}
               size="large"
               className="search-button-input"
               onClick={onClick}
            />
         </div>
      </div>
   );
};
export default SearchBox;
