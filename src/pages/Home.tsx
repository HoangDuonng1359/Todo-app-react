import NavigationBar from "../Component/Navigation"
import { form } from "../builder/form/Builder"
export const Home = () => {
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
                </ul>
            </div>
        </div>
    )
}