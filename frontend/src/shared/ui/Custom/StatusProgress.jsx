import { Progress, Tag } from 'antd';
import { statusesOfLeads } from '@shared/const/statuses';

const StatusProgress = ({
   status,
   type,
   isShowProgress = true,
   showInfo = true
}) => {
   const stepsLength = Object.values(statusesOfLeads[status]?.stages)?.length || 5;

   return (
      <>
         {isShowProgress && (
            <>
               <div>
                  <Progress
                     steps={stepsLength}
                     style={{ marginBottom: 5 }}
                     strokeColor={statusesOfLeads[status]?.color}
                     percent={statusesOfLeads[status]?.progress}
                     size={[20, 10]}
                     showInfo={showInfo}
                  />
               </div>
            </>
         )}

         <Tag className="status-tag" color={statusesOfLeads[status]?.color}>
            {statusesOfLeads[status]?.label}
         </Tag>
      </>
   );
};

export default StatusProgress;
