import { Form, Input, Button, Typography, Card } from 'antd';
import { Link, usePage, useForm } from '@inertiajs/react';
import './partials.css'; // Import file CSS tùy chỉnh

const { Title, Paragraph } = Typography;

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const { auth } = usePage().props;
  const user = auth.user;

  const { setData, patch, processing, recentlySuccessful, errors } = useForm({
    name: user.name,
    email: user.email,
    address: user.address,
    birthdate: user.birthdate,
    phone: user.phone,
  });

  const onFinish = (values: any) => {
    patch(route('profile.update'), values);
  };

  return (
    <section className={`update-profile-section`}>
      <Card className="card update-profile-card" style={{padding:0}}>
        <header className="update-profile-header">
          <Title level={3}>Thông tin khách hàng</Title>
          <Paragraph>Chỉnh sửa và cập nhật thông tin cá nhân của bạn ngay tại đây</Paragraph>
        </header>

        <Form
          layout="vertical"
          initialValues={{
            name: user.name,
            email: user.email,
            address: user.address,
            birthdate: user.birthdate,
            phone: user.phone,
          }}
          onValuesChange={(changedValues, allValues) => setData(allValues)}
          onFinish={onFinish}
          className="update-profile-form"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name}
          >
            <Input placeholder="Nhập tên" size="large" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ nhận hàng"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
            validateStatus={errors.address ? 'error' : ''}
            help={errors.address}
          >
            <Input placeholder="Nhập địa chỉ" size="large" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            validateStatus={errors.phone ? 'error' : ''}
            help={errors.phone}
          >
            <Input placeholder="Nhập số điện thoại" size="large" />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="birthdate"
            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
            validateStatus={errors.birthdate ? 'error' : ''}
            help={errors.birthdate}
          >
            <Input type="date" size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email}
          >
            <Input placeholder="Nhập email" size="large" />
          </Form.Item>

          {mustVerifyEmail && !user.email_verified_at && (
            <Form.Item>
              <Paragraph className="verification-info">
                Email của bạn chưa được xác nhận.{' '}
                <Link
                  href={route('verification.send')}
                  method="post"
                  as="button"
                  className="verification-link"
                >
                  Click here to re-send the verification email.
                </Link>
              </Paragraph>
              {status === 'verification-link-sent' && (
                <Paragraph className="verification-success">
                  A new verification link has been sent to your email address.
                </Paragraph>
              )}
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={processing} size="large" block>
              Save
            </Button>
            {recentlySuccessful && <span className="saved-message">Saved.</span>}
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
}
