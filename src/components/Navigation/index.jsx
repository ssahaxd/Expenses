import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import SignOutButton from "../SignOut";

import * as ROUTER from "../../constants/routes";

function Navigation(props) {
    console.log(props);

    return (
        <Layout.Header className="header">
            <div className="logo"></div>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
                selectedKeys={[props.location.pathname]}
            >
                <Menu.Item key={ROUTER.LANDING}>
                    <Link to={ROUTER.LANDING}>LANDING</Link>
                </Menu.Item>
                <Menu.Item key={ROUTER.HOME}>
                    <Link to={ROUTER.HOME}>HOME</Link>
                </Menu.Item>
                <Menu.Item key={ROUTER.SIGN_IN}>
                    <Link to={ROUTER.SIGN_IN}>SIGN_IN</Link>
                </Menu.Item>
                <Menu.Item key={ROUTER.SIGN_UP}>
                    <Link to={ROUTER.SIGN_UP}>SIGN_UP</Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
}

export default Navigation;
