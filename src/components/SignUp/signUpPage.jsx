import React, { Component } from "react";
import { setUser } from "../../redux";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Form, Input, Row, Col, Button, Typography } from "antd";
import * as ROUTES from "../../constants/routes";

const { Title } = Typography;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                    phone
                } = values;

                const userInfo = {
                    firstname,
                    lastname,
                    username,
                    email,
                    phone
                };

                this.props.firebase
                    .doCreateUserWithEmailAndPassword(email, password)
                    .then(({ user }) => {
                        this.props.firebase
                            .addUser(user.uid, userInfo)
                            .then(() => {
                                console.log(
                                    `User ${firstname} Created with uid = ${user.uid}`
                                );
                                this.props.setUser({
                                    uid: user.uid,
                                    userInfo
                                });
                            })
                            .catch(error => {
                                console.log(
                                    "Error storing user data",
                                    error.message
                                );
                            });
                    })
                    .catch(error => {
                        console.log("error creatin user", error.message);
                    });
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator("firstname", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your nickname!"
                            }
                        ]
                    })(<Input placeholder="First Name" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("lastname", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your first name!",
                                whitespace: true
                            }
                        ]
                    })(<Input placeholder="Last Name" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("username", {
                        rules: [
                            {
                                required: true,
                                message: "Please create a unique username!"
                            }
                        ]
                    })(<Input placeholder="User Name" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!"
                            }
                        ]
                    })(<Input placeholder="Email" />)}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your password!"
                            },
                            {
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(<Input.Password placeholder="Password" />)}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator("confirm", {
                        rules: [
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(
                        <Input.Password
                            onBlur={this.handleConfirmBlur}
                            placeholder="Confirm Password"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator("phone", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your phone number!"
                            }
                        ]
                    })(
                        <Input
                            // addonBefore={prefixSelector}
                            placeholder="Phone"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Link to={ROUTES.HOME}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Link>
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

const SignUpForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(compose(withRouter, withFirebase, Form.create())(RegistrationForm));

const SignUpPage = () => (
    <Row gutter={[0, 20]} type="flex" justify="space-around" align="middle">
        <Col span={8}>
            <Title>Sign Up</Title>
            <SignUpForm />
        </Col>
    </Row>
);

export default SignUpPage;
