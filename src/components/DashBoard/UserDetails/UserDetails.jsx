import React, { Component } from "react";
import { connect } from "react-redux";

import { withFirebase } from "../../Firebase/context";

import { SignInForm } from "../../SignIn/signInPage";
import { SignUpForm } from "../../SignUp/signUpPage";

import Description from "../Descriptions";
import Title from "../Title";
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
} from "../../../redux";

class UserDetails extends Component {
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

    render() {
        const { userInfo } = this.props;
        return (
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(UserDetails));
