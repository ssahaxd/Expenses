import React from "react";
import { withFirebase } from "../../../Firebase/context";
import { Statistic, Row, Col } from "antd";
import { connect } from "react-redux";
import MyResponsivePie from "./chart";

const StatisticComponent = props => {
    let { expenses, filteredInfo } = props;

    const _getExpGrUsers = gid => {
        const users = props.expGropus.filter(g => {
            return g.key === gid;
        })[0].users;
        return users;
    };
    let users = _getExpGrUsers(props.gid);

    if (filteredInfo !== null && filteredInfo.name.length !== 0) {
        expenses = expenses.filter(exp => filteredInfo.name.includes(exp.name));
        users = filteredInfo.name;
    }

    let totalExpense = expenses.reduce((accumulator, currentVal) => {
        return accumulator + parseFloat(currentVal["amount"]);
    }, 0);

    return (
        <div>
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
            <Row type="flex" justify="space-around" align="middle">
                <Col span={6} xs={24} md={6}>
                    <div
                        style={{
                            height: "25rem",
                            margin: "0 auto"
                        }}
                    >
                        <MyResponsivePie expenses={expenses} />
                    </div>
                </Col>
            </Row>
        </div>
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

export default connect(mapStateToProps)(withFirebase(StatisticComponent));
