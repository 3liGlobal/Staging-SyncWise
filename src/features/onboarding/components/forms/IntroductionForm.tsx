import {FormikContextType} from "formik";
import {TextField} from '../../../../../libs/lib-sync-wise-ui';
import {SelectMenu} from "../../../../../libs/lib-sync-wise-ui";
import {ProfileForm} from '../../types';

type IntroductionFormProps = {
    formik: FormikContextType<ProfileForm>;
}

const countryOptions = [
    {
        label: 'Pakistan',
        value: 'pk',
    },
    {
        label: 'Dubai',
        value: 'ae',
    },
    {
        label: 'Iran',
        value: 'ir',
    }
]

export default function IntroductionForm({formik}: IntroductionFormProps) {
    return (
        <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="w-full max-w-lg mx-auto flex flex-col gap-y-6"
            action="#"
            method="POST"
        >
            <div className="w-full flex flex-col sm:flex-row  sm:justify-between gap-6 sm:gap-10">
                <div className="flex-1">
                    <TextField
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        label="First Name"
                        error={formik.errors.firstName}
                        showError={formik.touched.firstName}
                        {...formik.getFieldProps('firstName')}
                    />

                </div>
                <div className="flex-1">
                    <TextField
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        label="Last Name"
                        error={formik.errors.lastName}
                        showError={formik.touched.lastName}
                        {...formik.getFieldProps('lastName')}
                    />
                </div>
            </div>
            <SelectMenu
                id="country"
                label="Country"
                placeholder="Select Country"
                options={countryOptions}
                error={formik.errors.country}
                showError={formik.touched.country}
                {...formik.getFieldProps('country')}
            />
            <TextField
                id="phone"
                type="text"
                placeholder="000397938773"
                label="Phone"
                error={formik.errors.phone}
                showError={formik.touched.phone}
                {...formik.getFieldProps('phone')}
            />
        </form>
    );
}
