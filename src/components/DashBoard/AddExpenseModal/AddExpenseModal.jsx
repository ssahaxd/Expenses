import React, { Component } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
    class extends Component {
        componentDidMount() {}

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Enter Expense Details"
                    okText="Add"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item>
                            {getFieldDecorator("name", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please Enter the name!"
                                    }
                                ]
                            })(
                                <Select placeholder="Name">
                                    {this.props.users
                                        ? this.props.users.map(item => (
                                              <Option key={item} value={item}>
                                                  {item}
                                              </Option>
                                          ))
                                        : null}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator("amount", {
                                rules: [
                                    {
                                        warning: false,
                                        required: true,
                                        message: "Please input the Amount!"
                                    }
                                ]
                            })(
                                <Input
                                    prefix="₹"
                                    type="number"
                                    min={0}
                                    placeholder="Amount"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("category", {
                                rule: [
                                    {
                                        required: true,
                                        message: "Please Select a Category"
                                    }
                                ]
                            })(<Input type="string" placeholder="Category" />)}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator("subcategory", {
                                rule: [
                                    {
                                        required: true,
                                        message: "Please Select a sub-category"
                                    }
                                ]
                            })(
                                <Select
                                    mode="tags"
                                    dropdownStyle={{ display: "none" }}
                                    placeholder="Sub Category"
                                ></Select>
                            )}
                        </Form.Item>
                        {/* Date Input */}
                        <Form.Item>
                            {getFieldDecorator(
                                "date",
                                {
                                    initialValue: moment(
                                        new Date(),
                                        "DD-MM-YYYY"
                                    )
                                },
                                {
                                    rules: [
                                        {
                                            type: "object",
                                            required: true,
                                            message: "Please select date!"
                                        }
                                    ]
                                }
                            )(<DatePicker />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class AddExpenseModal extends Component {
    state = {
        visible: false
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
        this.formRef.props.form.resetFields();
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.handleNewExpense(values);

            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Add Expense
                </Button>
                {this.state.visible ? (
                    <CollectionCreateForm
                        users={this.props.users}
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                ) : null}
            </div>
        );
    }
}

export default AddExpenseModal;
