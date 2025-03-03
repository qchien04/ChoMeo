import logo_long from "@/assets/images/logo_long.png";
import { LogoutOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./headerClientLayout.css";
import { Button, Dropdown, Form, Input } from "antd";
import { itemsByCost } from "./menuHeader";
import { Link, usePage } from '@inertiajs/react';

interface FormSearch {
  key: string;
}
interface PropTopBar {
  fixed?: boolean;
}

const TopBar: React.FC<PropTopBar> = ({fixed}) => {
  const user = usePage().props.auth.user;

  const handleSubmit = (value: FormSearch) => {
    // Xử lý tìm kiếm
  };

  return (
    <header className={fixed===false?"header nonSticky":"header"}>
      {/* Logo bên trái */}
      <div className="header__left">
        <Link href="/">
          <img src={logo_long} alt="Logo" />
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
