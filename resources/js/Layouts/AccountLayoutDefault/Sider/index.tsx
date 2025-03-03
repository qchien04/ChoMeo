import React from "react";
import { Menu } from "antd";
import { DatabaseOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd/es/menu";
import { Link } from "@inertiajs/react";

import CatIcon from "@/Components/icon/CatIcon";
import DogIcon from "@/Components/icon/DogIcon";
import BackpackIcon from "@/Components/icon/BackpackIcon";
import ShirtIcon from "@/Components/icon/ShirtIcon";

import "./MenuSider.css";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const MenuSider: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link href="/account" className="menu-link">Dashboard</Link>,
      icon: <DatabaseOutlined />,
    },
    {
      key: "dog",
      label: "Chó",
      icon: <DogIcon />,
      children: [
        {
          key: "dog-all",
          label: <Link href="/admin/cho/all" className="menu-link">Tất cả</Link>,
          icon: <MenuOutlined />,
        },
        {
          key: "dog-create",
          label: <Link href="/admin/cho/create" className="menu-link">Tạo mới</Link>,
          icon: <PlusOutlined />,
        },
      ],
    },
    {
      key: "cat",
      label: "Mèo",
      icon: <CatIcon />,
      children: [
        {
          key: "cat-all",
          label: <Link href="/admin/meo/all" className="menu-link">Tất cả</Link>,
          icon: <MenuOutlined />,
        },
        {
          key: "cat-create",
          label: <Link href="/admin/meo/create" className="menu-link">Tạo mới</Link>,
          icon: <PlusOutlined />,
        },
      ],
    },
    {
      key: "cage",
      label: "Lồng",
      icon: <BackpackIcon />,
      children: [
        {
          key: "cage-all",
          label: <Link href="/admin/long/all" className="menu-link">Tất cả</Link>,
          icon: <MenuOutlined />,
        },
        {
          key: "cage-create",
          label: <Link href="/admin/long/create" className="menu-link">Tạo mới</Link>,
          icon: <PlusOutlined />,
        },
      ],
    },
    {
      key: "accessory",
      label: "Phụ kiện",
      icon: <ShirtIcon />,
      children: [
        {
          key: "accessory-all",
          label: <Link href="/admin/phu-kien/all" className="menu-link">Tất cả</Link>,
          icon: <MenuOutlined />,
        },
        {
          key: "accessory-create",
          label: <Link href="/admin/phu-kien/create" className="menu-link">Tạo mới</Link>,
          icon: <PlusOutlined />,
        },
      ],
    },
  ];

  // Mở mặc định các mục có con
  const defaultOpenKeys = menuItems.filter(({ children }) => children).map(({ key }) => key);

  return (
    <aside className="menu-sider">
      <header className="menu-sider-header">
        <h2>Admin Panel</h2>
      </header>
      <Menu
        mode="inline"
        theme="light"
        items={menuItems as MenuProps["items"]}
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={defaultOpenKeys}
      />
    </aside>
  );
};

export default MenuSider;
