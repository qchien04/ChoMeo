

import { PropsWithChildren } from "react";
import TopBar from "../TopBar";
import Footer from "../Footer";
import "./DetailLayout.css"
const DetailLayout:React.FC<PropsWithChildren>=({children})=>{
    
    return(
        <div className="detail-layout">
           <TopBar fixed={false}></TopBar>
           <div className="content">{children}</div>
           <Footer></Footer>
        </div>
    )
}

export default DetailLayout;