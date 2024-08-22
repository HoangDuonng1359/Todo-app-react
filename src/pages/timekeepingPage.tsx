import { useState } from "react"
import NavigationBar from "../Component/Navigation"
import { Button } from "antd";
import axios from "axios";
import qs from "qs";

export const TimekeepingPage = () => {
    const today = new Date().toISOString().split('T')[0]
    const [date, setDate] = useState(today);
    const [shift, setShift] = useState("");
    const onHandleChangeDate = (selectDate: string) => {
        setDate(selectDate);
    }
    const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7X8CbRhoSuoSz6mrNSypkLjoXyn8JUH7aSgAZuiE2yAoR6g/formResponse";
    const submit = async () => {
        const dateData = date.split('-');
        const data = {
            'entry.125903834_year': dateData[0],
            'entry.125903834_month': dateData[1],
            'entry.125903834_day': dateData[2],
            'entry.1559985336': shift
        };
        try {
            const response = await axios.post(formUrl, qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log('Form submitted successfully');
        } catch (error) {
            if (error instanceof Error) {
                // Xử lý lỗi nếu error là một Error
                console.error('Error submitting form:', error.message);
            } else if (axios.isAxiosError(error)) {
                // Xử lý lỗi nếu error là lỗi từ axios
                console.error('Failed to submit form:', error.response?.status, error.response?.data);
            } else {
                // Xử lý các lỗi khác
                console.error('An unknown error occurred:', error);
            }
        }
    };
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="bg-google-bg-form h-screen">
                <div className="text-center text-3xl p-2">Chấm công</div>
                <div className="flex items-center justify-center">
                    <div className="md:max-w-screen-lg max-w-96 bg-white shadow-xl border-2 rounded-lg m-2 p-5 h-full w-full" >
                        <div className="m-5">
                            <div>Ngày</div>
                            <div>
                                <input type="date" value={date} onChange={(e) => onHandleChangeDate(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="m-5">
                            <div>Ca</div>
                            <select value={shift} onChange={(e) => setShift(e.target.value)}>
                                <option>Sáng</option>
                                <option>Chiều</option>
                                <option>Tối(6h-10h)</option>
                                <option>Tối(4h-10h)</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button onClick={submit} className="bg-blue-400 m-5">Gửi</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 