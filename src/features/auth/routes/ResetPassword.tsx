import ResetPasswordForm from '../components/ResetPasswordForm';
import {useNavigate} from "react-router-dom";
export default function ResetPassword() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full mx-auto gap-4 lg:gap-11 lg:max-w-[500px] xl:max-w-[577px] " >
      <h1 className='font-semibold text-center  text-2xl xl:text-4xl '>Enter New Password</h1>
      <div className=' flex flex-col justify-center gap-9 '>
          <p className='text-left text-lg font-light text-blue-950'>Please create a strong password with a mix of characters for security.</p>

        </div>
      <div className='flex flex-col gap-3'>
       <ResetPasswordForm/>
       <div className='flex justify-center'>
        <p className='flex justify-center items-center text-grey-900 text-base font-semibold lg:text-xl '>Back to<span className='ml-1 text-primary-normal underline underline-offset-4 text-sm lg:text-base font-normal cursor-pointer' onClick={() => navigate('/login')}>Sign in</span></p>
        </div>
      </div>
    </div>
  );
}
