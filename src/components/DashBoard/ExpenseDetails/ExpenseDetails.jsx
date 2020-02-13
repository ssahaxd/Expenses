import React, { Component } from "react";
import Title from "../Title";

import { connect } from "react-redux";
import { withFirebase } from "../../Firebase/context";
import { withRouter } from "react-router-dom";
import AddExpenseModal from "./AddExpenseModal/AddExpenseModal";
import ExpenseTable from "./expenseTable";

import {
    setExpGrId,
    setShowingTableTrue,
    setShowingTableFalse,
    setExpenses,
    setLoadingTrue,
    setLoadingFalse,
    resetUid,
    setShowingSignUpTrue,
    setShowingSignUpFalse
} from "../../../redux";

class ExpenseDetails extends Component {
    _getExpGrUsers = gid => {
        const users = this.props.expGropus.filter(g => {
            return g.key === gid;
        })[0].users;
        return users;
    };

    _updateExpense = expenseData => {
        this.props.firebase
            .addExpense(expenseData)
            .then(docRef => {
                console.log("Expense group created with ID: ", docRef.id);
            })
            .catch(error => {
                console.log(
                    "error while creating expense group data",
                    error.message
                );
            });
    };

    handleNewExpense = ({ name, amount, category, subcategory, date }) => {
        const processedData = {
            name: name.trim().toLocaleLowerCase(),
            category: category,
            subcategory: subcategory,
            date: date.format("DD-MM-YYYY"),
            amount: parseFloat(amount),
            gid: this.props.expGrId
        };
        this._updateExpense(processedData);
    };

    render() {
        return (
            <div>
                {this.props.expGrId ? (
                    <div id={this.props.expGrId}>
                        <Title
                            title="Expense Details"
                            buttons={[
                                <AddExpenseModal
                                    key="Expense"
                                    handleNewExpense={this.handleNewExpense}
                                    users={this._getExpGrUsers(
                                        this.props.expGrId
                                    )}
                                />
                            ]}
                            content={<ExpenseTable />}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showSignup: state.user.showSignup,
        uid: state.user.uid,
        userInfo: state.user.userInfo,
        showingTable: state.expensesTable.showingTable,
        expGrId: state.expensesTable.expGrId,
        expGropus: state.expGroup.userExpGropus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setExpGrId: gid => dispatch(setExpGrId(gid)),
        setShowingTableTrue: () => dispatch(setShowingTableTrue()),
        setShowingTableFalse: () => dispatch(setShowingTableFalse()),
        setExpenses: () => dispatch(setExpenses()),
        setLoadingTrue: () => dispatch(setLoadingTrue()),
        setLoadingFalse: () => dispatch(setLoadingFalse()),
        resetUid: () => dispatch(resetUid()),
        setShowingSignUpTrue: () => dispatch(setShowingSignUpTrue()),
        setShowingSignUpFalse: () => dispatch(setShowingSignUpFalse())
    };
};

export default ExpenseDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(withRouter(ExpenseDetails)));
