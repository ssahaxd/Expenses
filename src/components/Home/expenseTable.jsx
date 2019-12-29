import React, { Component } from "react";
import { getExpenses } from "../../services/fakeExpenseService";
import { Columns } from "../../services/columns";
import { Table, Row, Col } from "antd";
import StatisticComponent from "../statisticComponent";
import WrappedFormComponent from "../form";
import { withFirebase } from "./../Firebase/context";
import { titleCase } from "voca";

class ExpenseTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            expenses: [],
            filteredInfo: null,
            sortedInfo: null
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.expenses().on("value", snapshot => {
            if (snapshot.val() !== null) {
                const data = snapshot.val();
                const expenses = Object.keys(data).map(id => {
                    return { key: id, ...data[id] };
                });

                this.setState({ expenses, loading: false });
            } else this.setState({ loading: false });
        });
    }

    handleChange = (pagination, filters, sorter) => {
        // console.log(pagination, filters, sorter);

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter
        });
    };

    handleDelete = key => {
        this.props.firebase
            .deleteExpense(key)
            .then(() => {
                const expenses = [...this.state.expenses];
                this.setState({
                    expenses: expenses.filter(item => item.key !== key)
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleAddData = ({ name, amount, date, category }) => {
        const processedData = {
            name: titleCase(name.trim()),
            category: titleCase(category[0]),
            subCategory: [...category.slice(1, 3)],
            date: date.format("YYYY-MM-DD"),
            amount: parseFloat(amount)
        };

        this.props.firebase
            .addExpense(processedData)
            // .then(({ key }) => {
            //     const expenses = [
            //         { key: key, ...processedData },
            //         ...this.state.expenses
            //     ];
            //     this.setState({ expenses });
            // })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        let { sortedInfo, filteredInfo, loading } = this.state;
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
                {/* <Col span={24}>
                    <StatisticComponent data={this.state.expenses} />
        </Col>*/}
                <Col>
                    <WrappedFormComponent onDataAdd={this.handleAddData} />
                </Col>
                <Col span={24}>
                    <Table
                        loading={loading}
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

export default withFirebase(ExpenseTable);
