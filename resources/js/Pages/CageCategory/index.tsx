import CageCardItem from "@/Components/CageCardItem";
import "./Cage.css";
import CategoryLayout from '@/Layouts/CategoryLayout';
import { PageProps } from "@/types";
import { Col, Row, Pagination } from "antd";
import { useState } from "react";

export interface Cage {
  id: number;
  name: string;
  capacity: number;
  quantity: number;
  breed: string;
  price: number;
  description: string;
  parameter: string;
  image: string;
  evaluate: number;
  number_of_evaluate: number;
  is_active:boolean,
}

export default function CageCategoryDogCategory({ cageList }: PageProps<{ cageList?: Cage[] }>) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const currentCages = cageList ? cageList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    
    <CategoryLayout>
      <div className="dog-category-arena">
        <Row gutter={[16, 16]}>
          {currentCages.length > 0 ? (
            currentCages.map((cage) => (
              <Col span={6} key={cage.id}>
                <CageCardItem item={cage} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <p>No cages available.</p>
            </Col>
          )}
        </Row>
        <div className="pagination-container" style={{marginTop:20}}>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={cageList ? cageList.length : 0}
            onChange={onChangePage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </CategoryLayout>
  );
}
