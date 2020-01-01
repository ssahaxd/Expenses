import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import { setUser } from "../../redux";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
const { Title, Text } = Typography;

class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, password } = values;
                this.props.firebase
                    .doSignInWithEmailAndPassword(email, password)
                    .then(({ user }) => {
                        this.props.firebase.user(user.uid).onSnapshot(
                            snapshot => {
                                const userdata = {
                                    uid: user.uid,
                                    userInfo: snapshot.data()
                                };

                                this.props.setUser({ ...userdata });
                                localStorage.setItem(
                                    "user",
                                    JSON.stringify(userdata)
                                );
                            },
                            error => {
                                console.log(
                                    "Error Fetcing profile data",
                                    error.message
                                );
                            }
                        );
                        // this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        console.log("Opps Error code", error.message);
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your email!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Email"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    <br />
                    <Text type="secondary">
                        Or <Link to={ROUTES.SIGN_UP}>register now!</Link>
                    </Text>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        uid: state.uid,
        userInfo: { ...state.userInfo }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUser: uid => dispatch(setUser(uid))
    };
};

export const SignInForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(compose(withRouter, withFirebase, Form.create())(NormalLoginForm));

const SignInPage = () => (
    <Row gutter={[0, 20]} type="flex" justify="space-around" align="middle">
        <Col span={8}>
            <Title>Sign In</Title>
            <SignInForm />
        </Col>
    </Row>
);

export default SignInPage;
