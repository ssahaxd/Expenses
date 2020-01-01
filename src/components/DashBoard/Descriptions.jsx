import { Descriptions } from "antd";
import React from "react";

const Description = props => {
    const { username, email, firstname, lastname } = props.userInfo;

    return (
        <Descriptions size="small" column={1}>
            <Descriptions.Item label="Name">
                {firstname + " " + lastname}
            </Descriptions.Item>
            <Descriptions.Item label="Username">{username}</Descriptions.Item>
            <Descriptions.Item label="Email">{email}</Descriptions.Item>
        </Descriptions>
    );
};

export default Description;
