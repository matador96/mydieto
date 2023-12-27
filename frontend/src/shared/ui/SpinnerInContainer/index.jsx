import { memo } from 'react';
import { Spin } from 'antd';

export default memo((props) => (
   <div className="spinner-container">
      <Spin {...props} />
   </div>
));
