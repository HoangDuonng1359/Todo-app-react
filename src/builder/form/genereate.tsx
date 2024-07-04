import { useForm } from "react-hook-form";
import { form, widget } from "./Builder";
import WidgetTypes from "../constants/WidgetTypes";
import { Button } from "antd";
import NavigationBar from "../../Component/Navigation";

export const GenerateForm = (Form: form) => {
    const { register: genRegister, handleSubmit: genHandle, formState: { errors: err } } = useForm();
    const onGenHandle = (data: any) => {
        console.log(data);
    }
    const widgets = Form.widgets;
    return (
        <div>
        <NavigationBar></NavigationBar>
        <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
            <div></div>
            <div className="flex flex-col w-96 h-full ">
                <div className="mt-10 w-full h-10 text-center text-3xl">{Form.title}</div>
                <form onSubmit={genHandle(onGenHandle)}>
                    {widgets.map((widget: widget, index: any) => {
                        if (widget.type === WidgetTypes.TEXT) {
                            return (
                                <div className="p-2">
                                    <div>{widget.name}</div>
                                    <input placeholder={widget.placeholder} className="rounded-md w-full
                                     border-2 border-indigo-500/100 focus:outline-none p-2"
                                        type="text" {...genRegister(widget.name, {})}></input>
                                </div>

                            );
                        } else if (widget.type === WidgetTypes.SELECT) {
                            return (
                                <div className="p-2">
                                    <div>{widget.name}</div>
                                    <select  {...genRegister(widget.type)}
                                        className="w-full rounded-md border-2 p-1 border-blue-400 focus:outline-none">
                                        {
                                            widget.options?.split(";").map((option: string) => {
                                                return (
                                                    <option value={option}
                                                        className="p-1">{option}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            );
                        } else {
                            return;
                        }
                    })}
                    <div className="flex justify-center items-center h-10">
                        <Button htmlType="submit"
                            className="">Submit</Button>
                    </div>

                </form>
                <div></div>
            </div>
        </div>
        </div>
    )
}