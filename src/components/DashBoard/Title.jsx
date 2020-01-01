import React from "react";
import { PageHeader } from "antd";

const Title = ({ title, buttons, content }) => {
    return (
        <div
            style={{
                backgroundColor: "#F5F5F5"
                // padding: "20px 20% 5px"
            }}
        >
            <PageHeader
                ghost={false}
                title={title}
                extra={buttons.length ? buttons.map(button => button) : ""}
            >
                {content}
            </PageHeader>
        </div>
    );
};

export default Title;
