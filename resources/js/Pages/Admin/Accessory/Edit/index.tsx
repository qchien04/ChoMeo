import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  message,
  Upload
} from 'antd';
import { router, usePage } from '@inertiajs/react';
import LayoutDefault from '@/Layouts/AccountLayoutDefault';
import { PageProps } from '@/types';
import { Accessory } from '@/Pages/AccessoryCategory';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

type AccessoryFormData = Record<string, any>;

export default function Edit({
  accessory,
  success
}: PageProps<{ accessory: Accessory; success?: string }>) {
  console.log(accessory.image);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<AccessoryFormData>();
  const [imageUrl, setImageUrl] = useState<string | null>(accessory.image);

  const handleFinish = (values: AccessoryFormData) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'image' || values.image?.file) {
        formData.append(
          key,
          key === 'image' ? values.image.file.originFileObj : values[key]
        );
      }
    });

    router.post(`/admin/phu-kien/${accessory.id}`, formData, {
      onSuccess: () => {
        setLoading(false);
        message.success('Sửa phụ kiện thành công!');
        form.resetFields();
        setImageUrl(null);
      },
      onError: () => {
        setLoading(false);
        message.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại!');
      },
    });
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ được phép tải lên tệp hình ảnh!');
    }
    return isImage;
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <LayoutDefault>
      <div
        className="editformitem"
        style={{
          margin: '0px auto',
          background: '#fff',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          width: "100%",
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          Sửa phụ kiện
        </h1>
        <Form<AccessoryFormData>
          form={form}
          layout="vertical"
          initialValues={accessory}
          onFinish={handleFinish}
        >
          {/* Hàng 1: Tên phụ kiện, Dành cho, Số lượng */}
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Tên phụ kiện"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên phụ kiện' }]}
              >
                <Input placeholder="Nhập tên phụ kiện" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Dành cho" name="breed">
                <Select placeholder="Chọn loài">
                  <Option value="Chó">Chó</Option>
                  <Option value="Mèo">Mèo</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
              >
                <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập số lượng" />
              </Form.Item>
            </Col>
          </Row>

          {/* Hàng 2: Giá (VNĐ) */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Giá (VNĐ)"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
              >
                <Input placeholder="Nhập giá" />
              </Form.Item>
            </Col>
          </Row>

          {/* Mô tả */}
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>

          {/* Hình ảnh */}
          <Form.Item label="Hình ảnh" name="image" valuePropName="file">
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Ảnh" style={{ width: '100%' }} />
              ) : (
                <PlusOutlined />
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? 'Đang xử lý...' : 'Cập nhật phụ kiện'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutDefault>
  );
}
