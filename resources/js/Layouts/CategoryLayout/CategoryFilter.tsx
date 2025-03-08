import { Form, Input, InputNumber, Select, Button } from "antd";
import { router, useForm } from "@inertiajs/react";

const { Option } = Select;

const CategoryFilter = ({ breeds, colors }: { breeds?: string[], colors?: string[] }) => {

  const searchParams = new URLSearchParams(window.location.search);
  const initialValues = {
    keyword: searchParams.get('keyword') || '',
    'min-price': searchParams.get('min-price') ? Number(searchParams.get('min-price')) : undefined,
    'max-price': searchParams.get('max-price') ? Number(searchParams.get('max-price')) : undefined,
    breed: searchParams.get('breed') || '',
    color: searchParams.get('color') || '',
    sort: searchParams.get('sort') || '',
  };
  const handleFilter = (values: any) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values)
        .filter(([_, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => [key, String(value)])
    ) as Record<string, string>;

    const queryString = new URLSearchParams(filteredValues).toString();
    router.get(`${window.location.pathname}?${queryString}`);
  };

  return (
    <div className="category-filter">
      <Form
      layout="vertical" 
      onFinish={handleFilter} 
      initialValues={initialValues}>
        <Form.Item label="Từ khóa" name="keyword">
          <Input placeholder="Nhập từ khóa tìm kiếm..." allowClear />
        </Form.Item>

        <Form.Item label="Giá tối thiểu" name="min-price">
          <InputNumber min={0} max={10000000} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Giá tối đa" name="max-price">
          <InputNumber min={0} max={10000000} style={{ width: "100%" }} />
        </Form.Item>

        {breeds&&<Form.Item label="Giống" name="breed">
          <Select
            showSearch
            placeholder="Chọn giống"
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="">Tất cả</Option>
            {breeds?.map((breed) => (
              <Option key={breed} value={breed}>{breed}</Option>
            ))}
          </Select>
        </Form.Item>}
        



        {colors&&<Form.Item label="Màu sắc" name="color">
          <Select
            showSearch
            placeholder="Chọn màu sắc"
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="">Tất cả</Option> 
            {colors?.map((color) => (
              <Option key={color} value={color}>{color}</Option>
            ))}
          </Select>
        </Form.Item>}

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
            Tìm kiếm
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default CategoryFilter;