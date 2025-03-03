import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Row,
  Col,
  message,
  Upload,
  Card,
  Typography,
  Divider
} from 'antd';
import { router, usePage } from '@inertiajs/react';
import LayoutDefault from '@/Layouts/AccountLayoutDefault';
import { PageProps } from '@/types';
import { Dog } from '@/Pages/DogCategory';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

type DogFormData = Record<string, any>;

export default function Edit({ dog, success }: PageProps<{ dog: Dog; success?: string }>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<DogFormData>();
  const [imageUrl, setImageUrl] = useState<string | null>(dog.image);

  useEffect(() => {
    if (success) {
      message.success(success);
    }
  }, [success]);

  useEffect(() => {
    if (dog) {
      form.setFieldsValue(dog);
    }
  }, [dog]);

  const handleFinish = (values: DogFormData) => {
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

    router.post(`/admin/cho/${dog.id}`, formData, {
      onSuccess: () => {
        setLoading(false);
        message.success('Cập nhật thành công!');
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
      <Card
        style={{
          width: '100%',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Chỉnh sửa thông tin chó 🐶
        </Title>
        <Divider />
        <Form<DogFormData>
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={dog}
        >
          {/* Hàng 1: Tên, Giống, Giới tính */}
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                <Input placeholder="Nhập tên chó" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Giống" name="breed" rules={[{ required: true, message: 'Vui lòng nhập giống chó' }]}>
                <Input placeholder="Nhập giống chó" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
                <Select placeholder="Chọn giới tính">
                  <Option value="male">Đực</Option>
                  <Option value="female">Cái</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Hàng 2: Tuổi, Cân nặng (kg), Màu sắc */}
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="Tuổi" name="age" rules={[{ required: true, message: 'Vui lòng nhập tuổi' }]}>
                <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập tuổi" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Cân nặng (kg)" name="weight" rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}>
                <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập cân nặng" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Màu sắc" name="color" rules={[{ required: true, message: 'Vui lòng nhập màu sắc' }]}>
                <Input placeholder="Nhập màu sắc" />
              </Form.Item>
            </Col>
          </Row>

          {/* Hàng riêng cho giá (có thể tùy chỉnh theo ý thích) */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Giá (VNĐ)" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
                <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập giá" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>

          <Form.Item label="Hình ảnh" name="image" valuePropName="file">
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Ảnh"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              ) : (
                <div>
                  <PlusOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="vaccinated" valuePropName="checked">
                <Checkbox style={{ fontSize: '16px' }}>Đã tiêm phòng</Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="sterilized" valuePropName="checked">
                <Checkbox style={{ fontSize: '16px' }}>Đã triệt sản</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? 'Đang cập nhật...' : 'Cập nhật'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LayoutDefault>
  );
}
