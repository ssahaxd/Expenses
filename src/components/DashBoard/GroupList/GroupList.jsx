import React, { Component } from "react";
import Title from "../Title";
import ExpGropuList from "./ExpGroupList";
import AddGropuModal from "./AddGroupModal/AddGroupModal";
import { connect } from "react-redux";
import { withFirebase } from "../../Firebase/context";
import { withRouter } from "react-router-dom";
import cogoToast from "cogo-toast";

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

class GroupList extends Component {
    _getExpGrUsers = gid => {
        const users = this.props.expGropus.filter(g => {
            return g.key === gid;
        })[0].users;
        return users;
    };

    onGrSelect = gid => {
        if (gid === this.props.expGrId) {
            this.props.setShowingTableFalse();
            // this.props.setExpGrId(null);
        } else {
            this.props.setExpGrId(gid);

            if (!this.props.showingTable) this.props.setShowingTableTrue();
        }
        this.props.history.push("/expense-details");
    };

    handleNewGroup = values => {
        values.users
            ? values.users.push(this.props.userInfo.firstname)
            : (values.users = [this.props.userInfo.firstname]);
        this.props.firebase
            .addExpGroup(values)
            .then(docRef => {
                console.log("Group created with id ", docRef.id);
                cogoToast.success("Success!");
            })
            .catch(error => {
                console.log("opps error", error.message);
            });
    };

    render() {
        return (
            <div>
                <Title
                    title="Expense Gropus"
                    buttons={[
                        <AddGropuModal
                            key="Group"
                            handleNewGroup={this.handleNewGroup}
                            name="New Group"
                        />
                    ]}
                    content={<ExpGropuList onGrSelect={this.onGrSelect} />}
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
)(withFirebase(withRouter(GroupList)));
