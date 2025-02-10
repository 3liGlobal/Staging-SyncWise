import useForgotPasswordForm from '../hooks/useForgotPasswordForm';
import { TextField, Button } from '../../../../libs/lib-sync-wise-ui';
type ForgotPasswordFormProps = {
  emailSendingSuccessful: boolean;
  setEmailSendingSuccessful: (e: boolean) => void;
};

export default function ForgotPasswordForm({
  emailSendingSuccessful,
  // setEmailSendingSuccessful,
}: ForgotPasswordFormProps) {
  const { formik } = useForgotPasswordForm();

  // function onSuccessfulSubmit(sent: boolean) {
  //   setEmailSendingSuccessful(sent);
  //   // showSuccess('Email sent successfully');
  // }

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="flex flex-col gap-y-6"
      action="#"
      method="POST"
    >
      {!emailSendingSuccessful ? (
        <>
          <div className='flex flex-col gap-4 justify-center lg:justify-start'>
            <TextField
              id="email"
              type="email"
              placeholder="Enter Email Address"
              error={formik.errors.email}
              showError={formik.touched.email}
              {...formik.getFieldProps('email')}
            />
            <Button type='submit' variant='primary' disabled={formik.isSubmitting || !formik.isValid}>{formik.isSubmitting ? 'Proceeding...' : 'Proceed'}</Button>
          </div>
        </>
      ) : (<Button type='submit' variant='primary' disabled={formik.isSubmitting || !formik.isValid}>{formik.isSubmitting ? 'Proceeding...' : 'Proceed'}</Button>)}


    </form>
  );
}
