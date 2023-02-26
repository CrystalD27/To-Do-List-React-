import { MdAssignmentTurnedIn } from 'react-icons/md';
import todoListImg from '../assets/img/img.png';
export const UnAuthHeader = () => {
    return (
        <div className="text-3xl">
            <div className="flex items-center justify-center">
                <MdAssignmentTurnedIn />
                <h1 className="font-bold">ONLINE TODO LIST</h1>
            </div>
            <img className="hidden sm:block" src={todoListImg} alt="img" />
        </div>
    );
};
