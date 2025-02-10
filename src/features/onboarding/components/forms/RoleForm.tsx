import {FormikContextType} from "formik";
import {ProfileForm} from '../../types';
import {RadioButton} from "../../../../../libs/lib-sync-wise-ui";

type RoleFormProps = {
    formik: FormikContextType<ProfileForm>;
}

const roles = [
    'Administrator',
    'IT',
    'Data Analyst',
    'Data Engineer',
    'Marketing OPS',
    'Developer',
    'Project Management',
    'Sales OPS',
    'Partner/Consultant',
    'Business Owner',
    'Other',
];

export default function RoleForm({formik}: RoleFormProps) {
    return (
        <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="w-full lg:max-w-lg mx-auto flex flex-col gap-y-6"
            action="#"
            method="POST"
        >
            <RadioButton
                options={roles}
                layout="grid"
                id="roles"
                error={formik.errors.role}
                showError={formik.touched.role}
                {...formik.getFieldProps('role')}
            />
        </form>
    );
}
