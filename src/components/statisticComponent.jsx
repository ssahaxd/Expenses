import React from "react";
import { Statistic, Row, Col } from "antd";

const StatisticComponent = ({ data }) => {
    const totalExpense = data.reduce((accumulator, currentVal) => {
        // console.log(accumulator, currentVal["amount"]);

        return accumulator + parseFloat(currentVal["amount"]);
    }, 0);
    let allPersons = new Set();
    data.forEach(element => {
        allPersons.add(element.name);
    });

    return (
        <Row type="flex" justify="space-around" align="middle">
            <Col span={6} xs={24} md={6}>
                <Statistic title="TOTAL" value={totalExpense} prefix="₹" />
            </Col>
            <Col span={6} xs={24} md={6}>
                <Statistic
                    title="Average"
                    value={totalExpense / allPersons.size}
                    prefix="₹"
                    suffix={`/ person (${allPersons.size})`}
                />
            </Col>
        </Row>
    );
};

export default StatisticComponent;
