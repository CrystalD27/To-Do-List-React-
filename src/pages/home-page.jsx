import Header from '../components/Header';
import LogIn from '../components/LogIn';

const HomePage = () => {
    return (
        <>
            <section className="bg">
                <div className=" flex items-center justify-center gap-28 px-3  py-20">
                    <Header />
                    <LogIn />
                </div>
            </section>
        </>
    );
};
export default HomePage;
