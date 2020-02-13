import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import * as ROUTER from "../../constants/routes";

const Navigation = () => {
    return (
        <Layout.Header className="header">
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
                <Menu.Item key={ROUTER.DASHBOARD}>
                    <Link to={ROUTER.DASHBOARD}>Dashboard</Link>
                </Menu.Item>
                {/* <Menu.Item key={ROUTER.GROUP}>
                    <Link to={ROUTER.GROUP}>Group</Link>
                </Menu.Item> */}
            </Menu>
        </Layout.Header>
    );
};

export default Navigation;
