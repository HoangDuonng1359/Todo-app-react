import { Input } from "antd"
import { InputWidgetSetting } from "./InputWidget"
import { SelectSetting } from "./SelectWidget";


interface PropsInputSetting {
    inputSetting: InputWidgetSetting;
    setInputSetting: React.Dispatch<React.SetStateAction<InputWidgetSetting>>;
}
interface PropsSelectSetting{
    selectSetting: SelectSetting
    setSelectSetting: React.Dispatch<React.SetStateAction<SelectSetting>>;
}

export const WidgetInputSetting = (prop: PropsInputSetting) => {
    const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        prop.setInputSetting({ ...prop.inputSetting, placeholder: e.target.value });
    };
    return (
        <div>
            <div className="text-center text-xl">
                <h1>Widget Input Setting</h1>
            </div>
            <div className="ml-2 mt-2 border-solid border-2 border-sky-500 rounded-lg">
                <div>
                    <div className="p-2">
                        <div>placeholder</div>
                        <Input value={prop.inputSetting.placeholder} onChange={handlePlaceholderChange}></Input>
                        <div>Color</div>
                        <Input></Input>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const WidgetSelectSetting = (props : PropsSelectSetting) => {
    return (
        <div>
            <div>
                <div className="text-center text-xl">
                    <h1>Widget Select Setting</h1>
                </div>
                <div className="ml-2 mt-2 border-solid border-2 border-sky-500 rounded-lg">
                    <div>
                        <div>
                            <div>option 1</div>
                            <Input placeholder="value"></Input>
                            <Input placeholder="label"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}