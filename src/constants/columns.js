import React from "react";
import { Tag, Avatar, Popconfirm } from "antd";
import { titleCase } from "voca";
import moment from "moment";

export function Columns(filteredInfo, sortedInfo, handleDelete, tableUsers) {
    return [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 150,
            render: text => (
                <div>
                    <Avatar
                        style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf"
                        }}
                    >
                        {text[0].toUpperCase()}
                    </Avatar>
                    <a
                        href="# "
                        style={{
                            marginLeft: 16,
                            verticalAlign: "middle"
                        }}
                    >
                        {titleCase(text)}
                    </a>
                </div>
            ),
            filters: tableUsers.map(user => ({
                text: user,
                value: user.toLocaleLowerCase()
            })),

            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
            ellipsis: true
        },
        {
            title: "Amount(₹)",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount,
            sortOrder: sortedInfo.columnKey === "amount" && sortedInfo.order
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: text => <Tag color="green">{titleCase(text)}</Tag>
        },
        {
            title: "Sub-Category",
            key: "subcategory",
            dataIndex: "subcategory",
            render: tags => (
                <span>
                    {tags.map(tag => {
                        return (
                            <Tag color="geekblue" key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            )
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => moment(a).unix() - moment(b).unix(),
            sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order
        },
        {
            title: "Action",
            key: "action",

            render: record => (
                <span>
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Tag color="volcano">
                            <a href="# ">Remove</a>
                        </Tag>
                    </Popconfirm>
                </span>
            )
        }
    ];
}
