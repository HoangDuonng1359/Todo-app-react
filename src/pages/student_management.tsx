import NavigationBar from "../Component/Navigation"
import { GenerateForm } from "../builder/form/generate"
import { User } from "../backend/User"
import { useEffect, useState } from "react"
import { onValue, push, ref, set } from "firebase/database"
import { database } from "../backend/config"
export const StudentManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const SubmitCreate = (data: any) => {
        createUser(data);
    }
    const CreateForm = {
        title: 'Create student',
        url: '/',
        widgets: "[{\"name\":\"Name\",\"type\":\"text\",\"placeholder\":\"name\"},{\"name\":\"phoneNumber\",\"type\":\"text\",\"placeholder\":\"phone\"},{\"name\":\"gender\",\"type\":\"select\",\"options\":\"male;female\",\"placeholder\":\"phone\"}]",
        onSubmit: SubmitCreate
    }
    const createUser = (data: any) => {
        let getId = Number(users[users.length-1].userId) + 1;
        const usersRef = ref(database, 'users/' +  getId);
        set(usersRef, {
            userId :getId,
            Name: data.Name,
            gender: data.gender,
            phoneNumber: data.phoneNumber
        }).then(() => {
            console.log("Tạo sinh viên thành công");
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
                    phoneNumber: data[id].phoneNumber
                });
            }
            setUsers(loadedUsers);
            console.log(data);
        });
    }, []);

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="flex flex-row">
                <div>
                    <GenerateForm title={CreateForm.title}
                        url={CreateForm.url}
                        widgets={JSON.parse(CreateForm.widgets)}
                        onSubmit={CreateForm.onSubmit} ></GenerateForm>
                </div>
                <div className="p-2 bg-gray-100 text-center w-full">
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
                                )
                            ) : (
                                <tr>
                                    <td>Loading...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
