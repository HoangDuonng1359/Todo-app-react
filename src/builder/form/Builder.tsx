import { Button, Input, Select } from "antd"
import { useState } from "react"
import WidgetTypes from "../constants/WidgetTypes";
import { Helmet } from "react-helmet";
import NavigationBar from "../../Component/Navigation";
import { useForm } from "react-hook-form";
import { GenerateForm } from "./genereate";
import axios from 'axios';
import { URL_REQUEST } from "../../api/urlAPI";
export interface widget {
    name: string;
    type: string;
    options?: string;
    placeholder?:string;
}

export interface form {
    title: string;
    url: string;
    widgets : any;
}

export const FormBuilder = () => {
    const [formTitle, setFormTitle] = useState("Form title");
    const [formUrl , setFormUrl] = useState("/");
    const [widgets, setWidgets] = useState<any>([]);
    const [typeWidgets, setTypeWidget] = useState(WidgetTypes.TEXT);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: genRegister, handleSubmit: genHandle, formState: { errors: err } } = useForm();
    const onSubmit = (data: any) => {
        const isDuplicateName = widgets.some((w: widget) => w.name === data.name);
        if (isDuplicateName) {
            console.log("Duplicate extension name");
            return; 
        }
        if (data.type == WidgetTypes.TEXT) {
            data.options = undefined;
        }
        handleAddNewWidget({ 
            name: data.name, 
            type: data.type, 
            options: data.options ,
            placeholder : data.placeholder})
        console.log(widgets);
    }
    const onGenHandle = (data: any) => {
        console.log(data);
    }
    // console.log(errors);
    const handleAddNewWidget = (props: widget) => {
        setWidgets([...widgets, props]);
    }
    const handleOnChangeInputFormTitle = (e: any) => {
        setFormTitle(e.target.value);
    }
    const createFormJson = () => {
        const FormJson : form = {title: formTitle , url : formUrl , widgets : JSON.stringify(widgets)};
        console.log(FormJson);
        axios.post(URL_REQUEST.POST_FORM,
            FormJson
        )
        .then(function (response) {
            alert("send request successful!");
          })
        .catch(function(error){
            // 
            alert(error.response.data);
        })
    }
    return (
        <div>
            <Helmet>
                <title>Form builder</title>
            </Helmet>
            <NavigationBar></NavigationBar>

            <div className="h-screen flex flex-row gap 2 justify-center">

                <div className="w-full max-w-80 h-full" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-10">
                            <div className="text-center text-xl">
                                <h1>Widget Creator</h1>
                            </div>
                            <div className="ml-2 mt-2 border-solid border-2 border-sky-500 rounded-lg">
                                <div className="p-2">
                                    <div className="w-full mb-2">Type:</div>
                                    <select {...register("type")}
                                        value={typeWidgets}
                                        onChange={(e) => setTypeWidget(e.target.value)}
                                        className="w-full p-1 border-2 border-blue-300 rounded-md">
                                        <option value={WidgetTypes.TEXT}> text</option>
                                        <option value={WidgetTypes.SELECT}>select</option>
                                    </select>
                                    <div>Name:</div>
                                    <input className="w-full p-1 border-2 border-blue-300 rounded-md" type="text" {...register("name", {})} placeholder="Input name widget"></input>
                                    {typeWidgets === WidgetTypes.SELECT ? (
                                        <div>
                                            <div>Options:</div>
                                            <input className="w-full p-1 border-2 border-blue-300 rounded-md" 
                                            type="text" {...register("options", {})} 
                                            placeholder="Enter options separate by ;"></input>
                                        </div>
                                    ) : null}
                                    {typeWidgets === WidgetTypes.TEXT ? (
                                        <div>
                                            <div>placeholder:</div>
                                            <input className="w-full p-1 border-2 border-blue-300 rounded-md" 
                                            type="text" {...register("placeholder", {})} 
                                            placeholder="Enter placeholder"></input>
                                        </div>
                                    ) : null}
                                    <div className="mt-2">
                                        <Button onClick={handleSubmit(onSubmit)} className="w-full bg-blue-400 text-gray-800">Create</Button>
                                    </div>
                                </div>

                            </div>
                            {/* <WidgetSelectSetting selectSetting={selectSetting} setSelectSetting={setSelectSetting}></WidgetSelectSetting> */}
                        </div>
                    </form>
                </div>

                <div className="flex flex-col w-full h-full justify-between">
                    <GenerateForm title={formTitle} url={formUrl} widgets={widgets} ></GenerateForm>
                </div>
                <div className="w-full max-w-96 h-full">
                    <div>
                        <div className="p-5">
                            <div>Form Information</div>
                            <Input className="m-2" placeholder="form title" value={formTitle} onChange={handleOnChangeInputFormTitle}></Input>
                            <Input className="m-2" placeholder="url form" 
                            value={formUrl} onChange={(e) => setFormUrl(e.target.value)}></Input>
                            <Button className="m-2" onClick={createFormJson}>Create Form</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}