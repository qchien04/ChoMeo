import React, { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { usePage, router } from "@inertiajs/react";
import LayoutDefault from "@/Layouts/AccountLayoutDefault";
import { Cage } from "@/Pages/CageCategory";
import { PageProps } from "@/types";
import "./Cage.css"; // Import file CSS mới

export default function Index({ cages }: PageProps<{ cages: Cage[] }>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  useEffect(() => {
    const activeCages = cages.filter((cage) => cage.is_active).map((cage) => cage.id);
    setSelectedRowKeys(activeCages);
  }, [cages]);

  const handleDelete = (cageId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa (active) Chuồng, Balo này?")) {
      router.put(`/admin/long/${cageId}/active`, { list: selectedRowKeys }, {
        onSuccess: () => {
          message.success("Chuồng, Balo đã được active thành công!");
        },
        onError: () => {
          message.error("Có lỗi xảy ra khi active Chuồng, Balo!");
        },
      });
    }
  };

  const handleActive = (keys: number[]) => {
    router.put(`/admin/long/active`, { list: keys }, {
      onSuccess: () => {
        message.success("Chuồng, Balo đã được active thành công!");
      },
      onError: () => {
        message.error("Có lỗi xảy ra khi active Chuồng, Balo!");
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
      className: "cage-table-header",
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
          <img src={image} alt="Ảnh chuồng, balo" className="cage-image" />
        ) : (
          "Không có ảnh"
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, cage: Cage) => (
        <div className="action-buttons">
          <Button
            type="primary"
            className="edit-button"
            onClick={() => router.get(`/admin/long/${cage.id}/edit`)}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="dashed"
            danger
            className="delete-button"
            onClick={() => handleDelete(cage.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <LayoutDefault>
      <div className="cage-table-container">
        <h1 className="cage-table-title">📦 Danh sách Chuồng, Balo</h1>
        {selectedRowKeys.length > 0 && (
          <Button
            type="default"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn active các Chuồng, Balo đã chọn?")) {
                handleActive(selectedRowKeys);
                setSelectedRowKeys([]);
              }
            }}
            className="delete-multiple-button"
          >
            Đặt vào trang trình diễn {selectedRowKeys.length} Chuồng, Balo đã chọn
          </Button>
        )}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={cages}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="cage-table"
        />
      </div>
    </LayoutDefault>
  );
}
