
import "./Accessory.css";
import Section from '@/Components/Section';
import CategoryLayout from '@/Layouts/CategoryLayout';
import { Col, Pagination, Row } from "antd";
import AccessoryCardItem from "@/Components/AccessoryCardItem";
import { useState } from "react";

export interface Accessory{
    id:number,
    name:string,
    quantity:number,
    breed: string,
    price:number,
    description?:string,
    image:string,
    evaluate:number,
    number_of_evaluate:number,
    is_active:boolean,
}


interface PageProps {
    accessoryList: Accessory[];
  }
const AccessoryCategoryDogCategory: React.FC<PageProps> = ({ accessoryList }) => {
    // Số sản phẩm hiển thị trên 1 trang (ví dụ: 9 = 3 hàng x 3 cột)
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
  
    // Tính toán danh sách phụ kiện hiển thị theo trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAccessories = accessoryList.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  
    return (
      <CategoryLayout>
        <div className="dog-category-arena" >
          <Row gutter={[16, 16]}>
            {currentAccessories.length > 0 ? (
              currentAccessories.map((accessory) => (
                <Col span={6} key={accessory.id}>
                  <AccessoryCardItem item={accessory} />
                </Col>
              ))
            ) : (
              <p>Không có phụ kiện nào.</p>
            )}
          </Row>
          {accessoryList.length > itemsPerPage && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={accessoryList.length}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </CategoryLayout>
    );
  };
  
export default AccessoryCategoryDogCategory;