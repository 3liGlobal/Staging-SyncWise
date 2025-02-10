import { Button } from "../../../../libs/lib-sync-wise-ui";
import checkInbox from '../../../assets/images/check-inbox.svg';
import EmailVerfied from '../../../assets/images/Email Verified.svg';
import {useNavigate} from "react-router-dom";

const email_verified = true;
// TODO: REMOVE THE COMMENTED CODE
export default function Verify() {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const [sending, setSending] = useState(false);
  // const { firebase_user_id, id, hash, email_verified } = Object.fromEntries(
  //   searchParams.entries()
  // );
  //
  // const { mutateAsync: resendEmailMutation } = useMutation(resendEmail, {
  //   onError: showError,
  // });
  // const { mutateAsync: verifyEmailMutation } = useMutation(verifyEmail, {
  //   onError: showError,
  // });
  //
  // useEffect(() => {
  //   if (id && hash) {
  //     emailVerificationHandler(id, hash).then(() => {
  //       localStorage.removeItem('emailNotVerified');
  //       navigate(`/register/verify?email_verified=true`);
  //     });
  //   }
  // }, []);
  //
  // const emailVerificationHandler = useCallback(
  //   async (firebase_uuid: string, hash: string) => {
  //     await verifyEmailMutation({
  //       id: firebase_uuid,
  //       hash,
  //     });
  //   },
  //   [id, hash]
  // );
  // const handleResend = useCallback(async () => {
  //   if (!firebase_user_id) return navigate('/login');
  //   setSending(true);
  //   try {
  //     await resendEmailMutation();
  //     setSending(false);
  //     navigate('/register/verify');
  //   } catch {
  //     setSending(false);
  //   }
  // }, [firebase_user_id]);

  return (
    // <div className="flex flex-col h-full justify-center text-center lg:text-left mx-auto gap-4 md:gap-10 lg:gap-11 2xl:gap-6  p-10 sm:p-10  lg:max-w-[500px] xl:max-w-[577px]">

    //   <h1 className='font-semibold text-2xl xl:text-4xl '>Check Your <br/> Inbox please!</h1>
    //   <p className=" font-gilroy">To start using SyncWise, We need to verify your email. Please check your inbox and click the verification link. </p>
    //   <div className="flex flex-row  font-normal text-base justify-center lg:justify-start">
    //     <span className="pr-2">Didn't get email?</span> 
    //     <Link className=' text-primary-normal underline' to=''>Send it again</Link>
    //   </div>
    <>
      <div className="flex flex-col w-full  mx-auto gap-10  lg:max-w-[500px] xl:max-w-[577px] p-10" >
        <div className="flex justify-center">
        {email_verified ? (<img src={checkInbox} alt="checkInbox" className='w-40 h-40' />) : (<img src={EmailVerfied} alt="EmailVerfied" className='w-40 h-40' />)}
          
        </div>
        <h1 className='font-semibold text-center text-2xl xl:text-4xl '>{email_verified ? 'Check Your Inbox please!' : 'Email Verified'}</h1>
        <div className='flex justify-center items-center w-full flex-col gap-4 xl:gap-9 xl:flex-row'>
          <p className=" font-gilroy text-center text-base xl:text-2xl">{email_verified ? 'To start using SyncWise, We need to verify your email. Please check your inbox and click the verification link.' : 'Your Email has been verified. Your account is now active. please Sign in to your account. Thank You'}</p>
        </div>
        <div className='flex justify-center items-center'>
          <div className="flex flex-row  font-normal text-base justify-center w-full">
          {email_verified ? ( <p className='flex justify-center items-center text-grey-900 text-base font-semibold lg:text-lg '>Didn't get email?<span className='ml-1 text-primary-normal underline underline-offset-4 text-sm lg:text-base font-normal cursor-pointer'>Send it again</span></p>) : (<Button onClick={() => navigate('/login')}>Sign in to your Account</Button>)}
           
          </div>
        </div>

      </div>
      {/*<div className="flex flex-col gap:0.5 2xl:gap-1 pt-3 md:pt-5 lg:pt-0">*/}
      {/*  <h1 className="font-montserrat font-semibold text-2xl">*/}
      {/*    {email_verified ? 'Verified' : 'Email Verification'}*/}
      {/*  </h1>*/}
      {/*  <p className="max-w-[480px] font-montserrat font-normal text-sm">*/}
      {/*    {email_verified*/}
      {/*      ? 'Your email has been verified. You can now login.'*/}
      {/*      : 'Please check your email for a link to verify your email address.'}*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*<Button*/}
      {/*  disabled={sending}*/}
      {/*  extraClasses="w-full justify-center"*/}
      {/*  variant="primary"*/}
      {/*  type={'button'}*/}
      {/*  onClick={handleResend}*/}
      {/*>*/}
      {/*  {firebase_user_id*/}
      {/*    ? sending*/}
      {/*      ? 'Sending...'*/}
      {/*      : 'Resend Email'*/}
      {/*    : 'Go to Login'}*/}
      {/*</Button>*/}
    </>




  );
}
