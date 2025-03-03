import { Layout } from "antd";
import { PropsWithChildren, useState } from "react";
import MenuSider from "./Sider";
import TopBar from "../TopBar";

const {Sider,Content}=Layout;

const LayoutDefault:React.FC<PropsWithChildren>=({children})=>{
    const [collapsed,setCollapsed]=useState(false);
    return(
        <>
        <TopBar></TopBar>
        <Layout className="layout-default">
            <Layout>
                <Sider width={250} className="sider" 
                theme="light"
                        collapsedWidth={70} collapsed={collapsed}
                        style={{ 
                            transition: 'all 0.5s' 
                            }}
                    >
                    <MenuSider></MenuSider>
                </Sider>

                <Content className="content">
                    {children}
                </Content>

            </Layout>

        </Layout>

        </>
    )
}

export default LayoutDefault