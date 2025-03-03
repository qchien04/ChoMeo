import { Card, Rate } from "antd";
import "./CardItem.css";
import { Link } from "@inertiajs/react";
import { Dog } from "@/Pages/DogCategory";
import { Cat } from "@/Pages/Test1";

const { Meta } = Card;

interface ProductCardProps {
  item?: Dog | Cat;
  category?: string;
}

const CardItem: React.FC<ProductCardProps> = ({ item, category }) => {
  return (
    <Link href={`/detail/${category}/${item?.id}`}>
      <Card
        hoverable
        style={{
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          margin: "10px",
        }}
        cover={
          <img
            alt={item?.name}
            src={item?.image}
            style={{ height: 250, objectFit: "cover" }}
          />
        }
        className="product-card"
      >
        <Meta
          title={
            <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              {item?.name}
            </span>
          }
          description={
            <div>
              <p
                style={{
                  margin: "8px 0",
                  color: "#1890ff",
                  fontSize: "1.2em",
                  fontWeight: 500,
                }}
              >
                {item?.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default CardItem;
