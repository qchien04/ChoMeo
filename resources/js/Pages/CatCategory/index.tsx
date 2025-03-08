import { useState } from "react";
import { Col, Row, Pagination } from "antd";
import CardItem from "@/Components/CardItem";
import "./Cat.css";
import CategoryLayout from '@/Layouts/CategoryLayout';
import { PageProps } from "@/types";

export interface Cat {
  id: number;
  name: string;
  breed: string;
  gender: string;
  age: number;
  weight: number;
  color: string;
  price: number;
  description: string;
  image: string;
  sterilized: boolean;
  vaccinated: boolean;
  is_active: boolean;
}

const CatCategory = ({ catList, filters, breeds, colors }: PageProps<{ 
  catList: Cat[], 
  filters: any, 
  breeds: string[], 
  colors: string[] 
}>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCats = catList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CategoryLayout filters={filters} breeds={breeds} colors={colors}>
      <div className="cat-category-arena">
        <Row gutter={[16, 16]}>
          {currentCats.length > 0 ? (
            currentCats.map((cat) => (
              <Col span={6} key={cat.id}>
                <CardItem item={cat} category="meo" />
              </Col>
            ))
          ) : (
            <p>Không có mèo nào.</p>
          )}
        </Row>
        <div className="pagination-container" style={{ marginTop: "20px", textAlign: "center" }}>
          <Pagination 
            current={currentPage}
            pageSize={pageSize}
            total={catList.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </CategoryLayout>
  );
};

export default CatCategory;
