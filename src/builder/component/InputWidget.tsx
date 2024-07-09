import { FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";


type InputProps = {
    widget : any
    register: UseFormRegister<FieldValues> 
    handleSubmit : UseFormHandleSubmit<FieldValues, undefined>
    
}
export const InputWidget = (props: InputProps) => {
    return (
        <div className="p-2">
            <div>{props.widget.name}</div>
            <input placeholder={props.widget.placeholder} className="rounded-md w-full
            border-2 border-indigo-500/100 focus:outline-none p-2"
                type="text" {...props.register(props.widget.name, {})}></input>
        </div>
    );
}