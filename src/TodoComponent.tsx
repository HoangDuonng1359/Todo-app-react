import { getValue } from "@testing-library/user-event/dist/utils";
import { Button, Checkbox, Input } from "antd";
import { useEffect, useState } from "react";
export const TodoComponent = (_props : any) => {
    const [listTask,setlistTask] = useState<string[]>([]);
    const [listCompleted,setlistCompleted] = useState<string[]>([]);
    const [note,setNote] = useState("");
    const handleOnAddNew =()=>{
        console.log("add new", note);
        setlistTask([...listTask,note]);
        setNote("");
    }
    const handleOnAddNewConpleted = (props : any) =>{
        setlistCompleted([...listCompleted,props]);
    }
    const handleOnDeleteCompleted = (props : any) =>{
        console.log("delete " + props[1] + " " + listCompleted[props[1]] );
        setlistCompleted(listCompleted.filter((item, i) => i !== props[1]));
    }
    const handleOnDelete=(props : any)=>{
        if(props[0]){
            console.log("delete " + props[1] + " " + listTask[props[1]] );
            setlistTask(listTask.filter((item, i) => i !== props[1]));
            handleOnAddNewConpleted(props[2]);
        }
    }
    const handleOnChangeInput = (e:any)=>{
       setNote(e.target.value);
    }
    const handleOnKeyDownInput= (e:any)=>{
        if(e.key==='Enter'){
            handleOnAddNew();
        }
    }
    return (
        <div className="h-screen bg-slate-500 text-white p-10">
            <div className="text-center text-5xl font-bold">TODO APP</div>
            <div className="flex gap-4">
                <Input value={note} onChange={handleOnChangeInput} onKeyDown={handleOnKeyDownInput}></Input>
                <Button onClick={handleOnAddNew}> ADD NEW</Button>
            </div>
            <div className="m-4">
                <h1 className="text-3xl">Task</h1>
                <ul className="flex flex-col gap-3">
                    {listTask.map((text,index) =>{
                           return ( 
                            <li className="flex gap-5">
                                <Checkbox onChange={(e)=>handleOnDelete([e.target.checked,index,text])}></Checkbox>
                                {text}{" "}
                            </li>
                           );
                        })}
                </ul>
                <h1 className="text-3xl">Completed</h1>
                <ul className="flex flex-col gap-3">
                    {listCompleted.map((text, index) =>{
                           return ( 
                            <li className="flex gap-5">
                                <Button onClick={() => handleOnDeleteCompleted([text , index])}>Delete</Button>
                                <Checkbox className="rounded-full" checked={true} disabled={true} ></Checkbox>
                                <p className="line-through">{text}{" "}</p>
                                
                            </li>
                           );
                        })}
                </ul>
            </div>
        </div>
    )
}