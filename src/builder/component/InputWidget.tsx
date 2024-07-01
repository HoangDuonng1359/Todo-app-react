import { Input } from "antd"

export interface InputWidgetSetting{
    value? : any;
    onChange? : any;
    placeholder? : string;
    onKeyDown? : any;
}

export const InputWidget = (props : InputWidgetSetting) => {
    return(
        <div className="p-2">
            <Input placeholder={props.placeholder} value={props.value} onChange={props.onChange}></Input>
        </div>
    )
}