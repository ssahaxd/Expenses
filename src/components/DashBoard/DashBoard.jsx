import React, { Component } from "react";
import { connect } from "react-redux";

import { withFirebase } from "./../Firebase/context";

import AddGropuModal from "./AddGroupModal/AddGroupModal";
import ExpenseTable from "./expenseTable";
import { SignInForm } from "../SignIn/signInPage";
import ExpGropuList from "./ExpGroupList";
import Description from "./Descriptions";
import Title from "./Title";

import {
    setExpGrId,
    setShowingTableTrue,
    setShowingTableFalse,
    setExpenses,
    setLoadingTrue,
    setLoadingFalse
} from "../../redux";

class DashBoardBase extends Component {
    showLogin = () => (
        <Title
            title="Hi, There Please Login"
            buttons={[]}
            content={<SignInForm />}
        />
    );

    showDetails = userInfo => (
        <div>
            <Title
                title={`Hi, ${userInfo.firstname}`}
                buttons={[]}
                content={<Description userInfo={userInfo} />}
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
                <Title
                    title="Expense Details"
                    buttons={[]}
                    content={<ExpenseTable />}
                />
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
        values.users.push(this.props.userInfo.username);
        this.props.firebase
            .addExpGroup(values)
            .then(docRef => {
                console.log("Group created with id ", docRef.id);
            })
            .catch(error => {
                console.log("opps error", error.message);
            });
    };

    render() {
        const { uid, userInfo } = this.props;
        return <div>{uid ? this.showDetails(userInfo) : this.showLogin()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid,
        userInfo: state.user.userInfo,
        showingTable: state.expensesTable.showingTable,
        expGrId: state.expensesTable.expGrId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setExpGrId: gid => dispatch(setExpGrId(gid)),
        setShowingTableTrue: () => dispatch(setShowingTableTrue()),
        setShowingTableFalse: () => dispatch(setShowingTableFalse()),
        setExpenses: () => dispatch(setExpenses()),
        setLoadingTrue: () => dispatch(setLoadingTrue()),
        setLoadingFalse: () => dispatch(setLoadingFalse())
    };
};

const DashBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(DashBoardBase));

export default DashBoard;
