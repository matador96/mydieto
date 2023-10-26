import { Space, Tag, Typography } from 'antd';
import { getTimeAgo } from '@shared/utils/timeAgo';
import dayjs from 'dayjs';

const { Text } = Typography;

const DateWithAgo = ({ date }) => (
   <Space direction="vertical">
      <Tag bordered={false}>{getTimeAgo(dayjs(date).unix() * 1000)}</Tag>
      <Text type="secondary">{dayjs(date).format('YYYY.MM.DD HH:mm')}</Text>
   </Space>
);

export default DateWithAgo;
