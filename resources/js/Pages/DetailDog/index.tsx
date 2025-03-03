import React, { useState } from "react";
import { Card, Descriptions, Tag, Row, Col, Input, Button } from "antd";
import DetailLayout from "@/Layouts/DetailLayout";
import "./Detail.css";
import { PageProps } from "@/types";
import { Dog } from "../DogCategory";

export default function Detail({ dog }: PageProps<{ dog: Dog }>) {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log("Bình luận mới:", comment);
      setComment(""); // Xóa nội dung sau khi gửi
    }
  };

  return (
    <DetailLayout>
      <div className="dog-detail-container">
        {/* Phần trên: Ảnh bên trái - Thông tin bên phải */}
        <Card className="dog-top-card">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={10}>
              <div className="dog-image-wrapper">
                <img src={dog.image} alt={dog.name} className="dog-image" />
              </div>
            </Col>
            <Col xs={24} md={14}>
              <div className="dog-info-wrapper">
                <h2 className="dog-name">{dog.name}</h2>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Giới tính">
                    {dog.gender === "Male" ? (
                      <Tag color="blue">Đực</Tag>
                    ) : (
                      <Tag color="magenta">Cái</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tuổi">
                    {dog.age} tuổi
                  </Descriptions.Item>
                  <Descriptions.Item label="Cân nặng">
                    {dog.weight} kg
                  </Descriptions.Item>
                  <Descriptions.Item label="Màu sắc">
                    {dog.color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Đã triệt sản">
                    {dog.sterilized ? (
                      <Tag color="green">Có</Tag>
                    ) : (
                      <Tag color="red">Không</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Đã tiêm vắc-xin">
                    {dog.vaccinated ? (
                      <Tag color="green">Có</Tag>
                    ) : (
                      <Tag color="red">Không</Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giá">
                    <span className="dog-price">{dog.price} VND</span>
                  </Descriptions.Item>
                </Descriptions>
                <div className="dog-description">
                  <Row>
                    <Col span={18} style={{overflowWrap:"break-word"}}><div>{dog.description} </div></Col>
                    <Col span={6}><p><Button
                      type="primary"
                      href="https://zalo.me/0968118125"
                      target="_blank"    
                      rel="noopener noreferrer"
                    >Chat Zalo ngay! </Button></p></Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Phần giữa: Gợi ý chó khác */}
        <Card className="dog-suggest-card">
          <h3>Các gợi ý chó khác</h3>
          <div className="dog-suggest-list">
            <div className="suggest-item">
              <img src="https://source.unsplash.com/200x150/?dog" alt="Chó 1" />
              <p>Chó 1</p>
            </div>
            <div className="suggest-item">
              <img src="https://source.unsplash.com/200x150/?puppy" alt="Chó 2" />
              <p>Chó 2</p>
            </div>
            <div className="suggest-item">
              <img src="https://source.unsplash.com/200x150/?canine" alt="Chó 3" />
              <p>Chó 3</p>
            </div>
          </div>
        </Card>

        {/* <Card className="dog-evaluation-card">
          <h3>Đánh giá và Bình luận</h3>
          <div className="evaluation-section">
            <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>
          </div>
        </Card> */}



      </div>
    </DetailLayout>
  );
};
