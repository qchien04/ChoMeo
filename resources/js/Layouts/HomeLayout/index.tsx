

import { PropsWithChildren } from "react";
import TopBar from "../TopBar";
import Footer from "../Footer";
import "./HomLayout.css"
const HomeLayout:React.FC<PropsWithChildren>=({children})=>{
    
    return(
        <div className="home-layout">
           <TopBar></TopBar>
           <div className="content">{children}</div>
           <Footer></Footer>
        </div>
    )
}

export default HomeLayout;