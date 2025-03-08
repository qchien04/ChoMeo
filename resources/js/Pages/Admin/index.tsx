import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LayoutDefault from '@/Layouts/AccountLayoutDefault';

interface MonthlySale {
  month: string;
  sales: number;
}

interface PageProps {
  totalDogs: number;
  totalCats: number;
  totalCages: number;
  totalAccessories: number;
  totalSold: number;
  lastMonthSold: number;
  totalCustomers: number;
  monthlySales: MonthlySale[];
  monthlyRevenue: { month: string; revenue: number }[];
}

export default function Admin({
  totalSold,
  lastMonthSold,
  totalCustomers,
  monthlySales,
  totalDogs,
  totalCats,
  totalCages,
  totalAccessories,
  monthlyRevenue,
}: PageProps) {
  const maxSalesVal = Math.max(...monthlySales.map(sale => Number(sale.sales)));
  const maxRevenueVal = Math.max(...monthlyRevenue.map(rev => Number(rev.revenue)));

  return (
    <LayoutDefault>
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, #f0f2f5 0%, #e6e9f0 100%)',
        minHeight: '100vh',
      }}>
        {/* Top Statistics */}
        <Row gutter={[20, 20]} style={{ marginBottom: '30px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Tổng sản phẩm đã bán"
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                background: '#fff',
                transition: 'all 0.3s',
              }}
              hoverable
            >
              <Statistic value={totalSold} suffix="sản phẩm" valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Sản phẩm bán 30 ngày gần nhất"
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                background: '#fff',
              }}
              hoverable
            >
              <Statistic value={lastMonthSold} suffix="sản phẩm" valueStyle={{ color: '#13c2c2' }} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Tổng khách hàng"
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                background: '#fff',
              }}
              hoverable
            >
              <Statistic value={totalCustomers} suffix="khách hàng" valueStyle={{ color: '#eb2f96' }} />
            </Card>
          </Col>
        </Row>

        {/* Animal & Product Statistics */}
        <Row gutter={[20, 20]} style={{ marginBottom: '30px' }}>
          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              <Statistic title="Số chó" value={totalDogs} valueStyle={{ color: '#fa8c16' }} />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              <Statistic title="Số mèo" value={totalCats} valueStyle={{ color: '#f5222d' }} />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              <Statistic title="Số lượng lồng" value={totalCages} valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card
              bordered={false}
              style={{
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              <Statistic title="Số lượng phụ kiện" value={totalAccessories} valueStyle={{ color: '#722ed1' }} />
            </Card>
          </Col>
        </Row>

        {/* Biểu đồ xu hướng số sản phẩm bán theo tháng */}
        <Card
          title="Xu hướng sản phẩm bán theo tháng"
          style={{
            marginBottom: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            background: '#fff',
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ecef" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis domain={[0, maxSalesVal + 20]} stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Biểu đồ doanh thu theo tháng */}
        <Card
          title="Doanh thu theo tháng"
          style={{
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            background: '#fff',
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ecef" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis domain={[0, maxRevenueVal * 1.2]} stroke="#666" />
              <Tooltip
                formatter={(value: number) => `${parseInt(value.toString()).toLocaleString()} VND`}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3f8600"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </LayoutDefault>
  );
}