import React, { Component } from "react";
import { Layout, Menu } from "antd";
import ExpenseTable from "./expenseTable";

const { Header, Content } = Layout;

class AppLayout extends Component {
    state = {};
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["2"]}
                        style={{ lineHeight: "64px" }}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: "5px 50px" }}>
                    <Layout style={{ background: "#fff" }}>
                        <Content style={{ padding: "24px 24px" }}>
                            <ExpenseTable />
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export default AppLayout;
