import {useFormik} from 'formik';
import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
});

const initialValues = {
  email: '',
};

export default function useForgotPasswordForm() {
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      console.log(values)
    },
  });

  return { formik };
}
