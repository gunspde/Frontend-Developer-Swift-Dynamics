import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer } from "antd";
import RightMenu from "./menu";
import { MenuOutlined } from "@ant-design/icons";
import LeftMenu from "./mainMenu";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setVisible(false);
  
  }, []);

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
          <div className="leftMenu">
              <LeftMenu mode={"inline"} />
            </div>
          </div>

          <div className="navbar-menu">
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
           
            <div className="rightMenu" id="rightMenu">
              <RightMenu mode={"inline"} setVisible={setVisible} />
            </div>
            <Drawer
              title={"Welcome"}
              placement="left"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            > 
                <LeftMenu mode={"inline"} />
                <RightMenu mode={"inline"} setVisible={setVisible} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;