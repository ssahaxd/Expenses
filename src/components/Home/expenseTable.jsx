import React, { Component } from "react";
// import { getExpenses } from "../../services/fakeExpenseService";
import { Columns } from "../../services/columns";
import { Table, Row, Col } from "antd";
import StatisticComponent from "../statisticComponent";
import WrappedFormComponent from "../form";
import { withFirebase } from "./../Firebase/context";

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
        this.unsubscribe = this.props.firebase
            .expenses()
            .onSnapshot(snapshot => {
                let expenses = [];
                snapshot.forEach(doc => {
                    expenses.push({ key: doc.id, ...doc.data() });
                });
                this.setState({ expenses, loading: false });
            });

        // this.setState({ loading: true });
        // this.unsubscribe = this.props.firebase
        //     .getExpenseByGroup("g1")
        //     .onSnapshot(snapshot => {
        //         let expenses = [];
        //         snapshot.forEach(doc => {
        //             expenses.push({ key: doc.id, ...doc.data() });
        //         });
        //         this.setState({ expenses, loading: false });
        //     });
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter
        });
    };

    handleDelete = key => {
        this.props.firebase.deleteExpense(key).catch(error => {
            console.log("error while Deleting", error);
        });
    };

    handleAddData = ({ name, amount, date, category }) => {
        const processedData = {
            name: name.trim().toLocaleLowerCase(),
            category: category[0],
            subCategory: [...category.slice(1, 3)],
            date: date.format("YYYY-MM-DD"),
            amount: parseFloat(amount),
            gid: "g1"
        };

        this.props.firebase
            .addExpense(processedData)
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(error => {
                console.log("error while writing data", error);
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
                <Col span={24}>
                    <StatisticComponent data={this.state.expenses} />
                </Col>
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
