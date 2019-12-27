import React, { Component } from "react";
import { getExpenses } from "../services/fakeExpenseService";
import { Columns } from "../services/columns";
import { Table, Row, Col } from "antd";
import StatisticComponent from "./statisticComponent";
import WrappedFormComponent from "./form";

class ExpenseTable extends Component {
    state = {
        expenses: getExpenses(),
        filteredInfo: null,
        sortedInfo: null
    };

    handleChange = (pagination, filters, sorter) => {
        // console.log(pagination, filters, sorter);

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter
        });
    };

    handleDelete = key => {
        const expenses = [...this.state.expenses];
        this.setState({
            expenses: expenses.filter(item => item.key !== key)
        });
    };

    handleAddData = ({ name, amount, date, category }) => {
        // console.log(values.date.format("YYYY-MM-DD"));

        const dataToadd = {
            key: "5b21ca3eeb7f6fbccd47jkj",
            name: name,
            category: {
                key: "5b21ca3eeb7f6fbccd471814",
                name: category[0]
            },
            subCategory: [...category.slice(1, 3)],
            date: date.format("YYYY-MM-DD"),
            amount: parseFloat(amount)
        };
        const expenses = [dataToadd, ...this.state.expenses];
        this.setState({
            expenses
        });
    };

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = Columns(filteredInfo, sortedInfo, this.handleDelete);
        return (
            <Row
                gutter={[0, 20]}
                type="flex"
                justify="space-around"
                align="middle"
            >
                <Col span={24}>
                    <StatisticComponent data={this.state.expenses} />
                </Col>
                <Col>
                    <WrappedFormComponent onDataAdd={this.handleAddData} />
                </Col>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={this.state.expenses}
                        onChange={this.handleChange}
                        scroll={{ x: 1000, y: 450 }}
                        size="middle"
                    />
                </Col>
            </Row>
        );
    }
}

export default ExpenseTable;
