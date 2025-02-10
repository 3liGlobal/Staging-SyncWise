import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {login} from "../api/login.ts";
import {useNavigate} from "react-router-dom";
import {showError} from "../../../../libs/lib-sync-wise-utils";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const initialValues = {
    email: '',
    password: '',
};

export default function useLoginForm() {
    const navigate = useNavigate();
    const { mutateAsync: signIn} = useMutation(login, {
        onError: (error: { code: string }) =>
            showError(
                error?.code === 'auth/invalid-credential'
                    ? { message: 'Please Enter Valid Credentials.' }
                    : error
            ),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            await signIn({
                email: values.email,
                password: values.password,
            });
            navigate('/');
        },
    });

    return {formik};
}
