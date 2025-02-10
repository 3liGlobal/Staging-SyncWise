import useResetPasswordForm from '../hooks/useResetPasswordForm';
import { PasswordField } from '../../../../libs/lib-sync-wise-ui';
import { Button } from '../../../../libs/lib-sync-wise-ui';
export default function ResetPasswordForm() {
  const { formik } = useResetPasswordForm();
  return (
    <form
    onSubmit={formik.handleSubmit}
    noValidate
    className="flex flex-col gap-4 lg:gap-6"
    action="#"
    method="POST"
>
    <PasswordField
        id="password"
        type="password"
        placeholder="Enter New Password"
        error={formik.errors.password}
        showError={formik.touched.password}
        {...formik.getFieldProps('password')}
    />
    <PasswordField
        id="confirmPassword"
        type="password"
        placeholder="Confirm New Password"
        error={formik.errors.confirmPassword}
        showError={formik.touched.confirmPassword}
        {...formik.getFieldProps('confirmPassword')}
    />

    <Button type='submit' variant='primary'
            disabled={formik.isSubmitting || !formik.isValid}>{formik.isSubmitting ? 'Creating...' : 'Create Account'}</Button>
</form>
  );
}
