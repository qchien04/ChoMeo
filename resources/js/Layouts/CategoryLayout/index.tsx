

import { PropsWithChildren } from "react";
import TopBar from "../TopBar";
import Footer from "../Footer";
import "./CategoryLayout.css"
import { Col, Row } from "antd";
import CategoryFilter from "./CategoryFilter";


const CategoryLayout:React.FC<PropsWithChildren>=({children})=>{
    
    return(
        <div className="category-layout">
           <TopBar></TopBar>
           <div className="content" style={{width:"100vh"}}>
                    <Row style={{minWidth: 1400}}>
                        <Col span={5}>
                            <CategoryFilter />
                        </Col>
                        <Col span={19}>
                            <div>{children}</div>
                        </Col>
                    </Row>

            </div>
           <Footer></Footer>
        </div>
    )
}

export default CategoryLayout;