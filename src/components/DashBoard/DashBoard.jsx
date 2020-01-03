import React, { Component } from "react";
import { connect } from "react-redux";

import { withFirebase } from "./../Firebase/context";

import AddGropuModal from "./AddGroupModal/AddGroupModal";
import AddExpenseModal from "./AddExpenseModal/AddExpenseModal";
import ExpenseTable from "./expenseTable";
import { SignInForm } from "../SignIn/signInPage";
import { SignUpForm } from "../SignUp/signUpPage";
import ExpGropuList from "./ExpGroupList";
import Description from "./Descriptions";
import Title from "./Title";
import { Button } from "antd";

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
} from "../../redux";

class DashBoardBase extends Component {
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

    _getExpGrUsers = gid => {
        const users = this.props.expGropus.filter(g => {
            return g.key === gid;
        })[0].users;
        return users;
    };

    _handleSignOut = () => {
        this.props.firebase.doSignOut();
        localStorage.clear();
        this.props.resetUid();
    };
    _onSignUp = () => {
        this.props.setShowingSignUpTrue();
    };
    _onSignIn = () => {
        this.props.setShowingSignUpFalse();
    };

    showLogin = () => (
        <Title
            title="Hi, There Please Login"
            buttons={[
                <Button key="SignUp" type="button" onClick={this._onSignUp}>
                    Sign Up
                </Button>
            ]}
            content={<SignInForm />}
        />
    );

    showSignUp = () => (
        <Title
            title="Sign up"
            buttons={[
                <Button key="SignIn" type="button" onClick={this._onSignIn}>
                    Sign In
                </Button>
            ]}
            content={<SignUpForm />}
        />
    );

    showDetails = userInfo => (
        <div>
            <Title
                title={`Hi, ${userInfo.firstname}`}
                content={<Description userInfo={userInfo} />}
                buttons={[
                    <Button
                        key="signout"
                        type="button"
                        onClick={this._handleSignOut}
                    >
                        Sign Out
                    </Button>
                ]}
            />
            <Title
                title="Expense Gropus"
                buttons={[
                    <AddGropuModal
                        key="Group"
                        handleNewGroup={this.handleNewGroup}
                    />
                ]}
                content={<ExpGropuList onGrSelect={this.onGrSelect} />}
            />
            {this.props.showingTable ? (
                <div id={this.props.expGrId}>
                    <Title
                        title="Expense Details"
                        buttons={[
                            <AddExpenseModal
                                key="Expense"
                                handleNewExpense={this.handleNewExpense}
                                users={this._getExpGrUsers(this.props.expGrId)}
                            />
                        ]}
                        content={<ExpenseTable />}
                    />
                </div>
            ) : null}
        </div>
    );

    onGrSelect = gid => {
        if (gid === this.props.expGrId) {
            this.props.setShowingTableFalse();
            this.props.setExpGrId(null);
        } else {
            this.props.setExpGrId(gid);

            if (!this.props.showingTable) this.props.setShowingTableTrue();
        }
    };

    handleNewGroup = values => {
        values.users
            ? values.users.push(this.props.userInfo.firstname)
            : (values.users = [this.props.userInfo.firstname]);
        this.props.firebase
            .addExpGroup(values)
            .then(docRef => {
                console.log("Group created with id ", docRef.id);
            })
            .catch(error => {
                console.log("opps error", error.message);
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
        const { uid, userInfo } = this.props;
        return (
            <div>
                {uid
                    ? this.showDetails(userInfo)
                    : this.props.showSignup
                    ? this.showSignUp()
                    : this.showLogin()}
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

const DashBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(DashBoardBase));

export default DashBoard;
