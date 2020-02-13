import React, { Component } from "react";
import {
    setExpenses,
    setLoadingTrue,
    setLoadingFalse,
    setSortedInfo,
    setFilteredInfo
} from "../../../redux";
import { connect } from "react-redux";
import { withFirebase } from "../../Firebase/context";
import { Table } from "antd";
import { Columns } from "../../../constants/columns";
import StatisticComponent from "./Statistics/statisticComponent";

export class ExpenseTable extends Component {
    _getExpGrUsers = gid => {
        const users = this.props.expGropus.filter(g => {
            return g.key === gid;
        })[0].users;
        return users;
    };

    users = this._getExpGrUsers(this.props.gid);

    _fetchAndSaveData = () => {
        this.props.setLoadingTrue();
        const unsubscribe = this.props.firebase
            .getExpenseByGroup(this.props.gid)
            .onSnapshot(snapshot => {
                let expenses = [];
                snapshot.forEach(doc => {
                    expenses.push({ key: doc.id, ...doc.data() });
                });
                this.props.setExpenses(expenses);
                this.props.setLoadingFalse();
            });
        return unsubscribe;
    };

    componentDidMount() {
        this.unsubscribe = this._fetchAndSaveData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gid !== this.props.gid) {
            this.unsubscribe && this.unsubscribe();
            this.unsubscribe = this._fetchAndSaveData();
        }
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    handleChange = (pagination, filters, sorter) => {
        this.props.setFilteredInfo(filters);
        this.props.setSortedInfo(sorter);
    };

    handleDelete = key => {
        this.props.firebase.deleteExpense(key).catch(error => {
            console.log("error while Deleting", error);
        });
    };

    render() {
        let { expenses, loading, sortedInfo, filteredInfo } = this.props;

        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = Columns(
            filteredInfo,
            sortedInfo,
            this.handleDelete,
            this.users
        );
        return (
            <div>
                <StatisticComponent data={expenses} users={this.users} />
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={expenses}
                    onChange={this.handleChange}
                    scroll={{ x: 1000, y: 450 }}
                    size="middle"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gid: state.expensesTable.expGrId,
        loading: state.expensesTable.loading,
        expenses: state.expensesTable.expenses,
        filteredInfo: state.expensesTable.filteredInfo,
        sortedInfo: state.expensesTable.sortedInfo,
        expGropus: state.expGroup.userExpGropus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setExpenses: expenses => dispatch(setExpenses(expenses)),
        setLoadingTrue: () => dispatch(setLoadingTrue()),
        setLoadingFalse: () => dispatch(setLoadingFalse()),
        setFilteredInfo: filters => dispatch(setFilteredInfo(filters)),
        setSortedInfo: sorter => dispatch(setSortedInfo(sorter))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(ExpenseTable));
