import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { DatabaseOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
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

const menuItems: MenuItem[] = [
  {
    key: "/profile",
    label: <Link href="/profile" className="menu-link">Dashboard</Link>,
    icon: <DatabaseOutlined />,
  },
  {
    key: "/admin/cho",
    label: "Chó",
    icon: <DogIcon />,
    children: [
      { key: "/admin/cho/all", label: <Link href="/admin/cho/all" className="menu-link">Tất cả</Link>, icon: <MenuOutlined /> },
      { key: "/admin/cho/create", label: <Link href="/admin/cho/create" className="menu-link">Tạo mới</Link>, icon: <PlusOutlined /> },
    ],
  },
  {
    key: "/admin/meo",
    label: "Mèo",
    icon: <CatIcon />,
    children: [
      { key: "/admin/meo/all", label: <Link href="/admin/meo/all" className="menu-link">Tất cả</Link>, icon: <MenuOutlined /> },
      { key: "/admin/meo/create", label: <Link href="/admin/meo/create" className="menu-link">Tạo mới</Link>, icon: <PlusOutlined /> },
    ],
  },
  {
    key: "/admin/long",
    label: "Lồng",
    icon: <BackpackIcon />,
    children: [
      { key: "/admin/long/all", label: <Link href="/admin/long/all" className="menu-link">Tất cả</Link>, icon: <MenuOutlined /> },
      { key: "/admin/long/create", label: <Link href="/admin/long/create" className="menu-link">Tạo mới</Link>, icon: <PlusOutlined /> },
    ],
  },
  {
    key: "/admin/phu-kien",
    label: "Phụ kiện",
    icon: <ShirtIcon />,
    children: [
      { key: "/admin/phu-kien/all", label: <Link href="/admin/phu-kien/all" className="menu-link">Tất cả</Link>, icon: <MenuOutlined /> },
      { key: "/admin/phu-kien/create", label: <Link href="/admin/phu-kien/create" className="menu-link">Tạo mới</Link>, icon: <PlusOutlined /> },
    ],
  },
];

const MenuSider: React.FC = () => {
  const currentPath = window.location.pathname;

  const [selectedKeys, setSelectedKeys] = useState<string[]>([currentPath]);

  const getParentKey = (key: string) => {
    for (const item of menuItems) {
      if (item.children?.some(child => child.key === key)) {
        return item.key;
      }
    }
    return null;
  };

  const initialOpenKeys = getParentKey(currentPath) ? [getParentKey(currentPath)!] : [];

  const [openKeys, setOpenKeys] = useState<string[]>(initialOpenKeys);

  useEffect(() => {
    setSelectedKeys([window.location.pathname]);
    const parentKey = getParentKey(window.location.pathname);
    if (parentKey) {
      setOpenKeys([parentKey]); 
    }
  }, [window.location.pathname]);

  return (
    <aside className="menu-sider">
      <Menu
        mode="inline"
        theme="light"
        items={menuItems}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)} 
        onClick={(e) => setSelectedKeys([e.key])}
      />
    </aside>
  );
};

export default MenuSider;
