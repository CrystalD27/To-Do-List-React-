import Header from '../components/Header';
import LogIn from '../components/LogIn';

const HomePage = () => {
    return (
        <>
            <div className="flex items-center justify-center gap-28 bg-yellow-400 py-20">
                <Header />
                <LogIn />
            </div>
        </>
    );
};
export default HomePage;
