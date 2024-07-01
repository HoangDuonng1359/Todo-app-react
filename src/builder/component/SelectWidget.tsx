import { Select,  } from "antd"
import { useState } from "react";
const handleChange = (value: any) => {
    return (`selected ${value}`);
};

export interface OptionType {
    value: string;
    label: string;
}

export interface SelectSetting {
    options: OptionType[];
    defaultValue?: "";
    value : any;
    onchange?: any;
}

export const SelectWidget = (props : SelectSetting) => {
    return (
        <div className="p-2 w-full h-8">
            <Select defaultValue={"select"} onChange={handleChange}>
                { props.options.map(option => (
                    <Select key={option.value} value={option.value}>
                        {option.label}
                    </Select>
                ))}
            </Select>
        </div>

    )
}