import React, { Component } from "react";
import { getExpenses } from "../services/fakeExpenseService";
import { Columns } from "../services/columns";
import { Table } from "antd";
import StatisticComponent from "./statisticComponent";

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

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = Columns(filteredInfo, sortedInfo, this.handleDelete);
        return (
            <div>
                <StatisticComponent data={this.state.expenses} />

                <Table
                    className="mt-50"
                    columns={columns}
                    dataSource={this.state.expenses}
                    onChange={this.handleChange}
                    pagination={{ position: "none" }}
                    scroll={{ x: 1000, y: 450 }}
                    size="middle"
                />
            </div>
        );
    }
}

export default ExpenseTable;
