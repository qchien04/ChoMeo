import React, { useState, useEffect } from "react"; 
import { Button, Table, message } from "antd";
import { usePage, router } from "@inertiajs/react";
import LayoutDefault from "@/Layouts/AccountLayoutDefault";
import { PageProps } from "@/types";
import { Accessory } from "@/Pages/AccessoryCategory";
import "./Accessory.css"; // Import file CSS mới

export default function Index({ accessories }: PageProps<{ accessories: Accessory[] }>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    const activeAccessories = accessories
      .filter((accessory) => accessory.is_active)
      .map((accessory) => accessory.id);
    setSelectedRowKeys(activeAccessories);
  }, [accessories]);

  const handleDelete = (accessoryId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phụ kiện này?")) {
      router.delete(`/admin/phu-kien/${accessoryId}`, {
        onSuccess: () => {
          message.success("Phụ kiện đã được xóa thành công!");
        },
        onError: () => {
          message.error("Có lỗi xảy ra khi xóa phụ kiện!");
        },
      });
    }
  };

  const handleActive = (keys: number[]) => {
    router.put(`/admin/phu-kien/active`, { list: keys }, {
      onSuccess: () => {
        message.success("Phụ kiện đã được active thành công!");
      },
      onError: () => {
        message.error("Có lỗi xảy ra khi active phụ kiện!");
      },
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys as number[]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      className: "accessory-table-header",
    },
    {
      title: "Giống",
      dataIndex: "breed",
      key: "breed",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: string) => (
        <span className="price">
          {parseInt(price).toLocaleString("vi-VN")} VND
        </span>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <img src={image} alt="Ảnh phụ kiện" className="accessory-image" />
        ) : (
          "Không có ảnh"
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, accessory: Accessory) => (
        <div className="action-buttons">
          <Button
            type="primary"
            className="edit-button"
            onClick={() => router.get(`/admin/phu-kien/${accessory.id}/edit`)}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="dashed"
            danger
            className="delete-button"
            onClick={() => handleDelete(accessory.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <LayoutDefault>
      <div className="accessory-table-container">
        <h1 className="accessory-table-title">🛍️ Danh sách Phụ kiện</h1>
        
        {selectedRowKeys.length > 0 && (
          <Button
            type="default"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn active các phụ kiện đã chọn?")) {
                handleActive(selectedRowKeys);
                setSelectedRowKeys([]);
              }
            }}
            className="delete-multiple-button"
          >
            Đặt vào trang trình diễn {selectedRowKeys.length} phụ kiện đã chọn
          </Button>
        )}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={accessories}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="accessory-table"
        />
      </div>
    </LayoutDefault>
  );
}
