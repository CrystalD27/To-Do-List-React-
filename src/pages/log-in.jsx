import { MdAssignmentTurnedIn } from 'react-icons/md';
import NewList from '../components/NewList';

const LogIn = () => {
    return (
        <>
            <div
                style={{
                    backgroundImage: `url(")`,
                }}
            >
                <div className="px-9 pt-4">
                    <div className="flex justify-between">
                        <div className="flex items-center justify-center">
                            <MdAssignmentTurnedIn />
                            <h3 className="font-bold">ONLINE TODO LIST</h3>
                        </div>
                        <div className="flex">
                            <button type="button" className="mr-6">
                                Crystal to do list
                            </button>
                            <button type="button">Log out</button>
                        </div>
                    </div>
                    <div>
                        <NewList />
                        <div className="flex items-center justify-center border">
                            <div className="flex gap-20 rounded-t-md border px-6 py-4">
                                <div className="search-area">
                                    <button type="button" className="pb-4">
                                        Overview
                                    </button>
                                </div>
                                <div>
                                    <button className="pb-4">In process</button>
                                </div>
                                <div>
                                    <button className="pb-4">Completed</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LogIn;
