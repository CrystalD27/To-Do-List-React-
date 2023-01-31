import Rigister from '../components/Register';
import Header from '../components/Header';
const Register = () => {
    return (
        <>
            <section className="bg">
                <div className=" flex items-center  justify-center gap-28 py-20 ">
                    <Header />
                    <Rigister />
                </div>
            </section>
        </>
    );
};
export default Register;
