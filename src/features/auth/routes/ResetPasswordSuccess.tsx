import { Button } from "../../../../libs/lib-sync-wise-ui";
import Passwordsuccesslogo from "../../../assets/images/Password Reset Successful.svg"
import {useNavigate} from "react-router-dom";
export default function ResetPasswordSuccess() {
    const navigate = useNavigate();
    return (

        <div className="flex flex-col w-full mx-auto gap-4 lg:gap-11 lg:max-w-[500px] xl:max-w-[577px] " >
            <h1 className='font-semibold text-center  text-2xl xl:text-4xl '>Password Reset</h1>
            <div className="flex justify-center">
                <img src={Passwordsuccesslogo} alt="syncwise" className='w-40 h-40' />
            </div>
            <div className=' flex flex-col justify-center gap-9 '>
                <p className='text-center text-xl lg:text-2xl font-light text-blue-950'>Your Password has been changed successfully.</p>
            </div>
            <Button onClick={() => navigate('/login')}>Sign in</Button>
        </div>
    );
}
