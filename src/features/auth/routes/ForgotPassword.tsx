import { useState } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import checkInbox from '../../../assets/images/check-inbox.svg';
import {useNavigate} from "react-router-dom";
export default function ForgotPassword() {
  const [emailSendingSuccessful, setEmailSendingSuccessful] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col w-full mx-auto gap-4 lg:gap-11 lg:max-w-[500px] xl:max-w-[577px] " >
        <div className='flex justify-center mx-auto flex-col gap-11'>
          <div className='flex justify-center'>{
            emailSendingSuccessful && (
              <img src={checkInbox} alt="syncwise" className='w-40 h-40' />
            )
          }
          </div>
          <h1 className='font-semibold text-center text-2xl xl:text-4xl '>{emailSendingSuccessful ? 'Check Your Inbox please!' : 'Forgot Password?'}</h1>
          <p className="font-normal text-center text-lg max-w-[400px]">
            {emailSendingSuccessful
              ? 'We have sent you an email with a link to reset your password.'
              : 'Enter  your Email address associated with the account and we will send you a link to reset your password.'}
          </p>
        </div>
        <ForgotPasswordForm
          emailSendingSuccessful={emailSendingSuccessful}
          setEmailSendingSuccessful={setEmailSendingSuccessful}
        />
        <div className='flex justify-center'>
        <p className='flex justify-center items-center text-grey-900 text-base font-semibold lg:text-xl '>Back to<span className='ml-1 text-primary-normal underline underline-offset-4 text-sm lg:text-base font-normal' onClick={() => navigate('/login')}>Sign in</span></p>
        </div>
      </div>

    </>
  );
}
