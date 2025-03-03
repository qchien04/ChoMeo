import { MenuProps } from "antd";
import { Link } from '@inertiajs/react';
import {SmileOutlined} from "@ant-design/icons"
const costList=[1000,1500,2000];
export const itemsByCost: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={`/search?cost=${costList[0]}`} style={{ fontSize: '20px',padding:20}}>Nhỏ hơn {costList[0]}</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href={`/search?cost=${costList[1]}`} style={{ fontSize: '20px',padding:20}}>Nhỏ hơn {costList[1]}</Link>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    { 
      key: '3',
      label: (
        <Link href={`/search?cost=${costList[2]}`} style={{ fontSize: '20px',padding:20}}>Nhỏ hơn {costList[2]}</Link>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true, 
      label: 'a danger item',
    },
  ];
