import {useOutletContext} from "react-router-dom";
import {FormikContextType} from "formik";

import OnBoardingForm from "../components/OnBoardingForm.tsx";
import RoleForm from "../components/forms/RoleForm.tsx";
import illustration from '../../../assets/images/onboarding/role-illustration.svg'
import {ProfileForm} from '../types'

export default function Role() {
    const formik = useOutletContext();
    return (
        <div className="h-full w-full flex flex-col lg:flex-row">
            <div className="flex lg:w-5/12 lg:bg-grey-100 py-12 lg:py-24 rounded-r-3xl">
                <div className="lg:max-w-96 mx-auto items-center lg:items-start flex flex-col gap-6 lg:gap-12">
                    <h1 className="text-black text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl font-medium lg:max-w-full">What is your Role?</h1>
                    <p className="text-black text-base text-center lg:text-left sm:text-lg lg:text-xl font-normal w-[250px] lg:w-10/12">Choose the option that best aligns with your work.</p>
                    <img src={illustration} alt="intro" className="hidden lg:flex" />
                </div>
            </div>
            <div className="flex lg:w-7/12">
                <OnBoardingForm
                    nextStepURl=""
                    formik={formik}
                >
                    <RoleForm formik={formik as FormikContextType<ProfileForm>} />
                </OnBoardingForm>
            </div>
        </div>
    );
}
