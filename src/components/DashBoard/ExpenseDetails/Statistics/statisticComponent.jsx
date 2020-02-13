import React from "react";
import { Statistic, Row, Col } from "antd";
import { connect } from "react-redux";

const StatisticComponent = ({ expenses, users, filteredInfo }) => {
    if (filteredInfo !== null && filteredInfo.name !== null) {
        expenses = expenses.filter(exp => filteredInfo.name.includes(exp.name));
        users = filteredInfo.name;
    }

    let totalExpense = expenses.reduce((accumulator, currentVal) => {
        return accumulator + parseFloat(currentVal["amount"]);
    }, 0);

    return (
        <Row type="flex" justify="space-around" align="middle">
            <Col span={6} xs={24} md={6}>
                <Statistic title="TOTAL" value={totalExpense} prefix="₹" />
            </Col>

            <Col span={6} xs={24} md={6}>
                <Statistic
                    title="Average"
                    value={(totalExpense / users.length).toFixed(2)}
                    prefix="₹"
                    suffix={`/ person (${users.length})`}
                />
            </Col>
        </Row>
    );
};

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

export default connect(mapStateToProps)(StatisticComponent);
