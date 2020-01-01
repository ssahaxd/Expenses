import React from "react";
import { PageHeader, Button } from "antd";

const Title = ({ title, buttons, content }) => {
    console.log(buttons);

    return (
        <div
            style={{
                backgroundColor: "#F5F5F5",
                padding: "20px 20% 5px"
            }}
        >
            <PageHeader
                ghost={false}
                title={title}
                extra={
                    buttons.length
                        ? buttons.map(button => (
                              <Button
                                  key={button.title}
                                  onClick={button.onclick}
                              >
                                  {button.title}
                              </Button>
                          ))
                        : ""
                }
            >
                {content}
            </PageHeader>
        </div>
    );
};

export default Title;
