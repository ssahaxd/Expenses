import React from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Tag, Icon } from "antd";

const data = [
    {
        title: "Personal Expense"
    },
    {
        title: "Darjeeling"
    },
    {
        title: "Silong"
    },
    {
        title: "Chennai"
    }
];

const ExpGropuList = props => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item
                    actions={[
                        <a key="edit" href="# ">
                            <Icon type="edit" />
                        </a>
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                style={{
                                    color: "#f56a00",
                                    backgroundColor: "#fde3cf"
                                }}
                            >
                                {"D"}
                            </Avatar>
                        }
                        title={<Link to={"/home"}>{item.title}</Link>}
                        description={
                            <div>
                                <Tag color="green">Sandip</Tag>
                                <Tag color="volcano">Subham</Tag>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ExpGropuList;
