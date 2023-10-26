import { Tag } from 'antd';
import { statusesOfLeads, statusesOfSellers } from '@shared/const/statuses';

const StatusTag = ({ status, type }) => {
   const types = {
      lead: statusesOfLeads,
      seller: statusesOfSellers
   };

   const currentStatuses = types[type];

   return (
      <Tag className="status-tag" color={currentStatuses[status]?.color}>
         {currentStatuses[status]?.label}
      </Tag>
   );
};

export default StatusTag;
