import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import GroupList from "./GroupList/GroupList";
import UserDetails from "./UserDetails/UserDetails";

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
    showDetails = () => (
        <div>
            <UserDetails />
            <GroupList />
        </div>
    );

    render() {
        const { uid } = this.props;
        return (
            <div>
                {uid
                    ? this.showDetails()
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
