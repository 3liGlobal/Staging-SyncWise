import useRegisterForm from '../hooks/useRegisterForm';
import {PasswordField, Button, TextField} from '../../../../libs/lib-sync-wise-ui';

export default function RegisterForm() {
    const {formik} = useRegisterForm();
    return (
        <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="flex flex-col gap-4 lg:gap-6"
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
            <PasswordField
                id="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                error={formik.errors.confirmPassword}
                showError={formik.touched.confirmPassword}
                {...formik.getFieldProps('confirmPassword')}
            />

            <Button type='submit' variant='primary'
                    disabled={formik.isSubmitting || !formik.isValid}>{formik.isSubmitting ? 'Creating...' : 'Create Account'}</Button>
        </form>
    );
}
