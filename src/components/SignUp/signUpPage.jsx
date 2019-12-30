import React, { Component } from "react";
import { withFirebase } from "./../Firebase/context";
import { compose } from "recompose";

import { Form, Input, Row, Col, Button, Typography } from "antd";

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

                this.props.firebase
                    .doCreateUserWithEmailAndPassword(email, password)
                    .then(authUser => {
                        console.log(authUser.user.uid);

                        this.props.firebase
                            .addUser(authUser.user.uid, {
                                firstname,
                                lastname,
                                username,
                                email,
                                phone
                            })
                            .then(() => {
                                console.log(
                                    `User ${firstname} Created with uid = ${authUser.user.uid}`
                                );
                            })
                            .catch(error => {
                                console.log(
                                    "Error storinf user data",
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

        // const { autoCompleteResult } = this.state;
        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 8 }
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 }
        //     }
        // };

        // const prefixSelector = getFieldDecorator("prefix", {
        //     initialValue: "+91"
        // })(
        //     <Select style={{ width: 70 }}>
        //         <Option value="86">+86</Option>
        //         <Option value="87">+87</Option>
        //     </Select>
        // );

        // const websiteOptions = autoCompleteResult.map(website => (
        //     <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        // ));

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
                {/* <Form.Item label="Website">
                    {getFieldDecorator("website", {
                        rules: [
                            { required: true, message: "Please input website!" }
                        ]
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>
                    )}
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const SignUpForm = compose(withFirebase, Form.create())(RegistrationForm);

const SignUpPage = () => (
    <Row gutter={[0, 20]} type="flex" justify="space-around" align="middle">
        <Col span={8}>
            <Title>Sign Up</Title>
            <SignUpForm />
        </Col>
    </Row>
);

export default SignUpPage;
