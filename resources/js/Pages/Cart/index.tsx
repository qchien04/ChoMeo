import React, { useState } from "react";
import { Card, List, InputNumber, Button, Row, Col, Typography, Divider, message } from "antd";
import "./Cart.css";
import DetailLayout from "@/Layouts/DetailLayout";
import { PageProps } from "@/types";
import { Accessory } from "../AccessoryCategory";
import { Cage } from "../CageCategory";
import { router } from "@inertiajs/react";

export interface PropCart {
  id:number,
  type:string,
  item:Accessory|Cage,
  quantity:number,
  state:boolean,
}



export default function Cart({ data }: PageProps<{ data: PropCart[] }>) {
  const [cartItems, setCartItems] = useState<PropCart[]>(data);

  const handleRemoveItem = async (id: number) => {
    router.delete(`/gio-hang/delete/${id}`, {
      onSuccess: () => {
        message.success("Sản phẩm đã được xóa!");
        setCartItems(prevItems => prevItems.filter(item => item.id !== id)); // Cập nhật state để xóa ngay lập tức
      },
      onError: () => {
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      },
    });
  };
  
  const handleVnpay=()=>{
    router.post(`/vnpay_payment`,{});
    router.visit('/gio-hang');
  }

  const getTotal = () => {
    return cartItems.reduce(
      (acc, val) => acc + val.item.price * val.quantity,
      0
    );
  };

  return (
    <DetailLayout>
        <div className="cart-container">
        <Typography.Title className="cart-title">Giỏ hàng của bạn</Typography.Title>
        <Card className="cart-card">
            <List
            itemLayout="vertical"
            dataSource={cartItems}
            locale={{ emptyText: "Không có sản phẩm nào trong giỏ hàng." }}
            renderItem={(val) => (
                <List.Item className="cart-item">
                <Row align="middle" gutter={16}>
                    <Col xs={6} sm={4}>
                    <div className="cart-item-image-wrapper">
                        <img src={val.item.image} alt={val.item.name} className="cart-item-image" />
                    </div>
                    </Col>
                    <Col xs={18} sm={8}>
                    <div className="cart-item-info">
                        <Typography.Title level={4}>{val.item.name}</Typography.Title>
                        <Typography.Text className="cart-item-price">
                        {parseInt(val.item.price.toString()).toLocaleString("vi-VN")} VND
                        </Typography.Text>
                    </div>
                    </Col>
                    <Col xs={12} sm={6}>
                    <div className="cart-item-quantity">
                        <InputNumber
                        min={1}
                        value={val.quantity}
                        disabled={true}
                        />
                    </div>
                    </Col>
                    <Col xs={12} sm={6} className="cart-item-action">
                    <Button danger onClick={() => handleRemoveItem(val.id)}>
                        Xóa
                    </Button>
                    </Col>
                </Row>
                </List.Item>
            )}
            />
        </Card>

        <Card className="cart-summary-card">
            <Row justify="space-between" align="middle">
            <Col>
                <Typography.Title level={4}>Tổng tiền:</Typography.Title>
            </Col>
            <Col>
                <Typography.Title level={4} className="cart-total">
                {getTotal().toLocaleString()} VND
                </Typography.Title>
            </Col>
            </Row>
            <Divider />
            <Button type="primary" size="large" block className="cart-checkout-button" onClick={handleVnpay}>
            Thanh toán ngay
            </Button>
        </Card>
        </div>
    </DetailLayout>
    
  );
};

