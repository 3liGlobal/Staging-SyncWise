import {useOutletContext} from "react-router-dom";
import {FormikContextType} from "formik";

import OnBoardingForm from "../components/OnBoardingForm.tsx";
import IntroductionForm from "../components/forms/IntroductionForm.tsx";
import {ProfileForm} from '../types'
import illustration from '../../../assets/images/onboarding/intro-illustration.svg'

export default function Introduction() {
    const formik = useOutletContext();
    return (
        <div className="h-full w-full flex flex-col lg:flex-row">
            <div className="flex lg:w-5/12 lg:bg-grey-100 py-12 lg:py-24 rounded-r-3xl">
                <div className="max-w-96 mx-auto flex items-center flex-col gap-6 lg:gap-12">
                    <h1 className="text-black text-center text-3xl sm:text-4xl lg:text-5xl font-medium max-w-[300px] lg:max-w-full">Welcome to SyncWise App!</h1>
                    <p className="mx-auto text-black text-base sm:text-lg lg:text-xl font-normal text-center w-8/12 lg:w-10/12">Provide some details about yourself to Get Started</p>
                    <img src={illustration} alt="intro" className="hidden lg:flex" />
                </div>
            </div>
            <div className="flex lg:w-7/12">
                <OnBoardingForm
                    nextStepURl="/onboarding/role"
                    formik={formik}
                >
                    <IntroductionForm formik={formik as FormikContextType<ProfileForm>} />
                </OnBoardingForm>
            </div>
        </div>
    );
}
