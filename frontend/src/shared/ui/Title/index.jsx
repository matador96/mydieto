import { memo } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const TitleComponent = (props) => {
   if (typeof props.children === 'string' || props.children?.length > 0) {
      if (Array.isArray(props?.children) && props?.children?.length > 0) {
         document.title = props.children[0];
      } else {
         document.title = props.children;
      }
   } else {
      document.title =
         'MyDieto - уникальный маркетплейс, созданный для тех, кто стремится к правильному питанию и заботится о своём здоровье';
   }

   return <Title {...props} />;
};

export default memo(TitleComponent);
