import { Card, Col, Row } from "antd"
import "./Section.comonent.css"
import CardItem from "../CardItem";

interface Item{
    picture:string,
    price:string,
    name:string,
    evaluate:number,
    link:string,

}

interface PropSection{
    header?:string,  
    option?:string[],
    item?:Item[],
}

const Section:React.FC<PropSection>=({header,option,item})=>{


    return(
        <Card className="section-category"
            hoverable
            title={header}
        >
        {/* <Row>
            <Col span={24}>Chó </Col>
        </Row> */}
        <Row align={"middle"}> 
            <Col span={6}>
                <CardItem ></CardItem>
            </Col>
            <Col span={6}>
                <CardItem></CardItem>
            </Col>
            <Col span={6}>
                <CardItem></CardItem>
            </Col>
            <Col span={6}>
                <CardItem></CardItem>
            </Col>

        </Row>
        
        </Card>
    )


}

export default Section;