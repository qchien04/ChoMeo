import React, { useEffect, useState } from 'react'; 
import { Form, Input, InputNumber, Select, Button, message, Upload } from 'antd';
import { router, usePage } from '@inertiajs/react';
import LayoutDefault from '@/Layouts/AccountLayoutDefault';
import { PageProps } from '@/types';
import { Cage } from '@/Pages/CageCategory';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

type CageFormData = Record<string, any>;

export default function Edit({
  cage,
  success,
}: PageProps<{ cage: Cage; success?: string }>) {
  // Hiển thị thông báo flash nếu có
  useEffect(() => {
    if (success) {
      message.success(success);
    }
  }, [success]);

  useEffect(() => {
    if (cage) {
      form.setFieldsValue(cage);
    }
  }, [cage]);

  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CageFormData>();
  const [imageUrl, setImageUrl] = useState<string | null>(cage.image);

  const handleFinish = (values: CageFormData) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'image' || values.image.file) {
        formData.append(
          key,
          key === 'image' ? values.image.file.originFileObj : values[key]
        );
      }
    });

    router.post(`/admin/long/${cage.id}`, formData, {
      onSuccess: () => {
        setLoading(false);
        message.success('Thêm thành công!');
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
          Thêm lồng mới 🐶
        </h1>
        <Form<CageFormData>
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={cage}
        >
          {/* Row 1: Tên lồng và Dành cho */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              style={{ flex: 1 }}
              label="Tên lồng"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên lồng' }]}
            >
              <Input placeholder="Nhập tên lồng" />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              label="Dành cho"
              name="breed"
              rules={[{ required: false, message: 'Vui lòng chọn loài' }]}
            >
              <Select placeholder="Chọn loài">
                <Option value="Chó">Chó</Option>
                <Option value="Mèo">Mèo</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Row 2: Sức chứa và Số lượng */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              style={{ flex: 1 }}
              label="Sức chứa"
              name="capacity"
              rules={[
                { required: true, message: 'Vui lòng nhập sức chứa của lồng' },
              ]}
            >
              <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập sức chứa" />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              label="Số lượng"
              name="quantity"
              rules={[
                { required: true, message: 'Vui lòng nhập số lượng lồng' },
              ]}
            >
              <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập số lượng" />
            </Form.Item>
          </div>

          {/* Row 3: Tham số và Giá */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              style={{ flex: 1 }}
              label="Tham số"
              name="parameter"
              rules={[{ required: true, message: 'Vui lòng nhập tham số của lồng' }]}
            >
              <Input placeholder="Nhập tham số" />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              label="Giá (VNĐ)"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            >
              <Input placeholder="Nhập giá" />
            </Form.Item>
          </div>

          {/* Row 4: Mô tả */}
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>

          {/* Row 5: Hình ảnh */}
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

          {/* Nút submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? 'Đang xử lý...' : 'Thêm lồng'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutDefault>
  );
}
