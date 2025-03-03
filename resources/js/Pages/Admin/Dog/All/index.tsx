import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { usePage, router } from "@inertiajs/react";
import LayoutDefault from "@/Layouts/AccountLayoutDefault";
import { Dog } from "@/Pages/DogCategory";
import { PageProps } from "@/types";
import "./Dog.css"; // Import file CSS mới

export default function Index({ dogs }: PageProps<{ dogs: Dog[] }>) {
  console.log(dogs)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    const activeDogs = dogs.filter((dog) => dog.is_active).map((dog) => dog.id);
    setSelectedRowKeys(activeDogs);
  }, [dogs]);

  const handleDelete = (dogId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chó này?")) {
      router.put(`/admin/cho/${dogId}/active`, { list: selectedRowKeys }, {
        onSuccess: () => {
          message.success("Chó đã được active thành công!");
        },
        onError: () => {
          message.error("Có lỗi xảy ra khi active chó!");
        },
      });
    }
  };

  const handleActive = (selectedRowKeys: number[]) => {
    router.put(`/admin/cho/active`, { list: selectedRowKeys }, {
      onSuccess: () => {
        message.success("Chó đã được active thành công!");
      },
      onError: () => {
        message.error("Có lỗi xảy ra khi active chó!");
      },
    });
  };

  // Xử lý chọn hàng loạt
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
      className: "dog-table-header",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? <img src={image} alt="Ảnh chó" className="dog-image" /> : "Không có ảnh",
    },
    {
      title: "Giống",
      dataIndex: "breed",
      key: "breed",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) =>
        gender === "male" ? <span className="male">Đực</span> : <span className="female">Cái</span>,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Cân nặng (kg)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: string) => (
        <span className="price">{parseInt(price).toLocaleString("vi-VN")} VND</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, dog: Dog) => (
        <div className="action-buttons">
          <Button
            type="primary"
            className="edit-button"
            onClick={() => router.get(`/admin/cho/${dog.id}/edit`)}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="dashed"
            danger
            className="delete-button"
            onClick={() => handleDelete(dog.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <LayoutDefault>
      <div className="dog-table-container">
        <h1 className="dog-table-title">🐶 Danh sách Chó</h1>

        {/* Nút xóa hàng loạt */}
        {selectedRowKeys.length > 0 && (
          <Button
            type="default"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn active các chó đã chọn?")) {
                handleActive(selectedRowKeys);
                setSelectedRowKeys([]);
              }
            }}
            className="delete-multiple-button"
          >
            Đặt vào trang trình diễn {selectedRowKeys.length} chó đã chọn
          </Button>
        )}

        <Table
          rowSelection={rowSelection} 
          columns={columns}
          dataSource={dogs}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="dog-table"
        />
      </div>
    </LayoutDefault>
  );
}
