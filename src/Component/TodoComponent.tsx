import { CalendarOutlined, CheckCircleTwoTone, ClockCircleTwoTone, DashOutlined, DeleteOutlined } from "@ant-design/icons";
import { getValue } from "@testing-library/user-event/dist/utils";
import { Button, Checkbox, Input, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { ToDoApp } from "./TodoApp";
import { PriorityEnum, StatusEnum } from "../constants/enum.constants";
import { pripriorityOptions } from "../constants/options.constants";
interface Task {
    id: number,
    title: string,
    note: string,
    priority: PriorityEnum;
    status: StatusEnum;
}

export const TodoComponent = (_props: any) => {
    const [listTask, setlistTask] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [isOpenPopUpNote, setIsOpenPopUpNote] = useState(false);
    const [note, setnote] = useState('');
    const [priority, setPriority] = useState(PriorityEnum.LOW);
    const [status, setStatus] = useState(StatusEnum.TODO);

    const setTaskDefault = () => {
        setTitle("");
        setnote("");
        setPriority(PriorityEnum.LOW);
        setStatus(StatusEnum.TODO);
    }

    const handleOnAddNew = () => {
        if (!title.trim()) return;
        const newTask: Task = {
            id: Date.now(),
            title: title,
            note: note,
            priority,
            status,
        };
        console.log("add new", newTask);
        setlistTask([...listTask, newTask]);
        setTaskDefault();
    }
    const handleOnDelete = (noteId: number) => {
        const tmp = listTask.filter((a: any) => a.id !== noteId);
        setlistTask(tmp);
    };
    const handleOnChangeInput = (e: any) => {
        setTitle(e.target.value);
    }
    const handleOnKeyDownInput = (e: any) => {
        if (e.key === 'Enter') {
            handleOnAddNew();
        }
    }
    const handleClosePopUp = () => {
        setIsOpenPopUpNote(false);
    };
    const handleSave = () => {
        handleOnAddNew();
        handleClosePopUp();
    };
    const handleChangeInputPopUp = (event: any) => {
        setnote(event.target.value);
    };
    const handleUpdateTaskStatus = (id: number, newStatus: StatusEnum) => {
        const updatedList = listTask.map(task => {
            if (task.id === id) {
                return { ...task, status: newStatus }; // Thay đổi trạng thái của task có id tương ứng
            }
            return task; // Trả về task không thay đổi
        });
        setlistTask(updatedList); // Cập nhật state với mảng mới
    };
    return (
        <div className="h-screen text-blue-600/100 p-10">
            <div className="text-center text-5xl font-bold">TODO APP</div>
            <div className="flex flex-row gap-2 justify-center m-2">
                <div className="w-1/2 flex flex-col">
                    <Input className="w-full" placeholder="Add new task" value={title} onChange={handleOnChangeInput} onKeyDown={handleOnKeyDownInput}></Input>
                    <div className=" flex justify-end">
                        <Button icon={<CalendarOutlined />} className="bg-transparent border-0"></Button>
                        <Button onClick={() => setIsOpenPopUpNote(true)} icon={<DashOutlined />} className="bg-transparent border-0"></Button>
                        {isOpenPopUpNote ? (
                            <div className="fixed z-10 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                <div className=" border-solid rounded-lg bg-white w-80">
                                    <h3 className="text-2xl text-center text-black w-full ">Note</h3>
                                    <h2 className="text-1xl text-black m-2">{title}</h2>
                                    <Input.TextArea value={note} onChange={handleChangeInputPopUp} rows={10} className=" text-black w-11/12 h-full m-3 " placeholder="input note"></Input.TextArea>
                                    <div className="flex gap-1 m-2">
                                        <Select value={status} onChange={(value) => setStatus(value)}>
                                            <Select.Option value={StatusEnum.TODO}>Todo</Select.Option>
                                            <Select.Option value={StatusEnum.DOING}>Doing</Select.Option>
                                            <Select.Option value={StatusEnum.DONE}>Done</Select.Option>
                                        </Select>

                                        {/* Cách sử dụng Select với 1 mảng với object với key và label - pripriorityOptions */}
                                        <Select
                                            value={priority}
                                            options={pripriorityOptions}
                                            onChange={(value) => setPriority(value)}
                                        />
                                    </div>
                                    <div className="flex-col w-full">
                                        <Button className="m-2" onClick={handleClosePopUp}>Close</Button>
                                        <Button className="m-2" onClick={handleSave}>Save</Button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <Button onClick={handleOnAddNew}> ADD NEW</Button>
            </div>
            <div className="flex flex-col gap-2 m-2 ml-10 mr-10">
                <div className="border-2 border-blue rounded-lg">
                    <h1 className="m-2 text-3xl">Todo</h1>
                    <ul className="m-1 flex flex-col gap-3">
                        {listTask.map((task) => {
                            return (
                                (task.status === StatusEnum.TODO) ? (
                                    <li className="gap-4 border-blue-50 border-2 bg-white p-2 rounded-xl hover:border hover:shadow-lg" key={task.id}>
                                        <div className="flex gap-4 justify-between">
                                            <div className="flex gap-4 justify-center">
                                                <div className="flex gap-1">
                                                    <Tooltip title="Done">
                                                        <Button onClick={() => handleUpdateTaskStatus(task.id, StatusEnum.DONE)} shape="circle" icon={<CheckCircleTwoTone />} className="border-0 hover:shadow-sm hover:border-2"></Button>
                                                    </Tooltip>
                                                    <Tooltip title="Doing">
                                                        <Button onClick={() => handleUpdateTaskStatus(task.id, StatusEnum.DOING)} shape="circle" icon={<ClockCircleTwoTone />} className="border-0 hover:shadow-sm hover:border-2"></Button>
                                                    </Tooltip>
                                                </div>

                                                <p>{task.title}</p>
                                            </div>
                                            <Button danger className="bg-transparent border-0" icon={<DeleteOutlined />} onClick={() => handleOnDelete(task.id)}></Button>
                                        </div>
                                    </li>
                                ) : null
                            );
                        })}

                    </ul>
                </div>
                <div className=" mt-2 border-2 border-blue rounded-lg">
                    <h1 className="m-2 text-3xl">Doing</h1>
                    <ul className="m-1 flex flex-col gap-3">
                        {listTask.map((task) => {
                            return (
                                (task.status === StatusEnum.DOING) ? (
                                    <li className="gap-4 border-blue-50 border-2 bg-white p-2 rounded-xl hover:border hover:shadow-lg" key={task.id}>
                                        <div className="flex gap-4 justify-between">
                                            <div className="flex gap-4 justify-center">
                                                <div className="flex gap-1">
                                                    <Tooltip title="Done">
                                                        <Button onClick={() => handleUpdateTaskStatus(task.id, StatusEnum.DONE)} shape="circle" icon={<CheckCircleTwoTone />} className="border-0 hover:shadow-sm hover:border-2"></Button>
                                                    </Tooltip>
                                                    <Tooltip title="Todo">
                                                        <Button onClick={() => handleUpdateTaskStatus(task.id, StatusEnum.TODO)} shape="circle" icon={<ClockCircleTwoTone />} className="border-0 hover:shadow-sm hover:border-2"></Button>
                                                    </Tooltip>
                                                </div>

                                                <p>{task.title}</p>
                                            </div>
                                            <Button danger className="bg-transparent border-0" icon={<DeleteOutlined />} onClick={() => handleOnDelete(task.id)}></Button>
                                        </div>
                                    </li>
                                ) : null
                            );
                        })}
                    </ul>
                </div>
                <div className=" mt-2 border-2 border-blue rounded-lg">
                    <h1 className="m-2 text-3xl">Done</h1>
                    <ul className="m-1 flex flex-col gap-3">
                        {listTask.map((task) => {
                            return (
                                (task.status === StatusEnum.DONE) ? (
                                    <li className="gap-4 border-blue-50 border-2 bg-white p-2 rounded-xl hover:border hover:shadow-lg" key={task.id}>
                                        <div className="flex gap-4 justify-between">
                                            <div className="flex gap-4 justify-center">
                                                <div className="flex gap-1">
                                                    <Tooltip title="Doing">
                                                        <Button onClick={() => handleUpdateTaskStatus(task.id, StatusEnum.DOING)} shape="circle" icon={<CheckCircleTwoTone />} className="border-0 hover:shadow-sm hover:border-2"></Button>
                                                    </Tooltip>
                                                    <Tooltip title="Todo">
                                                        <Button onClick={() => handleUpdateTaskStatus(task.id, StatusEnum.TODO)} shape="circle" icon={<ClockCircleTwoTone />} className="border-0 hover:shadow-sm hover:border-2"></Button>
                                                    </Tooltip>
                                                </div>

                                                <p>{task.title}</p>
                                            </div>
                                            <Button danger className="bg-transparent border-0" icon={<DeleteOutlined />} onClick={() => handleOnDelete(task.id)}></Button>
                                        </div>
                                    </li>
                                ) : null
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div >
    )
}


