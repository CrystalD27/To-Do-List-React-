import Rigister from '../components/Register';
import Header from '../components/Header';
const Register = () => {
    return (
        <>
            <div className="flex items-center  justify-center gap-28 bg-yellow-400 py-20 ">
                <Header />
                <Rigister />
            </div>
        </>
    );
};
export default Register;
