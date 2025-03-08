import logo_long from "@/assets/images/logo_long.png";
import { LogoutOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./headerClientLayout.css";
import { Button, Dropdown, Form, Input } from "antd";
import { itemsByCost } from "./menuHeader";
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
interface FormSearch {
  key: string;
}
interface PropTopBar {
  fixed?: boolean;
}

const TopBar: React.FC<PropTopBar> = ({fixed}) => {
  const user = usePage().props.auth.user;

  const handleSubmit = (value: FormSearch) => {
    if (value.key.trim()) {
      router.get(`/search`, { key: value.key });
    }
  };

  return (
    <header className={fixed===false?"header nonSticky":"header"}>
      {/* Logo bên trái */}
      <div className="header__left">
        <Link href="/">
          <img 
          src={"data:image/png;base64,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"} 
          alt="Logo" 
          />
        </Link>
      </div>

      {/* Khu vực giữa: Search + Menu */}
      <div className="header__center">
        {/* Form Search */}
        <Form className="header__search-form" layout="inline" onFinish={handleSubmit}>
          <Form.Item name="key" className="header__search-input">
            <Input placeholder="Tìm kiếm" />
          </Form.Item>
          <Form.Item className="header__search-btn">
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
            </Button>
          </Form.Item>
        </Form>

        {/* Menu điều hướng */}
        <div className="header__nav-bottom">
          <div className="menu">
            <Link href={route('home')}>
              Trang chủ
            </Link>
          </div>
          <Dropdown className="menu" menu={{ items: [] }} trigger={['hover']} placement="bottom">
            <Link href={`/meo`}>
              Mèo
            </Link>
          </Dropdown>

          <Dropdown className="menu" menu={{ items: [] }} trigger={['hover']} placement="bottom">
            <Link href={`/cho`}>
              Chó
            </Link>
          </Dropdown>

          <Dropdown className="menu" menu={{ items: [] }} trigger={['hover']} placement="bottom">
            <Link href={`/phu-kien`}>
              Phụ kiện 
            </Link>
          </Dropdown>

          <Dropdown className="menu" menu={{ items: [] }} trigger={['hover']} placement="bottom">
            <Link href={`/long`}>
              Lồng,Ba lô
            </Link>
          </Dropdown>

        </div>
      </div>

      {/* Tài khoản bên phải */}
      <div className="header__right">
        {user ? (
          <>
            <Link href={'/gio-hang'} as="button" className="header__account-link">
              <ShoppingCartOutlined style={{fontSize:30}}/>
            </Link>

            <Link href="/profile" className="header__account-link">
              {user.name ?? 'Tài khoản'}
            </Link>
            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="header__account-link"
            >
              <LogoutOutlined style={{fontSize:20}}/>
            </Link>
          </>
        ) : (
          <>
            <Link href={'/gio-hang'} as="button" className="header__account-link">
              <ShoppingCartOutlined style={{fontSize:30}}/>
            </Link>

            <Link href={route('login')} as="button" className="header__account-link">
              Đăng nhập
            </Link>
            <Link href={route('register')} as="button" className="header__account-link">
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;
