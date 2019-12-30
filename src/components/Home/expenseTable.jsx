import React, { Component } from "react";
import { getExpenses } from "../../redux";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import { Table, Row, Col } from "antd";
import { Columns } from "../../services/columns";
import WrappedFormComponent from "../form";
import StatisticComponent from "../statisticComponent";

class ExpenseTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            // expenses: [],
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
                this.setState({ loading: false });
                this.props.getExpenses(expenses);
            });
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
                    <StatisticComponent data={this.props.expenses} />
                </Col>
                <Col>
                    <WrappedFormComponent onDataAdd={this.handleAddData} />
                </Col>
                <Col span={24}>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={this.props.expenses}
                        onChange={this.handleChange}
                        scroll={{ x: 1000, y: 450 }}
                        size="middle"
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        expenses: state.expenses.expenses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getExpenses: payload => dispatch(getExpenses(payload))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(ExpenseTable));
