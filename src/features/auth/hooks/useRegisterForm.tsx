import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {signUp} from "../api/signUp.ts";
import {useNavigate} from "react-router-dom";

const registerSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email('Wrong email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Only 8 characters allowed')
        .max(50, 'Maximum 50 characters allowed')
        .required('Password is required'),
    confirmPassword: Yup.string().test(
        'passwords-match',
        'Passwords must match',
        function (value) {
            return this.parent.password === value;
        }
    ),
});

const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
};

export default function useRegisterForm() {
    const navigate = useNavigate();
    const {mutateAsync: createUser} = useMutation(signUp, {
        onError: (error) => console.log(error),
    });
    const formik = useFormik({
        initialValues,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            const res = await createUser({
                email: values.email,
                password: values.password
            })
            navigate(`verify?firebase_user_id=${res.user.uid}`)
        },
    });

    return {formik};
}
