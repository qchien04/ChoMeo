import React, { useRef } from "react";
import { Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CardItem from "../CardItem";
import { Dog } from "@/Pages/DogCategory";
import { Cat } from "@/Pages/Test1";
import { Cage } from "@/Pages/CageCategory";
import { Accessory } from "@/Pages/AccessoryCategory";
import AccessoryCardItem from "../AccessoryCardItem";
import CageCardItem from "../CageCardItem";
import './Slide.css';

interface Prop {
    items: Dog[]|Cat[]|Cage[]|Accessory[];
    typeItem:string;
}
const Slide: React.FC<Prop> = ({items,typeItem}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: number) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Khoảng cách cuộn mỗi lần
      scrollRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div style={{ position: "relative", width: "1200px", margin: "auto" }}>
      <Button
        icon={<LeftOutlined />}
        style={{ position: "absolute", left: -40, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        onClick={() => scroll(-1)}
      />

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          padding: "10px",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          scrollBehavior: "smooth"
        }}
      >
        {typeItem=='dog'?<>
          {items.map((item, index) => (
          <CardItem category="cho" item={item as Dog}/>
        ))}
        </>:<></>}
        {typeItem=='cat'?<>
          {items.map((item, index) => (
          <CardItem category="meo" item={item as Cat}/>
        ))}
        </>:<></>}
        {typeItem=='accessory'?<>
          {items.map((item, index) => (
          <AccessoryCardItem item={item as Accessory}/>
        ))}
        </>:<></>}
        {typeItem=='cage'?<>
          {items.map((item, index) => (
          <CageCardItem item={item as Cage}/>
        ))}
        </>:<></>}

      </div>

      <Button
        icon={<RightOutlined />}
        style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
        onClick={() => scroll(1)}
      />
    </div>
  );
};

export default Slide;
