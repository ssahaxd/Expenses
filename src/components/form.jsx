import React, { Component } from "react";
import { Form, Icon, Input, Button, DatePicker, Cascader } from "antd";

const residences = [
    {
        value: "travel",
        label: "Travel",
        children: [
            {
                value: "cab",
                label: "Cab",
                children: [
                    {
                        value: "ola",
                        label: "Ola"
                    },
                    {
                        value: "uber",
                        label: "Uber"
                    }
                ]
            },
            {
                value: "publicTransport",
                label: "Public Transport",
                children: [
                    {
                        value: "train",
                        label: "Train"
                    },
                    {
                        value: "bus",
                        label: "Bus"
                    }
                ]
            }
        ]
    },
    {
        value: "food",
        label: "Food",
        children: [
            {
                value: "app",
                label: "Online Order",
                children: [
                    {
                        value: "zomato",
                        label: "Zomato"
                    }
                ]
            }
        ]
    }
];
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormComponent extends Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log("Received values of form: ", values);
                this.props.onDataAdd(values);
            }
        });
        this.props.form.resetFields();
        // console.log(this.props.form.getFieldsError());
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.
        let usernameError =
            isFieldTouched("username") && getFieldError("username");
        let passwordError =
            isFieldTouched("password") && getFieldError("password");
        let dateError = isFieldTouched("date") && getFieldError("date");
        let categoryError =
            isFieldTouched("category") && getFieldError("category");

        const config = {
            rules: [
                {
                    type: "object",
                    required: true,
                    message: "Please select date!"
                }
            ]
        };
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item
                    validateStatus={usernameError ? "error" : ""}
                    help={usernameError || ""}
                >
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: "Please select the name!"
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
                            placeholder="Name"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    validateStatus={passwordError ? "error" : ""}
                    help={passwordError || ""}
                >
                    {getFieldDecorator("amount", {
                        rules: [
                            {
                                required: true,
                                message: "Please input the Amount!"
                            }
                        ]
                    })(<Input prefix="₹" type="number" placeholder="Amount" />)}
                </Form.Item>

                <Form.Item
                    validateStatus={dateError ? "error" : ""}
                    help={dateError || ""}
                >
                    {getFieldDecorator("date", config)(<DatePicker />)}
                </Form.Item>

                <Form.Item
                    validateStatus={categoryError ? "error" : ""}
                    help={categoryError || ""}
                >
                    {getFieldDecorator("category", {
                        rules: [
                            {
                                type: "array",
                                required: true,
                                message:
                                    "Please select your habitual residence!"
                            }
                        ]
                    })(<Cascader options={residences} />)}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedFormComponent = Form.create({ name: "horizontal_login" })(
    FormComponent
);
export default WrappedFormComponent;
