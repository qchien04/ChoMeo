// CageCardItem.tsx
import React, { useEffect } from 'react';
import { Card, Rate, Typography } from 'antd';
import { Cage } from '@/Pages/CageCategory';
import "./CageCardItem.css";
import { Link } from '@inertiajs/react';
import { Accessory } from '@/Pages/AccessoryCategory';
const { Meta } = Card;

interface CageCardItemProps {
  item?: Cage|Accessory;
  typeItem:string;
}

const CACard: React.FC<CageCardItemProps> = ({ item, typeItem }) => {
  useEffect(()=>{
    window.dispatchEvent(new Event("resize"));
  },[])
  return (
    <Link href={`/detail/${typeItem}/${item?.id}`}>
      <Card
        hoverable
        className="item-card"
        cover={
          <div className="item-card__image-container">
            <img
              alt={item?.name}
              src={item?.image}
              className="item-card__image"
            />
          </div>
        }
      >
        <Meta 
          title={
            <span className="ant-card-meta-title">
              {item?.name}
            </span>
          }
          description={
            <div className="item-card__content">
              <div className="item-card__price">
                {parseInt(item!.price.toString()).toLocaleString("vi-VN")} VND
              </div>
              {item?.description && (
                <Typography.Text
                  className="item-card__description"
                  ellipsis={{ tooltip: item.description }} // Hiển thị tooltip khi hover
                >
                  {item.description}
                </Typography.Text>
              )}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Rate disabled allowHalf defaultValue={item?.evaluate} />
                <span style={{ marginLeft: '8px', fontSize: '0.9em' }}>
                  ({item?.number_of_evaluate} đánh giá)
                </span>
              </div>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default CACard;
