import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState, useEffect } from 'react';
import { CreateImage } from '@features/list-lead/model/CreateImage';

const getBase64 = (file) =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });

const UploadPicturesWall = ({
   maxCount = 3,
   setImagesIds,
   images = [],
   isDisabledEditButton = false
}) => {
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');
   const [fileList, setFileList] = useState([]);

   const handleCancel = () => setPreviewOpen(false);
   const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(
         file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
      );
   };

   useEffect(() => {
      setFileList(
         images.map((el) => {
            return { ...el, uid: el.id, name: 'Картинка', status: 'done' };
         })
      );
   }, [images]);

   useEffect(() => {
      let isUplading;

      if (fileList.filter((item) => item.status === 'uploading').length > 0) {
         isUplading = true;
      }

      window.cantSubmitBecauseImageUploadingNow = isUplading; // Плохо но что поделать
      setImagesIds(fileList.map((item) => item.id));
   }, [fileList]);

   const fetchImage = async (file) => {
      const formData = new FormData();
      formData.append('image', file, file.uid);

      setFileList((prev) => [
         ...prev,
         {
            uid: file.uid,
            name: file.name,
            status: 'uploading'
         }
      ]);

      await CreateImage(formData)
         .then((res) => {
            setFileList((prev) => {
               return prev.map((el) => {
                  if (el.uid === file.uid) {
                     return { ...el, url: res.url, status: 'done', id: res.id };
                  }
                  return el;
               });
            });
         })
         .catch(() => {
            setFileList((prev) => {
               return prev.map((el) => {
                  if (el.uid === file.uid) {
                     return { ...el, status: 'error' };
                  }
                  return el;
               });
            });
         });
   };

   const onRemove = (file) => {
      if (!file?.id) {
         return;
      }

      setFileList((prev) =>
         prev.filter((item) => item.name !== file.name || item.id !== file.id)
      );
   };

   const uploadButton = (
      <div>
         <PlusOutlined />
         <div
            style={{
               marginTop: 8
            }}>
            Загрузить
         </div>
      </div>
   );

   return (
      <>
         <Upload
            accept="image/png, image/jpeg"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onRemove={onRemove}
            action={fetchImage}
            disabled={isDisabledEditButton}>
            {fileList.length >= maxCount ? null : uploadButton}
         </Upload>
         <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}>
            <img
               alt="Загруженная картинка"
               style={{
                  width: '100%'
               }}
               src={previewImage}
            />
         </Modal>
      </>
   );
};
export default UploadPicturesWall;
