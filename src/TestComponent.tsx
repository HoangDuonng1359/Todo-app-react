import { Button } from "antd";
import { useEffect, useState } from "react";
export const TestComponent = (props : any) => {
    const [result, setResult] = useState<number>(0) //  khởi tạo state 

    let a =0 ;
    useEffect(()=>{
        return () => {
            // xu ly khi component dong o day
            console.log("destoy!")
        }
    })
    function add(){
        setResult(result+1);
    }

    const minus = () => {
        setResult(result - 1);
    }

    return (
        <div>
            <h1 className="text-red-500 text-center text-5xl font-bold">{result}</h1>
            <button className="bg-blue-500 text-center texxt-5xl font-bold p-10 hover:bg-slate-600 m-5" onClick={add}> + </button>
            <button className="bg-red-500 text-center texxt-5xl font-bold p-10 hover:bg-slate-600 m-5"onClick={minus}> - </button>
        </div>
    )
}