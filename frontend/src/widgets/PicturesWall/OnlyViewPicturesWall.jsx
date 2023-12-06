import { Modal, Upload } from 'antd';
import React, { useState } from 'react';
import _ from 'lodash';

const getBase64 = (file) =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });

const PicturesWall = ({ fileList = [], maxShow = 5 }) => {
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');

   const handleCancel = () => setPreviewOpen(false);
   const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(
         file.fileName || file.url.substring(file.url.lastIndexOf('/') + 1)
      );
   };

   return (
      <>
         <Upload
            listType="picture-card"
            fileList={fileList.slice(0, maxShow)}
            onPreview={handlePreview}
            disabled={true}
         />
         <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
         >
            <img
               style={{
                  width: '100%'
               }}
               src={previewImage}
            />
         </Modal>
      </>
   );
};

function areEqual(prevProps, nextProps) {
   const fileListPrev = prevProps.fileList.map((e) => e.id);
   const fileListNext = nextProps.fileList.map((e) => e.id);

   if (_.isEqual(fileListPrev, fileListNext)) {
      return true;
   }

   return false;
   /*
   return true if passing nextProps to render would return
   the same result as passing prevProps to render,
   otherwise return false
   */
}

export default React.memo(PicturesWall, areEqual);
