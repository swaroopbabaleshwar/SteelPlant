import React, { Component } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './ProjectData.less';

const UploadFile = () => {

  const fileProps = {
    name: 'file',
    action: 'http://aic-arm.azurewebsites.net//ProjectDatas/Import',
    headers: {
      'content-type': 'multipart/form-data'
    },
    onChange(info) {
        console.log('info ', info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };  
  return(
    <>
      <Upload {...fileProps}>
        <Button>
          <UploadOutlined /> Click to Import
        </Button>
      </Upload>
  </>
  );
}

export default UploadFile;