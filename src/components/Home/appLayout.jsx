import React, { Component } from "react";
import { Layout } from "antd";
import ExpenseTable from "../ExpenseTable/expenseTable";

const { Content } = Layout;

class AppLayout extends Component {
    state = {};
    render() {
        return (
            <Layout>
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
