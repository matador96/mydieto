import React from 'react';
import TableCourses from '@features/course/ui/TableCourses';
import { Title } from '@shared/ui';

const ManageCoursesPage = () => {
   return (
      <div>
         <Title>Список курсов</Title>
         <TableCourses />
      </div>
   );
};

export default ManageCoursesPage;
