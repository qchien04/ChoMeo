import React, { useState } from "react";
import { Card, Descriptions, Tag, Row, Col, List, Input, Button, message, Rate, Modal, InputNumber } from "antd";
import DetailLayout from "@/Layouts/DetailLayout";
import "./DetailAccessory.css";
import { PageProps } from "@/types";
import { Accessory } from "../AccessoryCategory"; 
import { router, usePage } from '@inertiajs/react';
import CACard from "@/Components/CACard";

export default function Cart({ accessory, comments: initialComments,suggested }: PageProps<{ accessory: Accessory, comments: any[],suggested:Accessory[] }>) {
  const { props } = usePage();
  console.log(accessory);
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0); // state để lưu đánh giá mới
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) {
      message.error("Vui lòng nhập bình luận!");
      return;
    }
    console.log(newComment);
    setLoading(true);
    // Gửi dữ liệu bao gồm nội dung và đánh giá (rating)
    router.post(`/accessory/${accessory.id}/comment`, { content: newComment, rate: newRating }, {
      onSuccess: () => {
        setNewComment("");
        setNewRating(0);
        setLoading(false);
        message.success("Bình luận đã được thêm!");
        // Reload trang để cập nhật danh sách bình luận mới
        router.reload();
      },
      onError: () => {
        setLoading(false);
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      },
    });
  };

  const handleBuyClick = () => {
    setIsModalVisible(true);
  };

  const handleBuySubmit = () => {
    
    router.post(`/gio-hang/add`, { item_id: accessory.id, type: 'accessory', quantity:quantity }, {
      onSuccess: () => {
        (false);
        message.success("Giỏ hàng đã được cập nhật!");
        setIsModalVisible(false);
        router.reload();
      },
      onError: () => {
        setIsModalVisible(false);
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      },
    });
    setIsModalVisible(false);
  };
  return (
    <DetailLayout>
      <div className="accessory-detail-container">
        {/* Phần trên: Hình ảnh bên trái - Thông tin bên phải */}
        <Card className="accessory-top-card">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <div className="accessory-image-wrapper">
                <img src={accessory.image} alt={accessory.name} className="accessory-image" />
              </div>
            </Col>
            <Col span={14}>
              <div className="accessory-info-wrapper">
                <h2 className="accessory-name">{accessory.name}</h2>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Số lượng">
                    {accessory.quantity}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giống">
                    {accessory.breed}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giá">
                    <span className="accessory-price">{accessory.price} VND</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Đánh giá">
                    <Tag color="gold">Điểm: {accessory.evaluate}</Tag>
                    <span> ({accessory.number_of_evaluate} đánh giá)</span>
                  </Descriptions.Item>
                </Descriptions>
                <div className="accessory-description">
                  <Row>
                    <Col span={18} style={{overflowWrap:"break-word"}}>
                      <div>{accessory.description}</div>
                    </Col>
                    <Col span={6}>
                      <p><Button type="primary" onClick={handleBuyClick}>
                                                Mua hàng
                        </Button></p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        <Card className="Accessory-suggest-card">
          <h2>Các gợi ý khác</h2>
          <div className="Accessory-suggest-list">
          <CACard typeItem="phu-kien" item={suggested[0]} key={suggested[0].id}></CACard>
          <CACard typeItem="phu-kien" item={suggested[1]} key={suggested[1].id}></CACard>
          <CACard typeItem="phu-kien" item={suggested[2]} key={suggested[2].id}></CACard>
          </div>
        </Card>

        {/* Phần dưới: Đánh giá và Bình luận */}
        <Card className="cage-evaluation-card">
          <h3>Đánh giá và Bình luận</h3>
          <div className="evaluation-section">
            <List
              style={{ height: 300, overflowY: "scroll" }}
              header={<div>{comments.length} Bình luận</div>}
              dataSource={comments}
              locale={{ emptyText: "Chưa có bình luận nào." }}
              renderItem={(comment: any) => (
                <List.Item key={comment.id}>
                  <List.Item.Meta
                    title={
                      <div>
                        <strong>{comment.user.name}</strong>
                        {comment.rate !== undefined && (
                          <Rate disabled defaultValue={comment.rate} style={{ marginLeft: 10 }} />
                        )}
                      </div>
                    }
                    description={comment.content}
                  />
                </List.Item>
              )}
            />
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <Input.TextArea
                rows={4}
                placeholder="Nhập bình luận của bạn..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div style={{ margin: "10px 0" }}>
                <span style={{ marginRight: 8 }}>Đánh giá: </span>
                <Rate value={newRating} onChange={(value) => setNewRating(value)} />
              </div>
              <Button type="primary" htmlType="submit" loading={loading} className="comment-submit-btn">
                Gửi bình luận
              </Button>
            </form>
          </div>
        </Card>
        <Modal
          title="Nhập số lượng mua"
          open={isModalVisible}
          onOk={handleBuySubmit}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Nhập số lượng bạn muốn mua:</p>
          <InputNumber min={1} value={quantity} defaultValue={1} onChange={(val) => setQuantity(val?val:1)} />
        </Modal>
      </div>
    </DetailLayout>
  );
}
