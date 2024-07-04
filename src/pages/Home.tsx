import NavigationBar from "../Component/Navigation"
import { form } from "../builder/form/Builder"
interface HomeProps{
    FormJson: any;
    setFormJson: React.Dispatch<React.SetStateAction<never[]>>;
}
export const Home = (props: HomeProps) => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className=' m-5 w-2/3
       border-2 
       border-gray-600 
       rounded-md
        text-1xl shadow-lg'>
                <div className='text-center'>Form List</div>
                <ul className='list-disc list-inside '>
                    {props.FormJson?.map((Form: form) => {
                        // console.log(Form.widgets)
                        return (
                            <li className=' hover:text-blue-400 p-2'>
                                <a href={Form.url}>{Form.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}