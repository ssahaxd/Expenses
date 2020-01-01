import React, { Component } from "react";
import Title from "./Title";
import Description from "./Descriptions";
import ExpGropuList from "./ExpGroupList";
// import { SignUpForm } from "../SignUp/signUpPage";
import { SignInForm } from "../SignIn/signInPage";
import { connect } from "react-redux";

const showLogin = () => (
    <Title
        title="Hi, There Please Login"
        buttons={[]}
        content={<SignInForm />}
    />
);

const showDetails = userInfo => (
    <div>
        <Title
            title={`Hi, ${userInfo.firstname}`}
            buttons={[{ title: "Edit Profile", onclick: null }]}
            content={<Description userInfo={userInfo} />}
        />
        <Title
            title="Expense Gropus"
            buttons={[{ title: "Create A New Group", onclick: null }]}
            content={<ExpGropuList expgroups={userInfo.expgroups} />}
        />
    </div>
);

class DashBoardBase extends Component {
    render() {
        const { uid, userInfo } = this.props;

        console.log(userInfo);

        return <div>{uid ? showDetails(userInfo) : showLogin()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        uid: state.user.uid,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setExpenses: expenses => dispatch(setExpenses(expenses)),
    };
};

const DashBoard = connect(mapStateToProps, mapDispatchToProps)(DashBoardBase);

export default DashBoard;
