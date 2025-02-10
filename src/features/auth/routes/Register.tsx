import { Button } from '../../../../libs/lib-sync-wise-ui';
import RegisterForm from '../components/RegisterForm';
import google from '../../../assets/images/auth/google.svg';
import facebook from '../../../assets/images/auth/facebook.svg'
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full mx-auto gap-4 lg:gap-11 lg:max-w-[500px] xl:max-w-[577px] " >
      <h1 className='font-semibold text-center lg:text-left text-2xl xl:text-4xl '>Create Account</h1>
      <div className='flex justify-center items-center w-full flex-col gap-4 xl:gap-9 xl:flex-row'>
        <Button type='button' variant='auth'><img src={google} alt="google-icon" className='pr-4 ' />Sign-up  with Google</Button>
        <Button type='button' variant='auth'><img src={facebook} alt="google-icon" className='pr-4 ' />Sign-up  with Facebook</Button>
      </div>
      <div className='flex justify-center items-center'>
        <p className='text-grey-700'>- OR -</p>
      </div>
      <div className='flex flex-col gap-3'>
        <RegisterForm />
        <div className='flex justify-center lg:justify-start'>
          <p className='flex items-center text-grey-900 text-base lg:text-xl '>Already Have an Account?<span className='ml-1 text-primary-normal underline underline-offset-4 text-sm lg:text-base font-normal cursor-pointer' onClick={() => navigate('/login')}>Sign in</span></p>
        </div>
      </div>
    </div>
  );
}
