import React, { Component } from "react";
import Title from "./Title";
import Description from "./Descriptions";
import ExpGropuList from "./ExpGroupList";
import AddGropuModal from "./AddGroupModal/AddGroupModal";
import { SignInForm } from "../SignIn/signInPage";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import ExpenseTable from "../ExpenseTable/expenseTable";

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
                content={<ExpGropuList />}
            />
            {this.props.showingTable ? (
                <Title
                    title="Expense Details"
                    buttons={[
                        <AddGropuModal
                            key="Group"
                            handleNewGroup={this.handleNewGroup}
                        />
                    ]}
                    content={<ExpenseTable />}
                />
            ) : (
                ""
            )}
        </div>
    );
    handleNewGroup = values => {
        values.users.push(this.props.userInfo.username);
        this.props.firebase
            .addExpGroup(values)
            .then(docRef => {
                console.log("exp gr created with id ", docRef.id);
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
        showingTable: state.expensesTable.showingTable
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setExpenses: expenses => dispatch(setExpenses(expenses)),
    };
};

const DashBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(withFirebase(DashBoardBase));

export default DashBoard;
