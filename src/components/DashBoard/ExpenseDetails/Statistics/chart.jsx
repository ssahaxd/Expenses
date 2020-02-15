import React from "react";
import { ResponsivePie } from "@nivo/pie";
import alasql from "alasql";
import * as RA from "ramda-adjunct";

const MyResponsivePie = ({ expenses }) => {
    let data = alasql(
        `SELECT name as key , SUM(amount) AS _value , name AS label  FROM ? GROUP BY name`,
        [expenses]
    );
    data = data.map(i => RA.renameKeys({ _value: "value", key: "id" })(i));

    return (
        <ResponsivePie
            data={
                data[0].name === undefined
                    ? data
                    : [{ id: "null", value: 0, label: "null" }]
            }
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={-24}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: "color" }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: "*",
                    id: "dots"
                }
            ]}
        />
    );
};

export default MyResponsivePie;
