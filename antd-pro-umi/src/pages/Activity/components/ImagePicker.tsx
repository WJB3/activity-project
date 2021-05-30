import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

function getBase64(img:any, callback:any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


const ImagePicker = (props: any) => {

    const {

    } = props;

    const [imageUrl, setImageUrl] = useState('');

    const [imageName,setImageName]=useState('file');

    const [loading, setLoading] = useState(false);

    const handleChange = (info:any) => {
      
        console.log("info",info.fileList[0].response)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            if(info && info.fileList && info.fileList.length && info.fileList[0].response){
                props.onChange(info.fileList[0].response.data[imageName]);
            }
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl:string) =>{ 
                setImageUrl(imageUrl)
                setLoading(false)
            });
        }
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Upload
            name={imageName}
            listType="picture-card"
            showUploadList={false}
            action="http://127.0.0.1:7001/tools/resource"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    )

}

export default ImagePicker;