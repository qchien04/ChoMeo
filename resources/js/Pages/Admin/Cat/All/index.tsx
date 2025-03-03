import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { usePage, router } from "@inertiajs/react";
import LayoutDefault from "@/Layouts/AccountLayoutDefault";
import { Cat } from "@/Pages/CatCategory";
import { PageProps } from "@/types";
import "./Cat.css";

export default function Index({ cats }: PageProps<{ cats: Cat[] }>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    const activeCats = cats.filter((cat) => cat.is_active).map((cat) => cat.id);
    setSelectedRowKeys(activeCats);
  }, [cats]);

  const handleDelete = (catId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa (active) mèo này?")) {
      router.put(`/admin/meo/${catId}/active`, { list: selectedRowKeys }, {
        onSuccess: () => {
          message.success("Mèo đã được active thành công!");
        },
        onError: () => {
          message.error("Có lỗi xảy ra khi active mèo!");
        },
      });
    }
  };

  const handleActive = (keys: number[]) => {
    router.put(`/admin/meo/active`, { list: keys }, {
      onSuccess: () => {
        message.success("Mèo đã được active thành công!");
      },
      onError: () => {
        message.error("Có lỗi xảy ra khi active mèo!");
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
      className: "cat-table-header",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? <img src={image} alt="Ảnh mèo" className="cat-image" /> : "Không có ảnh",
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
      render: (_: any, cat: Cat) => (
        <div className="action-buttons">
          <Button
            type="primary"
            className="edit-button"
            onClick={() => router.get(`/admin/meo/${cat.id}/edit`)}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="dashed"
            danger
            className="delete-button"
            onClick={() => handleDelete(cat.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <LayoutDefault>
      <div className="cat-table-container">
        <h1 className="cat-table-title">🐱 Danh sách Mèo</h1>

        {selectedRowKeys.length > 0 && (
          <Button
            type="default"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn active các mèo đã chọn?")) {
                handleActive(selectedRowKeys);
                setSelectedRowKeys([]);
              }
            }}
            className="delete-multiple-button"
          >
            Đặt vào trang trình diễn {selectedRowKeys.length} mèo đã chọn
          </Button>
        )}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={cats}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="cat-table"
        />
      </div>
    </LayoutDefault>
  );
}
