import { useState } from "react";
import { Col, Row, Pagination } from "antd";
import CardItem from "@/Components/CardItem";
import "./Dog.css";
import CategoryLayout from '@/Layouts/CategoryLayout';
import { PageProps } from "@/types";

export interface Dog {
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
  is_active?:boolean,
}

export default function DogCategoryDogCategory({ dogList }: PageProps<{ dogList: Dog[] }>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; 

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDogs = dogList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CategoryLayout>
      <div className="dog-category-arena">
        <Row gutter={[16, 16]}>
          {currentDogs.length > 0 ? (
            currentDogs.map((dog, index) => (
              <Col span={6} key={dog.id}>
                <CardItem key={index} item={dog} category="cho" />
              </Col>
            ))
          ) : (
            <p>Không có chó nào.</p>
          )}
        </Row>
        <div className="pagination-container" style={{ marginTop: "20px", textAlign: "center" }}>
          <Pagination 
            current={currentPage}
            pageSize={pageSize}
            total={dogList.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </CategoryLayout>
  );
}
