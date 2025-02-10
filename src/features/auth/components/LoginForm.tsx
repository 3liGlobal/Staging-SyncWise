import useLoginForm from '../hooks/useLoginForm';
import { PasswordField, TextField } from '../../../../libs/lib-sync-wise-ui';
import { Button } from '../../../../libs/lib-sync-wise-ui';
export default function LoginForm() {
  const { formik } = useLoginForm();
  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="flex flex-col gap-y-6"
      action="#"
      method="POST"
    >
      <TextField
        id="email"
        type="email"
        placeholder="Enter Email Address"
        error={formik.errors.email}
        showError={formik.touched.email}
        {...formik.getFieldProps('email')}
      />
      <PasswordField
        id="password"
        type="password"
        placeholder="Enter Password"
        error={formik.errors.password}
        showError={formik.touched.password}
        {...formik.getFieldProps('password')}
      />
      <Button type='submit' variant='primary' disabled={formik.isSubmitting || !formik.isValid}>{formik.isSubmitting ? 'Sign in...' : 'Sign in'}</Button>
    </form>
  );
}
