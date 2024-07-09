import { FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

interface SelectProps{
    widget : any
    register: UseFormRegister<FieldValues> 
    handleSubmit : UseFormHandleSubmit<FieldValues, undefined>
}

export const SelectWidget = (props : SelectProps) =>{
    const {widget , register , handleSubmit} = props;
    return ( 
        <div className="p-2">
            <div>{widget.name}</div>
            <select  {...register(widget.type)}
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
        )
}