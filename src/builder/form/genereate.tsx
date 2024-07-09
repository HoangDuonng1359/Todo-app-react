import { useForm } from "react-hook-form";
import { form, widget } from "./Builder";
import WidgetTypes from "../constants/WidgetTypes";
import { Button } from "antd";
import NavigationBar from "../../Component/Navigation";
import { InputWidget } from "../component/InputWidget";
import { SelectWidget } from "../component/SelectWidget";

export const GenerateForm = (Form: form) => {
    const {register: genRegister, handleSubmit: genHandle, formState: { errors: err } } = useForm();
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
                            let T ;
                            switch (widget.type)
                            {
                                case WidgetTypes.TEXT:
                                    T = InputWidget;
                                    break;
                                case WidgetTypes.SELECT:
                                    T = SelectWidget;
                                    break;
                                default:
                                    return <>Component does not exist</>;

                            }
                            return <T register={genRegister} handleSubmit={genHandle} widget={widget} ></T>
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