import { PropsWithChildren } from "react";
import TopBar from "../TopBar";
import Footer from "../Footer";
import "./CategoryLayout.css";
import { Col, Row } from "antd";
import CategoryFilter from "./CategoryFilter";

interface CategoryLayoutProps extends PropsWithChildren {
    filters?: any;
    breeds?: string[];
    colors?: string[];
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({ children, breeds, colors }) => {
    return (
        <div className="category-layout">
            <TopBar />
            <div className="content" style={{ width: "100vh" }}>
                <Row style={{ minWidth: 1400 }}>
                    <Col span={5}>
                        <CategoryFilter breeds={breeds} colors={colors} />
                    </Col>
                    <Col span={19}>
                        <div>{children}</div>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryLayout;
