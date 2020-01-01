import React, { Component } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
    class extends Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new expense group"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator("gname", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input the title of group!"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator("description")(
                                <Input type="textarea" />
                            )}
                        </Form.Item>
                        <Form.Item label="Any one else with you?">
                            {getFieldDecorator("users")(
                                <Select
                                    mode="tags"
                                    dropdownStyle={{ display: "none" }}
                                ></Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class AddGropuModal extends Component {
    state = {
        visible: false
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.handleNewGroup(values);

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
                    New Group
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default AddGropuModal;
