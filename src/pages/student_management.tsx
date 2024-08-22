import NavigationBar from "../Component/Navigation"
import { GenerateForm } from "../builder/form/generate"
import { User } from "../backend/User"
import { SetStateAction, useEffect, useState } from "react"
import { onValue, push, ref, remove, set, update } from "firebase/database"
import { database, storage } from "../backend/config"
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    EditOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Image, Input, Menu, Select } from 'antd';
import React from "react"
import { isBrowser, isMobile, isTablet } from "react-device-detect"
import { error } from "console"
import { getDownloadURL, uploadBytesResumable } from "firebase/storage"

export const StudentManagement = () => {
    const [users, setUsers] = useState<User[]>([]);

    const SubmitCreate = (data: any) => {
        createUser(data);
    }
    const SubmitRemove = (data: any) => {
        const user = users.find(item => item.userId == data.Student_ID);
        if (user) {
            const usersRef = ref(database, "users/" + data.Student_ID);
            remove(usersRef).then(() => {
                alert("xóa sinh viên thành công")
            }).catch((error) => {
                alert(error)
            })
        }
        else alert("không tìm thấy sinh viên với id: " + data.Student_ID);
    }
    const CreateForm = {
        title: 'Create student',
        url: '/',
        widgets: "[{\"name\":\"Name\",\"type\":\"text\",\"placeholder\":\"name\"},{\"name\":\"phoneNumber\",\"type\":\"text\",\"placeholder\":\"phone\"},{\"name\":\"gender\",\"type\":\"select\",\"options\":\"male;female\",\"placeholder\":\"phone\"}]",
        onSubmit: SubmitCreate
    }
    const RemoveForm = {
        title: "Xóa sinh viên",
        url: "/remove",
        widgets: [
            {
                "name": "Student_ID",
                "type": "text",
                "placeholder": "input student id"
            }
        ],
        onSubmit: SubmitRemove
    }
    const createUser = (data: any) => {
        let getId: number = 0;
        if (users[0].countUser !== undefined) {
            getId = users[0].countUser + 1;
        }
        //console.log(countUsers)
        const usersRef = ref(database, 'users/' + getId);
        set(usersRef, {
            userId: getId,
            Name: data.Name,
            gender: data.gender,
            phoneNumber: data.phoneNumber
        }).then(() => {
            alert("Tạo sinh viên thành công");
            update(ref(database, 'users/' + '0'), {
                countUser: getId
            })
        })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        const dbRef = ref(database, 'users/');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const loadedUsers: User[] = [];
            for (let id in data) {
                loadedUsers.push({
                    userId: data[id].userId,
                    Name: data[id].Name,
                    gender: data[id].gender,
                    phoneNumber: data[id].phoneNumber,
                    countUser: data[id].countUser
                });

            }
            setUsers(loadedUsers);
            // console.log(data);
        });
    }, []);
    const CreateStudent = () => {
        return <GenerateForm title={CreateForm.title}
            url={CreateForm.url}
            widgets={JSON.parse(CreateForm.widgets)}
            onSubmit={CreateForm.onSubmit} ></GenerateForm>
    }
    const RemoveStudent = () => {
        return <GenerateForm title={RemoveForm.title}
            url={RemoveForm.url} widgets={RemoveForm.widgets}
            onSubmit={RemoveForm.onSubmit} ></GenerateForm>
    }
    const ListStudent = () => {
        return (
            <div className="">
                <div className="max-w-5xl p-2">
                    <div className="text-2xl">Danh sách sinh viên </div>
                    <table className="border-2 border-blue-500 w-full">
                        <thead className="text-slate-300 bg-slate-500 border-2 border-blue-700 ">
                            <tr>
                                <th className="border-2 border-blue-700 ">ID</th>
                                <th className="border-2 border-blue-700 ">Name</th>
                                <th className="border-2 border-blue-700 ">Gender</th>
                                <th className="border-2 border-blue-700 ">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? (
                                users.map((user, index) => {
                                    if (user.userId) {
                                        return (
                                            <tr className="border-2
                                border-blue-700 hover:bg-lime-400" key={index}>
                                                <td className="border-2 border-blue-700">{user.userId}</td>
                                                <td className="border-2 border-blue-700">{user.Name}</td>
                                                <td className="border-2 border-blue-700">{user.gender}</td>
                                                <td className="border-2 border-blue-700">{user.phoneNumber}</td>
                                            </tr>
                                        )
                                    }
                                    else return null

                                }
                                )
                            ) : (
                                <tr>
                                    <td>Loading...</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    // const handleUploadImage = (file: any) => {
    //     const storageRef = ref(storage, 'images/' + file.name);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on('state_changed',
    //         (snapshot)
    //             => {
    //                 // trong quá trình 
    //             console.log("update...");

    //         },
    //         (error) => {
    //             // Xử lý khi có lỗi xảy ra
    //         },
    //         () => {
    //             // Xử lý khi upload hoàn tất
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log('File available at', downloadURL);
    //                 // Sử dụng URL để hiển thị hình ảnh hoặc các mục đích khác
    //             });
    //         }
    //     );
    // };
    const EditStudent = () => {
        const [userId, setUserId] = useState("")
        const [user, setUser] = useState<User>({ userId: "0", Name: "", phoneNumber: "", gender: "" });
        const handleChangeNameUser = (name: string) => {
            setUser((prevUser) => ({ ...prevUser, userId: prevUser.userId || "0", Name: name }));
        }
        const handleChangePhoneUser = (phone: string) => {
            setUser((prevUser) => ({ ...prevUser, userId: prevUser.userId || "0", phoneNumber: phone }));

        }
        const handleChangeGenderUser = (gender: string) => {
            setUser((prevUser) => ({ ...prevUser, userId: prevUser.userId || "0", gender: gender }));
        }
        const find = (id: string) => {
            const userFind = users.find(items => items.userId == id)
            if (userFind) {
                setUser(userFind);
            }
            else alert("không tìm thấy")
        }
        const Save = () => {
            // const updatedUsers = users.map((U) => {
            //     if (U.userId === user.userId) {
                    
            //         return user;
            //     } else {
            //         return U;
            //     }
            // });
            // setUsers(updatedUsers);
            

        }
        return (
            <div>
                <div className="w-full grid justify-items-center">
                    <div className="bg-white rounded-lg shadow-md max-w-96">
                        <div className="p-2">Input student id</div>
                        <div className="flex flex-row gap-2 m-2 p-3">
                            <Input value={userId} onChange={(e) => setUserId(e.target.value)}></Input>
                            <Button onClick={() => find(userId)}>Find</Button>
                        </div>
                    </div>
                </div>
                <div className="m-10 w-full grid justify-items-center">
                    <div className="bg-white rounded-lg shadow-md p-2 flex gap-2 min-w-96">
                        <div className="flex flex-col gap-2">
                            <Avatar className=""
                                src="https://firebasestorage.googleapis.com/v0/b/my-app-83b4b.appspot.com/o/iaihackathon24-348f0983-1797-4746-ad37-d054e60b1065.jpg?alt=media&token=a59f7dfb-d2db-4150-a755-f820270cff3b" shape="square" size={90} icon={<UserOutlined />} />
                            <Input type="file" className="max-w-40"></Input>
                        </div>
                        <div className="flex flex-col gap-2 min-w-96">
                            <div className="text-left">Name </div>
                            <Input placeholder="name" value={user?.Name} onChange={(e) => handleChangeNameUser(e.target.value)}></Input>
                            <div className="text-left">Phone</div>
                            <Input placeholder="phone" value={user?.phoneNumber} onChange={(e) => handleChangePhoneUser(e.target.value)}></Input>
                            <div className="text-left">Gender</div>
                            <Select value={user?.gender} defaultValue={"choose gender"} onChange={(e) => handleChangeGenderUser(e)}>
                                <option value={"female"} label="female"></option>
                                <option value={"male"} label="male"></option>
                            </Select>
                            <Button onClick={Save}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const components = {
        CreateStudent,
        ListStudent,
        RemoveStudent,
        EditStudent
    };
    type ComponentKey = keyof typeof components;
    const [subPage, setSubPage] = useState<ComponentKey>('ListStudent');
    const SubPageComponent = components[subPage];

    return (
        <div>
            <div className="fixed w-full z-10">
                <NavigationBar></NavigationBar>
            </div>
            <div className="pt-11">
                <div className="flex flex-col">
                    <div className="w-fit h-screen bg-white fixed">
                        <Nav subPage={subPage} setSubPage={setSubPage} ></Nav>
                    </div>
                    <div className="ml-48 p-2 bg-gray-100 text-center w-full h-screen">
                        <SubPageComponent></SubPageComponent>
                    </div>
                </div>
            </div>

        </div>
    )
}
interface NavProps {
    subPage: string;
    setSubPage: React.Dispatch<SetStateAction<"CreateStudent" | "ListStudent" | "RemoveStudent" | "EditStudent">>
}

const Nav = (props: NavProps) => {
    const { subPage, setSubPage } = props
    const [collapsed, setCollapsed] = useState(isMobile && true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const setSelect = (key: string) => {
        setSelectedKeys([key]); // Cập nhật selectedKeys với giá trị mới
    };
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case "ListStudent":
                setSubPage('ListStudent')
                break
            case "CreateStudent":
                setSubPage('CreateStudent');
                break
            case "RemoveStudent":
                setSubPage('RemoveStudent');
                break
            case "EditStudent":
                setSubPage('EditStudent');
                break
            default:
                setSubPage('ListStudent')
        }
    };

    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        { key: 'ListStudent', icon: <PieChartOutlined />, label: 'Danh sách sinh viên' },
        { key: 'CreateStudent', icon: <DesktopOutlined />, label: 'Thêm sinh viên' },
        { key: 'RemoveStudent', icon: <ContainerOutlined />, label: 'Xóa sinh viên' },
        { key: 'EditStudent', icon: <EditOutlined />, label: 'Chỉnh sửa sinh viên' }
    ];
    return (

        <div style={{ flex: "auto", minWidth: 0 }}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['ListStudent']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
                onClick={handleMenuClick}
            />
            <div>
            </div>
        </div>
    );
};

