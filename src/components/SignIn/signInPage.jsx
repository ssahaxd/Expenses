import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "./../Firebase/context";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
const { Title, Text } = Typography;

class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

                const { email, password } = values;
                console.log(email, password);

                this.props.firebase
                    .doSignInWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log("Do redux stuff");

                        this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        console.log(error);
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

const SignInForm = compose(
    withRouter,
    withFirebase,
    Form.create()
)(NormalLoginForm);

const SignInPage = () => (
    <Row gutter={[0, 20]} type="flex" justify="space-around" align="middle">
        <Col span={8}>
            <Title>Sign In</Title>
            <SignInForm />
        </Col>
    </Row>
);

export default SignInPage;
