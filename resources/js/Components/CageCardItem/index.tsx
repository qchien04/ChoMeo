// CageCardItem.tsx
import React, { useEffect } from 'react';
import { Card, Rate } from 'antd';
import { Cage } from '@/Pages/CageCategory';
import "./CageCardItem.css";
import { Link } from '@inertiajs/react';
const { Meta } = Card;

interface CageCardItemProps {
  item: Cage;
}

const CageCardItem: React.FC<CageCardItemProps> = ({ item }) => {
  useEffect(()=>{
    window.dispatchEvent(new Event("resize"));
  },[])
  return (
    <Link href={`/detail/${"long"}/${item?.id}`}>
      <Card
        hoverable
        className="product-card"
        cover={
          <div className="product-card__image-container">
            <img
              alt={item.name}
              src={item.image}
              className="product-card__image"
            />
          </div>
        }
      >
        <Meta
          title={
            <span className="ant-card-meta-title">
              {item.name}
            </span>
          }
          description={
            <div className="product-card__content">
              <div className="product-card__price">
                {parseInt(item!.price.toString()).toLocaleString("vi-VN")} VND
              </div>
              {item.description && (
                <div className='item_description'
                >
                  {item.description}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Rate disabled allowHalf defaultValue={item.evaluate} />
                <span style={{ marginLeft: '8px', fontSize: '0.9em' }}>
                  ({item.number_of_evaluate} đánh giá)
                </span>
              </div>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default CageCardItem;
