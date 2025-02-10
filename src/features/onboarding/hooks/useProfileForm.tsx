import {useLocation} from 'react-router-dom';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useEffect} from 'react';

const validationSchema = Yup.object().shape({
    _route: Yup.string(),
    firstName: Yup.string().when('_route', {
        is: 'introduction',
        then: () => Yup.string().trim().required('First name is required'),
    }),
    lastName: Yup.string().when('_route', {
        is: 'introduction',
        then: () => Yup.string().trim().required('Last name is required'),
    }),
    country: Yup.string().trim(),
    phone: Yup.string().trim(),
    role: Yup.string()
});
const initialValues = {
    _route: '',
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    role: 'Administrator',
};
export default function useProfileForm() {
    const pathname = useLocation().pathname;

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        async onSubmit(values) {
            console.log(values)
        },
    });

    useEffect(() => {
        const parts = pathname.split('/');
        formik.setValues({
            ...formik.values,
            _route: parts[parts.length - 1],
        });
    }, [pathname]);

    return formik;
}
