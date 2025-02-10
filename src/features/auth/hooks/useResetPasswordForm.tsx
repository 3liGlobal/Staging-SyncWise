import {useFormik} from 'formik';
import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password is required'),
});

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function useResetPasswordForm() {
  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      console.log(values)
    },
  });

  return { formik };
}
