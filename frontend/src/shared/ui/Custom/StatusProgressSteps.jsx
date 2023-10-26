import { Steps, Tag } from 'antd';
import { statusesOfLeads } from '@shared/const/statuses';

const StatusProgressSteps = ({ status }) => {
   const stepArr = statusesOfLeads[status]?.stages?.map((e) => {
      return {
         title: (
            <Tag className="status-tag" color={statusesOfLeads[e].color}>
               {statusesOfLeads[e].label}
            </Tag>
         ),
         value: statusesOfLeads[e].value
      };
   });

   const currentIndex = stepArr?.findIndex((item) => item.value === status) || 0;

   return <Steps size="small" current={currentIndex} progressDot items={stepArr} />;
};

export default StatusProgressSteps;
