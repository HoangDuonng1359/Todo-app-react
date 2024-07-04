import { Button, Input, Select } from "antd"
import { useState } from "react"
import WidgetTypes from "../constants/WidgetTypes";
import { InputWidget, InputWidgetSetting } from "../component/InputWidget";
import { SelectSetting, SelectWidget } from "../component/SelectWidget";
import { Helmet } from "react-helmet";
import { WidgetInputSetting, WidgetSelectSetting } from "../component/WidgetSetting";
import NavigationBar from "../../Component/Navigation";

export interface widget {
    type: string;
    setting?: any;
}

// export interface widgetSettingProps{
//    inputSetting? : InputWidgetSetting;
// }

export const FormBuilder = () => {
    const [formTitle, setFormTitle] = useState("Form title");
    const [widgets, setWidgets] = useState<any>([]); 
    const [inputSetting, setInputSetting] = useState<InputWidgetSetting>({ placeholder: "" });
    const [selectSetting, setSelectSetting] = useState<SelectSetting>();
    const handleAddNewWidget = (props: widget) => {
        setWidgets([...widgets, props]);
        console.log(widgets);
    }
    const handleOnChangeInputFormTitle = (e: any) => {
        setFormTitle(e.target.value);
    }
    const createFormJson = () => {
        console.log(widgets);
    }
   
    const handleOnChangeInputSetting = (e: InputWidgetSetting) => {
        setInputSetting(e);
    }
    const [value,setValue] = useState();
    const handleChange = (value: any) => {
        return (`selected ${value}`);
    };
    return (
        <div>
            <Helmet>
                <title>Form builder</title>
            </Helmet>
            <NavigationBar></NavigationBar>
            <div className="h-screen flex flex-row gap 2 justify-center">
                <div className="w-full max-w-80 h-full" >
                    <div className="mt-10">
                        <div className="text-center text-xl">
                            <h1>Widget</h1>
                        </div>
                        <div className="ml-2 mt-2 border-solid border-2 border-sky-500 rounded-lg">
                            <div className=" m-5 flex flex-row gap-3 justify-between ">
                                <div>input</div>
                                <Button onClick={() => handleAddNewWidget({ type: WidgetTypes.INPUT, setting: inputSetting })}>Add</Button>
                            </div>
                            <div className=" m-5 flex flex-row gap-3 justify-between">
                                <div>text area</div>
                                <Button>Add</Button>
                            </div>
                            <div className=" m-5 flex flex-row gap-3 justify-between">
                                <div>select</div>
                                <Button onClick={() => handleAddNewWidget({ type: WidgetTypes.SELECT })}>Add</Button>
                            </div>
                        </div>
                        <WidgetInputSetting inputSetting={inputSetting} setInputSetting={setInputSetting}></WidgetInputSetting>
                        {/* <WidgetSelectSetting selectSetting={selectSetting} setSelectSetting={setSelectSetting}></WidgetSelectSetting> */}
                    </div>
                </div>
                <div className="flex flex-col w-screen h-full">
                    <div className="mt-10 w-full h-10 text-center text-3xl">{formTitle}</div>
                    {widgets.map((widget: { type: string; setting: any }, index: any) => {
                        if (widget.type === WidgetTypes.INPUT) {
                            const prop: InputWidgetSetting = widget.setting;
                            return (
                                <InputWidget placeholder={prop.placeholder}></InputWidget>
                            );
                        } else if (widget.type === WidgetTypes.SELECT) {
                            return (
                                <div>
                                    <SelectWidget value={value} onchange={handleChange} options={[{ label: "hello", value: " hoho" }]} ></SelectWidget>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="w-full max-w-96 h-full">
                    <div>
                        <div className="p-5">
                            <Input className="m-2" placeholder="form title" value={formTitle} onChange={handleOnChangeInputFormTitle}></Input>
                            <Input className="m-2" placeholder="url form"></Input>
                            <Button className="m-2" onClick={createFormJson}>Create Form</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}