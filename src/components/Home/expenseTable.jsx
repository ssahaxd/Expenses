import React, { useEffect, useRef } from "react";
import {
    setExpenses,
    setLoadingTrue,
    setLoadingFalse,
    setSortedInfo,
    setFilteredInfo
} from "../../redux";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import { Table, Row, Col } from "antd";
import { Columns } from "../../services/columns";
import WrappedFormComponent from "../form";
import StatisticComponent from "../statisticComponent";

const ExpenseTable = props => {
    let {
        firebase,
        setExpenses,
        setLoadingTrue,
        setLoadingFalse,
        setFilteredInfo,
        setSortedInfo,
        expenses,
        loading,
        sortedInfo,
        filteredInfo
    } = props;

    const loadingRef = useRef();
    loadingRef.current = loading;

    useEffect(() => {
        setLoadingTrue();
        const unsubscribe = firebase.expenses().onSnapshot(
            snapshot => {
                let expenses = [];
                snapshot.forEach(doc => {
                    expenses.push({
                        key: doc.id,
                        ...doc.data()
                    });
                });
                setExpenses(expenses);
                if (loadingRef.current === true) setLoadingFalse();
            },
            error => {
                console.log("Error Fetching Expenses", error);
            }
        );

        return () => unsubscribe && unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const handleDelete = key => {
        firebase.deleteExpense(key).catch(error => {
            console.log("error while Deleting", error);
        });
    };

    const handleAddData = ({ name, amount, date, category }) => {
        const processedData = {
            name: name.trim().toLocaleLowerCase(),
            category: category[0],
            subcategory: [...category.slice(1, 3)],
            date: date.format("YYYY-MM-DD"),
            amount: parseFloat(amount),
            gid: "g1"
        };

        firebase
            .addExpense(processedData)
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(error => {
                console.log("error while writing data", error);
            });
    };

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = Columns(filteredInfo, sortedInfo, handleDelete);

    return (
        <Row gutter={[0, 20]} type="flex" justify="space-around" align="middle">
            <Col span={24}>
                <StatisticComponent data={expenses} />
            </Col>
            <Col>
                <WrappedFormComponent onDataAdd={handleAddData} />
            </Col>
            <Col span={24}>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={expenses}
                    onChange={handleChange}
                    scroll={{ x: 1000, y: 450 }}
                    size="middle"
                />
            </Col>
        </Row>
    );
};

// class ExpenseTable extends React.Component {
//     componentDidMount() {
//         this.props.setLoadingTrue();
//         this.unsubscribe = this.props.firebase
//             .expenses()
//             .onSnapshot(snapshot => {
//                 let expenses = [];
//                 snapshot.forEach(doc => {
//                     expenses.push({ key: doc.id, ...doc.data() });
//                 });
//                 this.props.setExpenses(expenses);
//                 if (this.props.loading === true) this.props.setLoadingFalse();
//             });
//     }

//     componentWillUnmount() {
//         this.unsubscribe && this.unsubscribe();
//     }

//     handleChange = (pagination, filters, sorter) => {
//         this.props.setFilteredInfo(filters);
//         this.props.setSortedInfo(sorter);
//     };

//     handleDelete = key => {
//         this.props.firebase.deleteExpense(key).catch(error => {
//             console.log("error while Deleting", error);
//         });
//     };

//     handleAddData = ({ name, amount, date, category }) => {
//         const processedData = {
//             name: name.trim().toLocaleLowerCase(),
//             category: category[0],
//             subCategory: [...category.slice(1, 3)],
//             date: date.format("YYYY-MM-DD"),
//             amount: parseFloat(amount),
//             gid: "g1"
//         };

//         this.props.firebase
//             .addExpense(processedData)
//             .then(docRef => {
//                 console.log("Document written with ID: ", docRef.id);
//             })
//             .catch(error => {
//                 console.log("error while writing data", error);
//             });
//     };

//     render() {
//         let { expenses, loading, sortedInfo, filteredInfo } = this.props;
//         sortedInfo = sortedInfo || {};
//         filteredInfo = filteredInfo || {};
//         const columns = Columns(filteredInfo, sortedInfo, this.handleDelete);
//         return (
//             <Row
//                 gutter={[0, 20]}
//                 type="flex"
//                 justify="space-around"
//                 align="middle"
//             >
//                 <Col span={24}>
//                     <StatisticComponent data={this.props.expenses} />
//                 </Col>
//                 <Col>
//                     <WrappedFormComponent onDataAdd={this.handleAddData} />
//                 </Col>
//                 <Col span={24}>
//                     <Table
//                         loading={loading}
//                         columns={columns}
//                         dataSource={expenses}
//                         onChange={this.handleChange}
//                         scroll={{ x: 1000, y: 450 }}
//                         size="middle"
//                     />
//                 </Col>
//             </Row>
//         );
//     }
// }

const mapStateToProps = state => {
    return {
        loading: state.expensesTable.loading,
        expenses: state.expensesTable.expenses,
        filteredInfo: state.expensesTable.filteredInfo,
        sortedInfo: state.expensesTable.sortedInfo
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
