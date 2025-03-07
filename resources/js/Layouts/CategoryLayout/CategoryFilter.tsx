import { Form, InputNumber, Select, Button } from "antd";
import { useForm } from "@inertiajs/react";

const { Option } = Select;

const CategoryFilter = ({ filters }: { filters: any }) => {
  const [form] = Form.useForm();
  const { get, data, setData } = useForm(filters); 

  const handleFilter = (values: any) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)]) 
    ) as Record<string, string>;
  
    const queryString = new URLSearchParams(filteredValues).toString();
    console.log("Query string:", queryString);
    get(`${window.location.pathname}?${queryString}`);
  };

  return (
    <div className="category-filter">
      <Form form={form} layout="vertical" onFinish={handleFilter} initialValues={filters}>
        <Form.Item label="Giá tối thiểu" name="min-price">
          <InputNumber min={0} max={10000000} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Giá tối đa" name="max-price">
          <InputNumber min={0} max={10000000} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Sắp xếp" name="sort">
          <Select placeholder="Chọn kiểu sắp xếp">
            <Option value="price-asc">Giá: Tăng dần</Option>
            <Option value="price-desc">Giá: Giảm dần</Option>
            <Option value="name-asc">Tên: A-Z</Option>
            <Option value="name-desc">Tên: Z-A</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Áp dụng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryFilter;
