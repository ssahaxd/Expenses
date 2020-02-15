import React, { Component } from "react";
import { setUser } from "../../redux";
import { connect } from "react-redux";
import { withFirebase } from "./../Firebase/context";
import { compose } from "recompose";
import cogoToast from "cogo-toast";
import { Form, Input, Row, Col, Button, Typography } from "antd";

const { Title } = Typography;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false
    };

    handleSubmit = e => {
        cogoToast.loading("Please wait..");
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                } = values;

                const userInfo = {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    username: username.trim(),
                    email: email.trim()
                };

                this.props.firebase
                    .getUserByUserName(username)
                    .then(querySnapshot => {
                        if (querySnapshot.empty) {
                            console.log("Username Available");
                            cogoToast.success("Username Available");
                            this.props.firebase
                                .doCreateUserWithEmailAndPassword(
                                    email,
                                    password
                                )
                                .then(({ user }) => {
                                    this.props.firebase
                                        .addUser(user.uid, userInfo)
                                        .then(() => {
                                            console.log(
                                                `User ${firstname} Created with uid = ${user.uid}`
                                            );
                                            cogoToast.success(
                                                "User Created :)"
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
                                            cogoToast.error(error.message);
                                        });
                                })
                                .catch(error => {
                                    console.log(
                                        "error creatin user",
                                        error.message
                                    );
                                    cogoToast.error(error.message);
                                });
                        } else {
                            console.log("Usernmae not availabe");
                            cogoToast.error("Usernmae not availabe");
                        }
                    });
            }
        });
        this.props.form.resetFields();
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
                                message: "Please input your Name!"
                            }
                        ]
                    })(<Input placeholder="First Name" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("lastname", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your last name!",
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
                                message: "Please create a unique username!",
                                whitespace: false
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
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
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

export const SignUpForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(compose(withFirebase, Form.create())(RegistrationForm));

const SignUpPage = () => (
    <Row gutter={[0, 20]} type="flex" justify="space-around" align="middle">
        <Col span={8}>
            <Title>Sign Up</Title>
            <SignUpForm />
        </Col>
    </Row>
);

export default SignUpPage;
